import React, {memo, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme, Text} from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Modal from '@components/Modal/Modal';
import CloseButton from '@components/CloseButton/CloseButton';
import useGlobalStyles from '@styles/styles';
import useStyles from './SectionMood.Styles';

const SectionMood = props => {
  const {data} = props;
  const theme = useTheme();
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const onPressSectionMood = () => {
    if (data.length > 0) {
      setModalVisible(true);
    }
  };

  const onPressItem = mood => {
    setModalVisible(false);
    navigation.navigate('mood', mood);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPressItem(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemLabel}>
            <FastImage
              source={{
                uri: item.hashtag_imgurl,
              }}
              style={styles.itemImage}
              fallback
              defaultSource={require('@assets/images/Image-Placeholder.png')}
            />
          </View>
          <View style={styles.itemLabel}>
            <Text category="h6" status="primary">
              {item.hashtag_title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderModal = () => {
    return (
      <Modal visible={modalVisible}>
        <CloseButton
          position="headerRight"
          color="secondary"
          onPress={() => setModalVisible(false)}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.hashtag_id}
          showsVerticalScrollIndicator={false}
          style={globalStyles.flexGrowZero}
        />
      </Modal>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPressSectionMood}>
        <View style={globalStyles.flexDirectionRow}>
          <View style={globalStyles.flex}>
            <Text style={styles.title}>What is your mood today?</Text>
            <Text style={styles.subtitle}>Let's enlighten you!</Text>
          </View>
          <View style={globalStyles.centerItem}>
            <MaterialCommunityIcons
              name="arrow-right-circle"
              size={38}
              color={theme['color-primary-500']}
            />
          </View>
        </View>
      </TouchableOpacity>
      {renderModal()}
    </>
  );
};

SectionMood.propTypes = {
  data: PropTypes.array,
};

SectionMood.defaultProps = {
  data: [],
};

export default memo(SectionMood);
