import React from 'react';
import {ScrollView, View, Linking, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Layout, Text} from '@ui-kitten/components';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './Outlet.Styles';

const Outlet = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {
    navigation,
    route: {params: outlet},
  } = props;

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onPressContact = () => {
    if (outlet?.out_contact) {
      Linking.openURL(`tel:${outlet?.out_contact}`);
    }
  };

  const onPressAddress = () => {
    if (outlet?.out_lat && outlet?.long && outlet?.out_addr) {
      const scheme = `${outlet?.out_lat},${outlet?.long}?q=${outlet?.out_addr}`;

      const url = Platform.select({
        ios: `maps:${scheme}`,
        android: `geo:${scheme}`,
      });

      Linking.openURL(url);
    }
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text category="h4">{outlet.out_name}</Text>
          </View>
          <View style={styles.card}>
            <FastImage
              source={{uri: outlet?.out_img}}
              style={styles.image}
              fallback
              defaultSource={require('@assets/images/Image-Placeholder.png')}
            />
            <View style={styles.contentContainer}>
              <View style={styles.content}>
                <View style={styles.subtitleContainer}>
                  <Text status="primary" style={styles.subtitle}>
                    Operating Hours
                  </Text>
                </View>
                <Text style={styles.label}>{outlet?.out_operatin_hour}</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.subtitleContainer}>
                  <Text status="primary" style={styles.subtitle}>
                    Contact No
                  </Text>
                </View>
                <Text style={styles.label} onPress={onPressContact}>
                  {outlet?.out_contact}
                </Text>
              </View>
              <View style={styles.content}>
                <View style={styles.subtitleContainer}>
                  <Text status="primary" style={styles.subtitle}>
                    Address
                  </Text>
                </View>
                <Text style={styles.label} onPress={onPressAddress}>
                  {outlet?.out_addr}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Outlet;
