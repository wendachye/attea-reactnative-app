import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    guestView: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
  });
};

export default useStyles;
