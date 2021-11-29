import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Layout, Text} from '@ui-kitten/components';
import styles from './Subheader.Styles';

const Subheader = () => {
  const navigation = useNavigation();
  const {isLoggedIn, user} = useSelector(state => state.user);

  const onPressSignIn = () => {
    navigation.navigate('sign-in');
  };

  const onPressSignUp = () => {
    navigation.navigate('sign-up');
  };

  const renderSubheader = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subheaderButton}
          activeOpacity={0.7}
          onPress={onPressSignIn}>
          <Text category="s2">{`Points: ${user.totalPoints}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubheaderGuest = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.subheaderGuestButton}
          activeOpacity={0.7}
          onPress={onPressSignIn}>
          <Text category="s2">SIGN IN</Text>
        </TouchableOpacity>
        <View style={styles.dividerVertical} />
        <TouchableOpacity
          style={styles.subheaderGuestButton}
          activeOpacity={0.7}
          onPress={onPressSignUp}>
          <Text category="s2">SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.dividerVertical} />
        <View style={styles.subheaderGuestButton} activeOpacity={0.7}>
          <Text category="s2" style={styles.guestText}>
            GUEST
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Layout>{isLoggedIn ? renderSubheader() : renderSubheaderGuest()}</Layout>
  );
};

export default memo(Subheader);
