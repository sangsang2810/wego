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

  const tripData = useSelector((state: RootState) =>
    state.trips.find((trip) => trip.id === tripId)
  );
  console.log('tripData', tripData);
  

  const routes = useSelector((state: RootState) => configRouteByTripId(state, tripId));

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
      view: (TransportMode()),
    },{
      key: 'tab-2',
      tabTitle: 'Đi về',
      view: (<Text>Hello</Text>),
    }
  ]

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
          <View h={'40'}>
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
      {/* <View w={'full'}></View> */}
      <ScrollView
        horizontal={false}
        style={styles.scrollView}
        // contentContainerStyle={{ flexGrow: 1 }}
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
                  {tripData?.province.label}
                </Text>
              </HStack>
            </LinearGradient>
          </VStack>
        </Box>

        <VStack mt={5} px={5} space={3}>
          {CELLS.map((item, index) => (
            <WGFormComponent key={index} title={item}>
              {renderCells(item)}
            </WGFormComponent>
          ))}
        </VStack>
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
