# Backend Requirements for the Smart TV Display

This document lists the backend and admin-panel work needed to support the mosque Smart TV display (the `tv-setup` branch). The mobile app already handles the display itself, using today's public API. The items below fill gaps where the TV currently has to guess or work around missing data.

Each section says what is needed, why, and the suggested API shape. Every new field is optional, so existing mobile clients keep working unchanged.

---

## 1. Announcements: TV fields

### Problem

The TV announcement slide shows:

- a category tag, for example "EDUCATION"
- a title
- body text
- detail tags, for example "Saturdays", "11:00 – 13:00", "Classroom 2"

The API has no category or detail tags, so the app currently derives them:

- **Tag:** "Event" if `eventDate` is set, otherwise "Announcement".
- **Detail tags:** the event date, a time range from `eventDate`–`endDate`, and the mosque name or `outsideLocation.address`.

This works, but admins cannot control what appears on the TV.

### Required changes

Add these optional, localized fields to the Announcement model. Use the same `en` / `ru` / `lt` structure as `title` and `descriptionHtml`.

```ts
category?: {
  en: string;
  ru: string;
  lt: string;
};

detailTags?: Array<{
  en: string;
  ru: string;
  lt: string;
}>;
```

The public endpoints return them already localized to the requested `lang`, falling back to English, the same way they do for `title`:

```http
GET /api/community/announcements?mosqueId=:mosqueId&lang=lt
```

```json
{
  "id": "6a76ec17c4cd2292ae11dee8",
  "title": "Quran classes for children",
  "descriptionHtml": "<p>Tajweed and memorisation for ages 6–14.</p>",
  "category": "Education",
  "detailTags": ["Saturdays", "11:00 – 13:00", "Classroom 2"]
}
```

### Rules

- `category` is a short label of 24 characters or fewer, because it is shown uppercase in a pill.
- `detailTags` has at most 4 items, each 30 characters or fewer.
- If `category` is missing, the TV falls back to "Event" or "Announcement".
- If `detailTags` is missing, the TV falls back to the event date, time and location.

### Admin panel

- Add a Category input (three languages) to the Announcement form.
- Add a Detail tags list editor (up to 4 rows, three languages each) to the Announcement form.

---

## 2. Announcements: display order and active dates

### Problem

The spec says each announcement has a display order and optional start and end dates, and is only shown while active.

- **Order:** the TV currently uses the feed order, pinned first and then newest.
- **Active dates:** there is no explicit visibility window. A test event from 19 June 2026 still appears on the TV in November.

### Required changes

Add optional fields:

```ts
displayOrder?: number;
visibleFrom?: string;
visibleUntil?: string;
```

- `visibleFrom` and `visibleUntil` are ISO date-time strings.

### Rules

- **Visibility:** the public feed returns an announcement only when the current time is within `[visibleFrom, visibleUntil]`. If either is missing, that side of the window is open.
- **Events without a window:** if `visibleUntil` is missing and the announcement is an event, hide it once `endDate`, or `eventDate` when there is no `endDate`, has passed. This stops past events from appearing on TVs.
- **Ordering:** sort by `isPinned` descending, then `displayOrder` ascending, then `date` descending.
- **Admin panel:** add "Visible from", "Visible until" and "Display order" inputs to the Announcement form.

---

## 3. Announcements: plain-text body

### Problem

The TV shows the body as plain text, at most about 4 lines in a large font. The app currently strips `descriptionHtml` into plain text. Some announcements contain no text at all; one record's `descriptionHtml` has only 11 characters of markup. Those show an empty body on the TV.

### Required changes

- **Validation:** an Announcement must have non-empty visible text in `descriptionHtml` for each language, or a non-empty `excerpt`.
- **Optional `excerpt`:** add a localized plain-text `excerpt` field of 300 characters or fewer. When present, the TV uses it instead of stripping `descriptionHtml`.

---

## 4. Mosque timetable data quality

The TV raises alerts and counts down from these values. A bad value makes the display alert at the wrong time, or not at all.

### 4.1 Iqama after the next prayer

**Problem:** islamo centras has `iqamaTimes.maghrib = "20:10"`, but in November Isha is around 18:00. The Maghrib Iqama therefore falls after the Isha Adhan. The TV gives priority to the newest Adhan, so the Maghrib Iqama alert never fires, and the Maghrib countdown would otherwise run for almost 4 hours.

