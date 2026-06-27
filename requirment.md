# Muslim Community Lithuania — Mobile Application

## Overview

A React Native mobile application built with Expo and TypeScript for the Muslim community in Lithuania. The app serves as the central hub for daily Islamic practice, community connection, and local Muslim life in Lithuania. It operates fully offline for core features (prayer times, Qibla, tracker) and connects to a MERN backend API for community content (locations, announcements, quiz). The target audience is Muslims living in Lithuania — Arab expats, Central Asian communities, students, and converts. The app supports two languages: **English** and **Russian**. Russian is the community lingua franca shared across Arabs, Chechens, Uzbeks, Azerbaijanis, and other Muslim groups living in Lithuania. Every single string in the app — labels, notifications, error messages, prayer names, onboarding copy — must live in the locale files from day one. No hardcoded strings anywhere in the codebase.

---

## Design Direction

The app must feel premium, calm, and spiritual — not generic. The aesthetic is **dark forest green** — not navy, not black, but a deep green that runs through every surface giving the app a natural, warm, Islamic identity. Islamic geometric patterns are used subtly as background textures on key screens. Smooth animations between screens are required. Think of the visual quality of Muslim Pro but more refined and community-focused. Every screen must feel intentional, spacious, and beautiful. Use a clean geometric sans-serif font that renders beautifully in both Latin and Cyrillic scripts — Nunito or DM Sans both have full Cyrillic support and work well at all sizes.

The key principle for the color system: **the green tint must be present on every surface** — backgrounds, cards, and borders all carry a green undertone. Nothing is pure black or pure grey. The accent green is bright and vibrant, leaning slightly toward lime, used for checkmarks, active states, highlights, and the next prayer indicator.

**Color Palette:**

- Background: `#0A1A0F` (deep forest green — almost black with strong green undertone)
- Surface cards: `#162A1C` (slightly lighter forest green for cards)
- Card elevated: `#1E3B27` (for modals, bottom sheets, overlays)
- Primary accent: `#3DD68C` (bright vibrant green — used for active prayer, checkmarks, CTAs)
- Secondary accent: `#A8F0C6` (soft mint for secondary highlights and labels)
- Text primary: `#F0FFF4` (near white with a subtle green tint)
- Text secondary: `#86EFAC` (muted green-white for supporting text)
- Border: `#2D4F38` (subtle green border between elements)
- Error/missed: `#F87171` (soft red for missed prayers and errors)
- Success/prayed: `#3DD68C` (same as primary accent)

---

## Tech Stack

| Layer              | Choice                                      |
| ------------------ | ------------------------------------------- |
| Framework          | Expo SDK 51+ (managed workflow)             |
| Language           | TypeScript (strict mode)                    |
| Navigation         | Expo Router (file-based routing)            |
| Local Database     | Expo SQLite (via drizzle-orm)               |
| State Management   | Zustand                                     |
| Notifications      | Expo Notifications                          |
| Location & Compass | Expo Location + Expo Sensors (Magnetometer) |
| HTTP Client        | Axios                                       |
| Date Handling      | date-fns + custom Hijri converter           |
| i18n               | i18next + react-i18next + Expo Localization |
| UI Components      | Custom components only — no UI libraries    |
| Animations         | React Native Reanimated 3                   |
| Icons              | Expo Vector Icons (MaterialCommunityIcons)  |
| Maps               | react-native-maps                           |
| Storage            | Expo SecureStore (settings) + SQLite (data) |

---

## Localization — i18n Rules (Apply From Day One)

i18n is not a Phase 5 task. It is configured in Phase 1 and enforced throughout every phase. The following rules must be followed across all development:

