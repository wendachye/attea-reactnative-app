import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Home from '@screens/Home/Home';
import Voucher from '@screens/Voucher/Voucher';
import Menu from '@screens/Menu/Menu';
import Cart from '@screens/Cart/Cart';
import Profile from '@screens/Profile/Profile';
import {strings} from '@localizations/localization';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {language} = useSelector(state => state.settings);

  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          title: strings.getString('home', language),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="voucher"
        component={Voucher}
        options={{
          title: strings.getString('voucher', language),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'ticket-percent' : 'ticket-percent-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="menu"
        component={Menu}
        options={{
          title: strings.getString('menu', language),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'coffee' : 'coffee-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="cart"
        component={Cart}
        options={{
          title: strings.getString('cart', language),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'cart' : 'cart-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          title: strings.getString('profile', language),
          tabBarIcon: ({focused, color, size}) => {
            return (
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
