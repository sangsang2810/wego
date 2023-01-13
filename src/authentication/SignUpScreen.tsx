import { WGBackgroundComponent, WGFormComponent, WGFormControlComponent } from '../libs';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';

function SignUpScreen() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);

  return (
    <Center flex={1}>
      <Box p="2" py="8" w="95%">
        <WGFormComponent title="">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold"
          >
            Đăng ký
          </Heading>
          <VStack mt="5">
            <WGFormControlComponent
              errorMessage={errors['email']}
              helperText=""
              name="email"
              errors={errors}
            >
              <Input
                pl={3}
                placeholder="Email"
                InputLeftElement={
                  <Box pl={2}>
                    <Ionicons name="md-mail" size={24} color="black" />
                  </Box>
                }
                value={formData.email}
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    email: value,
                  })
                }
              />
            </WGFormControlComponent>

            <WGFormControlComponent
              errorMessage={errors['password']}
              helperText=""
              name="password"
              errors={errors}
            >
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Password"
                InputLeftElement={
                  <Box pl={2}>
                    <Ionicons name="ios-lock-closed" size={24} color="black" />
                  </Box>
                }
                value={formData.password}
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    password: value,
                  })
                }
              />
            </WGFormControlComponent>

            <WGFormControlComponent
              errorMessage={errors['password']}
              helperText=""
              name="password"
              errors={errors}
            >
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Password"
                InputLeftElement={
                  <Box pl={2}>
                    <Ionicons name="ios-lock-closed" size={24} color="black" />
                  </Box>
                }
                value={formData.password}
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    password: value,
                  })
                }
              />
            </WGFormControlComponent>

            <Button mt="2" colorScheme="indigo">
              Đăng ký
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
              >
                Nhớ ra là mình tạo rồi đúng hơm,{' '}
              </Text>
              <Link to={{ screen: 'login' }}>Đăng nhập lại nè</Link>
            </HStack>
          </VStack>
        </WGFormComponent>
      </Box>
    </Center>
  );
}

export default WGBackgroundComponent(SignUpScreen);
