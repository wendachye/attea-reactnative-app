import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Spinner} from '@ui-kitten/components';
import useGlobalStyles from '@styles/styles';

const Loading = props => {
  const globalStyles = useGlobalStyles();
  const {status, size} = props;

  return (
    <View style={globalStyles.flexCenter}>
      <Spinner status={status} size={size} />
    </View>
  );
};

Loading.propTypes = {
  status: PropTypes.oneOf([
    'basic',
    'control',
    'danger',
    'info',
    'primary',
    'success',
    'warning',
  ]),
  size: PropTypes.oneOf(['giant', 'large', 'medium', 'small', 'tiny']),
};

Loading.defaultProps = {
  status: 'basic',
  size: 'medium',
};

export default memo(Loading);
