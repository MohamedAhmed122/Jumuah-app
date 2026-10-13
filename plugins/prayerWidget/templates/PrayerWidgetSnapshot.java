package com.muslimcommunity.lithuania;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;

class PrayerWidgetSnapshot {
  final String label;
  final long previousAt;
  final long nextAt;

  private PrayerWidgetSnapshot(String label, long previousAt, long nextAt) {
    this.label = label;
    this.previousAt = previousAt;
    this.nextAt = nextAt;
  }

  boolean hasNext() {
    return nextAt > 0;
  }

  int progress(long now) {
    long total = nextAt - previousAt;
    if (previousAt <= 0 || total <= 0) return 0;
    return (int) Math.max(0, Math.min(1000, ((now - previousAt) * 1000.0) / total));
  }

  static PrayerWidgetSnapshot read(Context context, long now) {
    try {
      SharedPreferences prefs = context.getSharedPreferences(PrayerWidgetDataModule.PREFS, Context.MODE_PRIVATE);
      String json = prefs.getString(PrayerWidgetDataModule.SNAPSHOT_KEY, null);
      if (json == null) return empty();
      JSONObject object = new JSONObject(json);
      JSONArray schedule = object.optJSONArray("schedule");
      if (schedule != null && schedule.length() > 0) return fromSchedule(schedule, now);
      return new PrayerWidgetSnapshot(
        object.optString("prayerLabel", ""),
        parseInstant(object.optString("previousPrayerAt", null)),
        parseInstant(object.optString("nextPrayerAt", null))
      );
    } catch (Exception exception) {
      return empty();
    }
  }

  private static PrayerWidgetSnapshot fromSchedule(JSONArray schedule, long now) {
    String label = "";
    long previousAt = 0;
    long nextAt = 0;
    for (int index = 0; index < schedule.length(); index += 1) {
      JSONObject entry = schedule.optJSONObject(index);
      if (entry == null) continue;
      long at = parseInstant(entry.optString("at", null));
      if (at <= 0) continue;
      if (at <= now) {
        previousAt = Math.max(previousAt, at);
      } else if (nextAt == 0 || at < nextAt) {
        nextAt = at;
        label = entry.optString("label", "");
      }
    }
    return new PrayerWidgetSnapshot(label, previousAt, nextAt);
  }

  private static PrayerWidgetSnapshot empty() {
    return new PrayerWidgetSnapshot("", 0, 0);
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
