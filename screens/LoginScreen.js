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
import { auth } from "../firebase";
import { useRoute, useFocusEffect } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === "Login") {
          Alert.alert("Hold on!", "Are you sure you want to Quit the app", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "YES", onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [route])
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <Image style={styles.logo} source={require("../assets/Dglogo.png")} />
      <View style={styles.inputContainer}>
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
      <TouchableOpacity
        style={styles.createacc}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  button1: {
    width: 300,
  },
  inputContainer: {
    width: 300,
  },
  logo: {
    width: 250,
    height: 180,
  },
  createacc: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#2e64e5",
  },
});
