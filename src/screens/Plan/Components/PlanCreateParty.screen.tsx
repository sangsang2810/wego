import {
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  VStack,
} from 'native-base';

import React from 'react';
import { Platform } from 'react-native';
import { WGBackgroundComponent, WGFormComponent } from '../../../libs';
import { ASSETS_ENUM } from '../../../utils/enums';

function PlanCreatePartyScreen() {
  const config = ['banner', 'party name', 'host', 'members', 'where', 'when', 'why'];
  const [errors, setErrors] = React.useState({});
  const [formData, setData] = React.useState({
    name: 'Da Lat',
    where: '',
    when: '',
    why: '',
  });

  const convertName: FormName = {
    banner: 'Banner',
    'party name': 'Tên chuyến đi',
    host: 'Host',
    members: 'Thành viên',
    when: 'When',
    where: 'Where',
    why: 'Why',
  };

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'Name is required',
      });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({
        ...errors,
        name: 'Name is too short',
      });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    validate();
  };

  const renderBtnAdd = () => (
    <Button px={5}>
      <Image
        source={ASSETS_ENUM.ICONS_ENUM.ADD_USER}
        alt="add user"
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: 'white',
        }}
      />
    </Button>
  );

  const onClickBadge = () => {};

  const renderCell = (title: string) => {
    let cell;
    switch (title) {
      case 'banner':
        cell = (
          <Center>
            <Image
              alt="billboard"
              resizeMode="contain"
              size="xl"
              source={ASSETS_ENUM.IMAGES_ENUM.BILL_BOARD}
            />
          </Center>
        );
        break;
      case 'party name':
        cell = (
          <>
            <Input
              fontWeight="semibold"
              variant="filled"
              bg={'white:alpha.80'}
              fontSize={'md'}
              color={'violet.500'}
              value={formData.name}
              onChangeText={(value) =>
                setData({
                  ...formData,
                  name: value,
                })
              }
            />
            {'name' in errors ?? <FormControl.ErrorMessage>Phải có tên á</FormControl.ErrorMessage>}
          </>
        );
        break;
      case 'host':
        cell = (
          <>
            <HStack>
              <Image
                source={{
                  uri: 'https://a-static.besthdwallpaper.com/dante-fanart-devil-may-cry-5-tro-choi-dien-tu-hinh-nen-2560x1600-68922_7.jpg',
                }}
                alt="Alternate Text"
                size="sm"
                rounded={'md'}
              />
            </HStack>
          </>
        );
        break;
      case 'members':
        cell = (
          <>
            <HStack space={2}>
              {renderBtnAdd()}

              <HStack>
                <Image
                  source={{
                    uri: 'https://a-static.besthdwallpaper.com/dante-fanart-devil-may-cry-5-tro-choi-dien-tu-hinh-nen-2560x1600-68922_7.jpg',
                  }}
                  alt="Alternate Text"
                  size="sm"
                  rounded={'md'}
                />
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
                    fontSize: 14,
                  }}
                >
                  X
                </Badge>
              </HStack>

              <HStack>
                <Image
                  source={{
                    uri: 'https://a-static.besthdwallpaper.com/dante-fanart-devil-may-cry-5-tro-choi-dien-tu-hinh-nen-2560x1600-68922_7.jpg',
                  }}
                  alt="Alternate Text"
                  size="sm"
                  rounded={'md'}
                />
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
                    fontSize: 14,
                  }}
                >
                  X
                </Badge>
              </HStack>
            </HStack>
          </>
        );
        break;
      case 'where':
        cell = (
          <>
            <Input
              isRequired
              variant="filled"
              fontSize={'md'}
              color={'violet.500'}
              value={formData.where}
              placeholder="Cho cái địa chỉ"
              onChangeText={(value) =>
                setData({
                  ...formData,
                  where: value,
                })
              }
            />
            {'where' in errors ?? (
              <FormControl.ErrorMessage>Khum có địa chỉ sao mà đi 😭</FormControl.ErrorMessage>
            )}
          </>
        );
        break;
      case 'when':
        cell = (
          <>
            <Input
              isRequired
              variant="filled"
              fontSize={'md'}
              color={'violet.500'}
              value={formData.when}
              placeholder="Mấy h nà"
              onChangeText={(value) =>
                setData({
                  ...formData,
                  when: value,
                })
              }
            />
            {'when' in errors ?? (
              <FormControl.ErrorMessage>Khum biết h sao mà đi ⏱️</FormControl.ErrorMessage>
            )}
          </>
        );
        break;
      case 'why':
        cell = (
          <>
            <Input
              variant="filled"
              fontSize={'md'}
              color={'violet.500'}
              value={formData.why}
              placeholder="vì sao nà, mà cần gì vì sao "
              onChangeText={(value) =>
                setData({
                  ...formData,
                  why: value,
                })
              }
            />
          </>
        );
        break;
      default:
        // nothing happen !
        break;
    }
    return cell;
  };

  return (
    <Box flex={1} p={5}>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={keyboardVerticalOffset}
        // enabled
      >
        <ScrollView>
          <FormControl isRequired isInvalid={'name' in errors}>
            <VStack space={3}>
              {config.map((item, index) => (
                <WGFormComponent key={index} title={convertName[item]}>
                  {renderCell(item)}
                </WGFormComponent>
              ))}
            </VStack>
          </FormControl>
          <Button onPress={onSubmit} mt="5" colorScheme="cyan">
            Submit
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Box>
  );
}

type FormName = {
  [key: string]: string;
};

export default WGBackgroundComponent(PlanCreatePartyScreen);
