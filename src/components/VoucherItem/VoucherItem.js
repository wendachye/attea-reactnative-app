import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {Text} from '@ui-kitten/components';
import useGlobalStyles from '@styles/styles';
import useStyles from './VoucherItem.Styles';

const VoucherItem = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {item, onPressItem, disabled} = props;

  if (!item) {
    return null;
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => onPressItem(item)}>
      <View style={styles.innerContainer}>
        <View style={globalStyles.flexDirectionRow}>
          <FastImage
            source={{uri: item.img_file?.[0]}}
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.contain}
            fallback
            defaultSource={require('@assets/images/Image-Placeholder.png')}
          />
          <View style={styles.itemContent}>
            <Text numberOfLines={3} status="primary" style={styles.itemTitle}>
              {item.vs_name}
            </Text>
            <Text numberOfLines={2} status="primary" category="c1">
              {`Issued: ${moment(item.v_start).format('DD MMM YYYY')}`}
            </Text>
            {item.v_end && (
              <Text numberOfLines={2} status="primary" category="c1">
                {`Expiry: ${moment(item.v_end).format('DD MMM YYYY')}`}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

VoucherItem.propTypes = {
  item: PropTypes.object,
  onPressItem: PropTypes.func,
  disabled: PropTypes.bool,
};

VoucherItem.defaultProps = {
  item: null,
  onPressItem: () => {},
  disabled: false,
};

export default memo(VoucherItem);
