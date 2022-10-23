import { FormControl } from 'native-base';
import React, { Component } from 'react';

interface WGFormProps {
  name: string;
  children: any;
  errors?: Object;
  errorMessage: string;
  helperText: string;
  isRequire: boolean;
  displayHelp: boolean;
}

WGFormControlComponent.defaultProps = {
  name: '',
  errors: '',
  errorMessage: '',
  helperText: '',
  isRequire: true,
  displayHelp: true,
};

function WGFormControlComponent(props: WGFormProps) {
  const { name, children, errors, errorMessage, helperText, isRequire, displayHelp } = props;
  return (
    <FormControl isRequired={isRequire} isInvalid={name in errors}>
      {children}
      {displayHelp &&
        (name in errors ? (
          <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>{helperText}</FormControl.HelperText>
        ))}
    </FormControl>
  );
}

export default WGFormControlComponent;
