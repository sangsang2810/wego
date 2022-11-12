import { Button, Center, Flex, HStack, Icon, Image, Input, Text, View } from 'native-base';
import React from 'react';
import {
  WGDateTimePickerComponent,
  WGFormComponent,
  WGFormControlComponent,
  WGTab,
} from '../../../libs';
import { ASSETS_ENUM, MESSAGES_ENUM } from '../../../utils/enums';
import { DateTimeService, ToastService } from '../../../services';

interface LocationModel {
  time: Date;
  date: Date;
  title: string;
  address: string;
  note: string;
}

interface CreateMStoneProps {
  addMStoneCallBack?: any;
  locationData?: any;
}

function CreateMStoneComponent(props: CreateMStoneProps) {
  const { addMStoneCallBack, locationData } = props;

  const addrIcon = ASSETS_ENUM.ICONS_ENUM.PIN;
  const noteIcon = ASSETS_ENUM.ICONS_ENUM.NOTE;

  const [routes, setRoutes] = React.useState<any>();
  const [locationErrors, setLocationErrors] = React.useState({});
  const [locationForm, setLocationForm] = React.useState<LocationModel>({
    time: new Date(),
    date: new Date(),
    title: '',
    address: '',
    note: '',
  });

  const row = (sourceImg: any, fieldName: string, placeholder: string) => {
    return (
      <WGFormControlComponent name={fieldName} errors={locationErrors} displayHelp={false}>
        {' '}
        <HStack px={3} flexDirection={'row'} justifyContent={'center'} alignItems="center">
          <Icon mr={1} size="md" display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Image source={sourceImg} resizeMode="contain" alt="icn-add" />
          </Icon>
          <Input
            fontSize={'md'}
            variant="filled"
            placeholder={placeholder}
            value={locationForm[fieldName]}
            onChangeText={(value) => onChangeAddLocation(fieldName, value)}
          />
        </HStack>
      </WGFormControlComponent>
    );
  };

  const onChangeDate = (selectedDate) => {
    setLocationForm({ ...locationForm, date: selectedDate });
  };

  const onChangeTime = (selectedTime) => {
    setLocationForm({ ...locationForm, time: selectedTime });
  };

  const onChangeAddLocation = (name, value) => {
    setLocationForm({
      ...locationForm,
      [name]: value,
    });
  };

  const handleResetLocationForm = () => {
    setLocationForm({
      // temp
      time: new Date(),
      date: new Date(),
      address: '',
      title: '',
      note: '',
    });
  };

  const submitAddLocation = async () => {
    validateAddLocation();
    const isValid = validateAddLocation();
    if (isValid) {
      const mileStoneData = { ...locationForm };
      addMStoneCallBack(mileStoneData);
      await configRoutes();
      ToastService.showToast(MESSAGES_ENUM.ADD_MILESTONE_SUCCESS, 'add-milestone');
      setLocationForm({
        time: locationForm.time,
        date: locationForm.date,
        title: '',
        address: '',
        note: '',
      });
    } else {
      ToastService.showToast(MESSAGES_ENUM.ADD_MILESTONE_FAILURE, 'add-mstone-failure');
    }
  };

  const validateAddLocation = () => {
    // error = {} to check again
    setLocationErrors({});
    let errors = {};
    // * validate name
    if (locationForm.title.length < 3) {
      errors = { ...errors, title: 'title is too short' };
    }
    // * validate address
    if (locationForm.address.length < 3) {
      errors = { ...errors, address: 'Address is too short' };
    }

    if (Object.keys(errors).length > 0) {
      setLocationErrors(errors);
      return false;
    }

    return true;
  };

  const configRoutes = () => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    };
    const cloneLocation = [...locationData];

    let milestone = {};
    cloneLocation.map((item, index) => {
      const date = item.date.toLocaleDateString('vi-VN', options);
      // if has date > push item

      const time = DateTimeService.getTimeFromDate(item.time);

      const convertTime = { ...item, time };
      if (milestone[date]) {
        milestone[date].locations.push(convertTime);
      } else {
        milestone = {
          ...milestone,
          [date]: {
            key: index,
            tabTitle: date,
            locations: [],
          },
        };
        milestone[date].locations.push(convertTime);
      }
    });

    setRoutes(milestone);
  };

  return (
    <View>
      <WGFormComponent title="Thêm địa điểm">
        <View mb={3}>
          <Flex flexDirection={'row'} justify="space-between">
            <Button variant={'ghost'} onPress={handleResetLocationForm}>
              Nhập lại
            </Button>
            {/* <HStack justifyContent="flex-end" pr={3}>
              <DateTimePicker
                style={{ width: '50%', height: 40 }}
                testID="dateTimePicker"
                value={locationForm.date}
                mode={'date'}
                is24Hour={true}
                onChange={onChangeDate}
                minimumDate={new Date()}
              />
              <DateTimePicker
                style={{ width: '30%', height: 40 }}
                testID="dateTimePicker1"
                value={locationForm.time}
                mode={'time'}
                is24Hour={true}
                onChange={onChangeTime}
                minimumDate={new Date()}
              />
            </HStack> */}
            <WGDateTimePickerComponent
              mode="dateTime"
              date={locationForm.date}
              time={locationForm.time}
              dateCallBack={onChangeDate}
              timeCallBack={onChangeTime}
            />
          </Flex>
        </View>
        <WGFormControlComponent name="title" errors={locationErrors} displayHelp={false}>
          <Input
            variant="filled"
            placeholder="Tên địa điểm"
            fontSize={'md'}
            color={'violet.500'}
            value={locationForm.title}
            onChangeText={(value) => onChangeAddLocation('title', value)}
          />
        </WGFormControlComponent>
        {row(addrIcon, 'address', 'Địa chỉ')}
        {row(noteIcon, 'note', 'Ghi chú')}

        <Button mt={5} onPress={submitAddLocation}>
          Thêm địa điểm ✨
        </Button>
      </WGFormComponent>

      <View mt={3}>
        <WGFormComponent title="Lộ trình">
          <View h={routes ? '80' : '16'}>
            {routes ? (
              <WGTab routes={routes} />
            ) : (
              <Center h={'full'}>
                <Text fontWeight={'bold'}>Chưa có lịch trình gì hết !!! </Text>
                <Text>Tạo chuyến đi ở phần "Thêm địa điểm"</Text>
              </Center>
            )}
          </View>
        </WGFormComponent>
      </View>
    </View>
  );
}

export default CreateMStoneComponent;
