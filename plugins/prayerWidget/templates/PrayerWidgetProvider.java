package com.muslimcommunity.lithuania;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.widget.RemoteViews;

import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.TimeZone;

public class PrayerWidgetProvider extends AppWidgetProvider {
  @Override
  public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
    for (int appWidgetId : appWidgetIds) {
      updateAppWidget(context, appWidgetManager, appWidgetId);
    }
  }

  static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {
    RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.prayer_widget);
    Snapshot snapshot = Snapshot.read(context);

    views.setTextViewText(R.id.prayer_name, snapshot.prayerLabel);
    views.setTextViewText(R.id.prayer_time_remaining, snapshot.remainingText());
    views.setProgressBar(R.id.prayer_progress, 1000, snapshot.progress(), false);

    Intent launchIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("jumuahapp://"));
    PendingIntent pendingIntent = PendingIntent.getActivity(
      context,
      0,
      launchIntent,
      PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
    );
    views.setOnClickPendingIntent(R.id.prayer_widget_root, pendingIntent);

    appWidgetManager.updateAppWidget(appWidgetId, views);
  }

  private static class Snapshot {
    final String prayerLabel;
    final long previousPrayerAt;
    final long nextPrayerAt;
    final double fallbackProgress;

    Snapshot(String prayerLabel, long previousPrayerAt, long nextPrayerAt, double fallbackProgress) {
      this.prayerLabel = prayerLabel;
      this.previousPrayerAt = previousPrayerAt;
      this.nextPrayerAt = nextPrayerAt;
      this.fallbackProgress = fallbackProgress;
    }

    static Snapshot read(Context context) {
      long now = System.currentTimeMillis();
      Snapshot fallback = new Snapshot("Asr", now - 120L * 60L * 1000L, now + 72L * 60L * 1000L, 0.62);
      try {
        SharedPreferences prefs = context.getSharedPreferences(PrayerWidgetDataModule.PREFS, Context.MODE_PRIVATE);
        String json = prefs.getString(PrayerWidgetDataModule.SNAPSHOT_KEY, null);
        if (json == null) return fallback;
        JSONObject object = new JSONObject(json);
        return new Snapshot(
          object.optString("prayerLabel", fallback.prayerLabel),
          parseInstant(object.optString("previousPrayerAt", null), fallback.previousPrayerAt),
          parseInstant(object.optString("nextPrayerAt", null), fallback.nextPrayerAt),
          object.optDouble("progress", fallback.fallbackProgress)
        );
      } catch (Exception exception) {
        return fallback;
      }
    }

    int progress() {
      long total = nextPrayerAt - previousPrayerAt;
      if (total <= 0) return (int) Math.max(0, Math.min(1000, fallbackProgress * 1000));
      long elapsed = System.currentTimeMillis() - previousPrayerAt;
      return (int) Math.max(0, Math.min(1000, (elapsed * 1000.0) / total));
    }

    String remainingText() {
      long minutes = Math.max(0, (nextPrayerAt - System.currentTimeMillis()) / 60000L);
      long hours = minutes / 60;
      long mins = minutes % 60;
      if (hours > 0) return hours + "h " + mins + "m";
      return mins + "m";
    }

    private static long parseInstant(String value, long fallback) {
      if (value == null || value.equals("null") || value.length() == 0) return fallback;
      try {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);
        parser.setTimeZone(TimeZone.getTimeZone("UTC"));
        return parser.parse(value).getTime();
      } catch (Exception exception) {
        return fallback;
      }
    }
  }
}
