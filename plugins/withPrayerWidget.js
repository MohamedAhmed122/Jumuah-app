const fs = require('fs');
const path = require('path');
const {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
  withDangerousMod,
} = require('@expo/config-plugins');

const packageName = 'com.muslimcommunity.lithuania';
const javaPackagePath = packageName.replace(/\./g, '/');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, contents);
}

function injectKotlinPackage(mainApplicationPath) {
  if (!fs.existsSync(mainApplicationPath)) return;
  const source = fs.readFileSync(mainApplicationPath, 'utf8');
  if (source.includes('PrayerWidgetPackage')) return;

  let next = source;
  if (!next.includes('import com.muslimcommunity.lithuania.PrayerWidgetPackage')) {
    next = next.replace(
      /package [^\n]+\n/,
      (match) => `${match}\nimport com.muslimcommunity.lithuania.PrayerWidgetPackage\n`,
    );
  }

  next = next.replace(
    /PackageList\(this\)\.packages\.apply \{/,
    'PackageList(this).packages.apply {\\n          add(PrayerWidgetPackage())',
  );

  fs.writeFileSync(mainApplicationPath, next);
}

function injectJavaPackage(mainApplicationPath) {
  if (!fs.existsSync(mainApplicationPath)) return;
  const source = fs.readFileSync(mainApplicationPath, 'utf8');
  if (source.includes('PrayerWidgetPackage')) return;

  let next = source;
  if (!next.includes('import com.muslimcommunity.lithuania.PrayerWidgetPackage;')) {
    next = next.replace(
      /package [^;]+;\n/,
      (match) => `${match}\nimport com.muslimcommunity.lithuania.PrayerWidgetPackage;\n`,
    );
  }

  next = next.replace(
    /List<ReactPackage> packages = new PackageList\(this\)\.getPackages\(\);/,
    'List<ReactPackage> packages = new PackageList(this).getPackages();\\n          packages.add(new PrayerWidgetPackage());',
  );

  fs.writeFileSync(mainApplicationPath, next);
}

const withPrayerWidget = (config) => {
  config = withAndroidManifest(config, (manifestConfig) => {
    const manifest = manifestConfig.modResults.manifest;
    const application = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);
    application.receiver = application.receiver || [];

    const receiverName = `${packageName}.PrayerWidgetProvider`;
    const exists = application.receiver.some((receiver) => receiver.$?.['android:name'] === receiverName);
    if (!exists) {
      application.receiver.push({
        $: {
          'android:name': receiverName,
          'android:exported': 'true',
          'android:label': 'Next Prayer',
        },
        'intent-filter': [{
          action: [{ $: { 'android:name': 'android.appwidget.action.APPWIDGET_UPDATE' } }],
        }],
        'meta-data': [{
          $: {
            'android:name': 'android.appwidget.provider',
            'android:resource': '@xml/prayer_widget_info',
          },
        }],
      });
    }

    return manifestConfig;
  });

  config = withDangerousMod(config, ['android', async (modConfig) => {
    const projectRoot = modConfig.modRequest.projectRoot;
    const androidRoot = path.join(projectRoot, 'android');
    const mainSrc = path.join(androidRoot, 'app/src/main');
    const javaRoot = path.join(mainSrc, 'java', javaPackagePath);

    writeFile(path.join(javaRoot, 'PrayerWidgetDataModule.java'), prayerWidgetDataModuleSource);
    writeFile(path.join(javaRoot, 'PrayerWidgetPackage.java'), prayerWidgetPackageSource);
    writeFile(path.join(javaRoot, 'PrayerWidgetProvider.java'), prayerWidgetProviderSource);
    writeFile(path.join(mainSrc, 'res/layout/prayer_widget.xml'), prayerWidgetLayout);
    writeFile(path.join(mainSrc, 'res/drawable/prayer_widget_background.xml'), prayerWidgetBackground);
    writeFile(path.join(mainSrc, 'res/drawable/prayer_widget_progress.xml'), prayerWidgetProgress);
    writeFile(path.join(mainSrc, 'res/xml/prayer_widget_info.xml'), prayerWidgetInfo);

    injectKotlinPackage(path.join(javaRoot, 'MainApplication.kt'));
    injectJavaPackage(path.join(javaRoot, 'MainApplication.java'));

    return modConfig;
  }]);

  return config;
};

const prayerWidgetDataModuleSource = `package ${packageName};

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
`;

const prayerWidgetPackageSource = `package ${packageName};

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class PrayerWidgetPackage implements ReactPackage {
  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new PrayerWidgetDataModule(reactContext));
    return modules;
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
`;

const prayerWidgetProviderSource = `package ${packageName};

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
`;

const prayerWidgetLayout = `<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
  android:id="@+id/prayer_widget_root"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:background="@drawable/prayer_widget_background"
  android:padding="18dp">

  <ProgressBar
    android:id="@+id/prayer_progress"
    style="?android:attr/progressBarStyleHorizontal"
    android:layout_width="132dp"
    android:layout_height="132dp"
    android:layout_gravity="center"
    android:indeterminate="false"
    android:max="1000"
    android:progressDrawable="@drawable/prayer_widget_progress"
    android:rotation="-90" />

  <LinearLayout
    android:layout_width="108dp"
    android:layout_height="108dp"
    android:layout_gravity="center"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
      android:id="@+id/prayer_name"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:ellipsize="end"
      android:gravity="center"
      android:maxLines="1"
      android:text="Asr"
      android:textColor="#86EFAC"
      android:textSize="26sp"
      android:textStyle="bold" />

    <TextView
      android:id="@+id/prayer_time_remaining"
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:ellipsize="end"
      android:gravity="center"
      android:maxLines="1"
      android:text="1h 12m"
      android:textColor="#F0FFF4"
      android:textSize="28sp"
      android:textStyle="bold" />
  </LinearLayout>
</FrameLayout>
`;

const prayerWidgetBackground = `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
  <solid android:color="#162A1C" />
  <stroke android:width="1dp" android:color="#2D4F38" />
  <corners android:radius="28dp" />
</shape>
`;

const prayerWidgetProgress = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:id="@android:id/background">
    <shape android:shape="ring" android:innerRadiusRatio="3.3" android:thicknessRatio="7" android:useLevel="false">
      <solid android:color="#1E3B27" />
    </shape>
  </item>
  <item android:id="@android:id/progress">
    <rotate android:fromDegrees="0" android:toDegrees="360">
      <shape android:shape="ring" android:innerRadiusRatio="3.3" android:thicknessRatio="7" android:useLevel="true">
        <solid android:color="#3DD68C" />
      </shape>
    </rotate>
  </item>
</layer-list>
`;

const prayerWidgetInfo = `<?xml version="1.0" encoding="utf-8"?>
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
  android:description="@string/app_name"
  android:initialLayout="@layout/prayer_widget"
  android:minWidth="146dp"
  android:minHeight="146dp"
  android:previewLayout="@layout/prayer_widget"
  android:resizeMode="horizontal|vertical"
  android:targetCellWidth="2"
  android:targetCellHeight="2"
  android:updatePeriodMillis="1800000"
  android:widgetCategory="home_screen|keyguard" />
`;

module.exports = withPrayerWidget;
