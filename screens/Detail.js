import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

function DetailScreen() {
  const route = useRoute();
  const { itemData } = route.params;

  return (
    <View style={styles.container}>
      <Image source={itemData.image} style={{ height: 240, width: "100%" }} />
      <Text style={styles.itemDestination}>{itemData.destination}</Text>
      <Text style={styles.itemDescription}>{itemData.descreption}</Text>
    </View>
  );
}

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
    alignItems: "center",
  },
  itemDescription: {
    fontSize: 16,
    color: "#000",
    padding: 12,
  },
});

export default DetailScreen;
