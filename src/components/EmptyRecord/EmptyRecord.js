import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '@ui-kitten/components';
import useStyles from './EmptyRecord.Styles';

const EmptyRecord = props => {
  const styles = useStyles();
  const {status, category} = props;

  return (
    <View style={styles.container}>
      <Text status={status} category={category}>
        No record found
      </Text>
    </View>
  );
};

EmptyRecord.propTypes = {
  status: PropTypes.oneOf([
    'basic',
    'control',
    'danger',
    'info',
    'primary',
    'success',
    'warning',
  ]),
  category: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    's1',
    's2',
    'c1',
    'c2',
    'label',
  ]),
};

EmptyRecord.defaultProps = {
  status: 'basic',
  category: 's1',
};

export default memo(EmptyRecord);
