import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
    logoImageContainer: {
      marginVertical: 30,
      alignItems: 'center',
    },
    logoImage: {
      width: 100,
      height: 100,
    },
    formContainer: {
      marginHorizontal: 35,
    },
    inputContainer: {
      marginBottom: 10,
    },
    button: {
      marginVertical: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    errorTextContainer: {
      paddingTop: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    modalContentContainer: {
      backgroundColor: 'white',
      borderRadius: 15,
      paddingVertical: 30,
      paddingHorizontal: 40,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalMessage: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginBottom: 20,
    },
    label: {
      fontSize: 11,
      lineHeight: 20,
      paddingLeft: 3,
    },
  });
};

export default useStyles;
