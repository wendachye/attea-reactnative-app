import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Text, Divider} from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useGlobalStyles from '@styles/styles';
import useStyles from './PointItem.Styles';

const PointItem = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {item} = props;

  if (!item) {
    return null;
  }

  return (
    <>
      <View style={[globalStyles.flexDirectionRowAlignCenter]}>
        <MaterialIcons name={'card-giftcard'} size={28} color={'#FFFFFF'} />
        <View style={styles.itemContent}>
          <Text category="s1" numberOfLines={2} style={styles.title}>{`${moment(
            item?.cpl_created_date,
          ).format('DD MMMM YYYY')} @ ${item?.out_name}`}</Text>
          <Text category="c1">
            Points Earned: {Number(item?.cpl_type) === 1 ? item?.cpl_points : 0}
          </Text>
          <Text category="c1">
            Points Redeemed:{' '}
            {Number(item?.cpl_type) === 2 ? item?.cpl_points : 0}
          </Text>
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Divider />
      </View>
    </>
  );
};

PointItem.propTypes = {
  item: PropTypes.object,
};

PointItem.defaultProps = {
  item: null,
};

export default memo(PointItem);
