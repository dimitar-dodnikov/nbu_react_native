import { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";

const ToDo = ({ route, onToggle }) => {
	const [toDo] = useState(route.params.toDo);

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
				<Switch value={toDo.checked} onValueChange={onToggle} />
			</View>

			<View style={toDoStyles.item}>
				<Text>Created At</Text>
				<Text style={toDoStyles.text}>{toDo.createdAt}</Text>
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
});
