import React, { useState } from "react";
import {
  Alert,
  Modal as NativeModal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";

type ModalProps = {
  modalVisible: {
    isVisible: boolean;
    image?: string;
    name?: string;
  };
  setModalVisible: (props: {
    isVisible: boolean;
    image?: string;
    name?: string;
  }) => void;
};

const Modal = (props: ModalProps) => {
  return (
    <View>
      <NativeModal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible.isVisible}
        onRequestClose={() => {
          props.setModalVisible({ isVisible: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{ uri: props.modalVisible.image }}
              width={160}
              height={100}
            />
            <Text style={styles.modalText}>{props.modalVisible.name}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.setModalVisible({ isVisible: false })}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </NativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Modal;
