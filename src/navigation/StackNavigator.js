import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerNavigator from './DrawerNavigator';
import SignIn from '@screens/SignIn/SignIn';
import SignUp from '@screens/SignUp/SignUp';
import ForgotPassword from '@screens/ForgotPassword/ForgotPassword';
import ProfileDetails from '@screens/ProfileDetails/ProfileDetails';
import Item from '@screens/Item/Item';
import Outlet from '@screens/Outlet/Outlet';
import Mood from '@screens/Mood/Mood';
import Announcement from '@screens/Announcement/Announcement';
import Settings from '@screens/Settings/Settings';
import Language from '@screens/Language/Language';
import Test from '@screens/Test';

const RootStack = createStackNavigator();
const MainStack = createNativeStackNavigator();

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="bottom-tab" component={BottomTabNavigator} />
      <MainStack.Screen name="forgot-password" component={ForgotPassword} />
      <MainStack.Screen name="profile-details" component={ProfileDetails} />
      <MainStack.Screen name="outlet" component={Outlet} />
      <MainStack.Screen name="mood" component={Mood} />
      <MainStack.Screen name="announcement" component={Announcement} />
      <MainStack.Screen name="settings" component={Settings} />
      <MainStack.Screen name="language" component={Language} />
      <MainStack.Screen name="test" component={Test} />
    </MainStack.Navigator>
  );
};

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator mode="modal" screenOptions={{headerShown: false}}>
      <RootStack.Screen name="drawer" component={DrawerNavigator} />
      <RootStack.Screen name="sign-in" component={SignIn} />
      <RootStack.Screen name="sign-up" component={SignUp} />
      <RootStack.Screen name="item" component={Item} />
    </RootStack.Navigator>
  );
};
