import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, HStack } from 'native-base';

interface DateTimePickerProps {
  dateCallBack?: any;
  timeCallBack?: any;
  date?: Date;
  time?: Date;
  mode: 'date' | 'time' | 'dateTime';
}

function WGDateTimePickerComponent(props: DateTimePickerProps) {
  const { dateCallBack, timeCallBack, date, time, mode } = props;

  const onChangeDate = (_, selectedDate) => {
    dateCallBack(selectedDate);
  };
  const onChangeTime = (_, selectedTime) => {
    timeCallBack(selectedTime);
  };

  const renderDate = () => {
    return (
      <DateTimePicker
        style={{ width: 102, height: 40 }}
        testID="dateTimePicker"
        value={date || new Date()}
        mode={'date'}
        is24Hour={true}
        onChange={onChangeDate}
        minimumDate={new Date()}
      />
    );
  };

  const renderTime = () => {
    return (
      <DateTimePicker
        style={{ width: 66, height: 40 }}
        testID="dateTimePicker1"
        value={time || new Date()}
        mode={'time'}
        is24Hour={true}
        onChange={onChangeTime}
        minimumDate={new Date()}
      />
    );
  };

  const renderDateTime = () => {
    return (
      <HStack space={3}>
        {renderDate()}
        {renderTime()}
      </HStack>
    );
  };

  const renderCell = () => {
    let cell;
    switch (mode) {
      case 'date':
        cell = renderDate();
        break;
      case 'time':
        cell = renderTime();
        break;
      case 'dateTime':
      default:
        cell = renderDateTime();
        break;
    }
    return cell;
  };

  return <>{renderCell()}</>;
}

export default WGDateTimePickerComponent;
