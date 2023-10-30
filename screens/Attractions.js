import React, { useState, useEffect } from "react";
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { firebase } from "../config";

const Attractions = ({ navigation }) => {
  const [attractions, setAttractions] = useState([]);
  const db = firebase.database();

  function fetchAttractions() {
    const starCountRef = db.ref("attractions");

    starCountRef.on("value", (snapshot) => {
      var allAttractions = [];
      snapshot.forEach((child) => {
        allAttractions.push(child.val());
      });
      allAttractions.reverse();
      setAttractions(allAttractions);
    });
  }

  useEffect(() => {
    fetchAttractions();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("AttractionDetail", item)}
    >
      <View style={styles.container}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={{ height: 240, width: "100%" }}
            resizeMode="cover"
          />
        ) : (
          // Render a placeholder or alternative content when imageUrl is missing
          <Text>No Image Available</Text>
        )}
        <Text style={styles.itemAttraction}>{item.attraction}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <FlatList
        data={attractions}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Progress.Circle
              size={56}
              borderWidth={3}
              borderColor={"#0f9170"}
              alignItems="center"
              marginTop={20}
              marginBottom={20}
              indeterminate={true}
            />
          </View>
        }
        vertical
        style={{ flex: 1 }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddAttraction")}
        >
          <Text style={styles.addButtonLabel}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attractions;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    backgroundColor: "#afcfef",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 8,
    paddingBottom: 16,
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  itemAttraction: {
    fontSize: 20,
    color: "#000",
    paddingTop: 6,
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  addButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonLabel: {
    fontSize: 40,
    color: "white",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
