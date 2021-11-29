import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, SectionList, RefreshControl} from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
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
import MenuItem from '@components/MenuItem/MenuItem';
import {fetchMenu} from '@redux/slices/menuSlice';
import useStyles from './Menu.Styles';

const ITEM_HEIGHT = 180;
const ITEM_HEADER_HEIGHT = 35;

const Menu = ({navigation}) => {
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

  const onPressItem = useCallback(
    item => {
      navigation.navigate('item', item);
    },
    [navigation],
  );

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
                title={evaProps => (
                  <Text status="primary" category="s1">
                    {item.title}
                  </Text>
                )}
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
        renderItem={({item}) => (
          <MenuItem
            item={item}
            itemHeight={ITEM_HEIGHT}
            onPressItem={onPressItem}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} />
        )}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={11}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  );
};

export default Menu;
