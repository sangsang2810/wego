import { RootState } from 'app/store';
import { LinearGradient } from 'expo-linear-gradient';
import {
  AspectRatio,
  Avatar,
  Box,
  Center,
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
import { LogBox, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  WGBackgroundComponent,
  WGChipComponent,
  WGFormComponent,
  WGHeader,
  WGTab,
  WGTabTimeLine,
} from '../../../libs';
import { ASSETS_ENUM, SCREEN_ENUMS } from '../../../utils/enums';
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

  const CELLS = ['Thông tin chuyến đi', 'Khởi hành', 'Thành viên', 'Lộ trình'];

  // * get data
  const tripData = useSelector((state: RootState) =>
    state.trips.find((trip) => trip.id === tripId)
  );
  const routes = useSelector((state: RootState) => configRouteByTripId(state, tripId));

  const TransportDetail = (type: 'depart' | 'return') => {
    const { transport } = tripData;

    let data;

    if (type === 'depart') {
      data = transport.depart;
    } else {
      data = transport.return;
    }

    const weekday = new Date(data?.date).toLocaleDateString('en-us', {
      weekday: 'long',
    });
    const date = new Date(data?.date);
    const monthYear = new Date(data?.date).toLocaleDateString('en-us', {
      year: '2-digit',
      month: 'short',
    });
    const time = new Date(data?.time);

    return (
      <View h={'full'} bg="white" roundedBottomLeft="md" roundedBottomRight={'md'}>
        <HStack h={'full'}>
          <Flex
            height={'full'}
            width={'1/4'}
            justifyContent="center"
            bg={'#ECC5FB'}
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

          <View width={'3/4'} p={3}>
            <HStack justifyContent={'space-between'}>
              <Text fontSize="sm" color={'gray.400'}>
                Khởi hành lúc: {time.getHours()} giờ {time.getMinutes()} phút
              </Text>
            </HStack>
            <HStack space="3" justifyContent={'space-between'}>
              <Text fontSize={'sm'}>{data?.locate.label}</Text>
              <Text fontSize={'sm'}>{transport.return?.locate.label}</Text>
            </HStack>
            <HStack space="3" justifyContent={'space-between'}>
              <Text fontWeight={'bold'} fontSize={'lg'}>
                {data?.locate.value}
              </Text>
              <Text fontSize={'lg'}>
                - - - -{' '}
                <View mt={2}>
                  <MaterialIcons name="airplanemode-active" size={22} color="black" />
                </View>{' '}
                - - - - -
              </Text>
              <Text fontWeight={'bold'} fontSize={'lg'}>
                {transport.return?.locate.value}
              </Text>
            </HStack>
          </View>
        </HStack>
      </View>
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
                    { name: 'Trần Hạo Nam' },
                    { name: 'Trần Hạo Nam' },
                    { name: 'Trần Hạo Nam' },
                    { name: 'Trần Hạo Nam' },
                  ]}
                />
              </View>
            </VStack>
          </View>
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
    // flex: 1,
  },
});

export default WGBackgroundComponent(PlanDetailScreen);
