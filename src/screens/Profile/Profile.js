import React, {useMemo, useState} from 'react';
import {View, ScrollView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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

const Profile = ({navigation}) => {
  const styles = useStyle();
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const profileListItem = useMemo(() => {
    let profileList = [];

    if (isLoggedIn) {
      profileList = [
        ...profileList,
        {
          title: () => <Text style={styles.titleText}>Personal Details</Text>,
          leftIcon: () => (
            <MaterialCommunityIcons
              name={'account'}
              size={28}
              color={'#FFFFFF'}
              style={styles.leftIcon}
            />
          ),
          rightIcon: () => (
            <MaterialCommunityIcons
              name={'chevron-right'}
              size={24}
              color={'#FFFFFF'}
            />
          ),
          onPress: () => {
            navigation.navigate('profile-details');
          },
        },
        // {
        //   title: () => <Text style={styles.titleText}>My Voucher</Text>,
        //   leftIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'ticket-percent'}
        //       size={28}
        //       color={'#FFFFFF'}
        //       style={styles.leftIcon}
        //     />
        //   ),
        //   rightIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'chevron-right'}
        //       size={24}
        //       color={'#FFFFFF'}
        //     />
        //   ),
        //   onPress: () => {
        //     navigation.navigate('test');
        //   },
        // },
        // {
        //   title: () => <Text style={styles.titleText}>My Points</Text>,
        //   leftIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'qrcode-scan'}
        //       size={28}
        //       color={'#FFFFFF'}
        //       style={styles.leftIcon}
        //     />
        //   ),
        //   rightIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'chevron-right'}
        //       size={24}
        //       color={'#FFFFFF'}
        //     />
        //   ),
        //   onPress: () => {
        //     navigation.navigate('test');
        //   },
        // },
        // {
        //   title: () => <Text style={styles.titleText}>Digital Stamp</Text>,
        //   leftIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'postage-stamp'}
        //       size={28}
        //       color={'#FFFFFF'}
        //       style={styles.leftIcon}
        //     />
        //   ),
        //   rightIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'chevron-right'}
        //       size={24}
        //       color={'#FFFFFF'}
        //     />
        //   ),
        //   onPress: () => {
        //     navigation.navigate('test');
        //   },
        // },
        // {
        //   title: () => <Text style={styles.titleText}>Order History</Text>,
        //   leftIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'history'}
        //       size={28}
        //       color={'#FFFFFF'}
        //       style={styles.leftIcon}
        //     />
        //   ),
        //   rightIcon: () => (
        //     <MaterialCommunityIcons
        //       name={'chevron-right'}
        //       size={24}
        //       color={'#FFFFFF'}
        //     />
        //   ),
        //   onPress: () => {
        //     navigation.navigate('test');
        //   },
        // },
      ];
    }

    profileList = [
      ...profileList,
      {
        title: () => <Text style={styles.titleText}>Settings</Text>,
        leftIcon: () => (
          <MaterialIcons
            name={'settings'}
            size={28}
            color={'#FFFFFF'}
            style={styles.leftIcon}
          />
        ),
        rightIcon: () => (
          <MaterialCommunityIcons
            name={'chevron-right'}
            size={24}
            color={'#FFFFFF'}
          />
        ),
        onPress: () => {
          navigation.navigate('settings');
        },
      },
    ];

    if (isLoggedIn) {
      profileList = [
        ...profileList,
        {
          title: () => <Text style={styles.titleText}>Log Out</Text>,
          leftIcon: () => (
            <MaterialCommunityIcons
              name={'logout'}
              size={28}
              color={'#FFFFFF'}
              style={styles.leftIcon}
            />
          ),
          rightIcon: () => (
            <MaterialCommunityIcons
              name={'chevron-right'}
              size={24}
              color={'#FFFFFF'}
            />
          ),
          onPress: () => {
            setModalVisible(true);
          },
        },
      ];
    }

    return profileList;
  }, [isLoggedIn, styles, navigation]);

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
      {!isLoggedIn && <Subheader />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.emptySpace} />
        {profileListItem.map((item, index) => {
          return <ProfileItem key={index} item={item} />;
        })}
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
