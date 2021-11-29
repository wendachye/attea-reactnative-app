import {StyleSheet} from 'react-native';
import {useTheme} from '@ui-kitten/components';

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      height: 160,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: theme['color-primary-500'],
    },
    image: {
      width: 80,
      height: 80,
    },
  });
};

export default useStyles;
