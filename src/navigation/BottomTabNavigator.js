import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Home from '@screens/Home/Home';
// import Voucher from '@screens/Voucher/Voucher';
import Menu from '@screens/Menu/Menu';
// import Cart from '@screens/Cart/Cart';
import Profile from '@screens/Profile/Profile';
import {strings} from '@localizations/localization';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const {language} = useSelector(state => state.settings);

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
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
      {/* <BottomTab.Screen
        name="Voucher"
        component={Voucher}
        options={{
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
      /> */}
      <BottomTab.Screen
        name="Menu"
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
      {/* <BottomTab.Screen
        name="Cart"
        component={Cart}
        options={{
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
      /> */}
      <BottomTab.Screen
        name="Profile"
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
