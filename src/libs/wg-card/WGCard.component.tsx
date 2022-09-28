import {
  Box,
  Text,
  Flex,
  AspectRatio,
  Image,
  Center,
  HStack,
  Heading,
  Avatar,
  VStack,
  Pressable,
} from 'native-base';
import React from 'react';
import { ASSETS_ENUM } from '../../utils/enums';

interface WGCardComponent {
  onCardPress?(name: number): any;
  variant?: 'default' | 'trip' | 'party';
  data: any;
}

function WGCardComponent(props: WGCardComponent) {
  const { onCardPress, variant } = props;
  const transportImg = {
    plane: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_PLANE,
    ship: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_SHIP,
    bus: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_BUS,
    motor: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_MOTOR,
    bicycle: ASSETS_ENUM.IMAGES_ENUM.TRANSPORT_BICYCLE,
  };

  const handleOnPress = () => {
    if (onCardPress) {
      onCardPress(100);
    }
  };

  const renderDefaultContent = () => (
    <>
      <Text fontSize="20" fontWeight="bold" noOfLines={1}>
        title
      </Text>
      <Text fontWeight="400" noOfLines={2} h={10}>
        descriptiondescri
      </Text>
      <HStack alignItems={'flex-end'} justifyContent={'space-between'} w={'full'}>
        <Avatar.Group
          mt={3}
          justifyContent="flex-start"
          alignItems={'center'}
          _avatar={{
            size: 'sm',
          }}
          max={3}
        >
          <Avatar
            bg="green.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
          >
            A2
          </Avatar>
          <Avatar
            bg="green.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
          >
            A1
          </Avatar>
          <Avatar
            bg="green.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
          >
            A3
          </Avatar>
          <Avatar
            bg="green.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
          >
            A4
          </Avatar>
        </Avatar.Group>
        <Text mr={3} fontSize="md">
          📅 12 Jun 2022
        </Text>
      </HStack>
    </>
  );

  const renderTripContent = () => (
    <>
      <Box>
        <HStack flexDirection={'row'} space={6} justifyContent={'center'} alignItems={'center'}>
          <Box>
            <Text fontSize="xs" fontWeight="semibold">
              Đà Nẵng
            </Text>
            <Text fontSize="md">17:00</Text>
          </Box>

          <Image size={8} source={transportImg.motor} alt="transport" />

          <Box>
            <Text fontSize="xs" fontWeight="semibold">
              Khánh Hòa
            </Text>
            <Text fontSize="md">19:00</Text>
          </Box>
        </HStack>
      </Box>
      <HStack mt={3}>
        <Text fontSize="md">30.12.22</Text>
        <Text fontSize="md"> - </Text>
        <Text fontSize="md">02.01.23</Text>
      </HStack>
    </>
  );

  const renderPartyContent = () => {};

  const renderContent = (variant: 'default' | 'trip' | 'party') => {
    switch (variant) {
      case 'default':
        return renderDefaultContent();

      case 'trip':
        return renderTripContent();

      case 'party':
        return renderPartyContent();

      default:
        return renderDefaultContent();
    }
  };

  return (
    <Pressable onPress={handleOnPress}>
      <Box bg={'white'} rounded="lg">
        <HStack space={3} m={3}>
          <Box maxW={'1/3'}>
            <AspectRatio w="100%" ratio={1 / 1}>
              <Image
                rounded="md"
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              rounded="md"
              bg="violet.500"
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              top="0"
              px="3"
              py="1.5"
            >
              location
            </Center>
          </Box>
          <VStack maxW={'2/3'} alignItems="flex-start" h={'full'}>
            {renderContent(variant)}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
}

export default WGCardComponent;
