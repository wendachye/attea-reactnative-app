import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    drawerContentScrollView: {
      backgroundColor: '#FFFFFF',
    },
    drawerContentContainer: {
      paddingTop: 15,
      paddingBottom: 15,
    },
  });
};

export default useStyles;
