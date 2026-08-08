package com.muslimcommunity.lithuania;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class PrayerWidgetDataModule extends ReactContextBaseJavaModule {
  static final String PREFS = "PrayerWidgetPrefs";
  static final String SNAPSHOT_KEY = "PrayerWidgetSnapshot";

  PrayerWidgetDataModule(ReactApplicationContext context) {
    super(context);
  }

  @NonNull
  @Override
  public String getName() {
    return "PrayerWidgetData";
  }

  @ReactMethod
  public void updatePrayerWidgetData(String snapshotJson, Promise promise) {
    try {
      ReactApplicationContext context = getReactApplicationContext();
      SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
      prefs.edit().putString(SNAPSHOT_KEY, snapshotJson).apply();

      AppWidgetManager manager = AppWidgetManager.getInstance(context);
      ComponentName componentName = new ComponentName(context, PrayerWidgetProvider.class);
      int[] ids = manager.getAppWidgetIds(componentName);
      Intent intent = new Intent(context, PrayerWidgetProvider.class);
      intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
      intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
      context.sendBroadcast(intent);

      promise.resolve(null);
    } catch (Exception exception) {
      promise.reject("widget_update_failed", exception);
    }
  }
}
