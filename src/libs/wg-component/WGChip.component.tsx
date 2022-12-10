import { Avatar, Box, HStack, Text, View } from 'native-base';
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
          <HStack mt={2} key={index} rounded={'full'} space={1} bg={'white'} p={1} pr={2}>
            <Avatar
              size={'xs'}
              bg="green.500"
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
            >
              AJ
            </Avatar>
            <Text fontSize={'sm'} textAlign={'center'}>
              {item.name}
            </Text>
          </HStack>
        ))}
      </HStack>
    </View>
  );
}

export default WGChipComponent;
