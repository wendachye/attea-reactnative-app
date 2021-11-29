import React from 'react';
import {ScrollView, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {Layout, Text} from '@ui-kitten/components';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './Announcement.Styles';

const Announcement = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {
    navigation,
    route: {params: announcement},
  } = props;

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const renderImage = () => {
    return (
      <FastImage
        source={{
          uri: announcement?.media_url,
        }}
        style={styles.itemImage}
      />
    );
  };

  const renderVideo = () => {
    return (
      <Video
        controls
        resizeMode="contain"
        source={{uri: announcement?.media_url}}
        style={styles.itemVideo}
      />
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
            <Text category="h4">Announcement</Text>
          </View>
          {announcement.media_type === 'VIDEO' ? renderVideo() : renderImage()}
          <View style={styles.itemTextContainer}>
            <Text category="s2">{announcement.media_caption}</Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Announcement;
