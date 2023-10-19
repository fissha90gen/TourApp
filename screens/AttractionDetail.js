import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Callout, Marker } from "react-native-maps";

const DetailScreen = ({ route }) => {
  const attraction = route.params.attraction;
  const category = route.params.category;
  const description = route.params.description;
  const restaurant = route.params.nearestRestaurant;
  const bar = route.params.nearestBar;
  const shop = route.params.nearestShop;
  const lat = parseFloat(route.params.latitude); // Convert to a number
  const long = parseFloat(route.params.longitude); // Convert to a number
  const imageUrl = route.params.imageUrl;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={{ height: 240, width: "100%" }}
        resizeMode="cover"
      />
      <Text style={styles.itemAttraction}>{attraction}</Text>
      <Text style={styles.itemDescription}>{category}</Text>
      <Text style={styles.itemDescription}>{description}</Text>
      <Text style={styles.itemDescription}>
        {"Nearest Restaurant: "}
        {restaurant}
      </Text>
      <Text style={styles.itemDescription}>
        {"Nearest Bar: "}
        {bar}
      </Text>
      <Text style={styles.itemDescription}>
        {"Nearest Shop: "}
        {shop}
      </Text>
      <MapView
        style={{ ...styles.map, flex: 1 }}
        initialRegion={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          draggable={true}
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },
  map: {
    width: "100%",
  },
  itemAttraction: {
    fontSize: 22,
    color: "#000",
    paddingTop: 6,
  },
  itemDescription: {
    fontSize: 15,
    color: "#000",
    paddingVertical: 3,
    paddingLeft: 5,
  },
});

export default DetailScreen;
