package com.muslimcommunity.lithuania;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.SystemClock;
import android.text.format.DateFormat;
import android.view.View;
import android.widget.RemoteViews;

import java.util.Date;

public class PrayerWidgetProvider extends AppWidgetProvider {
  private static final long REFRESH_DELAY_MS = 5_000L;
  private static final String EMPTY_TIME = "--:--";

  @Override
  public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
    long now = System.currentTimeMillis();
    PrayerWidgetSnapshot snapshot = PrayerWidgetSnapshot.read(context, now);
    for (int appWidgetId : appWidgetIds) {
      appWidgetManager.updateAppWidget(appWidgetId, buildViews(context, snapshot, now));
    }
    scheduleRefresh(context, appWidgetIds, snapshot);
  }

  private static RemoteViews buildViews(Context context, PrayerWidgetSnapshot snapshot, long now) {
    RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.prayer_widget);
    String mosqueName = snapshot.mosqueName.isEmpty() ? context.getString(R.string.app_name) : snapshot.mosqueName;
    views.setTextViewText(R.id.prayer_mosque_name, mosqueName);
    views.setTextViewText(R.id.prayer_sunrise, snapshot.hasSunrise() ? formatTime(context, snapshot.sunriseAt) : EMPTY_TIME);
    views.setTextViewText(R.id.prayer_hijri_date, snapshot.hijriDate);
    if (snapshot.hasNext()) {
      views.setTextViewText(R.id.prayer_name, snapshot.headline);
      views.setViewVisibility(R.id.prayer_time_remaining, View.VISIBLE);
      views.setChronometerCountDown(R.id.prayer_time_remaining, true);
      views.setChronometer(R.id.prayer_time_remaining, SystemClock.elapsedRealtime() + (snapshot.nextAt - now), null, true);
      views.setTextViewText(R.id.prayer_time, formatTime(context, snapshot.nextAt));
    } else {
      views.setTextViewText(R.id.prayer_name, "--");
      views.setViewVisibility(R.id.prayer_time_remaining, View.GONE);
      views.setTextViewText(R.id.prayer_time, EMPTY_TIME);
    }
    views.setOnClickPendingIntent(R.id.prayer_widget_root, launchIntent(context));
    return views;
  }

  private static String formatTime(Context context, long instant) {
    return DateFormat.getTimeFormat(context).format(new Date(instant));
  }

  private static PendingIntent launchIntent(Context context) {
    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("jumuahapp://"));
    return PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
  }

  private static void scheduleRefresh(Context context, int[] appWidgetIds, PrayerWidgetSnapshot snapshot) {
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    if (alarmManager == null) return;
    Intent intent = new Intent(context, PrayerWidgetProvider.class);
    intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
    intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds);
    PendingIntent pendingIntent = PendingIntent.getBroadcast(
      context, 1, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
    );
    alarmManager.cancel(pendingIntent);
    if (!snapshot.hasNext()) return;
    alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, snapshot.nextAt + REFRESH_DELAY_MS, pendingIntent);
  }
}
