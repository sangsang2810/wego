import React from 'react';
import { Box, Text, AspectRatio, Image, HStack, VStack } from 'native-base';
import { ASSETS_ENUM } from '../../utils/enums';

interface WGCardComponent {
  title: string;
  address: string;
  note?: string;
}

function WGTimeLineCardComponent(props: WGCardComponent) {
  const { title, address, note } = props;
  const addrIcon = ASSETS_ENUM.ICONS_ENUM.PIN;
  const noteIcon = ASSETS_ENUM.ICONS_ENUM.NOTE;

  const row = (sourceImg: any, title: string) => {
    return title ? (
      <HStack space={2} alignItems="flex-start">
        <Image
          mt={0.5}
          maxH={5}
          source={sourceImg}
          alt="Alternate Text"
          resizeMode="contain"
          style={{
            width: 16,
            height: 16,
          }}
        />
        <Text flexWrap={'wrap'} color={'black'}>
          {title}
        </Text>
      </HStack>
    ) : (
      <></>
    );
  };

  return (
    <Box rounded={'md'} bg={'white'} flex={1} p={3}>
      <VStack alignItems="flex-start" h={'full'} space={2}>
        <Text fontWeight="semibold" flexWrap={'wrap'} noOfLines={2} color={'violet.500'}>
          {title}
        </Text>
        {row(addrIcon, address)}
        {row(noteIcon, note)}
        {/* <HStack alignItems={'flex-end'} justifyContent={'space-between'} w={'full'}></HStack>\ */}
      </VStack>
    </Box>
  );
}

export default WGTimeLineCardComponent;
