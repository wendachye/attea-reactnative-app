import React from 'react';
import {View, Modal as RNModal} from 'react-native';
import PropTypes from 'prop-types';
import useStyles from './Modal.Styles';

const Modal = props => {
  const styles = useStyles();
  const {children, visible} = props;

  return (
    <RNModal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>{children}</View>
      </View>
    </RNModal>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  visible: false,
};

export default Modal;
