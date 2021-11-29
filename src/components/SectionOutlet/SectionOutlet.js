import React, {memo, useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import Modal from '@components/Modal/Modal';
import CloseButton from '@components/CloseButton/CloseButton';
import useGlobalStyles from '@styles/styles';
import useStyles from './SectionOutlet.Styles';

const SectionOutlet = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {data} = props;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const onPressSectionOutlet = () => {
    if (data.length > 0) {
      setModalVisible(true);
    }
  };

  const onPressItem = item => {
    setModalVisible(false);
    navigation.navigate('outlet', item);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPressItem(item)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemLabel}>
            <Text category="h6" status="primary">
              {item.out_name}
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
          keyExtractor={item => item.out_id}
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
        onPress={onPressSectionOutlet}>
        <View style={globalStyles.flexDirectionRow}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="location-on" size={28} color={'#FFFFFF'} />
          </View>
          <View style={styles.titleContainer}>
            <Text status="primary" style={styles.title}>
              {data.length > 0 ? data[0].out_name : ''}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {renderModal()}
    </>
  );
};

SectionOutlet.propTypes = {
  data: PropTypes.array,
};

SectionOutlet.defaultProps = {
  data: [],
};

export default memo(SectionOutlet);
