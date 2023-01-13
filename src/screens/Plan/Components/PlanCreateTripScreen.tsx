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
  HStack,
  View,
  TextArea,
} from 'native-base';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import {
  WGDropdownComponent,
  WGBackgroundComponent,
  WGChipComponent,
  WGFormComponent,
  WGFormControlComponent,
  WGDateTimePickerComponent,
} from '../../../libs';
import { ASSETS_ENUM, MESSAGES_ENUM, PLAN_ENUM, TRANSPORT_ENUM } from '../../../utils/enums';
import { ImagePickerService, ProvinceService, ToastService } from '../../../services';
import CreateMStoneComponent from './CreateMStone.component';
import { createTrip } from '../../../services/Slices/TripSlice';

import { DropdownModel, TripModel } from 'models';
import { useAppDispatch } from '../../../app/hooks';
import DROPDOWN_ENUM from '../../../utils/enums/dropdow.enum';

function PlanCreateTripScreen(props) {
  const dispatch = useAppDispatch();
  const { onCopy } = useClipboard();
  const config = ['banner', 'province', 'trip name', 'vehicle', 'leader', 'members', 'deposit'];
  const convertName: FormName = {
    banner: 'Banner',
    'trip name': 'Tên chuyến đi',
    leader: 'Trưởng nhóm',
    members: 'Mời thành viên',
    deposit: 'Tiền cọc',
    province: 'Địa điểm',
    vehicle: 'Phương tiện & khởi hành',
  };

  useEffect(() => {
    const fetchData = async () => {
      const allDist = await ProvinceService.getAllDistrictName();
      let provinces: DropdownModel[] = [];
      allDist.map((item) => {
        const tamp = { value: item.code, label: item.path };
        provinces.push(tamp);
      });

      setProvinces(provinces);
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

  const [provinces, setProvinces] = React.useState<DropdownModel[]>([]);
  const [formData, setFormData] = React.useState<TripModel>({
    id: '',
    type: PLAN_ENUM.TRIP.code,
    banner: '',
    name: '',
    leader: '',
    linkInvite: 'link.ne.com',
    deposit: '',
    createAt: new Date(),
    province: {
      label: '',
      value: '',
    },
    locations: [],
    transport: {
      vehicle: {
        label: '',
        value: '',
        image: {
          uri: '',
        },
      },
      depart: {
        date: new Date(),
        time: new Date(),
        locate: '',
      },
      return: {
        date: new Date(),
        time: new Date(),
        locate: '',
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

    setFormData({
      ...formData,
      banner,
    });
  };

  const handleAddMilestone = (data) => {
    formData.locations.push(data);
    const locations = formData.locations;
    setFormData({
      ...formData,
      locations,
    });
  };

  const handleDropdownChange = (item, name) => {
    console.log('name', name);
    console.log('item', item);

    if (name === 'depart') {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          depart: {
            ...formData.transport.depart,
            locate: item,
          },
        },
      });
      console.log('formData', formData);
      return;
    }
    console.log('formData', formData);

    if (name === 'return') {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          return: {
            ...formData.transport.return,
            locate: item,
          },
        },
      });
      return;
    }

    if (name === 'vehicle') {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          vehicle: item,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: item,
      });
    }
  };

  const onChangeDate = (selectedDate, name) => {
    if (name === 'depart') {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          depart: {
            ...formData.transport.depart,
            date: selectedDate,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          return: {
            ...formData.transport.return,
            date: selectedDate,
          },
        },
      });
    }
  };

  const onChangeTime = (selectedTime, name) => {
    if (name === 'depart') {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          depart: {
            ...formData.transport.depart,
            time: selectedTime,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          return: {
            ...formData.transport.return,
            time: selectedTime,
          },
        },
      });
    }
  };

  const renderByTransport = (transportCode: string) => (
    <HStack>
      <Box pr={1} w={'1/2'}>
        <Text>Khởi hành</Text>
        <VStack space={2}>
          <WGDateTimePickerComponent
            mode="dateTime"
            date={formData?.transport?.depart?.date}
            time={formData.transport.depart?.time}
            dateCallBack={(value) => onChangeDate(value, 'depart')}
            timeCallBack={(value) => onChangeTime(value, 'depart')}
          />
          {transportCode === TRANSPORT_ENUM.FLIGHT.code ? (
            <WGDropdownComponent
              data={DROPDOWN_ENUM.AIRPORT_DDL_DATA}
              type={'default'}
              placeholder={'Chọn sân bay'}
              fieldName={'depart'}
              ddlValue={formData?.transport.depart.locate.value}
              onDropdownChange={handleDropdownChange}
            />
          ) : (
            <TextArea
              autoCompleteType={undefined}
              placeholder="Điểm xuất phát"
              fontSize={'md'}
              variant="filled"
              value={formData?.transport.depart.locate.label}
              onChangeText={(value) =>
                setFormData({
                  ...formData,
                  transport: {
                    ...formData.transport,
                    depart: {
                      ...formData.transport.depart,
                      locate: { value: 'custom', label: value },
                    },
                  },
                })
              }
            />
          )}
        </VStack>
      </Box>
      <Box pl={1} w={'1/2'}>
        <Text>Trở về</Text>
        <VStack space={2}>
          <WGDateTimePickerComponent
            mode="dateTime"
            date={formData?.transport?.return?.date}
            time={formData.transport.return.time}
            dateCallBack={(value) => onChangeDate(value, 'return')}
            timeCallBack={(value) => onChangeTime(value, 'return')}
          />
          {transportCode === TRANSPORT_ENUM.FLIGHT.code ? (
            <WGDropdownComponent
              data={DROPDOWN_ENUM.AIRPORT_DDL_DATA}
              type={'default'}
              fieldName={'return'}
              placeholder={'Chọn sân bay'}
              ddlValue={formData?.transport.vehicle.value}
              onDropdownChange={handleDropdownChange}
            />
          ) : (
            <TextArea
              placeholder="Điểm xuất phát"
              fontSize={'md'}
              variant="filled"
              value={formData?.transport.return.locate.label}
              onChangeText={(value) =>
                setFormData({
                  ...formData,
                  transport: {
                    ...formData.transport,
                    return: {
                      ...formData.transport.return,
                      locate: { value: 'custom', label: value },
                    },
                  },
                })
              }
              autoCompleteType={undefined}
            />
          )}
        </VStack>
      </Box>
    </HStack>
  );

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
          <WGDropdownComponent
            data={provinces}
            type={'default'}
            fieldName={'province'}
            ddlValue={formData?.province?.value}
            onDropdownChange={handleDropdownChange}
          />
        );
        break;
      case 'vehicle':
        cell = (
          <VStack space={3}>
            <WGDropdownComponent
              data={DROPDOWN_ENUM.VEHICLE_DDL_DATA}
              type={'image'}
              fieldName={'vehicle'}
              ddlValue={formData?.transport.vehicle.value}
              onDropdownChange={handleDropdownChange}
            />

            {formData?.transport.vehicle.value ? (
              renderByTransport(formData?.transport.vehicle.value)
            ) : (
              <></>
            )}
          </VStack>
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
                  setFormData({
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
                    setFormData({
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