- **Zero hardcoded strings** — every piece of user-facing text must use the `t()` function from `react-i18next`
- Both `src/i18n/locales/en.json` and `src/i18n/locales/ru.json` must be updated simultaneously whenever a new string is added — never add to one without the other
- Locale files are organized by feature namespace: `onboarding`, `prayer`, `tracker`, `qada`, `calendar`, `map`, `community`, `quiz`, `settings`, `notifications`, `errors`
- The user selects their language on the first onboarding screen. The choice is persisted in Expo SecureStore under the key `appLanguage` and loaded before the app renders anything
- On first launch, if no stored language exists, detect the device locale using Expo Localization — Russian device (`ru`) → default to `ru`, everything else → default to `en`
- Language can be changed at any time in Settings. Switching re-renders the entire app instantly via `i18next.changeLanguage()` without requiring a restart
- All push notification content (Adhan, reminder, Al-Kahf, announcements) must be sent in the user's stored language — the `lang` field is sent with the push token registration to the backend

**Locale file structure example:**

```json
{
  "onboarding": {
    "welcome_title": "Assalamu Alaikum",
    "welcome_subtitle": "Your Muslim community app for Lithuania",
    "select_language": "Choose your language",
    "allow_location_title": "Enable Location",
    "allow_location_body": "Used to calculate accurate prayer times and Qibla direction for your exact location",
    "allow_location_button": "Allow Location",
    "allow_location_skip": "Use Vilnius as default",
    "allow_notifications_title": "Enable Notifications",
    "allow_notifications_body": "Get notified for each prayer time and Friday reminders",
    "allow_notifications_button": "Allow Notifications",
    "allow_notifications_skip": "Maybe later",
    "get_started": "Get Started",
    "enter_app": "Enter the App"
  },
  "notifications": {
    "adhan_title": "{{name}} Prayer",
    "adhan_body": "It is time for {{name}} — {{time}}",
    "reminder_title": "{{name}} in 10 minutes",
    "reminder_body": "Prayer time is approaching — get ready",
    "kahf_title": "Friday Reminder",
    "kahf_body": "Don't forget to read Surah Al-Kahf today"
  }
}
```

---

## Onboarding Flow

The onboarding runs only once on first launch. It is a multi-step flow using a horizontal step pager driven by local state. Once completed, a flag `onboardingComplete: true` is saved in SecureStore and the user skips onboarding on all future launches. All onboarding screens are full-screen with the dark green background, centered content, smooth slide-in animations between steps, and a step progress indicator at the bottom. Every string on every onboarding screen uses `t()` — the language switch on Step 2 immediately applies to all remaining steps.

**Step 1 — Welcome**
A full-screen welcome with a large Arabic "بِسْمِ اللَّه" displayed decoratively at the top as a static text element, the app name below it, and a warm subtitle. A single "Get Started" button advances to Step 2. This screen sets the tone — it must be visually striking.

**Step 2 — Language Selection**
Two large tappable cards side by side: English and Русский. Tapping one highlights it with the primary accent green and immediately calls `i18next.changeLanguage()` so all subsequent steps render in the chosen language. The selection is saved to SecureStore as `appLanguage`. This step has no skip — language must be chosen before proceeding.

**Step 3 — Location Permission**
A screen explaining why location is needed — accurate prayer times and Qibla direction. Two buttons: "Allow Location" (triggers `Expo.Location.requestForegroundPermissionsAsync()`) and "Use Vilnius as default" (saves `{ lat: 54.6872, lng: 25.2797 }` to SecureStore and skips). If the user taps Allow and the OS dialog is denied, the app silently falls back to Vilnius coordinates. The Settings screen later shows a recovery banner.

**Step 4 — Notification Permission**
A screen listing what notifications the user will receive: Adhan at prayer time, 10-minute prep reminder, and Friday Al-Kahf reminder. Two buttons: "Allow Notifications" (triggers `Expo.Notifications.requestPermissionsAsync()`) and "Maybe later" (skips — all notifications disabled by default). If allowed, the Expo push token is fetched and stored for later registration with the backend in Phase 4.

**Step 5 — All Done**
A celebration screen with an animated green checkmark (Reanimated), "You're all set" message, and the first calculated prayer time already shown as a teaser using today's live calculation. The "Enter the App" button saves `onboardingComplete: true` to SecureStore and calls `router.replace('/(tabs)')`.

