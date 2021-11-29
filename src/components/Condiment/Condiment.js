import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text, CheckBox} from '@ui-kitten/components';
import useGlobalStyles from '@styles/styles';
import useStyles from './Condiment.Styles';

const Condiment = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {condiment, checked, onChange} = props;

  return (
    <View>
      <View style={globalStyles.flexDirectionRowAlignCenter}>
        <View style={styles.condimentContainer}>
          <CheckBox
            checked={checked}
            onChange={onChange}
            status="control"
            style={styles.condimentCheckBox}>
            <Text
              style={
                styles.condimentNameText
              }>{`  ${condiment?.con_name}`}</Text>
          </CheckBox>
        </View>
        <View>
          {Number(condiment?.con_cost) !== 0 && (
            <Text category="s2">{` + $ ${condiment?.con_cost}`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

Condiment.propTypes = {
  condiment: PropTypes.object,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Condiment.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default memo(Condiment);
