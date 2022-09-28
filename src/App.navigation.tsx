import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import PlanDetailScreen from './screens/Plan/Components/PlanDetailScreen';
import PlanScreen from './screens/Plan/PlanScreen';

const { Navigator, Screen } = createStackNavigator();

const AppNavigation = () => (
    <Navigator>
        <Screen name="PlanDetail" component={PlanDetailScreen} ></Screen>
        <Screen name="Plan" component={PlanScreen} ></Screen>
    </Navigator>
)
export default AppNavigation;
