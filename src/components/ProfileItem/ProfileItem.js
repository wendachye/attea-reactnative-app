import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {ListItem, Text} from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ProfileItem.Styles';

const ProfileItem = props => {
  const {title, leftIcon, rightIcon, onPressItem} = props;

  return (
    <ListItem
      title={<Text style={styles.titleText}>{title}</Text>}
      accessoryLeft={() =>
        leftIcon &&
        (leftIcon === 'settings' ? (
          <MaterialIcons
            name={leftIcon}
            size={28}
            color={'#FFFFFF'}
            style={styles.icon}
          />
        ) : (
          <MaterialCommunityIcons
            name={leftIcon}
            size={28}
            color={'#FFFFFF'}
            style={styles.icon}
          />
        ))
      }
      accessoryRight={() =>
        rightIcon && (
          <MaterialCommunityIcons
            name={rightIcon}
            size={28}
            color={'#FFFFFF'}
            style={styles.icon}
          />
        )
      }
      onPress={onPressItem}
      style={styles.listItem}
    />
  );
};

ProfileItem.propTypes = {
  title: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  onPressItem: PropTypes.func,
};

ProfileItem.defaultProps = {
  title: '',
  leftIcon: '',
  rightIcon: '',
};

export default memo(ProfileItem);
