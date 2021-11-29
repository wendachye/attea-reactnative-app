import React, {memo} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Layout, Divider} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import DrawerHeaderGuest from '@components/DrawerHeader/DrawerHeaderGuest';
import DrawerItem from '@components/DrawerItem/DrawerItem';
import DrawerFooter from '@components/DrawerFooter/DrawerFooter';
import useStyles from './DrawerContent.Styles';

const DrawerContent = props => {
  const {navigation} = props;
  const styles = useStyles();
  const {isLoggedIn} = useSelector(state => state.user);

  let drawerItems = [
    {
      label: 'Home',
      icon: ({color, size}) => (
        <MaterialCommunityIcons name={'home'} color={color} size={size} />
      ),
      onPress: () => {
        navigation.jumpTo('home');
        navigation.closeDrawer();
      },
    },
  ];

  if (isLoggedIn) {
    drawerItems = [
      ...drawerItems,
      {
        label: 'My Voucher',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name={'postage-stamp'}
            color={color}
            size={size}
          />
        ),
        onPress: () => {
          navigation.jumpTo('voucher');
          navigation.closeDrawer();
        },
      },
      {
        label: 'My Point',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name={'qrcode-scan'}
            color={color}
            size={size}
          />
        ),
        onPress: () => navigation.navigate('point-history'),
      },
      {
        label: 'Digital Stamp',
        icon: ({color, size}) => (
          <MaterialCommunityIcons
            name={'postage-stamp'}
            color={color}
            size={size}
          />
        ),
        onPress: () => navigation.navigate('digital-stamp'),
      },
      {
        label: 'Order History',
        icon: ({color, size}) => (
          <MaterialCommunityIcons name={'history'} color={color} size={size} />
        ),
        onPress: () => navigation.navigate('order-history'),
      },
    ];
  }

  drawerItems = [
    ...drawerItems,
    {
      label: 'Settings',
      icon: ({color, size}) => (
        <MaterialIcons name={'settings'} color={color} size={size} />
      ),
      onPress: () => navigation.navigate('settings'),
    },
  ];

  return (
    <Layout style={styles.container}>
      <DrawerHeaderGuest />
      <DrawerContentScrollView
        {...props}
        style={styles.drawerContentScrollView}
        contentContainerStyle={styles.drawerContentContainer}
        showsVerticalScrollIndicator={false}>
        {drawerItems.map(({label, icon, onPress}, index) => (
          <DrawerItem key={index} label={label} icon={icon} onPress={onPress} />
        ))}
        <Divider />
        <DrawerFooter />
      </DrawerContentScrollView>
    </Layout>
  );
};

export default memo(DrawerContent);
