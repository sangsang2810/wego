import { Box, Button, HStack, Image, Text, View } from 'native-base'
import React from 'react'
import { ASSETS_ENUM } from '../../utils/enums';

interface HeaderProps {
  left?: {
    icon: string,
    onPress: () => void,
  },
  title?: string,
  right?: {
    icon: string,
    onPress: () => void,
  }
  isDisplayRight?: boolean | true;
  isDisplayLeft?: boolean | true;
  isDisplayTitle?: boolean | true;
}

const WGHeader = (props: HeaderProps) => {
  const { left, right, title, isDisplayRight, isDisplayLeft, isDisplayTitle } = props
  const leftImg = ASSETS_ENUM.ICONS_ENUM.ARR_LEFT;
  const rightImg = ASSETS_ENUM.ICONS_ENUM.ARR_RIGHT;


  const NavButton = (props: any) => (
    <Button bg="white:alpha.30" p="3" rounded="lg">
      <Image source={props.position === 'left' ? leftImg :
        rightImg} alt="Alternate Text" resizeMode='contain'
        style={{
          width: 25,
          height: 25,
        }} />
    </Button>
  )

  return (
    <Box mt={3}>
      <HStack px={3} justifyContent={'space-between'} alignItems={'center'}>
        {isDisplayLeft ? <NavButton position="left" /> : <View p={3} ></View>}
        {isDisplayTitle ?? <Text fontSize={'lg'} fontWeight={'semibold'}  >{title}</Text>}
        {isDisplayRight ? <NavButton position="right" /> : <View p={3} ></View>}
      </HStack>
    </Box>
  )
}

export default WGHeader