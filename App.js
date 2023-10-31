import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import 'react-native-gesture-handler';

import Attractions from "./screens/Attractions";
import AddAttraction from "./screens/AddAttraction";
import AttractionDetail from "./screens/AttractionDetail";
import Tips from "./screens/Tips";
import Map from "./screens/Map";

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AttractionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Attractions List"
        component={Attractions}
        options={{ title: "Attractions", headerTitleAlign: "center",}}
      />
      <Stack.Screen
        name="AttractionDetail"
        component={AttractionDetail}
        options={{ title: "Attraction Detail", headerTitleAlign: "center", }}
      />
    </Stack.Navigator>
  );
};

const AddAttractionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddAttraction Screen"
        component={AddAttraction}
        options={{ title: "Add Attraction", headerTitleAlign: "center", }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ title: "Map", headerTitleAlign: "center",  }}
      />
    </Stack.Navigator>
  );
};


const TipsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tips Screen"
        component={Tips}
        options={{ title: "Tips", headerTitleAlign: "center", }}
      />      
    </Stack.Navigator>
  );
};


const screenOptions = {
  tabBarShowLabel: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    elevation: 5,
    height: 50,
    backgroundColor: "#fff", 
  },
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Attractions"
          component={AttractionStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo name="home" size={24} color={focused ? "#0fb170" : "#222"} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AddAttraction"
          component={AddAttractionStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="add-circle" size={30} color={focused ? "#0fb170" : "#222"} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tips"
          component={TipsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="event-note" size={24} color={focused ? "#0fb170" : "#222"}/>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
