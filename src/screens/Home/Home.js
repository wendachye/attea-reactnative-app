import React, {useEffect, useState} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSettings} from '@redux/slices/settingSlice';
import Header from '@components/Header/Header';
import Subheader from '@components/Subheader/Subheader';
import SectionMood from '@components/SectionMood/SectionMood';
import SectionOutlet from '@components/SectionOutlet/SectionOutlet';
import SectionPromotion from '@components/SectionPromotion/SectionPromotion';
import SectionAnnouncement from '@components/SectionAnnouncement/SectionAnnouncement';
import useGlobalStyles from '@styles/styles';
// import useStyle from './Home.Styles';

const Home = ({navigation}) => {
  const globalStyles = useGlobalStyles();
  // const styles = useStyle();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {loading, moods, outlets, promotions, announcements} = useSelector(
    state => state.settings,
  );

  useEffect(() => {
    dispatch(fetchSettings.trigger());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      dispatch(fetchSettings.trigger());
    }, 500);
  };

  return (
    <Layout style={globalStyles.containerWithBottomTab}>
      <Header />
      <Subheader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SectionMood data={moods} />
        <SectionOutlet data={outlets} />
        <SectionPromotion data={promotions} />
        <SectionAnnouncement data={announcements} />
      </ScrollView>
    </Layout>
  );
};

export default Home;
