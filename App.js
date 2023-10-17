import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Attractions from "./screens/Attractions";
import AddAttraction from "./screens/AddAttraction";
import AttractionDetail from "./screens/AttractionDetail";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Attractions"
          component={Attractions}
          options={{ title: "Attractions", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="AddAttraction"
          component={AddAttraction}
          options={{ title: "Add Attraction", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="AttractionDetail"
          component={AttractionDetail}
          options={{ title: "Attraction Detail", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
