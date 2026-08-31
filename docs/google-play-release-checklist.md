# Google Play release checklist

## Release artifact

- Confirm the permanent package name is `com.islamo.centras`.
- Build the production Android App Bundle with `npm run deploy:android` only after authorization.
- Confirm the final AAB targets API 36 or newer and contains no microphone, legacy storage, overlay, advertising ID, or broad file-access permissions.
- Upload to Internal testing first and review the automated pre-launch report for crashes, ANRs, accessibility failures, blank states, and broken links.

## Privacy and app content

- Deploy the app's `/privacy` web route to a stable public HTTPS URL with no login or geographic restriction.
- Enter that URL in Play Console under Policy and programs > App content > Privacy policy.
- Use the developer support contact in the public policy and keep it monitored.
- Declare that the app contains no ads.
- Complete the content-rating questionnaire using the app's actual quiz, religious reference, community announcement, and event content.
- Select an audience appropriate for a general community utility; do not select children unless the Families requirements are intentionally supported.
- Mark app access as unrestricted because the app has no login or paywall.

## Data Safety declaration

- Declare approximate and precise location used for app functionality and personalization.
- Declare device or other IDs used for app functionality and developer communications.
- Review whether selected mosque and event participation must be declared as political or religious beliefs because they are associated with the generated app-device identifier on the backend.
- Confirm with the backend owner whether any data is retained, logged, backed up, shared with processors, or used for analytics before answering the form.
- Declare that data is encrypted in transit only after verifying every production endpoint uses HTTPS.
- Do not claim that users can request deletion until the published support channel and backend deletion procedure are operational.

## Production access

- Verify the Play developer identity, legal name, address, phone, email, and payment profile.
- For a personal account created after 13 November 2023, run a closed test with at least 12 continuously opted-in testers for 14 days, then apply for production access.
- Prepare the application name, short and full descriptions, icon, phone screenshots, feature graphic, support email, website, category, countries, and release notes.
- Keep the production API reachable worldwide during review and ensure denied permissions, empty feeds, and network failures show functional fallback states.
- Submit only the intended production AAB; do not use the script that submits an unspecified latest build without checking the EAS build ID first.
