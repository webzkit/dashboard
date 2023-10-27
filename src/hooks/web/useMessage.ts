import { ElNotification, NotificationHandle } from 'element-plus';
import { unref } from 'vue';
import { useElePlusSetting } from '../setting/useEleplusSetting';

type notifyStyle = 'success' | 'info' | 'warning' | 'error';
type notifyPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface NotificationParams {
  title?: string;
  type?: notifyStyle;
  duration?: number;
  position?: notifyPosition;
}

const { getNotificationPosition, getDuration } = useElePlusSetting();

const notify = (
  message: string,
  params?: NotificationParams,
): NotificationHandle => {
  if (!params) {
    return ElNotification({
      message,
      type: 'info',
      position: unref(getNotificationPosition),
      duration: unref(getDuration),
    });
  }

  const {
    title = 'Thông báo',
    type = 'success',
    duration = unref(getDuration),
    position = unref(getNotificationPosition),
  } = params;

  return ElNotification({
    title,
    type,
    message,
    duration,
    position,
  });
};

export function useMessage() {
  return {
    notify,
  };
}
