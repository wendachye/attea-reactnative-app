import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
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
import signUpAPI from '@apis/signUp';
import sendOtpAPI from '@apis/sendOtp';
import verifyOtpAPI from '@apis/verifyOtp';
import useGlobalStyles from '@styles/styles';
import useStyles from './SignUp.Styles';

const gender = ['Male', 'Female'];
const formatDateService = new NativeDateService('en', {format: 'DD MMM YYYY'});
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
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const [selectedGenderIndex, setSelectedGenderIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccessButton, setModalSuccessButton] = useState(false);
  const [isOtpView, setIsOtpView] = useState(false);
  const [userData, setUserData] = useState(null);
  const [otp, setOtp] = useState('');
  const [countDown, setCountDown] = useState(60);

  useEffect(() => {
    if (isOtpView) {
      if (countDown > 0) {
        setTimeout(() => setCountDown(countDown - 1), 1000);
      }
    } else {
      setCountDown(60);
    }
  }, [countDown, isOtpView]);

  const signUp = async () => {
    setLoading(true);

    const params = {
      cu_first_name: userData.firstName,
      cu_last_name: userData.lastName,
      cu_mobile: userData.phoneNo,
      cu_email: userData.email,
      cu_dob: moment(new Date(userData.dob)).format('YYYY-MM-DD'),
      cu_gender: userData.gender,
    };

    const [data] = await signUpAPI(params);

    setLoading(false);

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

    if (data?.code === 3001) {
      setModalMessage('Your account has been successfully created');
      setModalSuccessButton(true);
      setModalVisible(true);
      return;
    }

    setModalMessage('Something went wrong');
    setModalVisible(true);
  };

  const onPressCloseButton = () => {
    navigation.goBack();
  };

  const onPressBackButton = () => {
    setOtp('');
    setUserData(null);
    setIsOtpView(false);
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

  const onPressSignUp = async formData => {
    const params = {
      cu_mobile: formData.phoneNo,
    };

    const [data, error] = await sendOtpAPI(params);

    console.log(error);

    if (data?.code === 3001) {
      setUserData(formData);
      setIsOtpView(true);
      return;
    }

    setModalMessage('Something went wrong');
    setModalVisible(true);
  };

  const onPressResend = async () => {
    const params = {
      cu_mobile: userData.phoneNo,
    };

    const [data, error] = await sendOtpAPI(params);

    console.log(error);

    if (data?.code === 3001) {
      setCountDown(60);
      return;
    }

    setModalMessage('Something went wrong');
    setModalVisible(true);
  };

  const onPressVerify = async () => {
    const params = {
      cu_mobile: userData.phoneNo,
      otp,
    };

    const [data, error] = await verifyOtpAPI(params);

    console.log(error);

    if (data?.code === 3001) {
      await signUp();
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

  const renderOTPView = () => {
    return (
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            keyboardType="number-pad"
            label={evaProps => (
              <Text status="primary" style={styles.labelOTP}>
                {`Please enter OTP code sent to your phone number +65 ${userData.phoneNo}`}
              </Text>
            )}
            placeholder="OTP code"
            value={otp}
            onChangeText={value => setOtp(value)}
          />
        </View>
        <View style={styles.resendOtpContainer}>
          <Text category="c1" style={styles.signInText}>
            Didn't receive OTP?{' '}
          </Text>
          <TouchableOpacity
            disabled={countDown !== 0}
            activeOpacity={0.7}
            onPress={onPressResend}>
            <Text
              category="s2"
              appearance={countDown !== 0 ? 'hint' : 'default'}
              status={countDown === 0 && 'primary'}>
              {countDown === 0 ? 'RESEND OTP' : `RESEND OTP (${countDown})`}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.signUpButton}
          disabled={loading || otp.length === 0}
          accessoryLeft={loading && loadingIndicator}
          onPress={onPressVerify}>
          <Text style={styles.signUpText}>VERIFY</Text>
        </Button>
      </View>
    );
  };

  const renderSignUpView = () => {
    return (
      <View style={styles.formContainer}>
        <Controller
          name="firstName"
          defaultValue=""
          control={control}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            return (
              <View style={styles.inputContainer}>
                <Input
                  label={evaProps =>
                    !!value && (
                      <Text status="primary" style={styles.label}>
                        First Name
                      </Text>
                    )
                  }
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
                  label={evaProps =>
                    !!value && (
                      <Text status="primary" style={styles.label}>
                        Last Name
                      </Text>
                    )
                  }
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
                  keyboardType="phone-pad"
                  label={evaProps =>
                    !!value && (
                      <Text status="primary" style={styles.label}>
                        Phone Number
                      </Text>
                    )
                  }
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
        <Controller
          name="gender"
          defaultValue=""
          control={control}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            return (
              <View style={styles.inputContainer}>
                <Select
                  selectedIndex={selectedGenderIndex}
                  label={evaProps =>
                    !!value && (
                      <Text status="primary" style={styles.label}>
                        Gender
                      </Text>
                    )
                  }
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
                      title={evaProps => (
                        <Text status="primary" category="s1">
                          {title}
                        </Text>
                      )}
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
          status="basic"
          render={({field: {value, onChange}, fieldState: {error}}) => {
            return (
              <View style={styles.inputContainer}>
                <Datepicker
                  label={evaProps =>
                    !!value && (
                      <Text status="primary" style={styles.label}>
                        Date of Birth
                      </Text>
                    )
                  }
                  placeholder={'Date of Birth'}
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
        <Controller
          name="referralCode"
          defaultValue=""
          control={control}
          render={({field: {value, onChange}, fieldState: {error}}) => {
            return (
              <View style={styles.inputContainer}>
                <Input
                  label={evaProps =>
                    !!value && (
                      <Text status="primary" style={styles.label}>
                        Referral Coded
                      </Text>
                    )
                  }
                  placeholder="Referral Code"
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
          style={styles.signUpButton}
          disabled={loading || !formState.isValid || formState.isSubmitting}
          accessoryLeft={
            (loading || formState.isSubmitting) && loadingIndicator
          }
          onPress={handleSubmit(onPressSignUp)}>
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
    );
  };

  return (
    <View style={globalStyles.containerModal}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.flexGrow}>
        <ImageBackground
          source={require('@assets/images/Background-SignUp.png')}
          style={styles.backgroundImage}>
          <Header
            type="modal"
            color="secondary"
            isCloseButton={!isOtpView}
            closeButtonPosition="right"
            onPressCloseButton={onPressCloseButton}
            onPressBackButton={onPressBackButton}
          />
          <View style={styles.logoImageContainer}>
            <Image
              source={require('@assets/images/Logo-Orange.png')}
              style={styles.logoImage}
            />
          </View>
          {isOtpView ? renderOTPView() : renderSignUpView()}
          {renderModal()}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
