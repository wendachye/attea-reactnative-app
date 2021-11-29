import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Layout, Text, Button} from '@ui-kitten/components';
import Header from '@components/Header/Header';

const Cart = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <Layout style={{flex: 1, paddingTop: insets.top}}>
      <Header />
    </Layout>
  );
};

export default Cart;
