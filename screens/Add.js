import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";

//for realtimedb
import "firebase/compat/database";

export default function Add() {
  //for making  keyboard numeric for latitude and longtude
  const [numberInput, setNumberInput] = useState("");
  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    setNumberInput(numericValue);
  };

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  //for realtime db
  const [destination, setDestination] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [bar, setBar] = useState("");
  const [shop, setShop] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const db = firebase.database();

  //checking and requesting permission
  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);
  if (hasGalleryPermission === false) {
    return <Text>Permission is not granted for accessing Storage</Text>;
  }

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.assets[0].canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (destinationId) => {
    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    const filename =
      Date.now() + "-" + image.substring(image.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);
    var fireRef = firebase.storage().ref().child(filename);

    try {
      await ref;
      setUploading(false);
      //to update data uri
      const imageUrl = await fireRef.getDownloadURL();
      db.ref(`destinations/${destinationId}/imageUrl`).set(imageUrl);

      Alert.alert("Upload Finished!");

      setImage(null);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  const uploadDestination = () => {
    if (
      !destination ||
      !restaurant ||
      !bar ||
      !shop ||
      !latitude ||
      !longitude ||
      !image
    ) {
      Alert.alert("All fields and Image are required!");
      return;
    }

    // Create a new reference in the "destinations" node with a unique key
    const newDestinationRef = db.ref("destinations").push();

    // Set the data to be saved in the database
    const newDestinationData = {
      destination: destination,
      nearestRestaurant: restaurant,
      nearestBar: bar,
      nearestShop: shop,
      latitude: latitude,
      longitude: longitude,
      imageUrl: "",
    };

    // Push the data to the database
    newDestinationRef
      .set(newDestinationData)
      .then(() => {
        // Data successfully saved in the database, now you can upload the image
        // The URL of the uploaded image will be updated in the database after image upload
        uploadImage(newDestinationRef.key);
      })
      .catch((error) => {
        console.error("Error uploading destination data: ", error);
      });

    setDestination("");
    setRestaurant("");
    setBar("");
    setShop("");
    setLatitude("");
    setLongitude("");
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Destination Name"
        value={destination}
        onChangeText={(text) => setDestination(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Nearest Restaurant"
        value={restaurant}
        onChangeText={(text) => setRestaurant(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Nearest Bar"
        value={bar}
        onChangeText={(text) => setBar(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Nearest Shop"
        value={shop}
        onChangeText={(text) => setShop(text)}
      />
      <View style={styles.inlineInputsContainer}>
        <TextInput
          keyboardType="numeric"
          style={[styles.textInput, styles.inlineTextInputLeft]}
          placeholder="Latitude"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.textInput, styles.inlineTextInputRight]}
          placeholder="Longtude"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonSelect}
        onPress={() => selectImage()}
      >
        <Text style={styles.buttonTextBlack}>Select Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.selectedImage} />}

      <TouchableOpacity
        style={styles.buttonUpload}
        onPress={() => uploadDestination()}
      >
        <Text style={styles.buttonTextWhite}>Upload Destination</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inlineInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inlineTextInputLeft: {
    flex: 1,
    marginRight: 10,
  },
  inlineTextInputRight: {
    flex: 1,
    marginLeft: 10,
  },

  buttonSelect: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    marginVertical: 20,
    paddingHorizontal: 20,
    elevation: 3,
  },
  buttonTextWhite: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextBlack: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonUpload: {
    backgroundColor: "#000",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 3,
    position: "absolute",
    bottom: 40,
  },

  selectedImage: {
    width: 360,
    height: 270,
    alignSelf: "center",
    marginVertical: 10,
  },
});
