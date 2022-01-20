import { useState } from "react";

import { Button, TextInput, View, StyleSheet, Keyboard } from "react-native";

const AddToDo = ({ onAddToDo }) => {
	const [text, setText] = useState("");

	const addToDoHandler = () => {
		if (text !== "") {
			onAddToDo(text);
			setText("");
			Keyboard.dismiss();
		}
	};

	return (
		<View style={[addToDoStyles.inputContainer]}>
			<TextInput
				style={addToDoStyles.input}
				placeholder="Enter TODO Please"
				keyboardType="default"
				value={text}
				onChangeText={(newText) => setText(newText)}
			/>
			<Button title="Add" onPress={addToDoHandler} />
		</View>
	);
};

export default AddToDo;

const addToDoStyles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 10,
	},
	input: {
		height: 45,
		width: 300,
		borderWidth: 0.5,
		padding: 10,
		borderRadius: 50,
	},
});
