import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { db, auth } from "../firebase";

const ListItems = ({ id, itemName }) => {
  const deleteitem = () => {
    db.collection("Users")
      .doc(auth?.currentUser?.uid)
      .collection("Items")
      .doc(id)
      .delete();
  };
  return (
    <TouchableOpacity key={id} style={styles.listItem}>
      <View style={styles.listItemView}>
        <View style={styles.listItemViewText}>
          <Text style={styles.listItemText}>{itemName}</Text>
        </View>

        <View style={styles.iconView}>
          <Icon
            name="remove"
            size={20}
            color="firebrick"
            onPress={deleteitem}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  listItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemViewText: {
    flexDirection: "row",
  },
  listItemText: {
    fontSize: 18,
  },
  iconView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    position: "absolute",
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default ListItems;
