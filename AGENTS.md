# Jumuah App Engineering Guide

## Purpose

This is the repository-level source of truth for agents and developers. Read it before planning or changing code. Follow it unless the user gives a directly conflicting instruction.

The project has been refactored around component-driven development and strict separation of responsibilities. Preserve that architecture. Do not collapse focused modules back into large route, screen, component, store, or API files.

## Product knowledge

Jumuah App is an Expo and React Native application for Muslim communities in Lithuania. It provides:

- Daily prayer times calculated from coordinates or supplied by a preferred mosque.
- Adhan, Iqama, Jummah, countdown, high-latitude, and short-Asr-window handling.
- Per-prayer Adhan and reminder preferences.
- Mosque-specific community announcements with offline fallback.
- Halal restaurant, grocery, fast-food, and supermarket discovery.
- Qibla direction using the device magnetometer.
- Gregorian and Hijri calendars with Islamic events.
- Local prayer tracking, Qada counters, statistics, and quiz scores.
- English, Russian, and Lithuanian translations.
- Push notifications and announcement navigation.
- A native prayer widget installed through an Expo config plugin.

Prayer tracking is local. Location is used for prayer calculations, Qibla, and nearby places. Preserve these privacy boundaries.

## Technology

- Expo SDK 54 and Expo Router 6.
- React 19 and React Native 0.81.
- Strict TypeScript.
- Zustand for state.
- Expo SQLite with Drizzle ORM for local relational data.
- Expo SecureStore for persisted settings.
- Axios for backend requests.
- i18next and react-i18next for translations.
- date-fns for date operations.
- Expo Notifications, Location, Sensors, and Splash Screen.
- React Native Reanimated.
- React Native Maps.

The entry point is expo-router/entry.

## Commands and validation

Available commands:

- npm run start: starts the Expo development server for local development.
- npm run android: creates or launches the local Android development build with Expo Run.
- npm run ios: creates or launches the local iOS development build with Expo Run.
- npm run web: starts the Expo web development server.
- npm run build:apk: starts an EAS Android build with the preview profile. Use this when a testable Android APK or internal-distribution artifact is needed.
- npm run deploy:android: starts an EAS Android build with the production profile. This creates the production Android artifact but does not submit it to Google Play.
- npm run build:ios: starts an EAS iOS build with the production profile. This requires valid Apple credentials and produces the production iOS artifact.
- npm run submit:android: submits the latest completed Android build through EAS Submit. This is an external release action and must only run with explicit user approval.
- npm run build:list:android: lists the five most recent Android EAS builds and is safe for checking build status or locating an artifact.

The EAS scripts invoke the latest EAS CLI through npx and use the profiles defined in eas.json. They require network access, an authenticated Expo account, and valid project credentials. Builds can consume remote build quota, and submission changes external release state. Do not start a remote build or submission merely as a validation step. Confirm the intended platform, profile, application identifiers, credentials, and user authorization first.

There is currently no lint or automated test script. Every change must at least run:

- npx tsc --noEmit
- git diff --check

Run a platform build or manually test when work affects routing, native integration, permissions, notifications, SQLite, sensors, animation, or platform configuration.

## Import aliases

Prefer aliases across architectural boundaries:

