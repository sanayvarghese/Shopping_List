import React, {useState, useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Title,
  Paragraph,
  Caption,
  Switch,
  TouchableRipple,
  Text,
  Drawer,
} from "react-native-paper";
import { auth ,db } from "../firebase";
import Icon from "react-native-elements/dist/icons/Icon";

export const DrawerContent = ({ navigation }, props) => {
  const [changed, setChanged] = useState([]);
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
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.topinfocon}>
              <View>
              {changed.map(({id, data: { photoURL } }) => (
                <Avatar.Image
                key={id}
                  style={styles.avatar}
                  source={{
                    uri:
                       photoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/Dglogo.png?alt=media&token=a1e72fbb-2b6f-44ea-9b30-40688b8e3ca5",
                  }}
                  size={70}
                />
                ))}
              </View>
              <View style={{ marginLeft: 8, flexDirection: "column" }}>
                <Title style={styles.title}>
                  {auth?.currentUser?.displayName || auth?.currentUser?.email}
                </Title>
                <Caption style={styles.caption}>
                  {auth?.currentUser?.email}
                </Caption>
              </View>
            </View>
          </View>
          <View style={styles.line}></View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              focused
              icon={({ color, size }) => (
                <Icon
                  type="font-awesome"
                  name="shopping-cart"
                  color={color}
                  size={size}
                />
              )}
              label="List item"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type="font-awesome"
                  name="user"
                  color={color}
                  size={size}
                />
              )}
              label="Account"
              onPress={() => navigation.navigate("Account")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon size={size} name="info" color={color} />
              )}
              label="About"
              onPress={() => navigation.navigate("About")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  size={24}
                  type="font-awesome"
                  name="question-circle"
                  color={color}
                />
              )}
              label="Help & Feedback"
              onPress={() => Linking.openURL("https://contact.dragongear.tk/")}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Made By DragonGear"
          onPress={() => Linking.openURL("https://www.dragongear.tk")}
          labelStyle={{ fontSize: 13, marginHorizontal: 35 }}
          style={styles.bottomFooter}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  line: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderBottomColor: "#f4f4f4",
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomFooter: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },

  avatar: {
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  topinfocon: {
    flexDirection: "row",
  },
  avatarsection: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
