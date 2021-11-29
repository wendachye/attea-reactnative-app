import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 15,
    },
    formContainer: {
      marginHorizontal: 15,
    },
    inputContainer: {
      marginBottom: 10,
    },
    errorTextContainer: {
      paddingTop: 5,
    },
    errorText: {
      color: '#990000',
    },
    updateButton: {
      marginVertical: 10,
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
