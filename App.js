import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-elements/dist/icons/Icon";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import AccountScreen from "./screens/AccountScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import { DrawerContent } from "./components/DrawerContent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Drawroute = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{}} />
    </Drawer.Navigator>
  );
};

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          key="Login"
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          key="Register"
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          key="Home"
          name="Home"
          component={Drawroute}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          key="About"
          name="About"
          component={AboutScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          key="Account"
          name="Account"
          component={AccountScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          key="EditProfile"
          name="EditProfile"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          key="ConfirmScreen"
          name="ConfirmScreen"
          component={ConfirmScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
