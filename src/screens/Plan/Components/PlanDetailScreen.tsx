import { RootState } from 'app/store';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { LogBox, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  WGBackgroundComponent,
  WGFormComponent,
  WGHeader,
  WGTabTimeLine,
  WGTimeLineComponent,
} from '../../../libs';
import { ASSETS_ENUM, SCREEN_ENUMS } from '../../../utils/enums';
import { configRouteByTripId } from '../TripSlice';

interface PlanDetailProps {
  route: any;
  navigation: any;
}

function PlanDetailScreen(props: PlanDetailProps) {
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ]);

  const {
    route: {
      params: { tripId },
    },
    navigation,
  } = props;

  const tripData = useSelector((state: RootState) =>
    state.trips.find((trip) => trip.id === tripId)
  );

  const routes = useSelector((state: RootState) => configRouteByTripId(state, tripId));

  console.log('PlanDetailScreen', tripData);

  const TransportMode = () => (
    <Box bg="white" p={3} roundedBottomLeft="md" roundedBottomRight={'md'}>
      <VStack>
        <HStack justifyContent={'space-between'}>
          <Text fontSize="sm" color={'gray.400'}>
            Số vé: KB434
          </Text>
          <Text fontSize="sm">Ngày đi/về</Text>
        </HStack>
        <HStack py={5} space="3" alignItems="center">
          <Text fontSize="md">Icon</Text>
          <Text fontSize="md">Sài Gòn - Đà Nẵng</Text>
        </HStack>
      </VStack>
    </Box>
  );

  const temp = [
    {
      key: 'go',
      tabTitle: 'Lúc đi',
      tabView: (
        <>
          <TransportMode />
        </>
      ),
    },
    {
      key: 'return',
      tabTitle: 'Lúc về',
      tabView: (
        <>
          <TransportMode />
        </>
      ),
    },
  ];

  const temp2 = [
    {
      key: 'day1',
      tabTitle: '17/09',
      tabView: (
        <>
          <WGTimeLineComponent />
        </>
      ),
    },
    {
      key: 'day2',
      tabTitle: '18/09',
      tabView: (
        <>
          <WGTimeLineComponent />
        </>
      ),
    },
    {
      key: 'day3',
      tabTitle: '19/09',
      tabView: (
        <>
          <WGTimeLineComponent />
        </>
      ),
    },
  ];

  return (
    <Box style={{ flex: 1 }}>
      <WGHeader
        isDisplayRight={false}
        isDisplayLeft={true}
        title={SCREEN_ENUMS.PLAN_DETAILS.name}
      />
      {/* <View w={'full'}></View> */}
      <ScrollView
        horizontal={false}
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        rounded="lg"
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 15}>
            <Image
              source={{
                uri: tripData?.banner
                  ? tripData?.banner
                  : 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="imagePlanDetail"
            />
          </AspectRatio>

          <VStack
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            width="full"
            height="70"
            px="4"
          >
            <LinearGradient style={{ flex: 1 }} colors={['transparent', 'rgba(0,0,0,0.8)']}>
              <Heading color="white">{tripData?.name}</Heading>
              <HStack alignItems={'center'} space={1}>
                <View>
                  <Image
                    tintColor={'white'}
                    source={ASSETS_ENUM.ICONS_ENUM.PIN_FILL}
                    resizeMode="contain"
                    alt="icn-add"
                    fadeDuration={0}
                    style={{ width: 12, height: 12 }}
                  />
                </View>
                <Text fontSize="sm" color="white" fontWeight="500">
                  {tripData?.province}
                </Text>
              </HStack>
            </LinearGradient>
          </VStack>
        </Box>

        {/* <View h={180} p={3}>
          <WGTabTimeLine routes={temp} />
        </View> */}

        <Box px={4} pt={4}>
          <VStack space={5}>
            <WGFormComponent title={'Thông tin chuyến đi'}>
              <Text>hello</Text>
            </WGFormComponent>

            <View p={3} bgColor="white" rounded={'md'}>
              <Heading size="md" ml="-1">
                Đặt cọc & Thành viên
              </Heading>
              <HStack p={3} pb="0" bg="red" justifyContent="space-between">
                <Text fontSize="lg" fontWeight={'semibold'} color={'violet.700'}>
                  500k
                </Text>
                <Avatar.Group
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
              </HStack>
            </View>

            <WGFormComponent title="Lộ trình">
              <View h={routes ? '80' : '16'}>
                {routes ? (
                  <WGTabTimeLine routes={routes} />
                ) : (
                  <Center h={'full'}>
                    <Text fontWeight={'bold'}>Chưa có lịch trình gì hết !!! </Text>
                    <Text>Tạo chuyến đi ở phần "Thêm địa điểm"</Text>
                  </Center>
                )}
              </View>
            </WGFormComponent>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 65,
  },
});

export default WGBackgroundComponent(PlanDetailScreen);
