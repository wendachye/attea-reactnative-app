import React, {memo, useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Text, Divider} from '@ui-kitten/components';
import useGlobalStyles from '@styles/styles';
import useStyles from './OrderItem.Styles';

const OrderItem = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {item, onPressItem, disabled} = props;
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    if (item?.submission_date) {
      let orderSubmissionDate = moment(
        item?.submission_date,
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

      setOrderDate(orderSubmissionDate.format('DD MMMM YYYY hh:mm a'));
    }
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => onPressItem(item)}>
      <View style={globalStyles.flexDirectionRowAlignCenter}>
        <View style={styles.orderLeftContainer}>
          <Text style={styles.orderTitle} numberOfLines={1}>
            {orderDate}
          </Text>
          <Text category="s1" style={styles.orderSubTitle} numberOfLines={1}>
            {item?.outlet}
          </Text>
          <Text category="c1" style={styles.orderSubTitle} numberOfLines={1}>
            {`${item?.items?.length} items`}
          </Text>
        </View>
        <View style={styles.orderRightContainer}>
          <Text category="s1" style={styles.orderSubTitle}>
            $ {item?.price}
          </Text>
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Divider />
      </View>
      <TouchableOpacity activeOpacity={0.7}>
        <Text status="primary" category="s2">
          Order Again
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
  onPressItem: PropTypes.func,
  disabled: PropTypes.bool,
};

OrderItem.defaultProps = {
  item: null,
  onPressItem: () => {},
  disabled: false,
};

export default memo(OrderItem);
