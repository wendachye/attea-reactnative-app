import React, {useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Layout,
  Button,
  Text,
  Input,
  Select,
  SelectItem,
  Datepicker,
  NativeDateService,
  Spinner,
} from '@ui-kitten/components';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from 'react-redux';
import {updateUser} from '@redux/slices/userSlice';
import Header from '@components/Header/Header';
import Modal from '@components/Modal/Modal';
import useGlobalStyles from '@styles/styles';
import useStyles from './ProfileDetails.Styles';

import useHttpClient from '@hooks/useHttpClient';

const gender = ['Male', 'Female'];
const formatDateService = new NativeDateService('en', {format: 'DD MMM YYYY'});
const formSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
});

const ProfileDetails = props => {
  const {navigation} = props;
  const globalStyles = useGlobalStyles();
  const styles = useStyles();
  const {user} = useSelector(state => state.user);
  const {control, handleSubmit, formState} = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  });
  const dispatch = useDispatch();
  const [selectedGenderIndex, setSelectedGenderIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalButton, setModalButton] = useState('Try Again');
  const {POST} = useHttpClient({userOAuthToken: true});

  const onPressBackButton = () => {
    navigation.goBack();
  };

  const updateProfile = async formData => {
    try {
      setLoading(true);

      const params = {
        cu_id: user.id,
        cu_email: formData.email,
        cu_firstname: formData.firstName,
        cu_lastname: formData.lastName,
      };

      const {data} = await POST('/customer/updateProfile', params);

      if (data?.code === 1008) {
        const payload = {
          user: {
            firstName: params.cu_firstname,
            lastName: params.cu_lastname,
          },
        };

        dispatch(updateUser.trigger(payload));
        setModalMessage('Profile successfully updated');
        setModalButton('Ok');
        setModalVisible(true);
        return;
      }

      setModalMessage('Something went wrong');
      setModalButton('Try Again');
      setModalVisible(true);
    } catch (error) {
      console.log('updateProfile', error);
      setModalMessage('Something went wrong');
      setModalButton('Try Again');
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
          {modalButton}
        </Button>
      </Modal>
    );
  };

  return (
    <Layout style={globalStyles.container}>
      <Header type="secondary" onPressBackButton={onPressBackButton} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.flexGrow}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Controller
              name="firstName"
              defaultValue={user?.firstName}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      label={<Text category="c1">First Name</Text>}
                      placeholder="First Name"
                      value={value}
                      onChange={onChange}
                      onChangeText={newValue => onChange(newValue)}
                      caption={
                        error && (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText} category="c1">
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
              defaultValue={user?.lastName}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      label={<Text category="c1">Last Name</Text>}
                      placeholder="Last Name"
                      value={value}
                      onChange={onChange}
                      onChangeText={newValue => onChange(newValue)}
                      caption={
                        error && (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText} category="c1">
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
              defaultValue={user?.phoneNo}
              control={control}
              render={({field: {value}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      disabled
                      label={<Text category="c1">Phone Number</Text>}
                      placeholder="Phone Number"
                      value={value}
                    />
                  </View>
                );
              }}
            />
            <Controller
              name="email"
              defaultValue={user?.email}
              control={control}
              render={({field: {value}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Input
                      disabled
                      label={<Text category="c1">Email Address</Text>}
                      placeholder="Email Address"
                      value={value}
                    />
                  </View>
                );
              }}
            />
            <Controller
              name="gender"
              defaultValue={user?.gender}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Select
                      disabled
                      label={<Text category="c1">Gender</Text>}
                      placeholder={'Gender'}
                      selectedIndex={selectedGenderIndex}
                      value={value}
                      onSelect={index => {
                        setSelectedGenderIndex(index);
                        onChange(gender[index.row]);
                      }}
                      caption={
                        error && (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText} category="c1">
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
              defaultValue={user?.dateOfBirth && new Date(user.dateOfBirth)}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => {
                return (
                  <View style={styles.inputContainer}>
                    <Datepicker
                      disabled
                      label={<Text category="c1">Date of Birth</Text>}
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
                            <Text style={styles.errorText} category="c1">
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
              status="basic"
              style={styles.updateButton}
              disabled={loading || !formState.isValid || formState.isSubmitting}
              accessoryLeft={
                (loading || formState.isSubmitting) && loadingIndicator
              }
              onPress={handleSubmit(updateProfile)}>
              <Text
                status={
                  loading || !formState.isValid || formState.isSubmitting
                    ? 'basic'
                    : 'primary'
                }
                category="s1">
                UPDATE
              </Text>
            </Button>
          </View>
          {renderModal()}
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  );
};

export default ProfileDetails;
