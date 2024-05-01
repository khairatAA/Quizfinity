import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import LeadershipBoard from '../screens/LeadershipBoard';
import Profile from '../screens/Profile';
import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import AttemptsScreen from '../screens/AttemptsScreen';

const Tab = createBottomTabNavigator();

const ButtomTab = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
            headerShown: false,
        }}
      >
        <Tab.Screen options={{tabBarLabel:'Home'}} name="Home" component={HomeScreen} />
        <Tab.Screen options={{tabBarLabel: 'Attempts'}} name="Attempts" component={AttemptsScreen} />
        <Tab.Screen options={{tabBarLabel: 'Ranking'}} name="Ranking" component={LeadershipBoard} />
        <Tab.Screen options={{tabBarLabel: 'Profile'}} name="Profile" component={Profile} />
      </Tab.Group>
    </Tab.Navigator>
  )
}

export default ButtomTab