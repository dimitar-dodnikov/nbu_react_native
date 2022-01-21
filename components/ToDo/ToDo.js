import { useState } from "react";
import { StyleSheet, Text, View, Switch, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { showMessage } from "react-native-flash-message";

const ToDo = ({ navigation, route }) => {
	const [toDo, setToDo] = useState(route.params.toDo);

	// Handle checked todo
	const toggleToDoState = () => {
		AsyncStorage.getItem("toDos").then((result) => {
			const text = toDo.text;
			const checked = toDo.checked;

			const localStorageToDos = JSON.parse(result);
			const localStorageToDo = localStorageToDos.find(
				(obj) => obj.id === toDo.id
			);
			localStorageToDo.checked = !checked;

			AsyncStorage.setItem("toDos", JSON.stringify(localStorageToDos)).then(
				() => {
					setToDo(localStorageToDo);

					showMessage({
						message: (checked ? "Unchecked" : "Checked") + " TODO: " + text,
						type: "info",
					});
				}
			);
		});
	};

	// remove TODO
	const deleteToDohandler = () => {
		navigation.navigate("ToDos", { toBeDeleted: toDo.id });
	};

	return (
		<>
			<View style={toDoStyles.item}>
				<Text style={toDoStyles.left}>ID</Text>
				<Text style={toDoStyles.text}>{toDo.id}</Text>
			</View>

			<View style={toDoStyles.item}>
				<Text style={toDoStyles.left}>Text</Text>
				<Text style={toDoStyles.text}>{toDo.text}</Text>
			</View>

			<View style={toDoStyles.item}>
				<Text style={toDoStyles.left}>Checked</Text>
				<Switch value={toDo.checked} onValueChange={toggleToDoState} />
			</View>

			<View style={toDoStyles.item}>
				<Text>Created At</Text>
				<Text style={toDoStyles.text}>{toDo.createdAt}</Text>
			</View>

			<View style={toDoStyles.item}>
				<Pressable
					style={[toDoStyles.button, toDoStyles.buttonDelete]}
					onPress={deleteToDohandler}
				>
					<Text style={toDoStyles.textStyle}>Delete</Text>
				</Pressable>
			</View>
		</>
	);
};

export default ToDo;

const toDoStyles = StyleSheet.create({
	item: {
		backgroundColor: "#fff",
		padding: 5,
		paddingRight: 15,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 5,
	},
	text: {
		maxWidth: "80%",
		marginLeft: 10,
	},
	button: {
		width: "100%",
		borderRadius: 20,
		paddingTop: 3,
		paddingBottom: 3,
		elevation: 2,
		marginBottom: 0,
	},
	buttonDelete: {
		backgroundColor: "red",
	},
	textStyle: {
		color: "white",
		textAlign: "center",
	},
});
