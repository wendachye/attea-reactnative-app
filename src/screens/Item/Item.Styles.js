import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
  },
  itemContentContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  itemTitleContainer: {
    flex: 0.7,
    marginRight: 10,
  },
  itemTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 23,
  },
  itemDescriptionText: {
    fontSize: 12,
    paddingTop: 3,
  },
  itemPriceContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  condimentGroupContainer: {
    paddingTop: 15,
  },
  condimentGroupNameContainer: {
    flex: 0.9,
    paddingBottom: 5,
  },
  condimentSelectTextContainer: {
    marginVertical: 3,
  },
  condimentGroupMustSelectText: {
    color: 'lightgrey',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
