import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  SectionList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import FastImage from 'react-native-fast-image';
import {
  Layout,
  Text,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import SectionHeader from '@components/SectionHeader/SectionHeader';
import Header from '@components/Header/Header';
import Subheader from '@components/Subheader/Subheader';
import {fetchMenu} from '@redux/slices/menuSlice';
import useGloabalStyles from '@styles/styles';
import useStyles from './Menu.Styles';

const ITEM_HEIGHT = 180;
const ITEM_HEADER_HEIGHT = 35;

const Menu = ({navigation}) => {
  const gloabalStyles = useGloabalStyles();
  const styles = useStyles();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(
    new IndexPath(0),
  );
  const refCategory = useRef(null);
  const dispatch = useDispatch();
  const {loading, categories} = useSelector(state => state.menu);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchMenu.trigger());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      setRefreshing(false);
    }
  }, [loading]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      dispatch(fetchMenu.trigger());
    }, 500);
  };

  const onSelectCategory = index => {
    setSelectedCategoryIndex(index);

    refCategory.current.scrollToLocation({
      animated: true,
      sectionIndex: index.row,
      itemIndex: 0,
      viewPosition: 0,
    });
  };

  const getItemLayout = sectionListGetItemLayout({
    getItemHeight: (rowData, sectionIndex, rowIndex) => ITEM_HEIGHT,
    getSectionHeaderHeight: () => ITEM_HEADER_HEIGHT,
  });

  const onViewableItemsChanged = ({viewableItems, changed}) => {
    const categoryTitle = viewableItems?.[0]?.section?.title;

    if (categoryTitle) {
      const categoryIndex = categories.findIndex(
        item => item.title === categoryTitle,
      );

      if (categoryIndex !== -1) {
        setSelectedCategoryIndex(new IndexPath(categoryIndex));
      }
    }
  };

  const onPressItem = item => {
    navigation.navigate('item', item);
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.itemContainer,
          {
            height: ITEM_HEIGHT,
          },
        ]}>
        <TouchableOpacity
          style={gloabalStyles.flex}
          activeOpacity={0.7}
          onPress={() => onPressItem(item)}>
          <View style={styles.itemInnerContainer}>
            <View style={gloabalStyles.flexDirectionRow}>
              <FastImage
                source={{uri: item.img_file?.[0]}}
                style={styles.itemImage}
                resizeMode={FastImage.resizeMode.contain}
                fallback
                defaultSource={require('@assets/images/Image-Placeholder.png')}
              />
              <View style={gloabalStyles.flex}>
                <Text
                  numberOfLines={3}
                  status="primary"
                  style={styles.itemTitleText}>
                  {item.prod_name}
                </Text>
                {!!item.prod_desc && (
                  <Text
                    appearance="hint"
                    numberOfLines={2}
                    style={styles.itemDescriptionText}>
                    {item.prod_desc}
                  </Text>
                )}
                <Text status="primary" style={styles.itemPriceText}>
                  {`$ ${item.prod_price}`}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Layout style={styles.container}>
      <Header />
      <Subheader />
      <View style={styles.categoryContainer}>
        <Select
          status="control"
          selectedIndex={selectedCategoryIndex}
          onSelect={onSelectCategory}
          value={
            <Text status="basic" category="s1">
              {categories.length > 0 &&
                categories[selectedCategoryIndex.row].title}
            </Text>
          }>
          {categories.map((item, index) => {
            return (
              <SelectItem
                key={index}
                title={
                  <Text status="primary" category="s1">
                    {item.title}
                  </Text>
                }
              />
            );
          })}
        </Select>
      </View>
      <SectionList
        ref={refCategory}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        sections={categories}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} />
        )}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default Menu;
