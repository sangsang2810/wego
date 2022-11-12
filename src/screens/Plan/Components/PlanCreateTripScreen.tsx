import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useClipboard,
} from 'native-base';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  WGBackgroundComponent,
  WGChipComponent,
  WGFormComponent,
  WGFormControlComponent,
} from '../../../libs';
import { ASSETS_ENUM, MESSAGES_ENUM, PLAN_ENUM } from '../../../utils/enums';
import { ImagePickerService, ProvinceService, ToastService } from '../../../services';
import CreateMStoneComponent from './CreateMStone.component';
import { createTrip } from '../TripSlice';

import { TripModel } from 'models';
import { useAppDispatch } from '../../../app/hooks';

function PlanCreateTripScreen(props) {
  const dispatch = useAppDispatch();
  const { onCopy } = useClipboard();
  const config = ['banner', 'province', 'trip name', 'leader', 'members', 'deposit'];

  useEffect(() => {
    const fetchData = async () => {
      const allProvince = await ProvinceService.getAllProvinceName();
      const allProvinceName: string[] = allProvince.map((item) => item.name);
      setProvinces(allProvinceName);
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

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
    province: 'Địa điểm',
  };

  const [provinces, setProvinces] = React.useState<String[]>([]);
  const [formData, setData] = React.useState<TripModel>({
    id: '',
    type: PLAN_ENUM.TRIP.code,
    banner: '',
    name: '',
    leader: '',
    linkInvite: 'link.ne.com',
    deposit: '',
    province: '',
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
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    if (isValid) {
      const updateData = { ...formData, deposit: formData.deposit.replace(',', ''), id: uniqueId };
      dispatch(createTrip(updateData));
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
      case 'province':
        cell = (
          <WGFormControlComponent
            errorMessage={errors['province']}
            helperText="Tối đa 18 ký tự"
            name="province"
            errors={errors}
          >
            <Input
              isInvalid={'province' in errors}
              isRequired
              placeholder="Đi đâu á ?"
              variant="filled"
              bg={'white:alpha.80'}
              fontSize={'md'}
              color={'violet.500'}
              maxLength={18}
              value={formData.province}
              onChangeText={(value) =>
                setData({
                  ...formData,
                  province: value,
                })
              }
            />
          </WGFormControlComponent>
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
                  maxLength={9}
                  width={'2/4'}
                  fontSize={'md'}
                  color={'violet.500'}
                  value={formData.deposit
                    .replace(/^0+/, '')
                    .replace(/\D/g, '')
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
