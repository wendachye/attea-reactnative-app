import React, {useLayoutEffect} from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';

const Profile = ({navigation}) => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Test Page</Text>
      <Button onPress={() => navigation.navigate('menu')}>Go to Menu</Button>
    </Layout>
  );
};

export default Profile;
