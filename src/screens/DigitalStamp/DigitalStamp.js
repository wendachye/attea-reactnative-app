import React, {useEffect, useState} from 'react';
import {View, FlatList, Image} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {fetchStamps} from '@redux/slices/stampSlice';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './DigitalStamp.Styles';

const DigitalStamp = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {title, totalStamps, data} = useSelector(state => state.stamps);
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
    dispatch(fetchStamps.trigger());
  }, [dispatch]);

  useEffect(() => {
    let total = [];
    for (let i = 0; i < totalStamps; i++) {
      if (i < data.length) {
        total = [
          ...total,
          {
            id: i,
            image: require('@assets/images/Stamp-White.png'),
            createdDate: data[i].st_created_date,
            outletName: data[i].out_name,
          },
        ];
        continue;
      }

      total = [
        ...total,
        {
          id: i,
          image: require('@assets/images/Stamp-Grey.png'),
        },
      ];
    }

    setStamps(total);
  }, [totalStamps, data]);

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    return <Text style={styles.titleText}>{title}</Text>;
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={item.image} style={styles.itemImage} />
        {item?.createdDate ? (
          <>
            <Text style={styles.itemText}>
              {moment(item.createdDate).format('DD MMM')}
            </Text>
            <Text style={styles.itemText}>{item.outletName}</Text>
          </>
        ) : (
          <Text style={styles.itemText}>Coming Soon</Text>
        )}
      </View>
    );
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <View style={styles.container}>
        <FlatList
          data={stamps}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={globalStyles.centerItem}
          ListHeaderComponent={renderHeader()}
        />
      </View>
    </Layout>
  );
};

export default DigitalStamp;
