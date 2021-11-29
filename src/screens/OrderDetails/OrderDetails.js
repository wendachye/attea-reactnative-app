import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import moment from 'moment';
import {Layout, Text, Divider} from '@ui-kitten/components';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './OrderDetails.Styles';

const OrderDetails = props => {
  const {
    navigation,
    route: {params: orderItem},
  } = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const [orderDate, setOrderDate] = useState('');

  console.log(orderItem);

  useEffect(() => {
    if (orderItem?.submission_date) {
      let orderSubmissionDate = moment(
        orderItem?.submission_date,
        'DD/MM/YYYY hh:mma',
      );

      if (moment().isSame(orderSubmissionDate, 'day')) {
        setOrderDate(`Today, ${orderSubmissionDate.format('hh:mm a')}`);
        return;
      }

      if (moment().subtract(1, 'day').isSame(orderSubmissionDate, 'day')) {
        setOrderDate(`Yesterday, ${orderSubmissionDate.format('hh:mm a')}`);
        return;
      }

      setOrderDate(orderSubmissionDate.format('DD MMM hh:mm a'));
    }
  }, [orderItem]);

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const renderCondiment = (condiment, key) => {
    return (
      <View key={key}>
        <Text style={styles.condimentText}>{condiment.con_name}</Text>
      </View>
    );
  };

  const renderItem = (item, key) => {
    return (
      <View
        key={key}
        style={[globalStyles.flexDirectionRow, styles.itemContainer]}>
        <View style={styles.itemQuantityView}>
          <Text style={styles.itemQuantityText}>{`${item.quantity} x`}</Text>
        </View>
        <View style={styles.itemNameView}>
          <View>
            <Text style={styles.itemNameText}>{item.prod_name}</Text>
            {item?.condiments?.map((condiment, index) => {
              return renderCondiment(condiment, index);
            })}
          </View>
        </View>
        <View style={styles.itemPriceView}>
          <Text style={styles.itemPriceText}>{`$${item.item_total}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View
              style={[
                globalStyles.flexDirectionRowAlignCenter,
                styles.sectionContainer,
              ]}>
              <View style={styles.titleView}>
                <Text style={styles.labelText}>Order Receipt No:</Text>
              </View>
              <View style={styles.contentView}>
                <Text numberOfLines={2} style={styles.contentText}>
                  {orderItem?.receipt_no}
                </Text>
              </View>
            </View>
            <View
              style={[
                globalStyles.flexDirectionRowAlignCenter,
                styles.sectionContainer,
              ]}>
              <View style={styles.titleView}>
                <Text style={styles.labelText}>Order Date Time:</Text>
              </View>
              <View style={styles.contentView}>
                <Text numberOfLines={2} style={styles.contentText}>
                  {orderDate}
                </Text>
              </View>
            </View>
            <View
              style={[
                globalStyles.flexDirectionRowAlignCenter,
                styles.sectionContainer,
              ]}>
              <View style={styles.titleView}>
                <Text style={styles.labelText}>Order Outlet:</Text>
              </View>
              <View style={styles.contentView}>
                <Text numberOfLines={2} style={styles.contentText}>
                  {orderItem?.outlet}
                </Text>
              </View>
            </View>
            <Text status="primary" style={styles.sectionTitleText}>
              Order Summary
            </Text>
            <View style={styles.dividerContainer}>
              <Divider />
            </View>
            {orderItem?.items.map((item, key) => {
              return renderItem(item, key);
            })}
            <View style={styles.dividerContainer}>
              <Divider />
            </View>

            <View
              style={[globalStyles.flexDirectionRow, styles.sectionContainer]}>
              <View style={{flex: 0.5}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>
                  Subtotal
                </Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}>
                  {orderItem.payment_type[0].payment_cost}
                </Text>
              </View>
            </View>

            <View
              style={[globalStyles.flexDirectionRow, styles.sectionContainer]}>
              <View style={{flex: 0.5}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Total</Text>
              </View>
              <View style={{flex: 0.5}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}>
                  {orderItem.payment_type[0].payment_cost}
                </Text>
              </View>
            </View>

            <View style={{marginTop: 15}}>
              <Text
                status="primary"
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                }}>{`You've earned ${orderItem.points} points`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default OrderDetails;
