import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Alert,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { auth } from "../firebase";

const ConfirmScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (auth?.currentUser?.email === email) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => navigation.navigate("EditProfile"))
        .catch((error) => alert(error));
    } else {
      Alert.alert("Error", "Please enter your email & passsword correctly", [
        {
          text: "Ok",
        },
      ]);
    }
  };
  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon
              size={28}
              name="close"
              onPress={() => navigation.goBack()}
              color="#000"
            />
          </View>

          <View style={styles.textcenter}>
            <Text style={styles.textmiddle}>Login</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      <StatusBar />
      <View style={styles.container}>
        <Header />
      </View>
      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <Text style={styles.bold}>Enter your Email & Password</Text>
          <Input
            style={styles.input}
            autoFocus
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={{
              type: "font-awesome-5",
              name: "envelope",
              color: "#515151",
              size: 20,
              containerStyle: { marginRight: 3 },
            }}
            autoCorrect={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={{
              type: "font-awesome-5",
              name: "lock",
              color: "#515151",
              size: 20,
              containerStyle: { marginRight: 3 },
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={signIn}
          />
        </View>
        <Button
          title="Login"
          containerStyle={styles.button1}
          onPress={signIn}
        ></Button>

        <View style={{ height: 50 }} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,

    marginHorizontal: 5,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  button1: {
    width: 300,
  },
  inputContainer: {
    width: 300,
  },

  createacc: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#2e64e5",
  },
  //Header Style
  header: {
    height: 45,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  textcenter: {
    flex: 0.9,
  },
  textmiddle: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto",
    marginLeft: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    fontWeight: "900",
    fontFamily: "Roboto",
  },
  bold: {
    fontSize: 20,
    marginBottom: 30,
    marginTop: 5,
    fontWeight: "bold",
  },
});
