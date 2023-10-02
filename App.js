import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Add from "./screens/Add";
import Detail from "./screens/Detail";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Tour Destinations", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ title: "Add Destination", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: "Destination Detail", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
