import { WGBackgroundComponent, WGFormComponent, WGFormControlComponent } from '../libs';
import { Box, Button, Center, Heading, HStack, Input, Text, VStack } from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { handleLogin } from '../services/Slices/AuthSlice';
import { useAppDispatch } from '../app/hooks';
import { Link } from '@react-navigation/native';

function LoginScreen() {
  const dispatch = useAppDispatch();
  const MAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [show, setShow] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const handleClick = () => setShow(!show);

  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      console.log('oke la');
    }

    dispatch(handleLogin());
  };

  const validate = () => {
    setErrors({});
    let errors = {};

    // * validate name
    if (formData.email.length === 0) {
      errors = { ...errors, email: 'Cái này phải có chớ' };
    } else if (!MAIL_REGEX.test(String(formData.email).toLowerCase())) {
      errors = { ...errors, email: 'Mail thế này là chưa chuẩn' };
    }
    // * validate deposit
    if (formData.password.length === 0) {
      errors = { ...errors, password: 'Cái này phải có chớ' };
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    return true;
  };

  return (
    <Center flex={1}>
      <Box p="2" py="8" w="95%">
        <WGFormComponent title="">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
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

            <Link to={{ screen: 'signUp' }}>Forget Password?</Link>

            <Button mt="2" colorScheme="indigo" onPress={onSubmit} isLoading={true}>
              Đăng nhập
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600">
                Tui ma mới -{' '}
              </Text>
              <Link to={{ screen: 'signUp' }}>
                <Text fontSize="sm" color="blue.500">
                  tạo tài khoản
                </Text>
              </Link>
            </HStack>
          </VStack>
        </WGFormComponent>
      </Box>
    </Center>
  );
}
export default WGBackgroundComponent(LoginScreen);
