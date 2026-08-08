# Deferred Mobile Task 6: Notifications

Status: intentionally deferred by the user on 2026-06-28. Do not implement until the user asks to resume Task 6.

## Goal
Connect the mobile app to the admin-managed notification feature so users can receive remote notifications even when the app is backgrounded, closed, or killed, and can also see selected notifications as in-app messages.

## Required behavior

- Notifications are written in English and Russian and displayed using the app language.
- A notification can target one mosque or multiple mosques; users receive content associated with their preferred mosque.
- Remote notifications must work when the app is open, backgrounded, closed, or killed.
- Notification fields include localized title and description.
- An optional target screen can be Main, Community, Settings, or Notifications.
- When a target screen is selected, the message also appears inside that screen.
- An optional notification period controls how long the in-app message remains visible.
- An optional locked/non-dismissible setting prevents the user from closing the in-app message until its period finishes; this setting requires a notification period.
- Optional repeating notifications support one or more weekdays, a send time, and a selected active period. Examples: Friday at 12:00 before Jummah, or Monday for a Quran lesson.
- The mobile Notifications screen should show previously sent notifications.
- Notification taps should navigate to the selected screen or notification detail as appropriate.

## Existing context

- The admin/backend Task 6 implementation was started separately in `/Users/mo/Jumuah-web`.
- Mobile Task 5 already added Expo push-token registration and announcement deep linking. Reuse that infrastructure for Task 6, but do not treat announcement pushes as the completed Task 6 feature.
- Production remote push delivery needs the Expo/EAS project ID and valid platform push credentials.