---

## Permissions Strategy

All permissions are requested during onboarding with full context before any system dialog appears. The app never requests a permission without first showing a custom explanation screen. The following rules apply across all scenarios:

| Permission          | Requested In               | Fallback if Denied                                          |
| ------------------- | -------------------------- | ----------------------------------------------------------- |
| Foreground Location | Onboarding Step 3          | Store Vilnius `{ lat: 54.6872, lng: 25.2797 }` as default   |
| Notifications       | Onboarding Step 4          | All notifications disabled, re-enable available in Settings |
| Magnetometer        | First open of Qibla screen | Show static bearing with a sensor-unavailable warning       |

If location or notification permission was denied during onboarding, a `PermissionBanner` component appears in the Settings screen with a description of what is missing and a button that calls `Linking.openSettings()` to redirect the user to the device system settings. The app never calls `requestPermissionsAsync()` again after a denial — it always goes through `Linking.openSettings()` instead, which is the correct iOS and Android behavior.

---

## Features

### Feature 1 — Prayer & Daily Tracking

**Prayer Times — Home Screen**
The main screen. Calculates all 5 prayer times locally using the custom TypeScript astronomy engine — no internet needed. Uses GPS coordinates from SecureStore (set during onboarding). The current active prayer is highlighted with a glowing accent-green card. The next prayer shows a live countdown timer (HH:MM:SS). All 5 prayers are listed with times and individual notification toggle icons. During the Lithuanian summer high-latitude period (approx. late May to mid July), a dismissible banner uses i18n strings to explain the fallback in the user's language.

**Prayer Calculation System**
The user does not choose a calculation method or madhab. The app uses one internal Lithuania-focused calculation system: Fajr and Isha at 18° twilight when twilight is solvable, Dhuhr at solar noon with local timetable rounding, Maghrib at sunset with local timetable rounding, and Asr by the standard shadow rule where shadow length equals object height plus noon shadow. If Fajr or Isha cannot be solved during high-latitude summer, Fajr is set to solar midnight and Isha is set to 75 minutes after Maghrib, matching the local mosque timetable rule. In winter, the formula should usually work for Lithuania, but if the Asr-to-Maghrib window is under 45 minutes, the home screen shows an i18n warning with the approximate window length.

**Adhan Notification**
Each of the 5 prayers has an individual Adhan toggle. When on, a notification fires at the exact prayer time using i18n keys `notifications.adhan_title` and `notifications.adhan_body` with prayer name and time interpolated. A custom Adhan audio file is bundled in app assets. All 5 Adhan notifications are scheduled as a batch by the midnight background task.

**10-Minute Reminder Notification**
A second notification per prayer fires 10 minutes before. Independently toggleable per prayer from the Adhan toggle. Uses i18n keys `notifications.reminder_title` and `notifications.reminder_body`. Scheduled in the same midnight batch task. Each prayer effectively has 4 possible states: both on, reminder only, Adhan only, both off.

**Surah Al-Kahf Friday Reminder**
Every Friday at 8:00 AM a local notification fires using i18n keys `notifications.kahf_title` and `notifications.kahf_body`. Single on/off toggle in Settings. Implemented as a weekly repeating notification using Expo Notifications `CalendarTrigger` with `weekday: 6`.

**Qibla Compass**
Uses Expo Sensors magnetometer + stored GPS coordinates to calculate the bearing to Mecca. UI shows a custom compass rose with a Kaaba icon needle. Needle rotates smoothly in real time using Reanimated interpolation on the device heading value. Degree readout below (e.g. "137° SE"). If magnetometer is unavailable on the device, a static bearing is shown with an i18n warning message.

**Hijri Calendar**
Full calendar screen showing Hijri and Gregorian dates together. Month navigation with Hijri month names in both English and Russian via i18n. Key Islamic dates auto-highlighted: full Ramadan month, Eid Al-Fitr, Eid Al-Adha, Day of Arafah, Ashura, first 10 days of Dhul Hijjah. Fully offline — no API.

