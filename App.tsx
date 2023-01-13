import { SafeAreaView, StyleSheet } from 'react-native';
import { Box, extendTheme, Image, NativeBaseProvider } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ASSETS_ENUM } from './src/utils/enums';
import { BlurView } from 'expo-blur';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { SignUpScreen, LoginScreen, OnBoardingScreen } from './src/authentication';

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator initialRouteName="signUp" screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <AuthenticationStack.Screen name="login" component={LoginScreen} />
      <AuthenticationStack.Screen name="signUp" component={SignUpScreen} />
    </AuthenticationStack.Navigator>
  );
};

const config = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
};

const theme = extendTheme({
  colors: {},
  components: {
    Button: {
      // Can simply pass default props to change default behavior of components.
      baseStyle: {
        rounded: 'md',
        _text: {
          fontWeight: 700,
        },
      },
      defaultProps: {},
    },
    ScrollView: {
      baseStyle: {},
    },
    Input: {
      baseStyle: {
        rounded: 'md',
        height: 12,
        backgroundColor: 'white',
      },
    },
  },
  fontSizes: {},
  fonts: {},
  config: {},
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider config={config} theme={theme}>
        <NavigationContainer theme={MyTheme}>
          <Box style={styles.container}>
            <Box style={styles.container}>
              <Image
                alt="img-app"
                source={ASSETS_ENUM.IMAGES_ENUM.BACKGROUND}
                resizeMode={'cover'}
                style={[styles.image, StyleSheet.absoluteFill]}
              />
              <BlurView intensity={90} style={styles.container}>
                <SafeAreaView style={[styles.container, styles.safeArea]}>
                  {/* <Tabs /> */}
                  <AuthenticationNavigator />
                </SafeAreaView>
              </BlurView>
            </Box>
          </Box>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
});
