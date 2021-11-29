import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    positionLeft: {
      position: 'absolute',
      top: 15 + insets.top,
      left: 15,
      zIndex: 2,
    },
    positionRight: {
      position: 'absolute',
      top: 15 + insets.top,
      right: 15,
      zIndex: 2,
    },
    positionHeaderLeft: {
      position: 'absolute',
      top: 15,
      left: 15,
      zIndex: 2,
    },
    positionHeaderRight: {
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: 2,
    },
    shadowBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      borderRadius: 30,
      padding: 5,
    },
  });
};

export default useStyles;
