import {StyleSheet} from 'react-native';
import {useTheme} from '@ui-kitten/components';

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      marginVertical: 15,
      marginHorizontal: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      shadowColor: '#000000',
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.25,
    },
    title: {
      fontSize: 14,
      lineHeight: 20,
      color: '#000000',
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
      letterSpacing: 0.3,
      lineHeight: 26,
      color: theme['color-primary-500'],
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemLabel: {
      margin: 15,
    },
    itemImage: {
      width: 50,
      height: 50,
    },
  });
};

export default useStyles;
