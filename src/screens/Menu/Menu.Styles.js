import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    categoryContainer: {
      marginHorizontal: 20,
      marginVertical: 15,
    },
  });
};

export default useStyles;
