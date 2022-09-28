import { HStack, Center, Box, AspectRatio, Image, Avatar, Text, Container, View, VStack, Progress, Button, Heading, ScrollView, Icon } from 'native-base'
import React from 'react'
import { WGBackgroundComponent } from '../../libs'
import { ASSETS_ENUM } from '../../utils/enums'

function SettingScreen({ navigation }) {

  const handleColorProgress = (point: number) => {
    let color
    switch (true) {
      case point > 0 && point <= 20:
        color = 'error'
        break;
      case point > 20 && point <= 40:
        color = 'danger'
        break;
      case point > 40 && point <= 60:
        color = 'warning'
        break;
      case point > 60 && point <= 80:
        color = 'fuchsia'
        break;
      case point > 80 && point <= 100:
        color = 'success'
        break;
      default:
        color = ''
        break;
    }
    return color
  }

  const configRow = (icon: any, title: string) => {
    return (
      <>
        <Button
          justifyContent={'flex-start'}
          variant={'ghost'}
          alignItems={'flex-start'}
          startIcon={
            <Icon size="3xl" display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Image source={icon} resizeMode='contain' />
            </Icon>
          }><Text fontWeight={'medium'} fontSize={'lg'}>
            {title}
          </Text></Button>

      </>
    );
  }

  const configAlbums = () => {
    return (
      <>
        <VStack alignItems={'center'} w={20}>
          <Avatar
            borderWidth={2}
            borderColor={'violet.400'}
            size={'lg'}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            }}></Avatar>
          <Text noOfLines={1} flexWrap={'wrap'} >Nha Trang</Text>
        </VStack>
      </>
    )
  }

  return (
    <Box flex={1} px={5}>
      <VStack space={5}>
        <Box p={3} backgroundColor={'white'} rounded={'2xl'}>
          <HStack space="3">
            <Avatar alignSelf="center" bg="amber.500" size="xl" borderWidth={3} borderColor={'violet.400'} source={{
              uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            }}>
            </Avatar>
            <Box maxW={'5/6'}>
              <Text noOfLines={2} fontSize="xl" color={'fuchsia.400'} flexWrap={'wrap'} bold>
                Becki Bei
              </Text>
              <Text fontWeight={'semibold'} color={'coolGray.400'}>Nhân viên văn phòng á </Text>
              <Progress w={'full'} bg="coolGray.100" colorScheme={handleColorProgress(100)} value={70} />
            </Box>
          </HStack>
        </Box>

        <Box p={3} bg={'white'} rounded={'2xl'}>
          <Heading size="sm" ml="-1" mb={3}>
            Albums
          </Heading>
          <ScrollView horizontal>
            <HStack space={2} pb={3}>
              {configAlbums()}
              {configAlbums()}
              {configAlbums()}
              {configAlbums()}

            </HStack>
          </ScrollView>
        </Box>

        <Box p={3} bg={'white'} rounded={'2xl'}>
          <VStack >
            {configRow(ASSETS_ENUM.ICONS_ENUM.PENCIL, 'Chỉnh sửa thông tin')}
            {configRow(ASSETS_ENUM.ICONS_ENUM.SHEET, 'Lịch sử chuyến đi')}
            {configRow(ASSETS_ENUM.ICONS_ENUM.PASSWORD, 'Đổi mật khấu')}
          </VStack>
        </Box>
        <Box p={3} bg={'white'} rounded={'2xl'}>
          {configRow(ASSETS_ENUM.ICONS_ENUM.LOG_OUT, 'Đăng xuất')}
        </Box>
      </VStack>
    </Box>
  )
}

export default WGBackgroundComponent(SettingScreen)