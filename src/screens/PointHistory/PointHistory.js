import React, {useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {Layout, Text, Divider} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPoints} from '@redux/slices/pointSlice';
import Header from '@components/Header/Header';
import Loading from '@components/Loading/Loading';
import EmptyRecord from '@components/EmptyRecord/EmptyRecord';
import PointItem from '@components/PointItem/PointItem';
import useGlobalStyles from '@styles/styles';
import useStyles from './PointHistory.Styles';

const PointHistory = props => {
  const {navigation} = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const {loading, totalPoints, data, totalPages, currentPage} = useSelector(
    state => state.points,
  );

  useEffect(() => {
    dispatch(fetchPoints.trigger({page: 1}));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchPoints.trigger({page: 1}));
  };

  const fetchMoreData = () => {
    if (totalPages > currentPage) {
      dispatch(fetchPoints.trigger());
    }
  };

  const onPressBackButton = () => {
    navigation.goBack();
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle} category="h5">
            Available Points
          </Text>
          <Text style={styles.cardSubtitle}>{totalPoints}</Text>
          <Text style={styles.cardCaption} category="c1">
            Earn more points, redeem existing deals and enjoy exclusive benefits
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text category="s1">Points Activity</Text>
        </View>
        <Divider style={styles.dividerContainer} />
        <FlatList
          data={data}
          renderItem={({item}) => <PointItem item={item} />}
          keyExtractor={item => item.cpl_created_date}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          ListFooterComponent={loading && <Loading />}
          ListEmptyComponent={<EmptyRecord />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.01}
          onEndReached={fetchMoreData}
        />
      </View>
    </Layout>
  );
};

export default PointHistory;
