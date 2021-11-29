import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Layout, Text} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import Header from '@components/Header/Header';
import Subheader from '@components/Subheader/Subheader';
import ActiveVoucher from '@screens/ActiveVoucher/ActiveVoucher';
import PastVoucher from '@screens/PastVoucher/PastVoucher';
import useStyles from './Voucher.Styles';

const Tab = createMaterialTopTabNavigator();

const Voucher = props => {
  const styles = useStyles();
  const {isLoggedIn} = useSelector(state => state.user);

  return (
    <Layout style={styles.container}>
      <Header />
      <Subheader />
      {isLoggedIn ? (
        <Tab.Navigator
          screenOptions={{
            tabBarPressOpacity: 0.7,
            tabBarIndicatorStyle: {
              backgroundColor: 'white',
            },
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 14,
            },
            tabBarStyle: {
              backgroundColor: 'transparent',
            },
          }}>
          <Tab.Screen name="Active Vouchers" component={ActiveVoucher} />
          <Tab.Screen name="Past Vouchers" component={PastVoucher} />
        </Tab.Navigator>
      ) : (
        <View style={styles.guestView}>
          <Text>Please login or signup to proceed</Text>
        </View>
      )}
    </Layout>
  );
};

export default Voucher;
