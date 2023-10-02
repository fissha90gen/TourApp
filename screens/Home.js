import { StatusBar } from "expo-status-bar";
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

const Home = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("Detail", {
          itemData: {
            image: item.image,
            destination: item.destination,
            descreption: item.descreption,
          },
        })
      }
    >
      <View style={styles.container}>
        <Image source={item.image} style={{ height: 240, width: "100%" }} />
        <Text style={styles.itemDestination}>{item.destination}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const data = [
    {
      id: "1",
      image: require("../assets/fasil.jpg"),
      destination: "Fasiledes Castle",
      descreption:
        "The Fasil Ghebbi (Amharic: ፋሲል ግቢ) is a fortress located in Gondar, Amhara Region, Ethiopia. It was founded in the 17th century by Emperor Fasilides and was the home of Ethiopian emperors. Its unique architecture shows diverse influences including Hindu, Arab, and Baroque characteristics.[1] Because of its historical importance and architecture, the fortress was inscribed as a UNESCO World Heritage Site in 1979.[1] Ghebbi is an Amharic word for a compound or enclosure.",
    },
    {
      id: "2",
      image: require("../assets/tisabay.jpg"),
      destination: "Tisabay Waterfall",
      descreption:
        "Known locally as ‘Tis Abay’ meaning ‘Great Smoke’, the Blue Nile Falls are a testimony to Ethiopia’s natural beauty. The Blue Nile Falls are the most dramatic falls anywhere on the Nile river system, and are at their most impressive in the rainy season from June to early September. ",
    },
    {
      id: "3",
      image: require("../assets/axum.jpg"),
      destination: "Axum Obelisk",
      descreption:
        "The Obelisk of Axum (Tigrinya: ሓወልቲ ኣኽሱም, romanized: ḥawelti Akhsum; Amharic: የአክሱም ሐውልት, romanized: Ye’Åksum ḥāwelt) is a 4th-century CE, 24-metre (79 ft) tall phonolite[3] stele, weighing 160 tonnes (160 long tons; 180 short tons), in the city of Axum in Ethiopia. It is ornamented with two false doors at the base and features decorations resembling windows on all sides. The obelisk ends in a semi-circular top, which used to be enclosed by metal frames",
    },
    {
      id: "4",
      image: require("../assets/laketana.jpg"),
      destination: "Lake Tana and Bahir Dar",
      descreption:
        "Lake Tana (Amharic: ጣና ሐይቅ, romanized: T’ana ḥāyik’i; previously Tsana[1]) is the largest lake in Ethiopia and the source of the Blue Nile. Located in Amhara Region in the north-western Ethiopian Highlands, the lake is approximately 84 kilometres (52 miles) long and 66 kilometres (41 miles) wide, with a maximum depth of 15 metres (49 feet),[2] and an elevation of 1,788 metres (5,866 feet).",
    },
    {
      id: "5",
      image: require("../assets/addisabeba.jpg"),
      destination: "Addis Abeba City",
      descreption:
        "Addis Ababa (/ˌædɪs ˈæbəbə/;[5] Oromo: Finfinnee, lit. 'fountain of hot mineral water', Amharic: አዲስ አበባ, lit. 'new flower' [adˈdis ˈabəba] ⓘ) is the capital and largest city of Ethiopia.[6][7][8] In the 2007 census, the city's population was estimated to be 2,739,551 inhabitants.",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        vertical
      />
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonLabel}
          onPress={() => navigation.navigate("Add")}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
  },

  container: {
    backgroundColor: "#afcfee",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 8,
    paddingBottom: 16,
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  itemDestination: {
    fontSize: 20,
    color: "#000",
    paddingTop: 6,
    alignItems: "center",
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#000",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonLabel: {
    fontSize: 40,
    alignSelf: "center",
    color: "white",
  },
});
