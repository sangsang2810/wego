import { AspectRatio, Avatar, Box, Center, Heading, HStack, Image, ScrollView, Text, View, VStack } from 'native-base'
import React from 'react'
import { LogBox, StyleSheet } from 'react-native';
import { WGBackgroundComponent, WGHeader, WGTab, WGTimeLineComponent } from '../../../libs';
import { SCREEN_ENUMS } from '../../../utils/enums';


function PlanDetailScreen() {

  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])

  const TransportMode = () => (
    <Box bg="white" p={3} roundedBottomLeft='md' roundedBottomRight={'md'}>
      <VStack>
        <HStack justifyContent={'space-between'}>
          <Text fontSize="sm" color={'gray.400'}>Số vé: KB434</Text>
          <Text fontSize="sm">Ngày đi/về</Text>
        </HStack>
        <HStack py={5} space="3" alignItems="center" >
          <Text fontSize="md">Icon</Text>
          <Text fontSize="md">Sài Gòn - Đà Nẵng</Text>
        </HStack>
      </VStack>
    </Box>
  )

  const temp = [{
    key: 'go',
    tabTitle: 'Lúc đi',
    tabView: (<>
      <TransportMode />
    </>),
  }, {
    key: 'return',
    tabTitle: 'Lúc về',
    tabView: (<>
      <TransportMode />
    </>),
  },]

  const temp2 = [{
    key: 'day1',
    tabTitle: '17/09',
    tabView: (<>
      <WGTimeLineComponent />
    </>),
  },
  {
    key: 'day2',
    tabTitle: '18/09',
    tabView: (<>
      <WGTimeLineComponent />
    </>),
  },
  {
    key: 'day3',
    tabTitle: '19/09',
    tabView: (<>
      <WGTimeLineComponent />
    </>),
  }]

  return (
    <Box style={{ flex: 1 }}>
      <WGHeader isDisplayRight={false} isDisplayLeft={true} title={SCREEN_ENUMS.PLAN_DETAILS.name} />
      <ScrollView horizontal={false} style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }} rounded="lg">
        <Box>
          <AspectRatio w="100%" ratio={16 / 15}>
            <Image rounded={'md'} roundedBottomRight={58} source={{
              uri: "https://jtravel.com.vn/wp-content/uploads/2021/06/nha-trang-du-lich.jpg"
            }} alt="imagePlanDetail" />
          </AspectRatio>
          <Center rounded="md" bg="violet.500" _dark={{
            bg: "violet.400"
          }} _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
          }} position="absolute" bottom="0" px="3" py="1.5">
            Nha Trang nà
          </Center>
        </Box>
        <View h={180} p={3}>
          <WGTab routes={temp} />
        </View>
        <VStack p={3} space={5}>

          <View p={3} bgColor='white' rounded={'md'}>
            <Heading size="md" ml="-1">Đặt cọc & Thành viên</Heading>
            <HStack p={3} pb='0' bg='red' justifyContent="space-between" >
              <Text fontSize="lg" fontWeight={'semibold'} color={'violet.700'}>500k</Text>
              <Avatar.Group _avatar={{
                size: "sm"
              }} max={3}>
                <Avatar bg="green.500" source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                  A2
                </Avatar>
                <Avatar bg="green.500" source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                  A1
                </Avatar>
                <Avatar bg="green.500" source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                  A3
                </Avatar>
                <Avatar bg="green.500" source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }}>
                  A4
                </Avatar>
              </Avatar.Group>
            </HStack>
          </View>
          <View p={3} bgColor='white' rounded={'md'}>
            <Heading mb={3} size="md" ml="-1">
              Đi chơi Nha Trang
            </Heading>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </View>
          <View p={3} bgColor='white' rounded={'md'}>
            <Heading size="md" ml="-1">
              Lộ trình nà
            </Heading>
            <View h={'96'}>
              <WGTab routes={temp2} />
            </View>
          </View>
        </VStack>
      </ScrollView>
    </Box>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 65
  }
})

export default WGBackgroundComponent(PlanDetailScreen);