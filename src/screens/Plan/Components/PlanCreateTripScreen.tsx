import { Badge, Box, Button, Center, Flex, FormControl, HStack, Icon, Image, Input, KeyboardAvoidingView, ScrollView, Text, VStack } from 'native-base'
import React from 'react'
import { Platform } from 'react-native'
import { WGBackgroundComponent, WGFormComponent } from '../../../libs'
import { ASSETS_ENUM } from '../../../utils/enums'


function PlanCreateTripScreen() {
  const config = ['banner', 'trip name', 'leader', 'members', 'deposit', 'trip create']
  const convertName: FormName = {
    'banner': 'Banner',
    'trip name': 'Tên chuyến đi',
    'leader': 'Trưởng nhóm',
    'members': 'Thành viên',
    'deposit': 'Tiền cọc',
    'trip create': 'Thêm địa điểm',
  }
  const addrIcon = ASSETS_ENUM.ICONS_ENUM.PIN;
  const clockIcon = ASSETS_ENUM.ICONS_ENUM.CLOCK;
  const priceIcon = ASSETS_ENUM.ICONS_ENUM.MONEY;

  const [formData, setData] = React.useState({
    name: 'Da Lat',
    deposit: '',
    locationName: '',
    price: '',
    time: '',
    location: '',
  });
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'Name is required'
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short'
      });
      return false;
    }
    return true;
  }

  const onSubmit = () => {
    validate()
  };

  const onClickBadge = () => {
    console.log('clicked badge delete');

  }

  const row = (sourceImg: any, fieldName: string, placeholder: string) => {
    return (
      <HStack
        px={3}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems='center'>
        <Icon mr={1} size="md" display={'flex'} justifyContent={'center'} alignItems={'center'} color="white">
          <Image source={sourceImg} resizeMode='contain' alt='icn-add' />
        </Icon>
        <Input
          variant="filled"
          placeholder={placeholder}
          value={formData[fieldName]}
          onChangeText={value => setData({
            ...formData,
            [fieldName]: value
          })} />
      </HStack>
    )
  }

  const renderBtnAdd = () => (

    <Button px={5}>
      <Image
        source={ASSETS_ENUM.ICONS_ENUM.ADD_USER}
        alt="add user"
        resizeMode='contain'
        style={{
          width: 25,
          height: 25,
          tintColor: 'white',
        }} />
    </Button>

  )

  const renderCell = (title: string) => {
    let cell;
    switch (title) {
      case 'banner':
        cell = (
          <Center >
            <Image
              alt="billboard"
              resizeMode='contain'
              size="xl"
              source={ASSETS_ENUM.IMAGES_ENUM.BILL_BOARD} />
          </Center>
        )
        break;
      case 'trip name':
        cell = (
          <>
            <Input
              fontWeight="semibold"
              variant="filled"
              bg={'white:alpha.80'}
              fontSize={'md'}
              color={'violet.500'}
              value={formData.name}
              onChangeText={value => setData({
                ...formData,
                name: value
              })} />
            {
              'name' in errors
                ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                : <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
            }
          </>
        )
        break;
      case 'leader':
        cell = (
          <>
            <HStack>
              <Image source={{
                uri: "https://a-static.besthdwallpaper.com/dante-fanart-devil-may-cry-5-tro-choi-dien-tu-hinh-nen-2560x1600-68922_7.jpg"
              }} alt="Alternate Text"
                size="sm"
                rounded={'md'} />
            </HStack>
          </>
        )
        break;
      case 'members':
        cell = (
          <>
            <HStack space={2}>

              {renderBtnAdd()}

              <HStack>
                <Image source={{
                  uri: "https://a-static.besthdwallpaper.com/dante-fanart-devil-may-cry-5-tro-choi-dien-tu-hinh-nen-2560x1600-68922_7.jpg"
                }} alt="Alternate Text"
                  size="sm"
                  rounded={'md'} />
                <Badge
                  onTouchEnd={onClickBadge}
                  colorScheme="error"
                  rounded="full"
                  ml={-5}
                  mt={-2}
                  borderColor={'white'}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-start"
                  borderWidth={'2'}
                  _text={{
                    fontSize: 14
                  }}>
                  X
                </Badge>
              </HStack>

              <HStack>
                <Image source={{
                  uri: "https://a-static.besthdwallpaper.com/dante-fanart-devil-may-cry-5-tro-choi-dien-tu-hinh-nen-2560x1600-68922_7.jpg"
                }} alt="Alternate Text"
                  size="sm"
                  rounded={'md'} />
                <Badge
                  onTouchEnd={onClickBadge}
                  colorScheme="error"
                  rounded="full"
                  ml={-5}
                  mt={-2}
                  borderColor={'white'}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-start"
                  borderWidth={'2'}
                  _text={{
                    fontSize: 14
                  }}>
                  X
                </Badge>
              </HStack>
            </HStack>
          </>
        )
        break;
      case 'deposit':
        cell = (
          <>
            <Flex width={'full'} direction='row' alignItems={'center'}>
              <Input
                variant="filled"
                width={'2/4'}
                fontWeight="semibold"
                fontSize={'md'}
                color={'violet.500'}
                value={formData.deposit}
                placeholder="Cọc nhiu nà"
                onChangeText={value => setData({
                  ...formData,
                  deposit: value
                })} />
              <Text ml={3} fontSize={'lg'} fontWeight="semibold" color={'violet.500'}>VND</Text>
            </Flex>
            {
              'deposit' in errors
                ? <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
                : <FormControl.HelperText>
                  Cọc để tránh bùng kèo, mà bùng kèo thì mất cọc 👌
                </FormControl.HelperText>
            }
          </>
        )
        break;
      case 'trip create':
        cell = (
          <>
            <HStack>
              <VStack space={2} width={'1/3'}>
                <Input fontSize={'md'} placeholder="Thời gian" variant="filled" />
                <Image
                  alt="billboard"
                  resizeMode='contain'
                  size="xl"
                  source={ASSETS_ENUM.IMAGES_ENUM.PHD_IMAGE} />
                <Button variant={'ghost'}>
                  Nhập lại
                </Button>
              </VStack>

              <VStack pl={3} width={'2/3'}>
                <Input
                  variant="filled"
                  placeholder="Tên địa điểm"
                  fontWeight="semibold"
                  fontSize={'md'}
                  color={'violet.500'}
                  value={formData.locationName}
                  onChangeText={value => setData({
                    ...formData,
                    locationName: value
                  })} />
                <VStack mt={3} space={2}>
                  {row(addrIcon, 'location', 'Địa chỉ')}
                  {row(clockIcon, 'time', 'Giờ mở cửa')}
                  {row(priceIcon, 'price', 'Gía tiền')}
                </VStack>
                <Button mt={5}>Thêm địa điểm ✨</Button>
              </VStack>
            </HStack>
          </>
        )
        break;
      default:
        // nothing happen !
        break;
    }
    return cell
  }
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0

  return (
    <Box flex={1} p={5}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      // keyboardVerticalOffset={keyboardVerticalOffset}
      // enabled
      >
        <ScrollView>
          <FormControl isRequired isInvalid={'name' in errors}>
            <VStack space={3}>
              {
                config.map((item, index) => (
                  <WGFormComponent key={index} title={convertName[item]}>
                    {renderCell(item)}
                  </WGFormComponent>
                ))
              }
            </VStack>
          </FormControl>
          <Button onPress={onSubmit} mt="5" colorScheme="cyan">
            Submit
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  )
}

type FormName = {
  [key: string]: string;
}

export default WGBackgroundComponent(PlanCreateTripScreen)