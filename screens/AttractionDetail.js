import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

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

  const apiKey = "2dee08cbbda3fddb58e11cf8aa60b66a";
  const latitude = lat;
  const longitude = long;
  const units = "metric";

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={{ height: 240, width: "100%" }}
        resizeMode="cover"
      />
      <View style={styles.inlineAttractionAndWeatherContainer}>
        <Text style={styles.itemAttraction}>{attraction}</Text>
        <View style={styles.inlineWeathercontainer}>
          <Text style={styles.inlineTemprature}>
            {weatherData
              ? `${Math.round(weatherData.main.temp)}°C`
              : "Loading..."}
          </Text>
          <View style={styles.inlineTextContainerVertical}>
            <Text style={styles.inlineWeatherDescription}>
              {weatherData ? weatherData.weather[0].description : "Loading..."}
            </Text>
            <Text style={styles.inlineWeatherDescription}>
              {weatherData
                ? `Humidity: ${weatherData.main.humidity}%`
                : "Loading..."}
            </Text>
          </View>
        </View>
      </View>
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
    fontSize: 26,
    color: "#000",
    flex: 6,
  },
  itemDescription: {
    fontSize: 15,
    color: "#000",
    paddingVertical: 3,
    paddingLeft: 5,
  },
  inlineTextContainerHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },

  inlineAttractionAndWeatherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  inlineWeathercontainer: {
    flexDirection: "row",
    flex: 5,
    justifyContent: "space-between",
    padding: 3,
    borderWidth: 1,
    borderColor: "#f70",
    borderRadius: 10,
  },
  inlineTextContainerVertical: {
    flexDirection: "column",
    flex: 2,
  },
  inlineTemprature: {
    flex: 1,
    fontSize: 26,
    color: "#f70",
  },
  inlineWeatherDescription: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 12,
  },
});

export default DetailScreen;
