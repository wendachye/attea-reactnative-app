import {StyleSheet} from 'react-native';

const useStyles = () => {
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
      marginVertical: 15,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    errorTextContainer: {
      paddingTop: 5,
    },
    modalMessage: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginBottom: 20,
    },
  });
};

export default useStyles;
