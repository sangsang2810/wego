import { useAppSelector } from '../../app/hooks';
import {
  VStack,
  Box,
  AspectRatio,
  Image,
  Center,
  Text,
  Button,
  ScrollView,
  HStack,
  Pressable,
} from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  WGBackgroundComponent,
  WGBigCardComponent,
  WGCardComponent,
  WGFormComponent,
} from '../../libs';
import { TripModel } from 'models';

interface PlanDetailProps {
  navigation: any;
}

function PlanScreen(props: PlanDetailProps) {
  // * Get data from store
  const trips = useAppSelector((state) => state.trips);

  const handleCardPress = (tripId: string) => {
    console.log('handleCardPress', tripId);

    return props.navigation.navigate('PlanDetail', { tripId });
  };

  const handleCreateTripClick = () => {
    return props.navigation.navigate('PlanCreateTrip');
  };

  const handleCreatePartyClick = () => {
    return props.navigation.navigate('PlanCreateParty');
  };

  const CreateCard = (width: number, title: string, imgSrc, type) => (
    <Pressable onPress={type === 'trip' ? handleCreateTripClick : handleCreatePartyClick}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'coolGray.100'}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            rounded="md"
          >
            <Box rounded={'md'} bg={'white'} w={width}>
              <AspectRatio w="100%" ratio={16 / 12}>
                <Image
                  rounded="md"
                  source={{
                    uri: imgSrc,
                  }}
                  alt="creating-image"
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
                bottom="0"
                px="3"
                py="1.5"
              >
                {title}
              </Center>
            </Box>
          </Box>
        );
      }}
    </Pressable>
  );

  const imgTrip =
    'https://indochinacharmtours.com/data/tour/1610350082_vietnam-tours-from-india-banner-003.jpg';
  const imgParty = 'https://www.jpsmart-club.com/wp-content/uploads/2020/09/kanpai.jpg';

  return (
    <VStack style={styles.container} px={5} space={5}>
      <WGFormComponent title="Khởi tạo">
        <HStack space="3" alignItems="center">
          {CreateCard(166, 'ĐI CHƠI', imgTrip, 'trip')}
          {CreateCard(166, 'ĐI NHẠO', imgParty, 'party')}
        </HStack>
      </WGFormComponent>

      <WGFormComponent
        title="Các chuyến sắp tới"
        contentStyle={{ marginBottom: 65, maxHeight: 500 }}
      >
        <ScrollView>
          <VStack style={styles.container} space={3}>
            {trips.length > 0 ? (
              trips.map((trip) => (
                <WGBigCardComponent key={trip.id} data={trip} onCardPress={handleCardPress} />
              ))
            ) : (
              <Center h={'full'}>
                <Text fontWeight={'bold'}>Không đi đâu à ?</Text>
                <Text>Nhanh trí thêm chuyến đi ở phần "Khởi Tạo" nà</Text>
              </Center>
            )}
          </VStack>
        </ScrollView>
      </WGFormComponent>
    </VStack>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    // height: 160,
  },
  scrollView: {
    paddingBottom: 40,
  },
});

export default WGBackgroundComponent(PlanScreen);
