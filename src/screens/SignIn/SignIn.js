import React, {useState} from 'react';
import {View, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import {Input, Button, Text, Spinner} from '@ui-kitten/components';
import {setUser} from '@redux/slices/userSlice';
import Header from '@components/Header/Header';
import Modal from '@components/Modal/Modal';
import HttpClient from '@utils/httpClient';
import useGloabalStyles from '@styles/styles';
import useStyles from './SignIn.Styles';

const httpClient = HttpClient({
  defaultBasicAuth: true,
});
const formSchema = yup.object().shape({
  phoneNo: yup
    .string()
    .matches(/^((8|9)\d{7})$/, 'Invalid phone number')
    .required('Phone Number is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const gloabalStyles = useGloabalStyles();
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });

  const onPressCloseButton = () => {
    navigation.goBack();
  };

  const onPressForgotPassword = () => {
    navigation.navigate('forgot-password');
  };

  const signIn = async formData => {
    try {
      setLoading(true);

      const params = {
        mobile: formData.phoneNo,
        password: formData.password,
      };

      const {data} = await httpClient.post('/customer/login', params);

      if (data?.code === 3001) {
        const payload = {
          user: {
            id: data.cu_id,
            firstName: data.cu_firstname,
            lastName: data.cu_lastname,
            email: data.cu_email,
            phoneNo: data.cu_mobile,
            gender: data.cu_gender,
            dateOfBirth: data.cu_dob,
            totalPoints: data.total_points,
          },
          accessToken: {...data.data},
        };

        dispatch(setUser.trigger(payload));
        navigation.goBack();
        return;
      }

      if (data?.code === 2005) {
        setModalMessage('Incorret phone Number or password');
        setModalVisible(true);
        return;
      }

      setModalMessage('Something went wrong');
      setModalVisible(true);
    } catch (error) {
      console.log('signIn', error);
      setModalMessage('Something went wrong');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
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
      <Modal visible={modalVisible}>
        <Text style={styles.modalMessage}>{modalMessage}</Text>
        <Button size="small" onPress={() => setModalVisible(false)}>
          Try Again
        </Button>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={gloabalStyles.flex}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={gloabalStyles.flexGrow}>
        <ImageBackground
          source={require('@assets/images/Background-SignIn.png')}
          style={styles.backgroundImage}>
          <Header
            type="modal"
            color="secondary"
            isCloseButton
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
              name="phoneNo"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      placeholder="Phone Number"
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
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      secureTextEntry
                      placeholder="Password"
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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressForgotPassword}>
              <Text status="primary" category="s2">
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Button
              style={styles.button}
              disabled={loading || !formState.isValid || formState.isSubmitting}
              accessoryLeft={
                (loading || formState.isSubmitting) && loadingIndicator
              }
              onPress={handleSubmit(signIn)}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </Button>
          </View>
          {renderModal()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
