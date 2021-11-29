import React, {useEffect, useState} from 'react';
import {ScrollView, View, TouchableOpacity, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Layout, Text} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMenuByHashtag} from '@redux/slices/menuSlice';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './Mood.Styles';

const Mood = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {
    navigation,
    route: {params: mood},
  } = props;
  const dispatch = useDispatch();
  const {hashTagProducts} = useSelector(state => state.menu);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchMenuByHashtag.trigger({hashtagId: mood.hashtag_id}));
  }, [dispatch, mood]);

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onPressItem = item => {
    navigation.navigate('item', item);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={() => onPressItem(item)}>
        <View style={styles.card}>
          <FastImage
            source={{
              uri: item.img_file?.[0],
            }}
            style={styles.itemImage}
            fallback
            defaultSource={require('@assets/images/Image-Placeholder.png')}
          />
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <Text status="primary" category="h5">
                {item.prod_name}
              </Text>
              <Text status="primary" category="s2">
                {item.prod_desc}
              </Text>
              <Text style={styles.priceText}>{`$ ${item.prod_price}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text category="h5">Our Recommendation:</Text>
            <Text category="h3">Feeling {mood.hashtag_title}</Text>
          </View>
        </View>
        <Carousel
          data={hashTagProducts}
          renderItem={renderItem}
          onSnapToItem={index => setActiveSlide(index)}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
        />
        <Pagination
          dotsLength={hashTagProducts.length}
          activeDotIndex={activeSlide}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </ScrollView>
    </Layout>
  );
};

export default Mood;
