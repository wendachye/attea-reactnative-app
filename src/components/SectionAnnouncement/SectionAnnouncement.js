import React, {memo} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import SectionHeader from '@components/SectionHeader/SectionHeader';
import useStyles from './SectionAnnouncement.Styles';

const SectionAnnouncement = props => {
  const {data} = props;
  const navigation = useNavigation();
  const styles = useStyles();

  const onPressItem = item => {
    navigation.navigate('announcement', item);
  };

  const onPressSeeAll = () => {};

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={() => onPressItem(item)}>
        {item.media_type === 'VIDEO' ? (
          <Image
            source={require('@assets/images/Splash-Screen.jpeg')}
            style={styles.itemImage}
          />
        ) : (
          <FastImage
            source={{
              uri: item.media_url,
            }}
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.cover}
            fallback
            defaultSource={require('@assets/images/Image-Placeholder.png')}
          />
        )}

        <Text
          // ellipsizeMode="tail"
          numberOfLines={8}
          category="p2"
          style={styles.itemText}>
          {item.media_caption}
        </Text>
      </TouchableOpacity>
    );
  };

  if (data.length > 0) {
    return (
      <>
        <SectionHeader
          title="Announcements"
          showSeeAllButton={data.length > 5}
          onPressSeeAll={onPressSeeAll}
        />
        <View style={styles.container}>
          {data.length > 5
            ? data.slice(0, 5).map((item, index) => renderItem({item, index}))
            : data.map((item, index) => renderItem({item, index}))}
        </View>
      </>
    );
  }

  return null;
};

SectionAnnouncement.propTypes = {
  data: PropTypes.array,
};

SectionAnnouncement.defaultProps = {
  data: [],
};

export default memo(SectionAnnouncement);
