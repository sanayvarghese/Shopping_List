import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { db, auth } from "../firebase";
import firebase from "firebase";

const AddItem = () => {
  const [input, setInput] = useState("");

  const addItem = async () => {
    if (!input) {
      Alert.alert("Error", "Please enter an item", [
        {
          text: "Ok",
        },
      ]);
    } else {
      await db
        .collection("Users")
        .doc(auth?.currentUser?.uid)
        .collection("Items")
        .add({
          itemName: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          email: auth?.currentUser?.email,
        })
        .then(() => {
          Keyboard.dismiss();
          setInput();
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Add Item..."
        style={styles.input}
        value={input}
        onSubmitEditing={addItem}
        onChangeText={(text) => setInput(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={addItem}>
        <Text style={styles.btnText}>
          <Icon name="plus" size={20} /> Add Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: "#c2bad8",
    padding: 9,
    margin: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  btnText: {
    color: "darkslateblue",
    fontSize: 20,
    textAlign: "center",
  },
});

export default AddItem;
