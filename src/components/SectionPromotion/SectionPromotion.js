import React, {memo} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import SectionHeader from '@components/SectionHeader/SectionHeader';
import styles from './SectionPromotion.Styles';

const SectionPromotion = props => {
  const {data} = props;
  const navigation = useNavigation();

  const onPressItem = item => {
    navigation.navigate('item', item);
  };

  const onPressSeeAll = () => {};

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={() => onPressItem(item)}>
        <FastImage
          source={{
            uri: item.promotion_img_file,
          }}
          style={styles.itemImage}
          fallback
          defaultSource={require('@assets/images/Image-Placeholder.png')}
        />
      </TouchableOpacity>
    );
  };

  if (data.length > 0) {
    return (
      <>
        <SectionHeader
          title="Promotions"
          showSeeAllButton={data.length > 5}
          onPressSeeAll={onPressSeeAll}
        />
        <Carousel
          loop
          autoplay
          data={data.length > 5 ? data.slice(0, 5) : data}
          renderItem={renderItem}
          containerCustomStyle={styles.container}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={200}
          useScrollView
          showsHorizontalScrollIndicator={false}
        />
      </>
    );
  }

  return null;
};

SectionPromotion.propTypes = {
  data: PropTypes.array,
};

SectionPromotion.defaultProps = {
  data: [],
};

export default memo(SectionPromotion);
