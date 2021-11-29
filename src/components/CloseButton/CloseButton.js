import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@ui-kitten/components';
import useStyles from './CloseButton.Styles';

const CloseButton = props => {
  const {position, color, onPress, shadow} = props;
  const theme = useTheme();
  const styles = useStyles();
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

  const retrievePostionStyle = value => {
    let positionStyle = styles.positionLeft;

    if (value === 'right') {
      positionStyle = styles.positionRight;
    }

    if (value === 'headerLeft') {
      positionStyle = styles.positionHeaderLeft;
    }

    if (value === 'headerRight') {
      positionStyle = styles.positionHeaderRight;
    }

    return positionStyle;
  };

  return (
    <TouchableOpacity
      style={[
        retrievePostionStyle(position),
        shadow && styles.shadowBackground,
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      <MaterialCommunityIcons
        name="close"
        size={24}
        color={retrieveButtonColor(color)}
      />
    </TouchableOpacity>
  );
};

CloseButton.propTypes = {
  position: PropTypes.oneOf(['left', 'right', 'headerLeft', 'headerRight']),
  color: PropTypes.string,
  onPress: PropTypes.func,
  shadow: PropTypes.bool,
};

CloseButton.defaultProps = {
  position: 'left',
  color: 'primary',
  shadow: false,
};

export default memo(CloseButton);
