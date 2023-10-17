import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
  const destination = route.params.destination;
  const restaurant = route.params.restaurant;
  const bar = route.params.bar;
  const shop = route.params.shop;
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const imageUrl = route.params.imageUrl;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={{ height: 240, width: "100%" }}
        resizeMode="cover"
      />
      <Text style={styles.itemDestination}>{destination}</Text>
      <Text style={styles.itemDescription}>{restaurant}</Text>
      <Text style={styles.itemDescription}>{bar}</Text>
      <Text style={styles.itemDescription}>{shop}</Text>
      <Text style={styles.itemDescription}>{latitude}</Text>
      <Text style={styles.itemDescription}>{longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    paddingTop: 20,
  },
  itemDestination: {
    fontSize: 20,
    color: "#000",
    paddingTop: 6,
    paddingLeft: 6,
  },
  itemDescription: {
    fontSize: 16,
    color: "#000",
    padding: 12,
  },
});

export default DetailScreen;
