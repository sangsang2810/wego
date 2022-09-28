import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/Home/HomeScreen';
import PlanNavigation from '../screens/Plan/Plan.navigate';
import SettingScreen from '../screens/Setting/SettingScreen';
import SaveScreen from '../screens/Save/SaveScreen';
import { ASSETS_ENUM, SCREEN_ENUMS } from '../utils/enums';

const Tab = createBottomTabNavigator();

function Tabs() {

  const tabsConfig = [
    {
      name: SCREEN_ENUMS.HOME.name,
      iconUri: ASSETS_ENUM.ICONS_ENUM.HOME,
      component: HomeScreen,
    },
    {
      name: SCREEN_ENUMS.PLAN.name,
      iconUri: ASSETS_ENUM.ICONS_ENUM.PLAN,
      component: PlanNavigation,
    },
    {
      name: SCREEN_ENUMS.SAVE.name,
      iconUri: ASSETS_ENUM.ICONS_ENUM.STORY,
      component: SaveScreen,
    },
    {
      name: SCREEN_ENUMS.SETTING.name,
      iconUri: ASSETS_ENUM.ICONS_ENUM.SETTING,
      component: SettingScreen,
    }
  ]

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        showIcon: true,
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          // bottom: 20,
          elevation: 0,
          borderRadius: 25,
          backgroundColor: '#ffffff',
          height: 80,
          ...styles.shadow,
        }
      }}
    >
      {
        tabsConfig.map((item, index) => {
          return (
            <Tab.Screen style={styles.container} key={index} name={item.name} component={item.component} options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.tab}>
                  <Image
                    alt={index}
                    source={item.iconUri}
                    resizeMode='contain'
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? 'red' : '#748c94',
                    }} />
                </View>
              ),
            }}
            />
          )
        })
      }
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  }
})

export default Tabs