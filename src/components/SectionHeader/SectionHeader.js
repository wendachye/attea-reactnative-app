import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from '@ui-kitten/components';
import styles from './SectionHeader.Styles';

const SectionHeader = props => {
  const {title, showSeeAllButton, onPressSeeAll} = props;

  return (
    <View style={styles.container}>
      <Text category="h4" status="basic">
        {title}
      </Text>
      {showSeeAllButton && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSeeAll}>
          <View style={styles.seeAllContainer}>
            <Text category="c1" status="basic">
              See All
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={14}
              color={'#FFFFFF'}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string,
  showSeeAllButton: PropTypes.bool,
  onPressSeeAll: PropTypes.func,
};

SectionHeader.defaultProps = {
  title: '',
  showSeeAllButton: false,
};

export default SectionHeader;