**Prayer Tracker — Daily Log**
After each prayer time passes, a prompt appears on the home screen: "Did you pray [name]?" with Yes / No. Each answer saved in SQLite `prayerLogs` table. Home screen shows today's 5 prayers as circular indicators: green checkmark, red X, or grey dot. Tracker history screen lets users view and retroactively edit any prayer on any past date.

**Missed Prayer Counter (Qada)**
Every "No" log increments the `qadaCounters` table for that prayer. Qada screen shows per-prayer outstanding count and a total. Manual + and − buttons per prayer. All prayer name labels use i18n.

**Monthly & Daily Stats**
Stats screen with: calendar heatmap (green/yellow/red per day), circular progress ring with monthly percentage, weekly bar chart, and streak counter for consecutive full-prayer days. All dynamic values use i18n interpolation for number formatting and labels.

---

### Feature 2 — Locations & Maps

**Mosque Locator**
Interactive map with custom branded mosque pins. Tapping a pin opens a bottom sheet with name, address, phone, opening hours. Data from backend API, cached in SQLite `cachedLocations`. Sorted by distance from stored user coordinates. Offline-first after first fetch.

**Halal Food Map**
Map layer with color-coded pins by category: restaurant (primary green), grocery (blue), fast food (orange). Bottom sheet shows name, category, address, hours, and "Open Now" / "Closed" badge. Category and city filter chips at the top. SQLite cached.

**Nearest Halal Butcher**
List screen sorted by distance. Each row: name, address, phone, open/closed status. Supermarkets with halal sections included with a clear label distinguishing them from dedicated butchers. All labels via i18n. SQLite cached.

---

### Feature 3 — Community

**Announcements Feed**
Scrollable feed fetched with `?lang=` parameter matching `appLanguage` so only same-language posts are shown. Cards show title, date, thumbnail, 2-line excerpt. Pull-to-refresh. Unread badge count on tab icon, stored in SecureStore. All static labels via i18n.

**Announcement Detail Screen**
Full post: title, date, rich text body, horizontal image gallery, event date/time, map preview card if a location is linked. Share button using React Native `Share` API to send a formatted summary + deep-link via any messaging app.

**Push Notification on New Post**
Backend sends push only to devices whose registered `lang` matches the post language. Notification title is the post title. Tapping deep-links to `announcement/[id]` route inside the app.

