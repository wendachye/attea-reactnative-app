import React, {useEffect, useCallback, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import FastImage from 'react-native-fast-image';
import {Layout, Text, Divider, Button} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CloseButton from '@components/CloseButton/CloseButton';
import Condiment from '@components/Condiment/Condiment';
import {
  fetchCondiment,
  selectCondiment,
  clearCondiment,
} from '@redux/slices/menuSlice';
import useGlobalStyles from '@styles/styles';
import useStyles from './Item.Styles';

const Item = props => {
  const {
    navigation,
    route: {params: item},
  } = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const dispatch = useDispatch();
  const {condiments} = useSelector(state => state.menu);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchCondiment.trigger({productId: item.prod_id}));
  }, [dispatch, item]);

  const onPressClose = () => {
    dispatch(clearCondiment.success());
    navigation.goBack();
  };

  const onChangeCondimentItem = useCallback(
    condiment => {
      dispatch(selectCondiment.trigger({condiment}));
    },
    [dispatch],
  );

  const onPressMinusQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const onPressAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onPressAddToCart = () => {
    dispatch(clearCondiment.success());
    navigation.goBack();
  };

  const renderCondimentGroup = (condimentGroup, index) => {
    return (
      <View key={index} style={styles.condimentGroupContainer}>
        <View style={globalStyles.flexDirectionRowAlignCenter}>
          <View style={styles.condimentGroupNameContainer}>
            <Text style={styles.condimentGroupTitle}>
              {condimentGroup.con_name}
            </Text>
            {Number(condimentGroup.con_max_select) !== 0 && (
              <View style={styles.condimentSelectTextContainer}>
                <Text category="c1">
                  Select up to {condimentGroup.con_max_select}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.condimentGroupMustSelectText}>
              {Number(condimentGroup.con_group_must_select) === 0
                ? 'Optional'
                : 'Required'}
            </Text>
          </View>
        </View>
        {condimentGroup.condiments.map((condiment, key) => (
          <Condiment
            key={key}
            condiment={condiment}
            checked={condimentGroup.selections.includes(condiment.con_id)}
            onChange={() => onChangeCondimentItem(condiment)}
          />
        ))}
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      <ParallaxScrollView
        backgroundColor="#E55D05"
        contentBackgroundColor="#E55D05"
        parallaxHeaderHeight={item.prod_desc ? 290 : 260}
        stickyHeaderHeight={60}
        renderFixedHeader={() => (
          <CloseButton shadow position="headerRight" onPress={onPressClose} />
        )}
        renderStickyHeader={() => (
          <View style={styles.parallaxTitleContainer}>
            <Text numberOfLines={1} style={styles.itemTitleText}>
              {item.prod_name}
            </Text>
          </View>
        )}
        renderForeground={() => (
          <>
            <FastImage
              source={{
                uri: item.img_file?.[0],
              }}
              style={styles.itemImage}
              resizeMode={FastImage.resizeMode.contain}
              fallback
              defaultSource={require('@assets/images/Image-Placeholder.png')}
            />
            <View style={styles.itemDetailsContainer}>
              <View style={styles.itemTitleContainer}>
                <Text numberOfLines={2} style={styles.itemTitleText}>
                  {item.prod_name}
                </Text>
                {!!item.prod_desc && (
                  <Text numberOfLines={2} style={styles.itemDescriptionText}>
                    {item.prod_desc}
                  </Text>
                )}
              </View>
              <View style={styles.itemPriceContainer}>
                <Text category="h5">{`$ ${Number(item.prod_price).toFixed(
                  2,
                )}`}</Text>
              </View>
            </View>
          </>
        )}>
        <View style={styles.itemContentContainer}>
          <Divider />
          {condiments.map((condimentGroup, index) =>
            renderCondimentGroup(condimentGroup, index),
          )}
        </View>
      </ParallaxScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <View style={styles.quantityView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressMinusQuantity}>
              <MaterialIcons
                name={'remove-circle-outline'}
                size={28}
                color={'#FFFFFF'}
              />
            </TouchableOpacity>
            <Text category="s1">{quantity}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onPressAddQuantity}>
              <MaterialIcons
                name={'add-circle-outline'}
                size={28}
                color={'#FFFFFF'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.addToCartContainer}>
          <Button
            status="control"
            appearance="outline"
            activeOpacity={0.7}
            onPress={onPressAddToCart}>
            Add to Cart
          </Button>
        </View>
      </View>
    </Layout>
  );
};

export default Item;
