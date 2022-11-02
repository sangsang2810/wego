import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { PlanCreatePartyScreen, PlanCreateTripScreen, PlanDetailScreen } from './Components';
import PlanScreen from './PlanScreen';

const Stack = createStackNavigator();

const PlanNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerMode: 'screen',
    }}
  >
    <Stack.Screen
      name="PlanMain"
      component={PlanScreen}
      options={{
        headerShown: false,
        title: 'Plan',
      }}
    />
    <Stack.Screen
      name="PlanDetail"
      component={PlanDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PlanCreateTrip"
      component={PlanCreateTripScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PlanCreateParty"
      component={PlanCreatePartyScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default PlanNavigation;
