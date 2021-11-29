import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Divider} from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useGlobalStyles from '@styles/styles';
import useStyles from './ReferralItem.Styles';

const ReferralItem = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {item} = props;

  if (!item) {
    return null;
  }

  return (
    <>
      <View style={[globalStyles.flexDirectionRowAlignCenter]}>
        <MaterialCommunityIcons name={'account'} size={28} color={'#FFFFFF'} />
        <View style={styles.itemContent}>
          <Text category="s1" numberOfLines={2} style={styles.title}>
            {item?.cu_username}
          </Text>
          <Text category="c1">Mobile No: {item?.cu_mobile}</Text>
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Divider />
      </View>
    </>
  );
};

ReferralItem.propTypes = {
  item: PropTypes.object,
};

ReferralItem.defaultProps = {
  item: null,
};

export default memo(ReferralItem);
