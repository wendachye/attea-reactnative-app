import React, {useEffect} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchOrders} from '@redux/slices/orderSlice';
import Header from '@components/Header/Header';
import Loading from '@components/Loading/Loading';
import EmptyRecord from '@components/EmptyRecord/EmptyRecord';
import OrderItem from '@components/OrderItem/OrderItem';
import useGlobalStyles from '@styles/styles';
import useStyles from './OrderHistory.Styles';

const OrderHistory = props => {
  const {navigation} = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const {loading, data, totalPages, currentPage} = useSelector(
    state => state.orders,
  );

  useEffect(() => {
    dispatch(fetchOrders.trigger({page: 1}));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchOrders.trigger({page: 1}));
  };

  const fetchMoreData = () => {
    if (totalPages > currentPage) {
      dispatch(fetchOrders.trigger());
    }
  };

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onPressItem = selectedItem => {
    navigation.push('order-details', selectedItem);
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={data}
          renderItem={({item}) => (
            <OrderItem
              item={item}
              onPressItem={selectedItem => onPressItem(selectedItem)}
            />
          )}
          keyExtractor={item => item.id}
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

export default OrderHistory;
