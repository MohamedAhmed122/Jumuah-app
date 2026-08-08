import Foundation
import React
import WidgetKit

@objc(PrayerWidgetData)
class PrayerWidgetData: NSObject {
  private let suiteName = "group.com.muslimcommunity.lithuania.widgets"
  private let key = "PrayerWidgetSnapshot"

  @objc(updatePrayerWidgetData:resolver:rejecter:)
  func updatePrayerWidgetData(
    snapshotJson: String,
    resolver resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) {
    guard let defaults = UserDefaults(suiteName: suiteName) else {
      reject("widget_defaults_unavailable", "Unable to open prayer widget shared defaults.", nil)
      return
    }

    defaults.set(snapshotJson, forKey: key)
    defaults.synchronize()

    if #available(iOS 14.0, *) {
      WidgetCenter.shared.reloadTimelines(ofKind: "PrayerLockScreenWidget")
    }

    resolve(nil)
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    false
  }
}
