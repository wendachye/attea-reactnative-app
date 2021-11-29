import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  itemContainer: {
    width: 200,
    height: 200,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: 15,
  },
});

export default styles;
