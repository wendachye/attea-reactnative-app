import React, {memo} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import CloseButton from '@components/CloseButton/CloseButton';
import BackButton from '@components/BackButton/BackButton';
import useGlobalStyles from '@styles/styles';
import styles from './Header.Styles';

const Header = props => {
  const navigation = useNavigation();
  const theme = useTheme();
  const globalStyles = useGlobalStyles();
  const currentDate = moment().format('dddd DD MMM YYYY');
  const {
    type,
    color,
    title,
    isCloseButton,
    closeButtonPosition,
    onPressBackButton,
    onPressCloseButton,
  } = props;
  const {isLoggedIn, user} = useSelector(state => state.user);

  const primaryColor = '#FFFFFF';
  const secondaryColor = theme['color-primary-500'];

  const onPressMenu = () => {
    navigation.toggleDrawer();
  };

  const retrieveColor = value => {
    if (value === 'primary') {
      return primaryColor;
    }
    if (value === 'secondary') {
      return secondaryColor;
    }
    return value;
  };

  const retrieveLogo = value => {
    if (value === 'primary') {
      return require('@assets/images/Atteatude-White.png');
    }
    if (value === 'secondary') {
      return require('@assets/images/Atteatude-Orange.png');
    }
    return null;
  };

  const retrieveRightLogo = value => {
    if (value === 'primary') {
      return require('@assets/images/Logo-White.png');
    }
    if (value === 'secondary') {
      return require('@assets/images/Logo-Orange.png');
    }
    return null;
  };

  const renderModalHeader = () => {
    return (
      <View style={styles.headerSecondaryContainer}>
        {isCloseButton ? (
          <CloseButton
            position={
              closeButtonPosition === 'left' ? 'headerLeft' : 'headerRight'
            }
            color={retrieveColor(color)}
            onPress={onPressCloseButton}
          />
        ) : (
          <BackButton
            color={retrieveColor(color)}
            onPress={onPressBackButton}
          />
        )}
        {title ? (
          <Text
            category="h5"
            status="primary"
            style={[
              styles.headerSecondaryTitle,
              {color: retrieveColor(color)},
            ]}>
            {title}
          </Text>
        ) : (
          <View style={styles.headerSecondaryCenterContainer}>
            <Text
              style={[
                styles.subtitleText,
                {
                  color: retrieveColor(color),
                },
              ]}>
              {currentDate}
            </Text>
            <Image style={styles.logoImage} source={retrieveLogo(color)} />
          </View>
        )}
      </View>
    );
  };

  const renderSecondaryHeader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressBackButton}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={retrieveColor(color)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenterContainer}>
          <View style={globalStyles.flexDirectionRowCenter}>
            <View style={globalStyles.flex}>
              <Text
                style={[
                  styles.subtitleText,
                  {
                    color: retrieveColor(color),
                  },
                ]}>
                {currentDate}
              </Text>
            </View>
            <View style={globalStyles.flex}>
              <Text
                style={[styles.loginTitleText, {color: retrieveColor(color)}]}>
                Welcome
              </Text>
            </View>
          </View>
          <View style={globalStyles.flexDirectionRowCenter}>
            <View style={globalStyles.flex}>
              <Image style={styles.logoImage} source={retrieveLogo(color)} />
            </View>
            <View style={globalStyles.flex}>
              <Text
                style={[styles.loginTitleText, {color: retrieveColor(color)}]}>
                {`${user?.firstName} ${user?.lastName}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRightContainer}>
          <Image
            style={styles.headerRightImage}
            source={retrieveRightLogo(color)}
          />
        </View>
      </View>
    );
  };

  const renderSecondaryHeaderGuest = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressBackButton}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={retrieveColor(color)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerGuestCenterContainer}>
          <Text
            style={[
              styles.subtitleText,
              {
                color: retrieveColor(color),
              },
            ]}>
            {currentDate}
          </Text>
          <Image style={styles.logoImage} source={retrieveLogo(color)} />
        </View>
        <View style={styles.headerRightContainer}>
          <Image
            style={styles.headerRightImage}
            source={retrieveRightLogo(color)}
          />
        </View>
      </View>
    );
  };

  const renderPrimaryHeader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressMenu}>
            <MaterialCommunityIcons name="menu" size={28} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerGuestCenterContainer}>
          <View style={globalStyles.flexDirectionRowCenter}>
            <View style={globalStyles.flex}>
              <Text
                style={[
                  styles.subtitleText,
                  {
                    color: retrieveColor(color),
                  },
                ]}>
                {currentDate}
              </Text>
            </View>
            <View style={globalStyles.flex}>
              <Text
                style={[styles.loginTitleText, {color: retrieveColor(color)}]}>
                Welcome
              </Text>
            </View>
          </View>
          <View style={globalStyles.flexDirectionRowCenter}>
            <View style={globalStyles.flex}>
              <Image style={styles.logoImage} source={retrieveLogo(color)} />
            </View>
            <View style={globalStyles.flex}>
              <Text
                style={[styles.loginTitleText, {color: retrieveColor(color)}]}>
                {`${user?.firstName} ${user?.lastName}`}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRightContainer}>
          <Image
            style={styles.headerRightImage}
            source={retrieveRightLogo(color)}
          />
        </View>
      </View>
    );
  };

  const renderPrimaryHeaderGuest = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressMenu}>
            <MaterialCommunityIcons name="menu" size={28} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerGuestCenterContainer}>
          <Text
            style={[
              styles.subtitleText,
              {
                color: retrieveColor(color),
              },
            ]}>
            {currentDate}
          </Text>
          <Image style={styles.logoImage} source={retrieveLogo(color)} />
        </View>
        <View style={styles.headerRightContainer}>
          <Image
            style={styles.headerRightImage}
            source={retrieveRightLogo(color)}
          />
        </View>
      </View>
    );
  };

  if (type === 'primary') {
    return isLoggedIn ? renderPrimaryHeader() : renderPrimaryHeaderGuest();
  }

  if (type === 'secondary') {
    return isLoggedIn ? renderSecondaryHeader() : renderSecondaryHeaderGuest();
  }

  return renderModalHeader();
};

Header.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'modal']),
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  title: PropTypes.string,
  isCloseButton: PropTypes.bool,
  closeButtonPosition: PropTypes.oneOf(['left', 'right']),
  onPressBackButton: PropTypes.func,
  onPressCloseButton: PropTypes.func,
};

Header.defaultProps = {
  type: 'primary',
  color: 'primary',
  title: '',
  isCloseButton: false,
  closeButtonPosition: 'left',
};

export default memo(Header);
