import React, {useEffect, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Layout, Text, Divider} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import CloseButton from '@components/CloseButton/CloseButton';
import Condiment from '@components/Condiment/Condiment';
import {
  fetchCondiment,
  selectCondiment,
  clearCondiment,
} from '@redux/slices/menuSlice';
import useGloabalStyles from '@styles/styles';
import styles from './Item.Styles';

const Item = props => {
  const {
    navigation,
    route: {params: item},
  } = props;
  const gloabalStyles = useGloabalStyles();
  const dispatch = useDispatch();
  const {condiments} = useSelector(state => state.menu);

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

  const renderCondimentGroup = (condimentGroup, index) => {
    return (
      <View key={index} style={styles.condimentGroupContainer}>
        <View style={gloabalStyles.flexDirectionRowAlignCenter}>
          <View style={styles.condimentGroupNameContainer}>
            <Text category="h5">{condimentGroup.con_name}</Text>
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
    <Layout style={gloabalStyles.container}>
      <CloseButton shadow position="right" onPress={onPressClose} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          source={{
            uri: item.img_file?.[0],
          }}
          style={styles.itemImage}
          resizeMode={FastImage.resizeMode.contain}
          fallback
          defaultSource={require('@assets/images/Image-Placeholder.png')}
        />
        <View style={styles.itemContentContainer}>
          <View style={styles.itemDetailsContainer}>
            <View style={styles.itemTitleContainer}>
              <Text numberOfLines={3} style={styles.itemTitleText}>
                {item.prod_name}
              </Text>
              {!!item.prod_desc && (
                <Text numberOfLines={2} style={styles.itemDescriptionText}>
                  {item.prod_desc}
                </Text>
              )}
            </View>
            <View style={styles.itemPriceContainer}>
              <Text category="h5">{`$ ${item.prod_price}`}</Text>
            </View>
          </View>
          <Divider />
          {condiments.map((condimentGroup, index) =>
            renderCondimentGroup(condimentGroup, index),
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Item;
0;
