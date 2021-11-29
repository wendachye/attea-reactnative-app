import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import DigitalStamp from '@screens/DigitalStamp/DigitalStamp';
import OrderHistory from '@screens/OrderHistory/OrderHistory';
import PointHistory from '@screens/PointHistory/PointHistory';
import OrderDetails from '@screens/OrderDetails/OrderDetails';
import InviteFriends from '@screens/InviteFriends/InviteFriends';

const RootStack = createStackNavigator();
const MainStack = createNativeStackNavigator();

export const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="bottom-tab" component={BottomTabNavigator} />
      <MainStack.Screen name="profile-details" component={ProfileDetails} />
      <MainStack.Screen name="outlet" component={Outlet} />
      <MainStack.Screen name="mood" component={Mood} />
      <MainStack.Screen name="announcement" component={Announcement} />
      <MainStack.Screen name="settings" component={Settings} />
      <MainStack.Screen name="language" component={Language} />
      <MainStack.Screen name="digital-stamp" component={DigitalStamp} />
      <MainStack.Screen name="order-history" component={OrderHistory} />
      <MainStack.Screen name="point-history" component={PointHistory} />
      <MainStack.Screen name="order-details" component={OrderDetails} />
      <MainStack.Screen name="invite-friends" component={InviteFriends} />
    </MainStack.Navigator>
  );
};

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}>
      <RootStack.Screen name="left-drawer" component={DrawerNavigator} />
      <RootStack.Screen name="sign-in" component={SignIn} />
      <RootStack.Screen name="sign-up" component={SignUp} />
      <RootStack.Screen name="forget-password" component={ForgotPassword} />
      <RootStack.Screen name="item" component={Item} />
    </RootStack.Navigator>
  );
};
