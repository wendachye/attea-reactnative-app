import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Text} from '@ui-kitten/components';
import useGlobalStyles from '@styles/styles';
import useStyles from './MenuItem.Styles';

const MenuItem = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {item, itemHeight, onPressItem, disabled} = props;

  if (!item) {
    return null;
  }

  return (
    <View
      style={[
        styles.itemContainer,
        {
          height: itemHeight,
        },
      ]}>
      <TouchableOpacity
        disabled={disabled}
        style={globalStyles.flex}
        activeOpacity={0.7}
        onPress={() => onPressItem(item)}>
        <View style={styles.itemInnerContainer}>
          <View style={globalStyles.flexDirectionRow}>
            <FastImage
              source={{uri: item.img_file?.[0]}}
              style={styles.itemImage}
              resizeMode={FastImage.resizeMode.contain}
              fallback
              defaultSource={require('@assets/images/Image-Placeholder.png')}
            />
            <View style={styles.itemContent}>
              <Text
                numberOfLines={3}
                status="primary"
                style={styles.itemTitleText}>
                {item.prod_name}
              </Text>
              {!!item.prod_desc && (
                <Text
                  appearance="hint"
                  numberOfLines={2}
                  style={styles.itemDescriptionText}>
                  {item.prod_desc}
                </Text>
              )}
              <Text status="primary" style={styles.itemPriceText}>
                {`$ ${Number(item.prod_price).toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object,
  itemHeight: PropTypes.number,
  onPressItem: PropTypes.func,
  disabled: PropTypes.bool,
};

MenuItem.defaultProps = {
  item: null,
  itemHeight: 180,
  onPressItem: () => {},
  disabled: false,
};

export default memo(MenuItem);
