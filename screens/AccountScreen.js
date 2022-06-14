import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Avatar } from "react-native-paper";
import { auth } from "../firebase";
import { db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";

export default function AccountScreen({ navigation }) {
  const [changed, setChanged] = useState([]);

  const signout = () => {
    auth.signOut().then(() => navigation.replace("Login"));
  };
  const deleteuser = () => {
    auth.currentUser
      .delete()
      .then(() => {
        navigation.replace("Login");
        Alert.alert("Success!", "The account has been successfully deleted", [
          {
            text: "Ok",
          },
        ]);
      })
      .catch((error) => alert(error));
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
            <Text style={styles.textmiddle}>Account</Text>
          </View>
          <View style={styles.Buttonsout}>
            <Icon
              name="exit-to-app"
              title="Signout"
              onPress={() =>
                Alert.alert(
                  "Are you Sure!",
                  "Do you want to Sign-out from your account?",
                  [
                    { text: "Cancel" },
                    {
                      text: "Ok",
                      onPress: signout,
                    },
                  ],
                  { cancelable: true }
                )
              }
            />
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    db.collection("usersinfo")
      .doc(auth?.currentUser?.uid)
      .collection("Details")
      .onSnapshot((snapshot) =>
        setChanged(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <>
        <StatusBar />
        <Header />
        <ScrollView>
          <View style={styles.containerinfo}>
            <View style={styles.firstSection}>
              <TouchableOpacity>
                {changed.map(({ id, data: { photoURL } }) => (
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
              <Text style={styles.text}>{auth?.currentUser?.displayName}</Text>
              <Text style={styles.text}>{auth?.currentUser?.email}</Text>
            </View>
            <View style={styles.secondSection}>
              <View style={styles.Line} />
              <Text style={styles.bold2}>User Information</Text>
              <Text style={styles.text}>
                Name : {auth?.currentUser?.displayName}
              </Text>
              <Text style={styles.text}>
                Email : {auth?.currentUser?.email}
              </Text>
              <View style={styles.Buttons}>
                <View style={styles.ButtonEdit}>
                  <Button
                    icon={{
                      name: "edit",
                      size: 15,
                      color: "#000",
                    }}
                    type="outline"
                    title="Edit Info"
                    onPress={() => navigation.navigate("ConfirmScreen")}
                  />
                </View>
                <View>
                  <Button
                    buttonStyle={styles.Buttondele}
                    title="Delete User"
                    color="#ff0000"
                    onPress={() =>
                      Alert.alert(
                        "Confirmation",
                        "Do you really want to delete your account. Once you delete it cannot be recovered",
                        [
                          { text: "Cancel" },
                          {
                            text: "Ok",
                            onPress: deleteuser,
                          },
                        ],
                        { cancelable: true }
                      )
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    marginHorizontal: 5,
  },
  bold2: { fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10 },

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
  text: {
    fontSize: 15,
    fontWeight: "900",
    fontFamily: "Roboto",
  },
  Buttondele: {
    marginTop: 20,
    alignItems: "flex-start",
    backgroundColor: "red",
    marginLeft: 20,
  },
  Buttonsout: {
    alignItems: "flex-start",
    position: "absolute",
    right: 10,
  },
  ButtonEdit: {
    marginTop: 20,
    alignItems: "flex-start",
    marginRight: 30,
  },
  Buttons: {
    width: 200,
    marginTop: 20,
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
  btnmodal: { alignContent: "center", width: 300, marginBottom: 10 },
  avatarsection: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 70,
    bottom: 0,
    left: 7,
  },
});
