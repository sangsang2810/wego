import { BlurView } from 'expo-blur';
import { Box, Button, HStack, Icon, Image, Input, ScrollView, VStack, Text, Menu, Pressable, Divider } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native';
import { WGBackgroundComponent, WGSaveCardComponent } from '../../libs'
import { ASSETS_ENUM } from '../../utils/enums'

function SaveScreen({ navigation }) {

  const ListItems = () => {
    return (
      <Box w={'full'}>
        <Text fontSize={'md'} color={'gray.400'}>
          Da Lat
        </Text>
        <VStack space="3" alignItems="center">
          <WGSaveCardComponent title={"Review Đà Lạt 5 ngày 4 đêm Review Đà Lạt 5 ngày 4 đêmReview Đà Lạt 5 ngày 4 đêm"} description={'vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} />
          <WGSaveCardComponent title={"Review Đà Lạt 5 ngày 4 đêm"} description={'vLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'} />
        </VStack>

      </Box>
    );
  }

  return (
    <Box px={5} bg={'red'}>
      <VStack h={'full'} space={5} backgroundColor={'red'}>
        <HStack w={'full'} space={3} alignSelf="center" bg={'white'} p={3} rounded={'md'}>
          <Input placeholder="Cho iêm cái tên... " width={'4/5'} borderRadius="4" p={3} fontSize="14"
            InputLeftElement={
              <Icon size="lg" ml={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Image source={ASSETS_ENUM.ICONS_ENUM.SEARCH} resizeMode='contain' alt='icn-search' />
              </Icon>
            }
          />

          <Menu width={'1/6'} w="180"
            placement={'bottom right'}
            trigger={triggerProps => {
              return (
                <Button {...triggerProps}
                  variant="outline"
                  startIcon={
                    <Icon size="lg" display={'flex'} justifyContent={'center'} alignItems={'center'} color="white">
                      <Image source={ASSETS_ENUM.ICONS_ENUM.ADD} resizeMode='contain' alt='icn-add' />
                    </Icon>
                  }>
                </Button>
              )
            }}>
            <Menu.Group title="Tạo bài viết">
              <Menu.Item>
                <Button>Tạo bài viết</Button>
              </Menu.Item>
            </Menu.Group>
            <Divider mt="3" w="100%" />
            <Menu.Group title="Lấy từ nguồn khác">
              <Menu.Item>Facebook</Menu.Item>
              <Menu.Item>Zalo</Menu.Item>
            </Menu.Group>
          </Menu>
        </HStack>

        <BlurView intensity={80}>

          <ScrollView style={styles.scrollView} px={3} rounded={'md'}>
            <VStack flex="1" space={2} pb={3}>
              <ListItems />
              <ListItems />
              <ListItems />
            </VStack>
          </ScrollView>
        </BlurView>

      </VStack>
    </Box >
  )
}


const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 100
  }
})
export default WGBackgroundComponent(SaveScreen)