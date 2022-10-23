import { Toast } from 'native-base';

const ToastService = {
  showToast: function (message: string, id: string) {
    if (!Toast.isActive(id)) {
      Toast.show({
        id,
        title: message,
        placement: 'top',
      });
    }

    return;
  },
};

export default ToastService;
