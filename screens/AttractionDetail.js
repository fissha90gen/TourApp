import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
  const attraction = route.params.attraction;
  const category = route.params.category;
  const description = route.params.description;
  const restaurant = route.params.nearestRestaurant;
  const bar = route.params.nearestBar;
  const shop = route.params.nearestShop;
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
      <Text style={styles.itemDescription}>
        {"Location: "}
        {latitude} N , {longitude} E
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  itemAttraction: {
    fontSize: 22,
    color: "#000",
    paddingTop: 6,
    paddingLeft: 6,
  },
  itemDescription: {
    fontSize: 15,
    color: "#000",
    padding: 12,
  },
});

export default DetailScreen;
