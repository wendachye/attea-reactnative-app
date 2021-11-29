import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@ui-kitten/components';
import styles from './BackButton.Styles';

const BackButton = props => {
  const {color, onPress} = props;
  const theme = useTheme();
  const primaryColor = '#FFFFFF';
  const secondaryColor = theme['color-primary-500'];

  const retrieveButtonColor = buttonColor => {
    if (buttonColor === 'primary') {
      return primaryColor;
    }
    if (buttonColor === 'secondary') {
      return secondaryColor;
    }
    return buttonColor;
  };

  return (
    <TouchableOpacity
      style={styles.positionLeft}
      activeOpacity={0.7}
      onPress={onPress}>
      <MaterialIcons
        name="arrow-back-ios"
        size={24}
        color={retrieveButtonColor(color)}
      />
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func,
};

BackButton.defaultProps = {
  color: 'primary',
};

export default memo(BackButton);
