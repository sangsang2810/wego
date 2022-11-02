import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useClipboard,
} from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import {
  WGBackgroundComponent,
  WGChipComponent,
  WGFormComponent,
  WGFormControlComponent,
} from '../../../libs';
import { ASSETS_ENUM, MESSAGES_ENUM } from '../../../utils/enums';
import { ImagePickerService, ToastService } from '../../../services';
import CreateMStoneComponent from './CreateMStone.component';
import { createTrip } from '../TripSlice';
import { useAppDispatch } from '../../../app/hooks';
import { TripModel } from 'models';

function PlanCreateTripScreen(props) {
  const dispatch = useAppDispatch();
  const { onCopy } = useClipboard();
  const config = ['banner', 'trip name', 'leader', 'members', 'deposit'];

  const userInfor = {
    id: 1,
    name: 'Shang',
    imgUrl: '',
  };

  const convertName: FormName = {
    banner: 'Banner',
    'trip name': 'Tên chuyến đi',
    leader: 'Trưởng nhóm',
    members: 'Mời thành viên',
    deposit: 'Tiền cọc',
  };

  const [formData, setData] = React.useState<TripModel>({
    banner: '',
    name: '',
    leader: '',
    linkInvite: 'link.ne.com',
    deposit: '',
    locations: [],
    transport: {
      vehicle: '',
      start: {
        date: new Date(),
        from: new Date(),
        to: new Date(),
      },
      end: {
        date: new Date(),
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    // error = {} to check again
    setErrors({});
    let errors = {};
    // * validate name
    if (formData.name.length < 3) {
      errors = { ...errors, name: 'Cái này ko cho thiếu' };
    }
    // * validate deposit
    if (!formData.deposit || Number(formData.deposit) === 0) {
      errors = { ...errors, deposit: 'Có cọc thì mới không bùng kèo' };
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(createTrip(formData));
      // console.log('props', props);

      props.navigation.navigate('PlanMain');
    }
  };

  const handleCopy = () => {
    onCopy(formData.linkInvite);
    ToastService.showToast(MESSAGES_ENUM.COPY_SUCCESS, 'id-clipboard');
  };

  const handleChoosePhoto = async () => {
    let banner = '';
    await ImagePickerService.choosePhoto().then((res) => (banner = res));

    setData({
      ...formData,
      banner,
    });
  };

  const handleAddMilestone = (data) => {
    formData.locations.push(data);
    const locations = formData.locations;
    setData({
      ...formData,
      locations,
    });
  };

  const renderCell = (title: string) => {
    let cell;
    switch (title) {
      case 'banner':
        cell = (
          <Pressable onPress={handleChoosePhoto}>
            <Center>
              <Image
                alt="billboard"
                resizeMode="contain"
                size="xl"
                source={
                  !formData.banner ? ASSETS_ENUM.IMAGES_ENUM.BILL_BOARD : { uri: formData.banner }
                }
              />
            </Center>
          </Pressable>
        );
        break;
      case 'trip name':
        cell = (
          <>
            <WGFormControlComponent
              errorMessage={errors['name']}
              helperText="Tên ít nhất 3 ký tự nha"
              name="name"
              errors={errors}
            >
              <Input
                isInvalid={'name' in errors}
                isRequired
                fontWeight="semibold"
                placeholder="Đà Lạt hem"
                variant="filled"
                bg={'white:alpha.80'}
                fontSize={'md'}
                color={'violet.500'}
                value={formData.name}
                onChangeText={(value) =>
                  setData({
                    ...formData,
                    name: value,
                  })
                }
              />
            </WGFormControlComponent>
          </>
        );
        break;
      case 'leader':
        cell = (
          <>
            <WGChipComponent data={[{ name: userInfor.name }]} />
          </>
        );
        break;
      case 'members':
        cell = (
          <>
            <Box width={'full'}>
              <Flex width={'full'} direction="row" alignItems={'center'}>
                <Input
                  w={'4/5'}
                  mr="3"
                  isDisabled
                  fontWeight="semibold"
                  placeholder="Đà Lạt hem"
                  variant="filled"
                  bg={'white:alpha.80'}
                  fontSize={'md'}
                  color={'violet.500'}
                  value={formData.linkInvite}
                />
                <Button onPress={handleCopy}>Copy</Button>
              </Flex>
            </Box>
          </>
        );
        break;
      case 'deposit':
        cell = (
          <>
            <WGFormControlComponent
              errorMessage={errors['deposit']}
              helperText="Nhập số tiền phải cọc"
              name="deposit"
              errors={errors}
            >
              <Flex width={'full'} direction="row" alignItems={'center'}>
                <Input
                  isInvalid={'deposit' in errors}
                  isRequired
                  variant="filled"
                  width={'2/4'}
                  fontWeight="semibold"
                  fontSize={'md'}
                  color={'violet.500'}
                  value={formData.deposit}
                  placeholder="Cọc nhiu nà"
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    setData({
                      ...formData,
                      deposit: value,
                    })
                  }
                />
                <Text ml={3} fontSize={'lg'} fontWeight="semibold" color={'violet.500'}>
                  VND
                </Text>
              </Flex>
            </WGFormControlComponent>
          </>
        );
        break;
      default:
        // nothing happen !
        break;
    }
    return cell;
  };

  return (
    <Box flex={1} p={5}>
      <KeyboardAvoidingView
        mb={60}
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <VStack space={3}>
            {config.map((item, index) => (
              <WGFormComponent key={index} title={convertName[item]}>
                {renderCell(item)}
              </WGFormComponent>
            ))}

            <CreateMStoneComponent
              addMStoneCallBack={handleAddMilestone}
              locationData={formData.locations}
            />
          </VStack>

          <Button
            onPress={onSubmit}
            size={'lg'}
            mt="5"
            _text={{
              fontWeight: 'bold',
            }}
          >
            Tạo chuyến nà
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}

type FormName = {
  [key: string]: string;
};

export default WGBackgroundComponent(PlanCreateTripScreen);
