import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    referralImage: {
      height: 150,
      width: '100%',
    },
    title: {
      textAlign: 'center',
      marginTop: 15,
      lineHeight: 35,
      fontSize: 24,
      fontWeight: '600',
    },
    dividerContainer: {
      marginVertical: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonLink: {
      backgroundColor: 'rgba(255,255,255, 0.25)',
      margin: 5,
    },
  });
};

export default useStyles;
