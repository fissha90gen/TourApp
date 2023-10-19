import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";

//for realtimedb
import "firebase/compat/database";

export default function AddAttraction({ navigation, route }) {
  //for making  keyboard numeric for latitude and longtude
  const [numberInput, setNumberInput] = useState("");
  const handleTextChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    setNumberInput(numericValue);
  };

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  //for auto scroll
  const scrollViewRef = useRef();

  //for realtime db
  const [attraction, setAttraction] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
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
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const uploadImage = async (attractionID) => {
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
      db.ref(`attractions/${attractionID}/imageUrl`).set(imageUrl);

      Alert.alert("Upload Finished!");

      setImage(null);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  const uploadAttraction = () => {
    if (
      !attraction ||
      !category ||
      !description ||
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

    // Create a new reference in the "attraction" node with a unique key
    const newAttractionRef = db.ref("attractions").push();
    const newPostKey = newAttractionRef.key;

    // Set the data to be saved in the database
    const newAttractionData = {
      key: newPostKey,
      attraction: attraction,
      category: category,
      description: description,
      nearestRestaurant: restaurant,
      nearestBar: bar,
      nearestShop: shop,
      latitude: latitude,
      longitude: longitude,
      imageUrl: "",
    };

    // Push the data to the database
    newAttractionRef
      .set(newAttractionData)
      .then(() => {
        // Data successfully saved in the database, now you can upload the image
        // The URL of the uploaded image will be updated in the database after image upload
        uploadImage(newAttractionRef.key);
      })
      .catch((error) => {
        console.error("Error uploading destination data: ", error);
      });

    setAttraction("");
    setCategory("");
    setDescription("");
    setRestaurant("");
    setBar("");
    setShop("");
    setLatitude("");
    setLongitude("");
    setImage(null);
  };
  useEffect(() => {
    if (route.params && route.params.coordinate) {
      setLatitude(route.params.coordinate.lat.toString());
      setLongitude(route.params.coordinate.long.toString());
    }
  }, [route.params]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Attraction Name"
          value={attraction}
          onChangeText={(text) => setAttraction(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Attraction Catagory"
          value={category}
          onChangeText={(text) => setCategory(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Attraction Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
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
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Map")}>
            <Image
              style={styles.textInput}
              source={require("../assets/location.png")}
            />
          </TouchableWithoutFeedback>
        </View>
        {image && (
          <Image source={{ uri: image }} style={styles.selectedImage} />
        )}
        <TouchableOpacity
          style={styles.buttonSelect}
          onPress={() => selectImage()}
        >
          <Text style={styles.buttonTextBlack}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonUpload}
          onPress={() => uploadAttraction()}
        >
          <Text style={styles.buttonTextWhite}>Upload Attraction</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },

  scrollContainer: {
    flexGrow: 1,
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
  },
  inlineTextInputRight: {
    flex: 1,
    marginHorizontal: 10,
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
    marginBottom: 10,
    marginTop: 10,
    elevation: 3,
  },

  selectedImage: {
    width: 400,
    height: 300,
    alignSelf: "center",
    marginVertical: 10,
  },
});
