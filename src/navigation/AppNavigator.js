import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '@redux/slices/settingSlice';
import {RootStackNavigator} from './StackNavigator';

const AppNavigator = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.settings);
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme['color-primary-500'],
      card: '#000000',
      text: '#FFFFFF',
      border: '#000000',
    },
  };

  useEffect(() => {
    dispatch(setLanguage.trigger({language}));
  }, [dispatch, language]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
