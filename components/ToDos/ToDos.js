import { useState } from "react";

import {
	StyleSheet,
	View,
	ScrollView,
	Modal,
	Pressable,
	Text,
} from "react-native";

import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

import AddToDo from "./AddToDo";
import Header from "./Header";
import ToDoListItem from "./ToDoListItem";

import initialToDos from "../initialToDos";

let id = initialToDos[initialToDos.length - 1].id;

const ToDos = ({ navigation }) => {
	const [toDos, setToDos] = useState(initialToDos);
	const [modal, setModal] = useState({ visible: false, toDo: {} });

	// add TODO
	const addTodo = (text) => {
		setToDos((oldTodos) => [
			...oldTodos,
			{
				id: ++id,
				text: text,
				checked: false,
				createdAt: new Date().toISOString(),
			},
		]);

		showMessage({
			message: "Added TODO: " + text,
			type: "success",
		});
	};

	// remove TODO
	const deleteToDohandler = (id) => {
		const text = toDos.find((toDo) => toDo.id === id).text;

		setToDos((oldTodos) => {
			const newToDos = oldTodos.filter((todo) => todo.id !== id);
			return newToDos;
		});

		showMessage({
			message: "Deleted TODO: " + text,
			type: "danger",
		});
	};

	// Handle checked todo
	const toggleTodoState = (id) => {
		const toDo = toDos.find((toDo) => toDo.id === id);
		const text = toDo.text;
		const checked = toDo.checked;

		setToDos((oldTodos) => {
			const newToDos = oldTodos.map((oldTodo) => {
				if (oldTodo.id !== id) return { ...oldTodo };
				return {
					id: oldTodo.id,
					text: oldTodo.text,
					checked: !oldTodo.checked,
				};
			});
			return newToDos;
		});

		showMessage({
			message: (checked ? "Unchecked" : "Checked") + " TODO: " + text,
			type: "info",
		});
	};

	return (
		<View style={[toDosStyles.fill, toDosStyles.AppContainer]}>
			<Header
				totalCount={toDos.length}
				totalUncheckedCount={toDos.filter((toDo) => !toDo.checked).length}
			></Header>
			<AddToDo onAddToDo={addTodo}></AddToDo>
			<ScrollView style={toDosStyles.fill}>
				{toDos.map((toDo) => (
					<ToDoListItem
						navigation={navigation}
						toDo={toDo}
						onDelete={() => deleteToDohandler(toDo.id)}
						onToggle={() => toggleTodoState(toDo.id)}
						onLongPress={() => {
							setModal({ visible: true, toDo: toDo });
						}}
						key={toDo.id}
					/>
				))}
			</ScrollView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modal.visible}
				onRequestClose={() => {
					setModal({ visible: false, toDo: {} });
				}}
			>
				<View style={toDosStyles.centeredView}>
					<View style={toDosStyles.modalView}>
						<Text style={toDosStyles.textTextStyle}>{modal.toDo.text}</Text>

						<Pressable
							style={[toDosStyles.button, toDosStyles.buttonDelete]}
							onPress={() => {
								deleteToDohandler(modal.toDo.id);
								setModal({ visible: false, toDo: {} });
							}}
						>
							<Text style={toDosStyles.textStyle}>Delete</Text>
						</Pressable>

						<Pressable
							style={[toDosStyles.button, toDosStyles.buttonCheck]}
							onPress={() => {
								toggleTodoState(modal.toDo.id);
								setModal({ visible: false, toDo: {} });
							}}
						>
							<Text style={toDosStyles.textStyle}>
								{modal.toDo.checked ? "Uncheck" : "Check"}
							</Text>
						</Pressable>

						<Pressable
							style={[toDosStyles.button, toDosStyles.buttonView]}
							onPress={() => {
								navigation.navigate("ToDo", { toDo: modal.toDo });
								setModal({ visible: false, toDo: {} });
							}}
						>
							<Text style={toDosStyles.textStyle}>View</Text>
						</Pressable>

						<Pressable
							style={[toDosStyles.button, toDosStyles.buttonClose]}
							onPress={() => setModal({ visible: false, toDo: {} })}
						>
							<Text style={toDosStyles.textStyle}>Cancel</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<FlashMessage position="top" />
		</View>
	);
};

export default ToDos;

const toDosStyles = StyleSheet.create({
	AppContainer: {
		paddingTop: 45,
		backgroundColor: "#e8eaed",
	},
	fill: {
		flex: 1,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 10,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 25,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginBottom: 10,
		minWidth: 200,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	buttonDelete: {
		backgroundColor: "red",
	},
	buttonCheck: {
		backgroundColor: "orange",
	},
	buttonView: {
		backgroundColor: "green",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	textTextStyle: {
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
