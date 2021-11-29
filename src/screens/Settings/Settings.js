import React from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './Settings.Styles';

const Settings = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {navigation} = props;

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onPressChangeLanguage = () => {
    navigation.navigate('language');
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ListItem
            title={() => <Text>Change Language</Text>}
            accessoryRight={() => (
              <MaterialCommunityIcons
                name={'chevron-right'}
                size={24}
                color={'#FFFFFF'}
              />
            )}
            onPress={onPressChangeLanguage}
            activeOpacity={0.7}
            style={styles.listItem}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Settings;
