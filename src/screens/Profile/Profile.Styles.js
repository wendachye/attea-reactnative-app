import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    leftIcon: {
      marginRight: 5,
    },
    titleText: {
      marginHorizontal: 5,
      fontSize: 16,
    },
    modalLogoutTitle: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginBottom: 20,
    },
    modalLogoutButton: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    versionTextContainer: {
      margin: 15,
      alignItems: 'center',
    },
    emptySpace: {
      height: 15,
    },
  });
};

export default useStyles;
