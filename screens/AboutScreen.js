import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";

export default function AboutScreen({ navigation }) {
  const [poster, setPoster] = React.useState(true);

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
            <Text style={styles.textmiddle}>About</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <>
        <StatusBar />
        <Header />
        <ScrollView>
          <View style={styles.containerinfo}>
            <View style={styles.firstSection}>
              <Text style={styles.bold}>Info</Text>
              <Text style={styles.text}>Creator: Sanay George Varghese</Text>
              <Text style={styles.text}>
                Website Name:{" "}
                <Text
                  style={styles.websitename}
                  onPress={() => Linking.openURL("https://www.dragongear.tk")}
                >
                  DragonGear
                </Text>
              </Text>
            </View>
            <View style={styles.secondSection}>
              <View style={styles.Line} />
              <Text style={styles.bold2}>Programming Language</Text>
              <Text style={styles.text}>
                I have used React-Native for creating this app
              </Text>
            </View>
            <View style={styles.thirdSection}>
              <View style={styles.Line} />
              <Text style={styles.bold2}>Help & FeedBack</Text>
              <Text style={styles.text}>
                If you want any help you can go to{" "}
                <Text
                  style={styles.websitename}
                  onPress={() =>
                    Linking.openURL("https://contact.dragongear.tk/")
                  }
                >
                  Help & Feedback
                </Text>{" "}
                and Report your problems we will be trying to reply immediately
                or you can give feedback about this app
              </Text>
            </View>

            <View style={styles.thirdSection}>
              <View style={styles.Line} />
              <Text style={styles.bold2}>Intro Video</Text>
              <TouchableOpacity onPress={() => setPoster(false)}>
                <Video
                  style={styles.video}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/apromo.mp4?alt=media&token=1c3341f0-01c0-4c8e-a5ea-d0a0e0ffec61",
                  }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  posterSource={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/brad-gallery1.appspot.com/o/IMG_20210728_163302.jpg?alt=media&token=64d60890-db1a-4aa3-a607-b27e76191df8",
                  }}
                  usePoster={poster}
                />
              </TouchableOpacity>
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
  bold: { fontSize: 25, fontWeight: "bold" },
  bold2: { fontSize: 20, fontWeight: "bold", marginBottom: 10, marginTop: 10 },

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
  },
  secondSection: {
    marginBottom: 15,
  },
  thirdSection: {
    marginBottom: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: "900",
    fontFamily: "Roboto",
  },
  websitename: {
    fontSize: 15,
    fontWeight: "900",
    fontFamily: "Roboto",
    textDecorationLine: "underline",
    color: "blue",
  },
  video: {
    width: 320,
    height: 200,
  },
});
