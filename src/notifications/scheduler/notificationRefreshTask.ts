import * as BackgroundTask from 'expo-background-task';
import * as TaskManager from 'expo-task-manager';
import { refreshStoredSchedule } from './refreshStoredSchedule';
import { NOTIFICATION_REFRESH_INTERVAL_MINUTES, NOTIFICATION_REFRESH_TASK } from './scheduler.constants';

TaskManager.defineTask(NOTIFICATION_REFRESH_TASK, async () => {
  try {
    await refreshStoredSchedule();
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch {
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export async function registerNotificationRefreshTask(): Promise<void> {
  try {
    const status = await BackgroundTask.getStatusAsync();
    if (status !== BackgroundTask.BackgroundTaskStatus.Available) return;
    if (await TaskManager.isTaskRegisteredAsync(NOTIFICATION_REFRESH_TASK)) return;
    await BackgroundTask.registerTaskAsync(NOTIFICATION_REFRESH_TASK, {
      minimumInterval: NOTIFICATION_REFRESH_INTERVAL_MINUTES,
    });
  } catch {
    return;
  }
}
