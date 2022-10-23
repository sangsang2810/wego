import * as ImagePicker from 'expo-image-picker';
import { MESSAGES_ENUM } from '../../utils/enums';
import ToastService from './Toast.Service';

const ImagePickerService = {
  choosePhoto: async () => {
    const { cancelled, base64 } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (cancelled) {
      ToastService.showToast(MESSAGES_ENUM.UPLOAD_IMAGE_FAIL, 'id-chose-photo-suc');
      return '';
    }
    ToastService.showToast(MESSAGES_ENUM.UPLOAD_IMAGE_SUCCESS, 'id-chose-photo-err');
    const result = `data:image/jpeg;base64,${base64}`;
    return result;
  },
};

export default ImagePickerService;
