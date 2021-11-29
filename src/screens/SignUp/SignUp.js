import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Input,
  Button,
  Text,
  Select,
  SelectItem,
  Datepicker,
  Spinner,
  NativeDateService,
} from '@ui-kitten/components';
import moment from 'moment';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Header from '@components/Header/Header';
import Modal from '@components/Modal/Modal';
import HttpClient from '@utils/httpClient';
import useGloabalStyles from '@styles/styles';
import useStyles from './SignUp.Styles';

const gender = ['Male', 'Female'];
const formatDateService = new NativeDateService('en', {format: 'DD MMM YYYY'});
const httpClient = HttpClient({
  defaultBasicAuth: true,
});
const formSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phoneNo: yup
    .string()
    .matches(/^((8|9)\d{7})$/, 'Invalid phone number')
    .required('Phone Number is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email Address is required'),
  dob: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required'),
});

const SignIn = props => {
  const {navigation} = props;
  const gloabalStyles = useGloabalStyles();
  const styles = useStyles();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState();
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
  };

  const onPressSignIn = () => {
    navigation.goBack();
    navigation.navigate('sign-in');
  };

  const onPressContinue = () => {
    setModalVisible(false);
    navigation.goBack();
    navigation.navigate('sign-in');
  };

  const signUp = async formData => {
    try {
      setLoading(true);

      const params = {
        cu_first_name: formData.firstName,
        cu_last_name: formData.lastName,
        cu_mobile: formData.phoneNo,
        cu_email: formData.email,
        cu_dob: moment(new Date(formData.dob)).format('YYYY-MM-DD'),
        cu_gender: formData.gender,
      };

      const {data} = await httpClient.post('/customer/register', params);

      if (data?.code === 3001) {
        setModalMessage('Your account has been successfully created');
        setModalSuccessButton(true);
        setModalVisible(true);
        return;
      }

      if (data?.code === 1004) {
        setModalMessage('Phone number already in use');
        setModalVisible(true);
        return;
      }

      if (data?.code === 1009) {
        setModalMessage('Email Address already in use');
        setModalVisible(true);
        return;
      }

      setModalMessage('Something went wrong');
      setModalVisible(true);
    } catch (error) {
      console.log('signUp', error);
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
        {modalSuccessButton ? (
          <Button size="small" onPress={onPressContinue}>
            Continue to login
          </Button>
        ) : (
          <Button size="small" onPress={() => setModalVisible(false)}>
            Try Again
          </Button>
        )}
      </Modal>
    );
  };

  return (
    <SafeAreaView style={gloabalStyles.flex}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={gloabalStyles.flexGrow}>
        <ImageBackground
          source={require('@assets/images/Background-SignUp.png')}
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
              name="firstName"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      placeholder="First Name"
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
              name="lastName"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      placeholder="Last Name"
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
            <Controller
              name="gender"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Select
                      selectedIndex={selectedGenderIndex}
                      placeholder={'Gender'}
                      value={value}
                      onSelect={index => {
                        setSelectedGenderIndex(index);
                        onChange(gender[index.row]);
                      }}
                      caption={
                        error && (
                          <View style={styles.errorTextContainer}>
                            <Text status="danger" category="c1">
                              {error.message}
                            </Text>
                          </View>
                        )
                      }>
                      {gender.map((title, index) => (
                        <SelectItem
                          key={index}
                          title={
                            <Text status="primary" category="s1">
                              {title}
                            </Text>
                          }
                        />
                      ))}
                    </Select>
                  </View>
                );
              }}
            />
            <Controller
              name="dob"
              defaultValue=""
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Datepicker
                      placeholder={<Text appearance="hint">Date of Birth</Text>}
                      date={value}
                      onSelect={newDate => {
                        onChange(newDate);
                      }}
                      min={new Date('1900-01-01')}
                      max={new Date()}
                      dateService={formatDateService}
                      placement="top"
                      style={styles.datePicker}
                      caption={
                        error && (
                          <View style={styles.errorTextContainer}>
                            <Text status="danger" category="c1">
                              {'error.message'}
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
              style={styles.signUpButton}
              disabled={loading || !formState.isValid || formState.isSubmitting}
              accessoryLeft={
                (loading || formState.isSubmitting) && loadingIndicator
              }
              onPress={handleSubmit(signUp)}>
              <Text style={styles.signUpText}>SIGN UP</Text>
            </Button>
            <View style={styles.consentContainer}>
              <Text category="c1" style={styles.consentText}>
                By signing up, you accept the{' '}
                <Text
                  status="primary"
                  category="c1"
                  onPress={() =>
                    Linking.openURL(
                      'https://attea.datapos.sg/member/signup?page=tnc',
                    )
                  }>
                  Terms of Service
                </Text>{' '}
                And{' '}
                <Text
                  status="primary"
                  category="c1"
                  onPress={() =>
                    Linking.openURL(
                      'https://attea.datapos.sg/member/signup?page=privacy',
                    )
                  }>
                  Privacy Policy
                </Text>
                .
              </Text>
            </View>
            <View style={styles.signInContainer}>
              <Text category="c1" style={styles.signInText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={onPressSignIn}>
                <Text category="s2" status="primary">
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {renderModal()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
