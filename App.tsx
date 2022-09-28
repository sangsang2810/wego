import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import Tabs from './src/navigation/Tabs';
import { Box, extendTheme, NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoardingScreen from './src/authentication/index';
import { LinearGradient } from 'expo-linear-gradient';
import AppNavigation from './src/App.navigation';
import { ASSETS_ENUM } from './src/utils/enums';
import { BlurView } from 'expo-blur';

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoardingScreen} />
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
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'violet',
      },
    },
    ScrollView: {
      baseStyle: {
        // marginBottom: 65,
      },
    },
  },
  fontSizes: {},
  fonts: {},
  config: {},
});

export default function App() {
  return (
    <NativeBaseProvider config={config} theme={theme}>
      <NavigationContainer>
        <Box
          bg={{
            linearGradient: {
              colors: ['indigo.200', 'fuchsia.300'],
              start: [0, 0],
              end: [1, 1],
            },
          }}
          style={styles.container}
        >
          <Box style={styles.container}>
            <ImageBackground
              source={ASSETS_ENUM.IMAGES_ENUM.BACKGROUND}
              // alt="Alternate Text"
              // size={'2xl'}
              resizeMode={'cover'}
              // blurRadius={8}
              style={[styles.image, StyleSheet.absoluteFill]}
            >
              <BlurView intensity={100} style={styles.container}>
                <SafeAreaView style={[styles.container, styles.safeArea]}>
                  <View style={styles.container}>
                    {/* <AppNavigation/> */}
                    <Tabs />
                  </View>
                </SafeAreaView>
              </BlurView>
            </ImageBackground>
          </Box>
        </Box>
        {/* <AuthenticationNavigator /> */}
      </NavigationContainer>
    </NativeBaseProvider>
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
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
