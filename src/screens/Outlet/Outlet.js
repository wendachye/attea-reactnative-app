import React from 'react';
import {ScrollView, View} from 'react-native';
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
              source={{uri: outlet?.img_file?.[0]}}
              style={styles.image}
              fallback
              defaultSource={require('@assets/images/Image-Placeholder.png')}
            />
            <View style={styles.contentContainer}>
              <View style={styles.content}>
                <View style={styles.subtitleContainer}>
                  <Text status="primary" category="h4">
                    Operating Hours
                  </Text>
                </View>
                <Text style={styles.label}>{outlet?.out_operatinghours}</Text>
              </View>
              <View style={styles.content}>
                <View style={styles.subtitleContainer}>
                  <Text status="primary" category="h4">
                    Address
                  </Text>
                </View>
                <Text style={styles.label}>{outlet?.out_addr}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Outlet;
