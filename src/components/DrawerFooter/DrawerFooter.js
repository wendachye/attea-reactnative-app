import React, {memo} from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {Text} from '@ui-kitten/components';
import styles from './DrawerFooter.Styles';
import packageJson from '../../../package.json';

const DrawerFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text category="s1" appearance="hint">
          AtTeatude
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() =>
            Linking.openURL('https://attea.datapos.sg/member/signup?page=tnc')
          }>
          <Text category="c2" appearance="hint">
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() =>
            Linking.openURL(
              'https://attea.datapos.sg/member/signup?page=privacy',
            )
          }>
          <Text category="c2" appearance="hint">
            Privacy & Policy
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.labelContainer}>
        <Text category="c2" appearance="hint">
          {`App Version v${packageJson.version}`}
        </Text>
      </View>
      <Text category="c2" appearance="hint">
        Powered by SGDATAPOS
      </Text>
    </View>
  );
};

export default memo(DrawerFooter);
