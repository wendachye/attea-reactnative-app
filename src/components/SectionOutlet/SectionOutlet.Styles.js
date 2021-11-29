import {StyleSheet} from 'react-native';
import {useTheme} from '@ui-kitten/components';

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: 15,
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
    iconContainer: {
      backgroundColor: theme['color-primary-500'],
      padding: 5,
      borderRadius: 20,
    },
    titleContainer: {
      justifyContent: 'center',
      marginHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemLabel: {
      margin: 15,
    },
  });
};

export default useStyles;
