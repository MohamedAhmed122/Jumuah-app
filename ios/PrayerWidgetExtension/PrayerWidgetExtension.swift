import SwiftUI
import WidgetKit

private let appGroup = "group.com.muslimcommunity.lithuania.widgets"
private let snapshotKey = "PrayerWidgetSnapshot"

struct PrayerSnapshot: Codable {
  let prayerName: String
  let prayerLabel: String
  let nextPrayerAt: String
  let previousPrayerAt: String?
  let progress: Double
  let language: String
  let updatedAt: String?
}

struct PrayerEntry: TimelineEntry {
  let date: Date
  let snapshot: PrayerSnapshot
}

struct Provider: TimelineProvider {
  func placeholder(in context: Context) -> PrayerEntry {
    PrayerEntry(date: Date(), snapshot: PrayerSnapshot.placeholder)
  }

  func getSnapshot(in context: Context, completion: @escaping (PrayerEntry) -> Void) {
    completion(PrayerEntry(date: Date(), snapshot: readSnapshot()))
  }

  func getTimeline(in context: Context, completion: @escaping (Timeline<PrayerEntry>) -> Void) {
    let snapshot = readSnapshot()
    let now = Date()
    let nextPrayer = snapshot.nextPrayerDate ?? now.addingTimeInterval(60 * 60)
    let minutesUntilPrayer = max(1, min(60, Int(nextPrayer.timeIntervalSince(now) / 60)))

    let entries = (0...minutesUntilPrayer).map { minute in
      PrayerEntry(date: Calendar.current.date(byAdding: .minute, value: minute, to: now) ?? now, snapshot: snapshot)
    }

    completion(Timeline(entries: entries, policy: .after(nextPrayer)))
  }

  private func readSnapshot() -> PrayerSnapshot {
    guard
      let defaults = UserDefaults(suiteName: appGroup),
      let json = defaults.string(forKey: snapshotKey),
      let data = json.data(using: .utf8),
      let snapshot = try? JSONDecoder().decode(PrayerSnapshot.self, from: data)
    else {
      return PrayerSnapshot.placeholder
    }

    return snapshot
  }
}

struct PrayerWidgetView: View {
  @Environment(\.widgetFamily) private var family
  let entry: PrayerEntry

  var body: some View {
    switch family {
    case .accessoryCircular:
      AccessoryCircularPrayerView(entry: entry)
    default:
      SmallPrayerView(entry: entry)
    }
  }
}

struct SmallPrayerView: View {
  let entry: PrayerEntry

  var body: some View {
    ZStack {
      RoundedRectangle(cornerRadius: 28, style: .continuous)
        .fill(AppColor.surface)
      RoundedRectangle(cornerRadius: 28, style: .continuous)
        .stroke(AppColor.border, lineWidth: 1)

      ZStack {
        Circle()
          .stroke(AppColor.surfaceElevated, lineWidth: 20)
        Circle()
          .trim(from: 0, to: entry.progress)
          .stroke(AppColor.accent, style: StrokeStyle(lineWidth: 20, lineCap: .butt))
          .rotationEffect(.degrees(-90))

        VStack(spacing: 2) {
          Text(entry.snapshot.prayerLabel)
            .font(.system(size: 30, weight: .semibold))
            .foregroundStyle(AppColor.textSecondary)
            .lineLimit(1)
            .minimumScaleFactor(0.55)
          Text(entry.remainingText)
            .font(.system(size: 31, weight: .bold))
            .foregroundStyle(AppColor.textPrimary)
            .lineLimit(1)
            .minimumScaleFactor(0.55)
        }
        .padding(.horizontal, 24)
      }
      .frame(width: 154, height: 154)
    }
    .widgetURL(URL(string: "jumuahapp://"))
  }
}

struct AccessoryCircularPrayerView: View {
  let entry: PrayerEntry

  var body: some View {
    Gauge(value: entry.progress) {
      Text(entry.snapshot.prayerLabel)
    } currentValueLabel: {
      VStack(spacing: 0) {
        Text(entry.snapshot.prayerLabel)
          .font(.system(size: 12, weight: .semibold))
          .lineLimit(1)
          .minimumScaleFactor(0.6)
        Text(entry.remainingText)
          .font(.system(size: 12, weight: .bold))
          .lineLimit(1)
          .minimumScaleFactor(0.6)
      }
    }
    .gaugeStyle(.accessoryCircular)
    .tint(AppColor.accent)
    .widgetURL(URL(string: "jumuahapp://"))
  }
}

@main
struct PrayerLockScreenWidget: Widget {
  let kind = "PrayerLockScreenWidget"

  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: Provider()) { entry in
      PrayerWidgetView(entry: entry)
    }
    .configurationDisplayName("Next Prayer")
    .description("Shows the next prayer countdown.")
    .supportedFamilies([.systemSmall, .accessoryCircular])
  }
}

private enum AppColor {
  static let background = Color(red: 10 / 255, green: 26 / 255, blue: 15 / 255)
  static let surface = Color(red: 22 / 255, green: 42 / 255, blue: 28 / 255)
  static let surfaceElevated = Color(red: 30 / 255, green: 59 / 255, blue: 39 / 255)
  static let accent = Color(red: 61 / 255, green: 214 / 255, blue: 140 / 255)
  static let textPrimary = Color(red: 240 / 255, green: 255 / 255, blue: 244 / 255)
  static let textSecondary = Color(red: 134 / 255, green: 239 / 255, blue: 172 / 255)
  static let border = Color(red: 45 / 255, green: 79 / 255, blue: 56 / 255)
}

private extension PrayerSnapshot {
  static let placeholder = PrayerSnapshot(
    prayerName: "asr",
    prayerLabel: "Asr",
    nextPrayerAt: ISO8601DateFormatter().string(from: Date().addingTimeInterval(72 * 60)),
    previousPrayerAt: ISO8601DateFormatter().string(from: Date().addingTimeInterval(-120 * 60)),
    progress: 0.62,
    language: "en",
    updatedAt: nil
  )

  var nextPrayerDate: Date? {
    ISO8601DateFormatter().date(from: nextPrayerAt)
  }

  var previousPrayerDate: Date? {
    guard let previousPrayerAt else { return nil }
    return ISO8601DateFormatter().date(from: previousPrayerAt)
  }
}

private extension PrayerEntry {
  var progress: Double {
    guard
      let previous = snapshot.previousPrayerDate,
      let next = snapshot.nextPrayerDate
    else {
      return max(0, min(1, snapshot.progress))
    }

    let total = next.timeIntervalSince(previous)
    guard total > 0 else { return 0 }
    return max(0, min(1, date.timeIntervalSince(previous) / total))
  }

  var remainingText: String {
    guard let nextPrayer = snapshot.nextPrayerDate else { return "--" }
    let remaining = max(0, Int(nextPrayer.timeIntervalSince(date)))
    let hours = remaining / 3600
    let minutes = (remaining % 3600) / 60

    if hours > 0 {
      return "\(hours)h \(minutes)m"
    }
    return "\(max(0, minutes))m"
  }
}
