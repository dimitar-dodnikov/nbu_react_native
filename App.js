import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ToDos from "./components/ToDos/ToDos";
import ToDo from "./components/ToDo/ToDo";
import initialToDos from "./components/initialToDos";

const Stack = createNativeStackNavigator();

export default function App() {
	useEffect(() => {
		AsyncStorage.setItem(
			"toDos",
			JSON.stringify(
				initialToDos.map((el) => {
					return { ...el, toBeDeleted: false };
				})
			)
		);
	});

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: "center",
				}}
			>
				<Stack.Screen
					name="ToDos"
					component={ToDos}
					initialParams={{ toBeDeleted: null }}
				/>
				<Stack.Screen name="ToDo" component={ToDo} />
			</Stack.Navigator>
			<FlashMessage position="bottom" />
		</NavigationContainer>
	);
}
