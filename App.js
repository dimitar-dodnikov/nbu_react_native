import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToDos from "./components/ToDos/ToDos";
import ToDo from "./components/ToDo/ToDo";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
				<Stack.Screen name="ToDos" component={ToDos} />
				<Stack.Screen name="ToDo" component={ToDo} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
