import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function Map({ navigation }) {
  const [coordinate, setCoordinate] = useState({
    lat: 9.033404,
    long: 38.751041,
  });

  const handleSelectLocation = () => {
    navigation.navigate("AddAttraction Screen", { coordinate });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.033404,
          longitude: 38.751041,
          latitudeDelta: 4,
          longitudeDelta: 4,
        }}
      >
        <Marker
          coordinate={{ latitude: 9.033404, longitude: 38.751041 }}
          draggable={true}
          onDragEnd={(e) => {
            setCoordinate({
              lat: e.nativeEvent.coordinate.latitude,
              long: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>Drag Marker</Text>
          </Callout>
        </Marker>
      </MapView>
      <TouchableOpacity
        onPress={handleSelectLocation}
        style={[styles.buttonSelect, { zIndex: 1 }]}
      >
        <Text style={styles.buttonTextBlack}>Select Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  map: {
    width: "100%",
    height: "100%",
  },
  buttonSelect: {
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginVertical: 20,
    paddingHorizontal: 30,
    elevation: 3,
    position: "absolute",
    bottom: 30,
  },
  buttonTextBlack: {
    fontSize: 20,
    color: "#fff", // Text color
  },
});