**Friday Prayer (Jumu'ah) Schedule**
Dedicated screen listing both Jumu'ah times per mosque (early and late). Fetched as part of the mosque location API response. Labels (e.g. "First Jumu'ah", "Second Jumu'ah") via i18n.

---

### Feature 4 — Islamic Quiz

**Quiz Source**
Questions are managed via the admin website CMS. Before launch, the backend database is pre-seeded with a minimum of **300 questions in English and 300 in Russian** (600 total) across 5 categories: Aqeedah, Fiqh, Seerah, Quran, Hadith. The seed file is a structured JSON document maintained in the backend repository under `server/seeds/quizQuestions.json`. Mosque admins can add more questions at any time through the website. The API endpoint `GET /api/quiz/daily?lang=en&deviceId=xxx` returns 20 random questions filtered by language, excluding questions seen by that device in the last 30 days. If the full question pool is exhausted for a device, the exclusion window resets to 7 days automatically.

**Daily Quiz Screen**
20 questions one at a time. Progress bar at top. 4 tappable answer options per question. On tap: correct option turns green, wrong options turn red, explanation text appears below. "Next" button advances. No going back. All text via i18n.

**Results Screen**
Score fraction (e.g. 16/20), percentage, i18n motivational message by score range (above 80% / 50–80% / below 50%), and a review list of incorrect answers. Score saved to SQLite `quizScores`. A "History" section shows past scores by date.

---

## Folder Structure

```
app/
├── onboarding/
│   └── index.tsx              # Multi-step onboarding pager
├── (tabs)/
│   ├── index.tsx              # Prayer times home screen
│   ├── map.tsx                # Locations & maps
│   ├── community.tsx          # Announcements feed
│   ├── quiz.tsx               # Daily quiz
│   └── settings.tsx           # Settings
├── announcement/[id].tsx      # Announcement detail (deep-link target)
├── qibla.tsx                  # Qibla compass
├── calendar.tsx               # Hijri calendar
├── tracker.tsx                # Prayer tracker history
├── qada.tsx                   # Qada counter
├── stats.tsx                  # Monthly & daily stats
├── quiz-results.tsx           # Quiz results
└── _layout.tsx                # Root layout — checks onboardingComplete

src/
├── i18n/
│   ├── index.ts               # i18next initialization
│   └── locales/
│       ├── en.json            # All English strings (namespaced)
│       └── ru.json            # All Russian strings (namespaced)
├── prayer/
│   ├── calculator.ts          # Prayer time engine
│   ├── hijri.ts               # Hijri conversion
│   └── qibla.ts               # Qibla bearing
├── stores/
│   ├── prayerStore.ts
│   ├── trackerStore.ts
│   ├── settingsStore.ts       # language, coords, notification preferences
│   └── onboardingStore.ts     # current step state
├── db/
│   ├── schema.ts              # Drizzle schema
│   └── migrations/
├── api/
│   ├── client.ts              # Axios + lang interceptor
│   ├── locations.ts
│   ├── announcements.ts
│   └── quiz.ts
├── notifications/
│   └── scheduler.ts           # Midnight batch scheduler
├── hooks/
│   ├── usePermissions.ts      # Location + notification helpers
│   └── usePrayerTimes.ts      # Memoized daily prayer calculation
├── components/
│   ├── PrayerCard.tsx
│   ├── CompassRose.tsx
│   ├── HeatmapCalendar.tsx
│   ├── AnnouncementCard.tsx
│   ├── QuizCard.tsx
│   ├── BottomSheet.tsx
│   └── PermissionBanner.tsx   # Shown in Settings when permission denied
└── constants/
    ├── colors.ts
    ├── fonts.ts
    └── prayerMethods.ts
```

---

## SQLite Schema

```typescript
prayerLogs {
  id:        integer  // autoincrement primary key
  date:      text     // "2026-05-11"
  prayer:    text     // "fajr" | "dhuhr" | "asr" | "maghrib" | "isha"
  prayed:    integer  // 1 = yes, 0 = no
  loggedAt:  text     // ISO timestamp
}

qadaCounters {
  id:        integer  // autoincrement primary key
  prayer:    text     // "fajr" | "dhuhr" | "asr" | "maghrib" | "isha"
  count:     integer  // outstanding count
}

quizScores {
  id:        integer  // autoincrement primary key
  date:      text     // "2026-05-11"
  score:     integer  // 0–20
  total:     integer  // always 20
}

cachedLocations {
  id:        integer  // autoincrement primary key
  data:      text     // JSON stringified API response
  fetchedAt: text     // ISO timestamp — used for 24h invalidation
}

cachedAnnouncements {
  id:        integer  // autoincrement primary key
  data:      text     // JSON stringified API response
  fetchedAt: text     // ISO timestamp
}
```

---

## Technical Phases

### Phase 1 — Foundation, i18n & Onboarding

This phase must be completed before any feature screen is built. i18n and onboarding are the entry point of the app — everything else depends on them.

- Initialize Expo project with TypeScript strict mode and Expo Router file-based navigation
- Install and configure i18next + react-i18next — create `src/i18n/index.ts`, create `en.json` and `ru.json` with the full namespace skeleton for all features (`onboarding`, `prayer`, `tracker`, `qada`, `calendar`, `map`, `community`, `quiz`, `settings`, `notifications`, `errors`)
- From this point forward, enforce the zero-hardcoded-strings rule — every string added anywhere must go into both locale files
- Configure the root `_layout.tsx` to read `onboardingComplete` from SecureStore on launch — redirect to `/onboarding` if false, to `/(tabs)` if true
- Implement the 5-step onboarding pager with all screens: Welcome, Language Selection, Location Permission, Notification Permission, All Done
- Implement `usePermissions.ts` hook wrapping Expo Location and Expo Notifications permission requests with the correct post-denial behavior (`Linking.openSettings()`)
- Implement `settingsStore` with Zustand + SecureStore persistence for: `appLanguage`, `userCoordinates`, `onboardingComplete`, notification preferences
- Implement the full prayer time calculation engine, Hijri conversion, and Qibla bearing calculation
- Set up Drizzle ORM with Expo SQLite — define all 5 tables in `schema.ts` and run the initial migration

### Phase 2 — Home Screen, Prayer Tracking & Notifications

- Build the Prayer Times home screen with all 5 prayer cards, current prayer glow, next prayer countdown, notification toggles, and summer fallback banner
- Build the Qibla compass screen with live magnetometer, Reanimated rotation, and degree readout
- Build the Hijri calendar screen with month navigation and highlighted Islamic dates
- Build the prayer tracker history screen with Yes/No logging and retroactive editing
- Build the Qada counter screen with per-prayer add/subtract controls
- Build the monthly & daily stats screen with heatmap, progress ring, bar chart, and streak counter
- Implement the midnight notification scheduler background task — calculates next day's prayer times and schedules all Adhan + 10-minute reminder notifications, plus the weekly Al-Kahf Friday notification
- Implement per-prayer notification toggle state stored in SecureStore
- Verify every screen built so far has zero hardcoded strings before proceeding

### Phase 3 — Backend Integration, Maps & Offline Caching

- Set up Axios instance with base URL, automatic `?lang=` request interceptor reading from `settingsStore`, and global error response interceptor
- Implement the SQLite caching layer: check cache age before every API call — serve SQLite data if under 24 hours old, fetch from API and update cache if stale or missing
- Build the mosque locator map screen with custom pins, bottom sheet on tap, distance sort, offline-first cache
- Build the halal food map screen with color-coded pins, category/city filters, open/closed badge
- Build the halal butcher list screen sorted by distance with supermarket halal section labels
- Implement the `PermissionBanner` component and show it in Settings when location or notification permission is in denied state with a `Linking.openSettings()` button

### Phase 4 — Community, Quiz & Push Notifications

- Build the announcements feed screen with language-filtered API fetch, pull-to-refresh, unread badge
- Build the announcement detail screen with image gallery, map preview, and share button
- Implement Expo push token registration: after notification permission is confirmed, call `getExpoPushTokenAsync()` and POST token + `deviceId` + `lang` to `POST /api/push/register`
- Implement deep-link handling in `_layout.tsx` so push notification taps navigate to `announcement/[id]`
- Build the daily quiz screen fetching 20 questions from `GET /api/quiz/daily?lang=&deviceId=`, with one-at-a-time display, answer reveal animation, and explanation text
- Build the quiz results screen with score, i18n motivational message, incorrect answers review, and SQLite score save
- Add a background fetch task to pre-load the next day's quiz questions overnight so the quiz is available offline in the morning

### Phase 5 — Polish, Animations & Release

- Audit every screen: zero hardcoded strings, all colors from `constants/colors.ts`, consistent spacing
- Implement all Reanimated 3 animations: prayer card staggered entrance, compass needle smooth rotation, quiz answer reveal with scale + color transition, heatmap cell pop-in, onboarding step slide transitions
- Add Islamic geometric SVG pattern as a 5–8% opacity background texture on the home screen and onboarding welcome screen
- Run the full app end-to-end in Russian — every screen, notification, and error message — fix any missing `ru.json` keys
- Test the summer high-latitude fallback by mocking a June date and confirming the banner appears correctly in both languages
- Test fresh install onboarding on both iOS and Android simulators
- Configure Expo EAS Build for development, staging, and production profiles
- Configure Expo EAS Submit for App Store and Google Play
- Write app store listing title, short description, long description, and keywords in both English and Russian
