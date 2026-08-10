# Muslim Community Lithuania

Muslim Community Lithuania is a mobile companion for Muslims living in Lithuania. It brings daily prayer information, mosque updates, community announcements, useful locations, and personal worship tools together in one calm and easy-to-use app.

The app can be personalized around a preferred mosque, while still supporting locally calculated prayer times when a mosque timetable is unavailable.

## Prayer times

The main screen gives users a clear view of the five daily prayers and highlights the current and next prayer.

- Displays Fajr, Dhuhr, Asr, Maghrib, and Isha times.
- Uses the preferred mosque's published timetable when available.
- Falls back to prayer times calculated from the mosque or user's location.
- Shows a live countdown to the next prayer.
- Displays the Adhan time and the mosque's IQama time for each prayer.
- Supports high-latitude summer prayer rules for Lithuania.
- Warns users when the available Asr prayer window is unusually short.
- Allows prayer and reminder notifications to be controlled separately.

## Friday and Jummah prayers

On Fridays, the app adapts the daily prayer view to the selected mosque's Jummah schedule.

- Replaces the Dhuhr card with Jummah when an active schedule is available.
- Shows one, two, or three Jummah prayer times depending on the mosque.
- Respects temporary Jummah schedules that apply only during a selected date range.
- Includes the next Jummah prayer in the main countdown.
- Provides a weekly reminder to read Surah Al-Kahf.

## Mosque announcements

The community feed is connected to the user's preferred mosque, helping people receive updates that are relevant to the community they attend.

- Shows announcements published for the selected mosque.
- Supports announcements shared across several mosques.
- Displays localized content according to the selected app language.
- Highlights pinned announcements so important and recent updates appear first.
- Shows event dates and whether an event takes place inside a mosque or at an outside location.
- Keeps recent announcements available when the device is temporarily offline.
- Supports push notifications for new mosque announcements.
- Opens the full announcement directly when the user taps its notification.

## Halal places discovery

The Halal screen helps users find restaurants, fast food, groceries, and halal supermarket sections across Lithuania.

- Selects the nearest available city from the user's location and remembers manual city choices.
- Searches by place name, address, description, or food category.
- Filters by place type, restaurant category, active discounts, and average meal price.
- Displays photos, distance, opening information, average price, discounts, and promo codes.
- Opens a detailed place page with directions and contact information.

## Prayer tracking

Personal tracking tools help users build consistency and review their prayer history privately on their device.

- Records whether each daily prayer was completed or missed.
- Provides a daily and historical prayer log.
- Maintains a Qada counter for missed prayers.
- Shows monthly progress, recent activity, and prayer streaks.
- Makes it possible to review patterns without connecting the personal prayer log to public community data.

## Islamic tools

The app includes everyday tools that are easy to reach from the prayer screen.

- Qibla compass based on the user's location.
- Hijri calendar with important Islamic dates and occasions.
- Quick access to prayer history, Qada prayers, and progress statistics.

## Prayer widget

The app includes native home-screen prayer widgets for Android and iOS.

- Shows the previous and next prayer at a glance.
- Displays progress toward the next prayer.
- Uses localized prayer labels from the selected app language.
- Updates from the prayer screen through a native data bridge.
- Fails safely when the native widget module is unavailable.
- Is installed into native projects through the included Expo config plugin.

## Personalization and accessibility

- English, Russian, and Lithuanian language support.
- Preferred mosque selection during onboarding or from Settings.
- Optional location access for more accurate prayer times and Qibla direction.
- Individual Adhan and reminder controls for every prayer.
- Dark, focused interface designed for comfortable daily use.

## Run the project locally

### Prerequisites

Install the following before starting:

- A current Node.js LTS release and npm.
- Git.
- Android Studio and an Android SDK for Android development.
- Xcode and CocoaPods for iOS development. iOS builds require macOS.
- Access to the Jumuah backend API if testing live mosque, announcement, Halal-place, quiz, or push-registration data.

### Install dependencies

Clone the repository, enter the project directory, and install packages:

```bash
git clone <repository-url>
cd Jumuah-app
npm install
```

### Configure the API

The app reads its backend URL from `EXPO_PUBLIC_API_URL`. Without this variable it uses `http://10.0.2.2:4000/api` on Android Emulator and `http://localhost:4000/api` on other platforms.

Create a local `.env` file when the backend runs somewhere else:

```bash
EXPO_PUBLIC_API_URL=http://<backend-host>:4000/api
```

Use an address reachable by the target device. A physical phone cannot access the development computer through its own `localhost`. Android emulators commonly use `10.0.2.2` to reach the host machine.

### Start Expo

Start the development server:

```bash
npm run start
```

From the Expo terminal, choose a connected platform or open the development build manually.

The app uses native capabilities including SQLite, notifications, sensors, maps, SecureStore, and the prayer widget. Use a native development build when testing functionality that is unavailable in Expo Go.

### Run a local native build

Android:

```bash
npm run android
```

iOS on macOS:

```bash
npm run ios
```

Web:

```bash
npm run web
```

The native prayer widget is installed by `plugins/withPrayerWidget.js` during native project generation. When widget plugin or native template files change, regenerate or rebuild the native project before testing.

### Validate changes

The project currently has no dedicated lint or automated test script. Run these checks before opening a pull request:

```bash
npx tsc --noEmit
git diff --check
```

Also manually test the affected flow on the relevant platform, especially for notifications, location, Qibla sensors, SQLite, routing, and widgets.

### EAS builds

Remote EAS commands require an authenticated Expo account and valid project credentials:

```bash
npm run build:apk
npm run deploy:android
npm run build:ios
npm run submit:android
npm run build:list:android
```

- `build:apk` creates an Android preview APK for internal testing.
- `deploy:android` creates a production Android build.
- `build:ios` creates a production iOS build.
- `submit:android` submits the latest Android build.
- `build:list:android` lists the five latest Android builds.

Remote builds can consume build quota, and submission changes external release state. Confirm the intended profile, credentials, and release target before running them.

## Privacy-minded experience

The app uses location only for features such as prayer calculations, nearby places, and Qibla direction. Personal prayer tracking stays on the user's device. Mosque selection is used to provide the correct timetable, Jummah schedule, announcements, and community notifications.
