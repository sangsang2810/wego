import { BlurView } from 'expo-blur';
import { Backdrop, Box, Text } from 'native-base';
import React, { Component } from 'react';
import STYLE_ENUMS from '../../../assets/styles/style';

interface WGFormProps {
  title: string;
  children: any;
  contentStyle?: Object;
}

function WGFormComponent(props: WGFormProps) {
  const { title, contentStyle, children } = props;
  return (
    <Box>
      <Text ml={'2'} fontWeight={'semibold'} fontSize={'md'}>
        {title}
      </Text>
      <Box
        p={3}
        style={[STYLE_ENUMS.blurContainer, contentStyle]}
        rounded={'xl'}
        backgroundColor={'white:alpha.50'}
      >
        {children}
      </Box>
    </Box>
  );
}

export default WGFormComponent;
