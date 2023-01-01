import { Avatar, Box, Flex, HStack, Text, View } from 'native-base';
import React from 'react';
interface WGChipProps {
  data: ChipModel[];
}

type ChipModel = {
  name: string;
  imgUrl?: string;
};

WGChipComponent.defaultProps = {
  data: [],
};

function WGChipComponent(props: WGChipProps) {
  const { data } = props;

  return (
    <View>
      <HStack space={3} flexWrap={'wrap'}>
        {data.map((item, index) => (
          <HStack mt={2} key={index} rounded={'full'} space={1} bg={'white'} pr={2} maxW={'48'}>
            <Avatar
              size={'sm'}
              bg="green.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              AJ
            </Avatar>
            <View justifyContent={'center'} maxW="40" alignItems={'center'}>
              <Text fontSize={'sm'} isTruncated>
                {item.name}
              </Text>
            </View>
          </HStack>
        ))}
      </HStack>
    </View>
  );
}

export default WGChipComponent;
