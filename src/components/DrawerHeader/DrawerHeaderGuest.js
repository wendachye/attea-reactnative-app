import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {Text} from '@ui-kitten/components';
import useStyles from './DrawerHeader.Styles';

const DrawerHeaderGuest = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@assets/images/Logo-White.png')}
      />
      <Text category="h5">Guest</Text>
    </View>
  );
};

export default memo(DrawerHeaderGuest);
