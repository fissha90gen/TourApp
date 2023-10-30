import React, { useState, useEffect, useRef } from "react";
import * as Progress from 'react-native-progress';
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
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
  const [searchQuery, setSearchQuery] = useState("");
  const db = firebase.database();
  const textInputRef = useRef(null);

  const clearSearchInput = () => {
    setSearchQuery("");
    if (textInputRef.current) {
      textInputRef.current.blur(); // Remove focus
    }
  };



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

  const filteredAttractions = attractions.filter((item) =>
    item.attraction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Attractions"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          ref={textInputRef}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={clearSearchInput}
          >
            <FontAwesome name="times" size={24} color="#444"  />
          </TouchableOpacity>
        )}
         {searchQuery.length === 0 && (
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => {
              if (textInputRef.current) {
                textInputRef.current.focus(); // Focus the input
              }
            }}
          >
            <FontAwesome name="search" size={24} color="#444" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredAttractions}
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
    marginBottom: 5,
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    elevation:10,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: 8,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    padding: 3,
    flex: 1,
    textAlign: "center",
    paddingLeft: 30,
    fontSize: 18,
  },
});
