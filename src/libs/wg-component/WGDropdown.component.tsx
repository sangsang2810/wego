import { DropdownModel } from 'models';
import { View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

type WGDropdownProps = {
  data: DropdownModel[];
  ddlValue: string;
  type: 'default' | 'image';
  placeholder?: string;
  fieldName: string;
  onDropdownChange: (valueObj: DropdownModel, name: string) => void;
};

const WGDropdownComponent = (props: WGDropdownProps) => {
  const { data, placeholder, onDropdownChange, ddlValue, type, fieldName } = props;

  const [isFocus, setIsFocus] = useState(false);

  const isTypeImage = type === 'image';

  const plcHolder = placeholder ?? 'Chọn đi nè';

  return (
    <View rounded={'md'} style={styles.container}>
      <SelectCountry
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        imageStyle={isTypeImage ? styles.imageStyle : {}}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        imageField="image"
        placeholder={!isFocus ? plcHolder : '...'}
        searchPlaceholder="Tìm ở đây nha..."
        value={ddlValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onDropdownChange(item, fieldName);
        }}
      />
    </View>
  );
};

export default WGDropdownComponent;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
  },
  dropdown: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: 'gray',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#7c3aed',
  },
  imageStyle: {
    width: 32,
    height: 32,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
