import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {MainStackNavigator} from './StackNavigator';
import DrawerContent from '@components/DrawerContent/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const getGestureEnabled = route => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'bottom-tab';
    return routeName === 'bottom-tab';
  };

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        component={MainStackNavigator}
        options={({route}) => {
          return {
            gestureEnabled: getGestureEnabled(route),
          };
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