- @/* points to the repository root.
- @src/* points to src/*.
- @constants/* points to constants/*.
- @components/* points to components/*.
- Babel also defines @app/* for app/*.

Use relative imports inside one feature folder.

## Repository map

- app/: Expo Router route files and route-local features.
- components/: reusable cross-screen UI.
- constants/: global colors, fonts, and prayer definitions.
- plugins/: Expo config plugins and native widget templates.
- src/api/: Axios client, endpoint domains, and caches.
- src/db/: SQLite initialization, Drizzle schema, and local-data helpers.
- src/hooks/: truly shared React hooks.
- src/i18n/: language definitions and locale JSON.
- src/layouts/: root and tab layout implementations.
- src/notifications/: scheduling and push registration.
- src/prayer/: prayer, mosque, Hijri, and Qibla domain logic.
- src/screens/: feature-oriented screen implementations.
- src/stores/: Zustand stores split by responsibility.
- src/widgets/: JavaScript-to-native widget bridge.

## Routing rules

Expo Router owns navigation through app/.

Route files should be minimal adapters when an implementation lives elsewhere. A normal route adapter is a one-line default re-export from src/screens or src/layouts.

Tab routes:

- app/(tabs)/index.tsx: prayer home.
- app/(tabs)/map/index.tsx: Halal places.
- app/(tabs)/community.tsx: community feed.
- app/(tabs)/quiz.tsx: quiz.
- app/(tabs)/settings.tsx: settings.

Other routes include onboarding, Qibla, calendar, tracker, Qada, statistics, quiz results, announcement details, and item details.

app/_layout.tsx must retain Expo Router's ErrorBoundary and literal unstable_settings export. Root behavior belongs in src/layouts/RootLayout/.

app/(tabs)/_layout.tsx adapts src/layouts/TabLayout/. Tabs.Screen nodes must remain direct navigator children because React Navigation can reject custom wrapper elements.

Before changing a route, check router.push, router.replace, notification navigation, and typed-route references.

## Component-driven structure

A substantial screen or shared component should use:

    ComponentName/
    ├── index.tsx
    ├── ComponentName.styles.ts
    ├── ComponentName.types.ts
    ├── ComponentName.constants.ts
    ├── ComponentName.utils.ts
    ├── components/
    │   ├── ChildComponent.tsx
    │   └── ChildComponent.styles.ts
    └── hooks/
        ├── ComponentName.hooks.ts
        └── useFocusedBehavior.ts

Only create files with real responsibilities. A feature does not need every optional file.

### index.tsx

- Contains composition and JSX.
- Calls a composition hook when behavior is required.
- Does not fetch, persist, subscribe, calculate domain values, or define large callbacks.
- Contains no StyleSheet.create and no inline style objects.

### Hooks

- Own React state, effects, subscriptions, callbacks, navigation, and data fetching.
- Split independent lifecycle concerns into focused hooks.
- Return render-ready view models.
- Preserve dependency arrays and cleanup.
- Never return JSX.

### Utilities

- Are pure and deterministic.
- Have no React dependency.
- Do not read stores, databases, SecureStore, sensors, notifications, or network state.
- Receive required values as parameters.

### Types

- Hold feature-local interfaces, unions, and view models.
- Reuse types from their owning domain.
- Do not redefine prayer names, coordinates, prayer times, languages, or notification toggles.

### Constants

- Hold stable definitions, lookup maps, durations, sizes, and ordered configuration.
- Do not hide changing state in constants.

### Styles

- All React Native styles live in .styles.ts files.
- Use StyleSheet.create only.
- Never use inline style objects in JSX.
- Use focused StyleSheet-based factories or bounded precomputed maps for dynamic styles.
- Keep child styles adjacent to the child.

### Child components

- Extract visually distinct sections under components/.
- Give each child one obvious responsibility.
- Pass render-ready values and callbacks.
- Do not pass a whole store when a small prop contract is enough.

## Code rules

- Keep source files around or below 100 lines.
- Split by responsibility, never arbitrary line ranges.
- Keep business logic out of JSX components.
- Keep styles out of component files.
- Apply strict DRY and move shared logic to its domain owner.
- Preserve module paths with index barrels when converting a file into a folder.
- Preserve public named and default exports during structural work.
- Do not introduce any to bypass typing.
- Use import type for type-only imports.
- No source-code comments.
- No TODOs, placeholders, mocked production behavior, or partial implementations.
- Prefer explicit names over abbreviations.
- Do not rewrite behavior during a structural refactor.

## Screen ownership

src/screens currently contains:

- PrayerScreen: mosque/local prayer data, countdown, logs, notifications, warnings, widget sync, and quick actions.
- CommunityScreen: mosque-scoped announcements and location resolution.
- AnnouncementDetailScreen: announcement loading and presentation.
- ItemDetailScreen: mosque and Halal-place details.
- SettingsScreen: language, mosque, notification, permission, reset, and logout settings.
- StatsScreen: statistics, heatmap, weekly chart, and summary cards.
- TrackerScreen: 30-day history and Qada synchronization.
- QadaScreen: missed-prayer counters.
- QiblaScreen: bearing, magnetometer, and compass animation.
- CalendarScreen: Gregorian/Hijri cells and Islamic events.

Onboarding and the Halal map are route-local feature folders. They still follow the same components/, hooks/, styles, types, constants, and utilities pattern.

## State management

### Settings store

src/stores/settingsStore/ owns persisted settings:

- Language.
- User coordinates.
- Preferred mosque.
- Preferred Halal city.
- Onboarding completion.
- Per-prayer Adhan and reminder toggles.
- Al-Kahf reminder.
- Hydration state.

SecureStore writes occur before Zustand updates. Preserve that ordering. Storage keys are centralized. Hydration validates language and applies defaults.

Do not access SecureStore from UI code. Add persistence through the store's storage, parsing, action, and type layers.

### Prayer store

src/stores/prayerStore/ preserves a transient public prayer-state API. It shares notification contracts and immutable toggle behavior with settings. It currently has no repository consumers. Do not delete it without explicit authorization and public-API review.

Use selectors when only part of a store is needed.

## Prayer domain

Prayer names and default Vilnius coordinates are owned by constants/prayerMethods.ts. Never duplicate them.

src/prayer/calculator/ owns calculatePrayerTimes and PrayerTimes. It contains:

- Julian-day and solar-position math.
- Local timezone adjustment.
- Fajr and Isha angles.
- Sunrise and sunset altitude.
- Standard Asr shadow factor.
- Timetable safety minutes.
- High-latitude fallback.
- Asr-window metadata.
- Ceiling to the next minute.

This is sensitive domain code. Do not reorder formulas, change constants, alter rounding, replace local Date behavior, or simplify fallbacks without explicit requirements and regression fixtures.

src/prayer/mosqueTimes.ts applies timetable overrides, Iqama offsets, and active Jummah schedules. A Jummah schedule may cover every Friday or an inclusive date range.

src/prayer/hijri.ts owns Hijri conversion and Islamic-event predicates. src/prayer/qibla.ts owns bearing and compass-direction calculations.

## Prayer home data flow

    settingsStore
        → preferred mosque and coordinates
        → useMosquePrayerData
        → mosque timetable when available
        → local calculator fallback
        → prayer, Iqama, and Jummah times
        → active and next prayer
        → countdown, warnings, notifications, and widget sync
        → PrayerList, PrayerCard, and JummahCard

Prayer logs are stored in SQLite. Marking a prayer missed can affect Qada. Preserve synchronization among prayer logs, tracker history, and Qada counters.

Future prayer logs are invalid. Tracker loading removes future rows and locks future prayers. Historical days are read-only; only today is editable.

## Database

src/db/index.ts opens jumuah.db synchronously and creates tables at module load. Root bootstrap imports it.

Tables:

- prayer_logs
- qada_counters
- quiz_scores
- cached_locations
- cached_announcements

Keep src/db/schema.ts aligned with SQL initialization and migrations. A schema change must update both layers, preserve existing data, and be tested on fresh installs and upgrades.

Do not casually rename the database, tables, columns, or stored prayer values.

## API and caches

src/api/client.ts owns the Axios client. Its base URL is EXPO_PUBLIC_API_URL or http://localhost:4000/api. A request interceptor adds the current app language.

src/api/locations/ owns location types and endpoints. The location bundle uses a versioned cache, loads mosque and Halal data in parallel, writes the combined bundle, and supports forced refresh.

src/api/announcements/ owns feed and detail requests. Feed cache scope is mosqueId:language.

Announcement behavior:

- Use valid fresh cache unless forced.
- Replace cache after a successful request.
- Use stale cache after network failure.
- Throw Error('network') if neither source exists.

Location and announcement caches use SQLite with a 24-hour TTL.

Do not change fromCache semantics, scope, payload shape or order, cache versions, TTL, endpoints, parameter names, or error values during unrelated work.

## Internationalization

Languages are English, Russian, and Lithuanian. English is fallback.

- Translate user-facing text unless an existing fixed label is intentional.
- Add new keys to every locale in one change.
- Preserve interpolation variables.
- Prefer complete translated phrases over concatenated fragments.
- Use AppLanguage and isAppLanguage.
- Dates and times generally use device locale formatting.

## Notifications

Root bootstrap installs the foreground handler. Root hooks manage hydration, push registration, AppState foreground sync, last notification response, and live responses.

src/notifications/scheduler.ts schedules Adhan, ten-minute reminders, and weekly Al-Kahf reminders.

Announcement navigation requires data.type equal to announcement and a string data.id. Coordinate payload changes across scheduling, registration, backend assumptions, and root navigation.

## Qibla

The Qibla flow:

- Calculates bearing from coordinates.
- Checks magnetometer availability.
- Uses a 100 ms update interval.
- Applies the existing iOS adjustment.
- Animates compass and needle with the existing timing.
- Removes the subscription on cleanup.

Preserve normalization, platform adjustment, timing, and cleanup.

## Native prayer widget

Widget integration spans:

- plugins/withPrayerWidget.js
- plugins/prayerWidget/
- plugins/prayerWidget/templates/
- src/widgets/prayerWidget.ts
- usePrayerWidgetSync
- Expo configuration and native identifiers

Plugin templates are source; generated native files are derived unless the repository explicitly maintains both.

Widget updates are best effort and must not crash the app. Progress remains clamped to zero through one. Missing native modules must be safe.

Do not change bundle IDs, Android package names, app groups, Java package paths, plugin registration, or widget resource names during unrelated work.

## Styling

Global colors live in constants/Colors.ts and fonts in constants/fonts.ts.

- Reuse tokens instead of equivalent hardcoded values.
- Preserve the dark visual language.
- Preserve safe areas.
- Keep established icon meanings.
- Preserve hitSlop and touch targets.
- Structural work must preserve layout, spacing, color, typography, animation, and accessibility.

## Refactoring workflow

For structural refactors:

1. Inspect the full target and every consumer.
2. Identify exports, callbacks, side effects, persistence, subscriptions, cleanup, and timing.
3. Present a file-by-file plan when using the phased workflow.
4. Change one target module or feature at a time.
5. Preserve route and import paths with barrels.
6. Move behavior without rewriting it.
7. Run TypeScript and diff checks.
8. Let the user test platform behavior.
9. Commit only after explicit confirmation.

Do not combine cleanup, feature changes, bug fixes, renaming, and structural refactoring in one phase.

## Git discipline

- Treat existing modifications as user-owned.
- Never stage unrelated files.
- Inspect git status --short before validation and commit.
- Stage explicit paths; never use git add . in a focused task.
- Use one focused commit per approved target.
- Do not commit before explicit user confirmation in phased work.
- Do not reset, discard, overwrite, or reformat unrelated work.

The worktree may contain active Expo configuration or prayer-widget edits. Preserve them unless explicitly scoped.

## Validation checklist

Before handoff:

- Confirm only intended files changed.
- Run npx tsc --noEmit.
- Run git diff --check.
- Confirm files remain near or below 100 lines.
- Search changed code for inline styles, comments, TODOs, placeholders, and accidental any.
- Confirm public imports resolve.
- Confirm effects retain dependencies and cleanup.
- Confirm persistence ordering.
- Confirm translations exist in every locale.
- Confirm route names and navigator-child rules.
- Test sensors, notifications, SQLite, native modules, and animations proportionately.

## Adding features

For a new screen:

1. Add a minimal Expo Router adapter.
2. Create src/screens/FeatureNameScreen/ unless intentionally route-local.
3. Put composition in index.tsx.
4. Put visual sections in components/ with adjacent styles.
5. Put React behavior in hooks/.
6. Put pure logic in .utils.ts.
7. Put contracts in .types.ts.
8. Put stable definitions in .constants.ts.
9. Put shared domain logic in its proper src owner.
10. Add user-facing strings to all locales.

For a shared component, use the same folder architecture under components/ and keep a small public prop API.

For an API domain, use a folder barrel, domain types, constants, endpoint modules, and cache helpers.

For persisted state, keep serialization and storage outside UI.

## Non-negotiable rules

- Production-grade code only.
- No placeholders or partial behavior.
- No source comments or TODOs.
- No inline React Native styles.
- No business logic in JSX components.
- No duplicated shared logic or domain types.
- No source files above approximately 100 lines without a strong reason.
- No unrelated changes in focused work.
- No destructive Git operations.
- No commit without explicit approval during phased work.
- Preserve behavior unless a feature or fix is explicitly requested.
