import { RootState } from 'app/store';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AspectRatio,
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import { ImageBackground, LogBox, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  WGBackgroundComponent,
  WGChipComponent,
  WGFormComponent,
  WGHeader,
  WGTab,
  WGTabTimeLine,
} from '../../../libs';
import { ASSETS_ENUM, SCREEN_ENUMS, TRANSPORT_ENUM } from '../../../utils/enums';
import { configRouteByTripId } from '../TripSlice';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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

  const CELLS = ['Thông tin chuyến đi', 'Đặt cọc', 'Khởi hành', 'Thành viên', 'Lộ trình'];

  // * get data
  const tripData = useSelector((state: RootState) =>
    state.trips.find((trip) => trip.id === tripId)
  );
  const routes = useSelector((state: RootState) => configRouteByTripId(state, tripId));

  const TransportDetail = (type: 'depart' | 'return') => {
    const { transport } = tripData;
    let fromLocate;
    let toLocate;
    let data;

    if (type === 'depart') {
      data = transport.depart;
      fromLocate = transport.depart;
      toLocate = transport.return;
    } else {
      data = transport.return;
      toLocate = transport.depart;
      fromLocate = transport.return;
    }

    const weekday = new Date(data?.date).toLocaleDateString('vi-vn', {
      weekday: 'long',
    });
    const date = new Date(data?.date);
    const monthYear = new Date(data?.date).toLocaleDateString('vi-vn', {
      month: 'long',
    });
    const time = new Date(data?.time);

    return (
      <Box
        h={'full'}
        bg={{
          linearGradient: {
            colors: ['#6364F4', '#FC5C7D'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        roundedBottomLeft="md"
        roundedBottomRight={'md'}
      >
        <HStack h={'full'}>
          <Flex
            height={'full'}
            width={'1/4'}
            justifyContent="center"
            // bg={'#ECC5FB'}
            alignItems={'center'}
            roundedBottomLeft="md"
            roundedBottomRight={'md'}
          >
            <Text color={'white'}>{weekday}</Text>
            <Text color={'white'} fontSize={'3xl'}>
              {date.getDate()}
            </Text>
            <Text color={'white'}>{monthYear}</Text>
          </Flex>

          <Divider orientation="vertical" thickness="2" bg={'white'} />

          <View width={'3/4'} pt={3} p={3}>
            <VStack space={3}>
              <Text textAlign={'center'} fontSize="sm" color={'white'}>
                {time.getHours()} giờ {time.getMinutes()} phút
              </Text>

              {transport.vehicle.value === TRANSPORT_ENUM.FLIGHT.code ? (
                <>
                  <View>
                    <HStack space="3" justifyContent={'space-between'}>
                      <Text color={'white'} fontWeight={'bold'} fontSize={'lg'}>
                        {fromLocate?.locate.value}
                      </Text>
                      <Text fontSize={'lg'}>
                        - - - -{' '}
                        <View mt={2}>
                          <MaterialIcons name="airplanemode-active" size={22} color="black" />
                        </View>{' '}
                        - - - - {'>'}
                      </Text>
                      <Text color={'white'} fontWeight={'bold'} fontSize={'lg'}>
                        {toLocate?.locate.value}
                      </Text>
                    </HStack>

                    <HStack justifyContent={'space-between'}>
                      <Text color={'gray.300'} fontSize={'xs'}>
                        {fromLocate?.locate.label}
                      </Text>
                      <Text color={'gray.300'} fontSize={'xs'}>
                        {toLocate?.locate.label}
                      </Text>
                    </HStack>
                    <Text mt={3} color={'white'} fontSize={'xs'}>
                      * Vui lòng có mặt trước giờ bay 1h
                    </Text>
                  </View>
                </>
              ) : (
                <View>
                  <Text color={'white'} fontSize={'xs'}>
                    Xuất phát tại:{' '}
                  </Text>
                  <Text color={'white'} fontWeight={'semibold'}>
                    {fromLocate.locate.label}
                  </Text>
                  <Text mt={3} color={'white'}>
                    * Vui lòng đến trước h xuất phát 15p
                  </Text>
                </View>
              )}
            </VStack>
          </View>
        </HStack>
      </Box>
    );
  };

  const infoItem = (type: string, content: string, color: string) => {
    let icon;
    switch (type) {
      case 'day':
        icon = <FontAwesome5 name="calendar-day" size={24} color="white" />;
        break;
      case 'weather':
        icon = <FontAwesome5 name="cloud" size={20} color="white" />;
        break;
      case 'status':
        icon = <MaterialIcons name="pending" size={32} color="white" />;
        break;
      case 'clock':
      default:
        icon = <FontAwesome5 name="hourglass-start" size={22} color="white" />;
        break;
    }
    return (
      <VStack alignItems={'center'} rounded={'md'} h={'24'} w={'20'} bg={'white'}>
        <View rounded={'md'} alignItems={'center'} justifyContent={'center'} h={'2/3'} w={'full'}>
          <View
            rounded={'full'}
            justifyContent={'center'}
            alignItems={'center'}
            w={12}
            h={12}
            bgColor={color}
          >
            {icon}
          </View>
        </View>
        <Text>{content}</Text>
      </VStack>
    );
  };

  const infoItemList = [
    {
      type: 'day',
      content: '28/10',
      color: '#ECC5FB',
    },
    {
      type: 'weather',
      content: 'Mưa',
      color: '#A7C5EB',
    },
    {
      type: 'clock',
      content: '134 days',
      color: '#FFDBA4',
    },
    {
      type: 'status',
      content: 'Waiting',
      color: '#C2DED1',
    },
  ];

  const sample = [
    {
      key: 'tab-1',
      tabTitle: 'Khởi hành',
      view: TransportDetail('depart'),
    },
    {
      key: 'tab-2',
      tabTitle: 'Đi về',
      view: TransportDetail('return'),
    },
  ];

  const renderCells = (cellName: string) => {
    let cell;
    switch (cellName) {
      case 'Thành viên':
        cell = (
          <View>
            <VStack space={4}>
              <View>
                <Text>Trưởng đoàn</Text>
                <WGChipComponent data={[{ name: 'Trần Hạo Nam' }]} />
              </View>
              <View>
                <Text>Thành Viên</Text>
                <WGChipComponent
                  data={[
                    { name: 'NgUYỄN VĂN A' },
                    { name: 'Trần' },
                    { name: 'Trần Hạo Nam' },
                    { name: 'Trần Hạo Nam' },
                  ]}
                />
              </View>
            </VStack>
          </View>
        );
        break;
      case 'Đặt cọc':
        cell = (
          <Box
            bg={{
              linearGradient: {
                colors: ['#6364F4', '#FC5C7D'],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="3"
            rounded="md"
            _text={{
              fontSize: 'md',
              fontWeight: 'medium',
              color: 'warmGray.50',
              textAlign: 'center',
            }}
          >
            <Text color={'warmGray.50'} fontSize={'xs'}>
              Đặt cọc
            </Text>
            <Text color={'warmGray.50'} fontWeight={'semibold'} fontSize={'xl'}>
              {tripData.deposit}
            </Text>
          </Box>
        );
        break;
      case 'Khởi hành':
        cell = (
          <View h={'48'}>
            <WGTab routes={sample} />
          </View>
        );
        break;
      case 'Lộ trình':
        cell = (
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
        );
        break;
      case 'Thông tin chuyến đi':
      default:
        cell = (
          <HStack justifyContent={'space-between'}>
            {infoItemList.map(({ type, content, color }) => infoItem(type, content, color))}
          </HStack>
        );
        break;
    }
    return cell;
  };

  return (
    <Box flex={1}>
      <WGHeader
        isDisplayRight={false}
        isDisplayLeft={true}
        title={SCREEN_ENUMS.PLAN_DETAILS.name}
      />
      <ScrollView h="80" horizontal={false} style={styles.scrollView} rounded="lg">
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
                  {tripData?.province.label}
                </Text>
              </HStack>
            </LinearGradient>
          </VStack>
        </Box>

        <View h={'full'} mt={5} px={5}>
          <VStack space={3}>
            {CELLS.map((item, index) => (
              <WGFormComponent key={index} title={item}>
                {renderCells(item)}
              </WGFormComponent>
            ))}
          </VStack>
        </View>
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
