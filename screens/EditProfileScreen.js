import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Avatar } from "react-native-paper";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from "react-native";
import firebase from "firebase";
import { Button, Input } from "react-native-elements";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [imgavatar, setImgAvatar] = useState("");
  // const stringurl = imgavatar + '';
  const [changed, setChanged] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  //Chhange avatar
  const avatarlive = () => {
    //   // auth.currentUser
    //   //   .updateProfile({
    //   //     photoURL: imgavatar,
    //   //   })
    //   //   .then(() => {
    //   //     ToastAndroid.show(
    //   //       "The avatar will be changend soon...",
    //   //       ToastAndroid.BOTTOM
    //   //     );
    //   //   });

    db.collection("usersinfo")
      .doc(auth?.currentUser?.uid)
      .collection("Details")
      .doc("info")
      .update({
        photoURL: imgavatar,
      })
      .then(() => {
        ToastAndroid.show(
          "The avatar has been changed",
          ToastAndroid.BOTTOM
        );
      });
    // .update({
    //   photoURL: imgavatar,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
  };

  useEffect(() => {
   db.collection("usersinfo")
      .doc(auth?.currentUser?.uid)
      .collection("Details")
      .onSnapshot((snapshot) => setChanged(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
      );
  }, []);

  //Save the Changes Function
  const savechanges = () => {
    //1Checking Avatr
    if (imgavatar) {
      auth.currentUser
        .updateProfile({
          photoURL: imgavatar,
        })
        .then(() => {
          ToastAndroid.show(
            "The avatar will be changend soon...",
            ToastAndroid.BOTTOM
          );
        });
    }
    //1Checked Avatr

    //2Checking Name
    if (name) {
      auth.currentUser
        .updateProfile({
          displayName: name,
        })
        .then(() => {
          ToastAndroid.show(
            "The username will be changend soon...",
            ToastAndroid.BOTTOM
          );
        })
        .catch((error) => alert(error));
    }
    //2Checked Name

    //3Checking Password
    if (password) {
      //Checking passwords are equal
      if (confirmpassword === password) {
        auth.currentUser
          .updatePassword(password)
          .then(() => {
            ToastAndroid.show(
              "The password will be changend soon...",
              ToastAndroid.BOTTOM
            );
          }) //Catch for update password
          .catch((error) => alert(error));
      }
      //3Checked Password

      //3Passwords are notequal
      else {
        Alert.alert("Error", "Password does not match", [
          {
            text: "Ok",
          },
        ]);
      }
    }
    navigation.navigate("Account");

    //3Checked Password
  };
  //Header Componet
  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.icon}>
            <Icon
              size={28}
              name="close"
              onPress={() => navigation.navigate("Account")}
              color="#000"
            />
          </View>

          <View style={styles.textcenter}>
            <Text style={styles.textmiddle}>Edit User Info</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <Header />
      <ScrollView>
        <View style={styles.containerinfo}>
          <View style={styles.firstSection}>
            <TouchableOpacity>
              {changed.map(({ id ,data: { photoURL } }) => (
                <Avatar.Image
                key={id}
                  style={styles.avatarmain}
                  source={{
                    uri:
                      photoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/Dglogo.png?alt=media&token=a1e72fbb-2b6f-44ea-9b30-40688b8e3ca5",
                  }}
                  size={100}
                />
              ))}
            </TouchableOpacity>
            <Button
              buttonStyle={styles.modalbtn}
              type="outline"
              title="Change Avatar"
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
                  <Text style={styles.TextInside}>Select a new avatar</Text>
                  <View style={styles.avatarView}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);

                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar1.jpg?alt=media&token=b22d63d3-14c6-4948-999b-5780940ae60a"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar1.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar2.jpg?alt=media&token=32a5f4e0-420f-4bbc-921e-2c8a039e8cc7"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar2.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar3.jpg?alt=media&token=a587147d-88fb-4689-9276-b980a1ec3b82"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar3.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar4.jpg?alt=media&token=32fc0f12-01f2-4366-9872-fa4b7e23a3cd"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar4.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar5.jpg?alt=media&token=4f17fc08-6131-4a7c-928a-bc1994434776"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar5.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar6.jpg?alt=media&token=9ae73bcf-34d8-413d-bf31-fd92f93a30a0"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar6.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar7.jpg?alt=media&token=4f715c27-fab3-4a10-a239-06b97fd500e2"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar7.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar8.jpg?alt=media&token=5226c7aa-8f40-447f-83fd-4a2a51a1778d"
                        );
                      }}
                    >
                      <Image
                        style={styles.avatar}
                        source={require("../assets/img/avatar8.jpg")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        avatarlive();
                      }}
                      onPressIn={() => {
                        setImgAvatar(
                          "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/avatar9.jpg?alt=media&token=7854b10b-9c0b-4db8-bd43-f6471dcf1464"
                        );
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
          </View>
          <View style={styles.secondSection}>
            <View style={styles.Line} />
            <Text style={styles.bold2}>Edit Information</Text>
            <Input
              value={name}
              placeholder="New username"
              inputContainerStyle={styles.username}
              autoFocus
              leftIcon={{
                type: "font-awesome-5",
                name: "user",
                color: "black",
                size: 20,
                containerStyle: { marginRight: 3 },
              }}
              onChangeText={(text) => setName(text)}
            />
            <Input
              value={password}
              placeholder="New password"
              inputContainerStyle={styles.password}
              type="password"
              secureTextEntry
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
              value={confirmpassword}
              placeholder="Confirm Password"
              inputContainerStyle={styles.confirmpassword}
              type="password"
              secureTextEntry
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
              onSubmitEditing={savechanges}
            />

            <View style={styles.Buttons}>
              <View style={styles.Buttonsubmit}>
                <Button
                  icon={
                    <Icon
                      name="save"
                      size={20}
                      color="white"
                      style={{ marginRight: 5 }}
                    />
                  }
                  title="Save"
                  onPress={savechanges}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    marginHorizontal: 5,
  },
  bold2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
  },

  header: {
    height: 45,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  avatarmain: {
    backgroundColor: "transparent",
    borderRadius: 100,
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
  Line: {
    width: 900,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textmiddle: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto",
    marginLeft: 10,
    fontWeight: "bold",
  },
  containerinfo: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  firstSection: {
    marginBottom: 15,
    alignItems: "center",
  },
  secondSection: {
    marginBottom: 15,
  },
  Buttonsubmit: {
    marginTop: 0,
    marginLeft: 10,
    alignItems: "flex-start",
  },
  Buttons: {
    width: 200,
    marginTop: 0,
    flexDirection: "row",
    alignItems: "flex-start",
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
  modalbtn: { marginTop: 10, height: 40 },
  username: { width: 200, height: 30 },
  password: { width: 200, height: 30 },
  confirmpassword: { width: 200, height: 30 },
});