**Required:**

- Correct the islamo centras Maghrib Iqama value.
- Validate on save, in both the Iqama offsets/times endpoint and the timetable import:
  - An exact Iqama time must be after that prayer's Adhan on every date in the active timetable, and before the next prayer's Adhan.
  - If an exact time cannot satisfy this all year, which is common for Maghrib and Isha at Lithuanian latitudes, the admin should use a minutes offset instead.
  - Show a clear validation error naming the first date that breaks the rule.

### 4.2 Isha missing in summer

**Problem:** for June dates the timetable returns `"isha": "--:--"`:

```json
{ "date": "2026-06-20", "times": { "fajr": "01:21", "dhuhr": "13:26", "asr": "17:51", "maghrib": "22:04", "isha": "--:--" } }
```

The app treats this as missing and uses its own high-latitude rule (Maghrib + 75 minutes, about 23:19). With islamo centras' 60-minute Isha offset, the Iqama then falls after midnight. The app handles that case, but the mosque's actual Isha time is unknown.

**Required:**

- Decide with the mosque what Isha time it uses in high-latitude summer.
- Store that time in the timetable instead of `--:--`.
- If the mosque really has no fixed Isha time, omit the field. Do not send a placeholder string.
- The timetable import should reject values that are not in `HH:mm` format.

### 4.3 Exact Iqama times after midnight

**Problem:** an exact Iqama time is stored as `HH:mm` without a date. An Isha Iqama of `"00:15"` would be read as 00:15 on the same day, which is before the Adhan.

**Required:** do not allow exact Iqama times earlier than the prayer's Adhan; the rule in 4.1 covers this. Mosques that pray Isha after midnight in summer should use a minutes offset instead.

---

## 5. Jumu'ah Iqama (optional)

### Problem

Jumu'ah times come from `jummahSchedule.times` and have no Iqama. The TV shows the Adhan alert for each Jumu'ah time, but no Iqama countdown or Iqama alert.

### Suggested change

Add optional Iqama times to the schedule:

```ts
jummahSchedule?: {
  allFridays: boolean;
  startDate: string;
  endDate: string;
  times: string[];
  iqamaTimes?: string[];
};
```

- `iqamaTimes[i]` is the Iqama for `times[i]`.
- Each entry must be later than its Jumu'ah time.
- If `iqamaTimes` is present, the TV will run the countdown and Iqama alert for Jumu'ah exactly as it does for the other prayers.
- **Admin panel:** add an optional Iqama input next to each Jumu'ah time.

---

## 6. Mosque timezone (recommended)

### Problem

All times are `HH:mm` strings, interpreted in the TV's own timezone. A TV set to the wrong timezone shows every prayer, alert and countdown at the wrong time.

### Suggested change

Add an IANA timezone to each mosque:

```ts
timezone: string;
```

- Use for example `"Europe/Vilnius"`, with that as the default for existing records.
- The app can then warn on the TV when the device timezone does not match the mosque's.

---

## 7. Optional: TV settings from the admin panel (later)

The spec's open questions include managing TV settings remotely instead of with the remote control. If the team wants this later, a per-mosque settings endpoint would be needed:

```http
GET /api/tv/settings?mosqueId=:mosqueId
```

```json
{
  "announcementsEnabled": true,
  "announcementSeconds": 45,
  "theme": "dark",
  "menuPin": "1234"
}
```

The app does not use this yet. It is listed so the data model can be planned.

---

## Summary checklist

| # | Item | Priority |
|---|---|---|
| 1 | Announcement `category` and `detailTags` (localized), with admin inputs | High |
| 2 | Announcement `visibleFrom`, `visibleUntil`, `displayOrder`; hide past events | High |
| 3 | Validate a non-empty announcement body; optional plain-text `excerpt` | Medium |
| 4.1 | Fix islamo centras Maghrib Iqama (20:10); validate that Iqama falls between its Adhan and the next prayer | High |
| 4.2 | Replace `"isha": "--:--"` with real summer Isha times, or omit the field | High |
| 4.3 | Reject exact Iqama times earlier than the Adhan | Medium |
| 5 | Optional Jumu'ah `iqamaTimes` | Low |
| 6 | Mosque `timezone` | Low |
| 7 | Remote TV settings endpoint (future) | Later |
