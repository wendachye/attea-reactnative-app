import React from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '@redux/slices/settingSlice';
import Header from '@components/Header/Header';
import useGlobalStyles from '@styles/styles';
import useStyles from './Language.Styles';

const Language = props => {
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {navigation} = props;
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.settings);

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const onPressEnglish = () => {
    if (language !== 'en') {
      dispatch(setLanguage.trigger({language: 'en'}));
    }
  };

  const onPressChinese = () => {
    if (language !== 'zh-tw') {
      dispatch(setLanguage.trigger({language: 'zh-tw'}));
    }
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <ScrollView
        style={globalStyles.flex}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ListItem
            title={() => <Text>English</Text>}
            accessoryRight={() =>
              language === 'en' && (
                <MaterialIcons name={'check'} size={19} color={'#FFFFFF'} />
              )
            }
            onPress={onPressEnglish}
            activeOpacity={0.7}
            style={styles.listItem}
          />
          <ListItem
            title={() => <Text>Chinese</Text>}
            accessoryRight={() =>
              language === 'zh-tw' && (
                <MaterialIcons name={'check'} size={19} color={'#FFFFFF'} />
              )
            }
            onPress={onPressChinese}
            activeOpacity={0.7}
            style={styles.listItem}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Language;
