#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PrayerWidgetData, NSObject)

RCT_EXTERN_METHOD(updatePrayerWidgetData:(NSString *)snapshotJson
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
