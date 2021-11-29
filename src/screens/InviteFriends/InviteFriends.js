import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, RefreshControl} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  Layout,
  Text,
  Input,
  Button,
  Icon,
  Divider,
  Tooltip,
} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchReferrals} from '@redux/slices/referralSlice';
import Header from '@components/Header/Header';
import ReferralItem from '@components/ReferralItem/ReferralItem';
import Loading from '@components/Loading/Loading';
import EmptyRecord from '@components/EmptyRecord/EmptyRecord';
import useGlobalStyles from '@styles/styles';
import useStyles from './InviteFriends.Styles';

const InviteFriends = props => {
  const {navigation} = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const {loading, referrals} = useSelector(state => state.referrals);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchReferrals.trigger());
  }, [dispatch]);

  const onRefresh = () => {};

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onPressCopyToClipboard = () => {
    Clipboard.setString('hello world');

    setTooltipVisible(true);

    setInterval(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          source={require('@assets/images/referral.png')}
          style={styles.referralImage}
        />
        <Text status="basic" style={styles.title}>
          {'Sharing is caring!\nBuy for friends and receive gift'}
        </Text>
        <View style={[globalStyles.centerItem, styles.dividerContainer]}>
          <Text category="s2">Share your referral code</Text>
          <View style={globalStyles.flexDirectionRowAlignCenter}>
            <Input disabled value="XBSAD1" style={{width: '35%'}} />
            <Tooltip
              anchor={() => (
                <Button
                  style={styles.buttonLink}
                  status="primary"
                  accessoryLeft={<Icon name="link-outline" />}
                  onPress={onPressCopyToClipboard}
                />
              )}
              visible={tooltipVisible}
              placement="top">
              Copied
            </Tooltip>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Referral History</Text>
          <View style={styles.dividerContainer}>
            <Divider />
          </View>
        </View>
        <FlatList
          data={referrals}
          renderItem={({item}) => <ReferralItem item={item} />}
          keyExtractor={item => item.cu_username}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          ListFooterComponent={loading && <Loading />}
          ListEmptyComponent={<EmptyRecord />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
};

export default InviteFriends;
