package com.muslimcommunity.lithuania;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;

class PrayerWidgetSnapshot {
  final String mosqueName;
  final String hijriDate;
  final long sunriseAt;
  final String headline;
  final long nextAt;

  private PrayerWidgetSnapshot(String mosqueName, String hijriDate, long sunriseAt, String headline, long nextAt) {
    this.mosqueName = mosqueName;
    this.hijriDate = hijriDate;
    this.sunriseAt = sunriseAt;
    this.headline = headline;
    this.nextAt = nextAt;
  }

  boolean hasNext() {
    return nextAt > 0;
  }

  boolean hasSunrise() {
    return sunriseAt > 0;
  }

  static PrayerWidgetSnapshot read(Context context, long now) {
    try {
      SharedPreferences prefs = context.getSharedPreferences(PrayerWidgetDataModule.PREFS, Context.MODE_PRIVATE);
      String json = prefs.getString(PrayerWidgetDataModule.SNAPSHOT_KEY, null);
      if (json == null) return empty();
      JSONObject object = new JSONObject(json);
      String mosqueName = object.optString("mosqueName", "");
      String hijriDate = object.optString("hijriDate", "");
      long sunriseAt = parseInstant(object.optString("sunriseAt", null));
      JSONArray schedule = object.optJSONArray("schedule");
      if (schedule != null && schedule.length() > 0) {
        return fromSchedule(schedule, now, mosqueName, hijriDate, sunriseAt);
      }
      String label = object.optString("prayerLabel", "");
      long nextAt = parseInstant(object.optString("nextPrayerAt", null));
      return new PrayerWidgetSnapshot(mosqueName, hijriDate, sunriseAt, label, nextAt);
    } catch (Exception exception) {
      return empty();
    }
  }

  private static PrayerWidgetSnapshot fromSchedule(
    JSONArray schedule, long now, String mosqueName, String hijriDate, long sunriseAt
  ) {
    String headline = "";
    long nextAt = 0;
    for (int index = 0; index < schedule.length(); index += 1) {
      JSONObject entry = schedule.optJSONObject(index);
      if (entry == null) continue;
      long at = parseInstant(entry.optString("at", null));
      if (at <= now) continue;
      if (nextAt == 0 || at < nextAt) {
        nextAt = at;
        headline = entry.optString("headline", entry.optString("label", ""));
      }
    }
    return new PrayerWidgetSnapshot(mosqueName, hijriDate, sunriseAt, headline, nextAt);
  }

  private static PrayerWidgetSnapshot empty() {
    return new PrayerWidgetSnapshot("", "", 0, "", 0);
  }

  private static long parseInstant(String value) {
    if (value == null || value.equals("null") || value.length() == 0) return 0;
    try {
      SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
      parser.setTimeZone(TimeZone.getTimeZone("UTC"));
      return parser.parse(value).getTime();
    } catch (Exception exception) {
      return 0;
    }
  }
}
