import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { auth, db } from "../firebase";
import Icon from "react-native-elements/dist/icons/Icon";
import firebase from "firebase";


const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [imgavatar, setImgAvatar] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const register = () => {
    {
      if (confirmpassword === password) {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            authUser.user.updateProfile({
              displayName: name,
            });
            db.collection("usersinfo")
          .doc(authUser.user.uid)
          .collection("Details")
          .doc("info")
          .set({
            photoURL: imgavatar,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .catch((error) => alert(error))
          }).then(() => {})
          .catch((error) => alert(error))

        
         } else {
        Alert.alert("Error", "Password does not match", [
          {
            text: "Ok",
          },
        ]);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <Text h3 style={{ marginBottom: 50 }}>
        Create a acoount
      </Text>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          autoFocus
          placeholder="Username"
          leftIcon={{
            type: "font-awesome-5",
            name: "user",
            color: "black",
            size: 20,
            containerStyle: { marginRight: 3 },
          }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          leftIcon={{
            type: "font-awesome-5",
            name: "envelope",
            color: "black",
            size: 20,
            containerStyle: { marginRight: 3 },
          }}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          autoCorrect={false}
          autoCapitalize="none"
          leftIcon={{
            type: "font-awesome-5",
            name: "lock",
            color: "#515151",
            size: 20,
            containerStyle: { marginRight: 3 },
          }}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          secureTextEntry
          value={confirmpassword}
          autoCorrect={false}
          autoCapitalize="none"
          leftIcon={{
            type: "font-awesome-5",
            name: "lock",
            color: "#515151",
            size: 20,
            containerStyle: { marginRight: 3 },
          }}
          onChangeText={(text) => setConfirmPassword(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        type="outline"
        buttonStyle={styles.btnmodal}
        title="Select an avatar"
        onPress={() => setModalOpen(true)}
      />
      <Modal transparent={true} visible={modalOpen}>
        <View style={styles.View2}>
          <View style={styles.View3}>
            <View style={styles.iconcloseview}>
              <Icon
                size={30}
                name="close"
                onPress={() => setModalOpen(false)}
              />
            </View>
            <Text style={styles.TextInside}>Select An Avatar</Text>
            <View style={styles.avatarView}>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar1.jpg?alt=media&token=b22d63d3-14c6-4948-999b-5780940ae60a"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar1.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar2.jpg?alt=media&token=32a5f4e0-420f-4bbc-921e-2c8a039e8cc7"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar2.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar3.jpg?alt=media&token=a587147d-88fb-4689-9276-b980a1ec3b82"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar3.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar4.jpg?alt=media&token=32fc0f12-01f2-4366-9872-fa4b7e23a3cd"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar4.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar5.jpg?alt=media&token=4f17fc08-6131-4a7c-928a-bc1994434776"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar5.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar6.jpg?alt=media&token=9ae73bcf-34d8-413d-bf31-fd92f93a30a0"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar6.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar7.jpg?alt=media&token=4f715c27-fab3-4a10-a239-06b97fd500e2"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar7.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar8.jpg?alt=media&token=5226c7aa-8f40-447f-83fd-4a2a51a1778d"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar8.jpg")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImgAvatar(
                    "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar9.jpg?alt=media&token=7854b10b-9c0b-4db8-bd43-f6471dcf1464"
                  );
                  setModalOpen(false);
                }}
              >
                <Image
                  style={styles.avatar}
                  source={require("../assets/img/avatar9.jpg")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Button
        title="Register"
        containerStyle={styles.button1}
        onPress={register}
      ></Button>

      <TouchableOpacity
        style={styles.createacc}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.navButtonText}>
          Already have an account ? Sign In
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
  createacc: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#2e64e5",
  },
  View2: { backgroundColor: "#000000aa", flex: 1, paddingTop: 50 },
  View3: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 18,
    borderRadius: 10,
  },
  TextInside: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  avatarView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avatar: {
    height: 90,
    width: 80,
    margin: 5,
    marginTop: 10,
    borderRadius: 100,
    resizeMode: "contain",
  },
  iconcloseview: {
    alignItems: "flex-end",
    marginRight: 10,
  },
  btnmodal: { alignContent: "center", width: 300, marginBottom: 10 },
});
