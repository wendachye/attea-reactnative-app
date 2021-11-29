import React, {memo} from 'react';
import {DrawerItem as RNDrawerItem} from '@react-navigation/drawer';

const DrawerItem = props => {
  const {label, icon, onPress, inactiveTintColor} = props;
  return (
    <RNDrawerItem
      label={label}
      inactiveTintColor={inactiveTintColor}
      icon={icon}
      onPress={onPress}
    />
  );
};

DrawerItem.defaultProps = {
  inactiveTintColor: 'gray',
};

export default memo(DrawerItem);
