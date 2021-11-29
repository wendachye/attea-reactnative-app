import React, {useState} from 'react';
import {View, ImageBackground, Image, Modal} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input, Button, Text, Spinner} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Header from '@components/Header/Header';
import forgetPasswordAPI from '@apis/forgetPassword';
import useGlobalStyles from '@styles/styles';
import useStyles from './ForgotPassword.Styles';

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email Address is required'),
});

const ForgotPassword = props => {
  const {navigation} = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccessButton, setModalSuccessButton] = useState(false);
  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onPressCloseButton = () => {
    navigation.goBack();
    navigation.navigate('sign-in');
  };

  const resetPassword = async formData => {
    setLoading(true);

    const params = {
      email: formData.email,
    };

    const [data] = await forgetPasswordAPI(params);

    setLoading(false);

    if (data?.code === 3001) {
      setModalMessage('Password reset successfully');
      setModalSuccessButton(true);
      setModalVisible(true);
      return;
    }

    if (data?.code === 1008) {
      setModalMessage("This email doesn't belong to any account");
      setModalVisible(true);
      return;
    }

    setModalMessage('Something went wrong');
    setModalVisible(true);
  };

  const loadingIndicator = accessoryLeftProps => {
    return (
      <View style={accessoryLeftProps.style}>
        <Spinner size="small" status="basic" />
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            {modalSuccessButton ? (
              <Button
                size="small"
                onPress={() => {
                  setModalVisible(false);
                  navigation.goBack();
                  navigation.navigate('sign-in');
                }}>
                Go back to login
              </Button>
            ) : (
              <Button size="small" onPress={() => setModalVisible(false)}>
                Try Again
              </Button>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={globalStyles.flex}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.flexGrow}>
        <ImageBackground
          source={require('@assets/images/Background-SignIn.png')}
          style={styles.backgroundImage}>
          <Header
            type="modal"
            color="secondary"
            isCloseButton
            closeButtonPosition="right"
            onPressCloseButton={onPressCloseButton}
          />
          <View style={styles.logoImageContainer}>
            <Image
              source={require('@assets/images/Logo-Orange.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.formContainer}>
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      autoCompleteType="email"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      label={evaProps =>
                        !!value && (
                          <Text status="primary" style={styles.label}>
                            Email Address
                          </Text>
                        )
                      }
                      placeholder="Email Address"
                      value={value}
                      onChange={onChange}
                      onChangeText={newValue => onChange(newValue)}
                      caption={
                        error && (
                          <View style={styles.errorTextContainer}>
                            <Text status="danger" category="c1">
                              {error.message}
                            </Text>
                          </View>
                        )
                      }
                    />
                  </View>
                );
              }}
            />
            <Button
              style={styles.button}
              disabled={loading || !formState.isValid || formState.isSubmitting}
              accessoryLeft={
                (loading || formState.isSubmitting) && loadingIndicator
              }
              onPress={handleSubmit(resetPassword)}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </Button>
          </View>
          {renderModal()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
