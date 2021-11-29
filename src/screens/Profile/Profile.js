import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '@redux/slices/userSlice';
import Header from '@components/Header/Header';
import Subheader from '@components/Subheader/Subheader';
import Modal from '@components/Modal/Modal';
import ProfileItem from '@components/ProfileItem/ProfileItem';
import useGlobalStyles from '@styles/styles';
import useStyle from './Profile.Styles';
import packageJson from '../../../package.json';

const Profile = props => {
  const {navigation} = props;
  const styles = useStyle();
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressLogout = () => {
    setModalVisible(false);
    dispatch(logout.trigger());
  };

  const renderModalLogout = () => {
    return (
      <Modal visible={modalVisible}>
        <Text style={styles.modalLogoutTitle}>
          Are you sure you want to logout?
        </Text>
        <View style={styles.modalLogoutButton}>
          <Button onPress={() => setModalVisible(false)}>Cancel</Button>
          <Button onPress={onPressLogout}>Confirm</Button>
        </View>
      </Modal>
    );
  };

  return (
    <Layout style={styles.container}>
      <Header />
      <Subheader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoggedIn && (
          <>
            <ProfileItem
              title="Personal Details"
              leftIcon="account"
              rightIcon="chevron-right"
              onPressItem={() => navigation.navigate('profile-details')}
            />
            <ProfileItem
              title="My Voucher"
              leftIcon="ticket-percent"
              rightIcon="chevron-right"
              onPressItem={() => navigation.jumpTo('voucher')}
            />
            <ProfileItem
              title="My Points"
              leftIcon="qrcode-scan"
              rightIcon="chevron-right"
              onPressItem={() => navigation.navigate('point-history')}
            />
            <ProfileItem
              title="Digital Stamp"
              leftIcon="postage-stamp"
              rightIcon="chevron-right"
              onPressItem={() => navigation.navigate('digital-stamp')}
            />
            <ProfileItem
              title="Order History"
              leftIcon="history"
              rightIcon="chevron-right"
              onPressItem={() => navigation.navigate('order-history')}
            />
            <ProfileItem
              title="Invite Friends"
              leftIcon="account-multiple-plus"
              rightIcon="chevron-right"
              onPressItem={() => navigation.navigate('invite-friends')}
            />
          </>
        )}
        <ProfileItem
          title="Settings"
          leftIcon="settings"
          rightIcon="chevron-right"
          onPressItem={() => navigation.navigate('settings')}
        />
        {isLoggedIn && (
          <ProfileItem
            title="Log Out"
            leftIcon="logout"
            rightIcon="chevron-right"
            onPressItem={() => setModalVisible(true)}
          />
        )}
        <View style={globalStyles.flexCenter}>
          <View style={styles.versionTextContainer}>
            <Text category="c1" status="basic">
              {`App Version v${packageJson.version}`}
            </Text>
            <Text category="c1" status="basic">
              Powered by SGDATAPOS
            </Text>
          </View>
        </View>
        {renderModalLogout()}
      </ScrollView>
    </Layout>
  );
};

export default Profile;
