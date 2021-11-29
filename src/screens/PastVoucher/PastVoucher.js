import React, {useEffect} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Layout} from '@ui-kitten/components';
import {fetchPastVouchers} from '@redux/slices/voucherSlice';
import Loading from '@components/Loading/Loading';
import EmptyRecord from '@components/EmptyRecord/EmptyRecord';
import VoucherItem from '@components/VoucherItem/VoucherItem';
import useStyles from './PastVoucher.Styles';

const PastVoucher = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {pastVouchers, loading} = useSelector(state => state.vouchers);

  useEffect(() => {
    dispatch(fetchPastVouchers.trigger({page: 1}));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchPastVouchers.trigger({page: 1}));
  };

  const fetchMoreData = () => {
    if (pastVouchers.totalPages > pastVouchers.currentPage) {
      dispatch(fetchPastVouchers.trigger());
    }
  };

  return (
    <Layout style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={pastVouchers.data}
        renderItem={({item}) => <VoucherItem disabled item={item} />}
        keyExtractor={item => item.v_id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListFooterComponent={loading && <Loading />}
        ListEmptyComponent={<EmptyRecord />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.01}
        onEndReached={fetchMoreData}
      />
    </Layout>
  );
};

export default PastVoucher;
