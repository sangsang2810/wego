import { TripModel } from 'models';
import {
  Box,
  Image,
  AspectRatio,
  Heading,
  Stack,
  Text,
  HStack,
  View,
  Divider,
  Avatar,
  Button,
  Popover,
  Pressable,
} from 'native-base';
import React from 'react';
import { ASSETS_ENUM } from '../../utils/enums';

interface WGBigCardProps {
  onCardPress?(name: string): any;
  // variant?: 'default' | 'trip' | 'party';
  data: TripModel;
}

function WGBigCardComponent(props: WGBigCardProps) {
  const { onCardPress, data } = props;

  const handleOnPress = () => {
    if (onCardPress) {
      onCardPress(data?.id);
    }
  };

  return (
    <Pressable onPress={handleOnPress}>
      <Box alignItems="center">
        <Box
          p={3}
          w="100%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                rounded="md"
                source={{
                  uri: data?.banner
                    ? data?.banner
                    : 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>

          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Stack py={2} space={2}>
              <Stack>
                <Heading size="md">{data?.name}</Heading>
                <HStack alignItems={'center'} space={1}>
                  <View>
                    <Image
                      tintColor={'violet.500'}
                      source={ASSETS_ENUM.ICONS_ENUM.PIN_FILL}
                      resizeMode="contain"
                      alt="icn-add"
                      fadeDuration={0}
                      style={{ width: 12, height: 12 }}
                    />
                  </View>
                  <Text fontSize="sm" color={'violet.500'} fontWeight="500">
                    {data?.province}
                  </Text>
                </HStack>
              </Stack>
            </Stack>
            <View background={'green.500'} rounded="full">
              <Text py={1} px={3} fontSize="xs" color={'white'}>
                Available
              </Text>
            </View>
          </HStack>

          <Divider bg="coolGray.200" thickness="1" orientation="horizontal" />

          <Box py={2}>
            <HStack alignItems={'center'} justifyContent={'space-between'} w={'full'}>
              <Avatar.Group
                justifyContent="flex-start"
                alignItems={'center'}
                _avatar={{
                  size: 'sm',
                }}
                max={3}
              >
                <Avatar
                  mr={2}
                  bg="green.500"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}
                >
                  A2
                </Avatar>
                <Avatar
                  mr={2}
                  bg="green.500"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}
                >
                  A1
                </Avatar>
                <Avatar
                  mr={2}
                  bg="green.500"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}
                >
                  A3
                </Avatar>
                <Avatar
                  mr={2}
                  bg="green.500"
                  source={{
                    uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                  }}
                >
                  A4
                </Avatar>
              </Avatar.Group>

              <Popover
                placement={'top right'}
                trigger={(triggerProps) => {
                  return (
                    <Button {...triggerProps}>
                      <Text fontWeight={'bold'} color="white">{`Cọc: ${data?.deposit}`}</Text>
                    </Button>
                  );
                }}
              >
                <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                  <Popover.Arrow />
                  <Popover.Body>
                    Cọc để host lo trước tiền vé xe và book khách sạn, bùng là mất cọc đó nha 😈
                  </Popover.Body>
                </Popover.Content>
              </Popover>
            </HStack>
          </Box>
          <Divider bg="coolGray.200" thickness="1" orientation="horizontal" />
          <Text
            pt={1}
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="400"
          >
            6 mins ago
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}

export default WGBigCardComponent;
