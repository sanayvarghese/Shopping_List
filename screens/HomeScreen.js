import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  BackHandler,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ListItems from "../components/ListItem";
import AddItem from "../components/AddItem";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { db, auth } from "../firebase";
import { useRoute, useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === "Home") {
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
    db.collection("Users")
      .doc(auth?.currentUser?.uid)
      .collection("Items")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={styles.icon}>
          <Icon
            name="menu"
            onPress={() => navigation.openDrawer()}
            color="#000"
          ></Icon>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              fontFamily: "Roboto",
              marginLeft: 10,
            }}
          >
            Shopping List
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <Header />
      <AddItem />
      <ScrollView>
        {items.map(({ id, data: { itemName } }) => (
          <ListItems key={id} id={id} itemName={itemName} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 25,
    flex: 1,
  },
  header: {
    height: 45,
    marginBottom: 10,
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "darkslateblue",
  },
  icon: {
    flexDirection: "row",
  },
});

export default HomeScreen;
