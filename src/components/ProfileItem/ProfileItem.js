import React, {memo} from 'react';
// import {View} from 'react-native';
import {ListItem} from '@ui-kitten/components';
import styles from './ProfileItem.Styles';

const ProfileItem = props => {
  const {item} = props;
  return (
    <>
      <ListItem
        title={item.title}
        accessoryLeft={item.leftIcon}
        accessoryRight={item.rightIcon}
        onPress={item.onPress}
        style={styles.listItem}
      />
      {/* <View style={styles.divider} /> */}
    </>
  );
};

export default memo(ProfileItem);
