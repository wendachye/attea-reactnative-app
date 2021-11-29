import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Layout, Text} from '@ui-kitten/components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchActiveVouchers} from '@redux/slices/voucherSlice';
import VoucherItem from '@components/VoucherItem/VoucherItem';
import Loading from '@components/Loading/Loading';
import EmptyRecord from '@components/EmptyRecord/EmptyRecord';
import Modal from '@components/Modal/Modal';
import CloseButton from '@components/CloseButton/CloseButton';
import useGlobalStyles from '@styles/styles';
import useStyles from './ActiveVoucher.Styles';

const ActiveVoucher = () => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const {activeVouchers, loading} = useSelector(state => state.vouchers);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchActiveVouchers.trigger({page: 1}));
  }, [dispatch]);

  const onRefresh = () => {
    dispatch(fetchActiveVouchers.trigger({page: 1}));
  };

  const fetchMoreData = () => {
    if (activeVouchers.totalPages > activeVouchers.currentPage) {
      dispatch(fetchActiveVouchers.trigger());
    }
  };

  const onPressItem = item => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const onPressCloseModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const renderModal = () => {
    return (
      <Modal visible={modalVisible}>
        <CloseButton
          position="headerRight"
          color="secondary"
          onPress={onPressCloseModal}
        />
        <View style={styles.modalQRContainer}>
          <Text category="h4" status="primary" style={styles.modalTitle}>
            {selectedItem?.vs_name}
          </Text>
          <View style={globalStyles.centerItem}>
            <QRCode
              value={selectedItem?.v_serial}
              backgroundColor="transparent"
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Layout style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={activeVouchers.data}
        renderItem={({item}) => (
          <VoucherItem
            item={item}
            onPressItem={voucher => onPressItem(voucher)}
          />
        )}
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
      {renderModal()}
    </Layout>
  );
};

export default ActiveVoucher;
