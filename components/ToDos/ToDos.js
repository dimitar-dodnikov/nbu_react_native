import { useState, useEffect } from "react";

import {
	StyleSheet,
	View,
	ScrollView,
	Modal,
	Pressable,
	Text,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { showMessage } from "react-native-flash-message";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AddToDo from "./AddToDo";
import Header from "./Header";
import ToDoListItem from "./ToDoListItem";

const ToDos = ({ navigation, route }) => {
	const isFocused = useIsFocused();

	const [toDos, setToDos] = useState([]);
	const [modal, setModal] = useState({ visible: false, toDo: {} });

	useEffect(() => {
		if (isFocused) {
			AsyncStorage.getItem("toDos").then((localStorageToDos) => {
				const data = JSON.parse(localStorageToDos);
				if (route.params.toBeDeleted) {
					const el = data.find((el) => el.id === route.params.toBeDeleted);
					if (el !== null && el !== undefined) {
						el.toBeDeleted = true;
					}
				}
				setToDos(data);
			});
		}
	}, [isFocused]);

	// add TODO
	const addTodo = (text) => {
		AsyncStorage.getItem("toDos").then((result) => {
			const localStorageToDos = JSON.parse(result);
			const newToDo = {
				id: localStorageToDos[0].id + 1,
				text: text,
				checked: false,
				createdAt: new Date().toISOString(),
				toBeDeleted: false,
			};
			localStorageToDos.unshift(newToDo);
			AsyncStorage.setItem("toDos", JSON.stringify(localStorageToDos)).then(
				() => {
					setToDos((oldTodos) => [newToDo, ...oldTodos]);

					showMessage({
						message: "Added TODO: " + text,
						type: "success",
					});
				}
			);
		});
	};

	// remove TODO
	const deleteToDohandler = (id) => {
		AsyncStorage.getItem("toDos").then((result) => {
			const text = toDos.find((toDo) => toDo.id === id).text;

			const localStorageToDos = JSON.parse(result).filter(
				(obj) => obj.id !== id
			);

			AsyncStorage.setItem("toDos", JSON.stringify(localStorageToDos)).then(
				() => {
					setToDos(localStorageToDos);

					showMessage({
						message: "Deleted TODO: " + text,
						type: "danger",
					});
				}
			);
		});
	};

	// Handle checked todo
	const toggleToDoState = (id) => {
		AsyncStorage.getItem("toDos").then((result) => {
			const toDo = toDos.find((toDo) => toDo.id === id);
			const text = toDo.text;
			const checked = toDo.checked;

			const localStorageToDos = JSON.parse(result);
			const localStorageToDo = localStorageToDos.find((obj) => obj.id === id);
			localStorageToDo.checked = !checked;

			AsyncStorage.setItem("toDos", JSON.stringify(localStorageToDos)).then(
				() => {
					setToDos(localStorageToDos);

					showMessage({
						message: (checked ? "Unchecked" : "Checked") + " TODO: " + text,
						type: "info",
					});
				}
			);
		});
	};

	return (
		<View style={[toDosStyles.fill, toDosStyles.AppContainer]}>
			<Header
				totalCount={toDos?.length || 0}
				totalUncheckedCount={
					toDos?.filter((toDo) => !toDo.checked)?.length || 0
				}
			></Header>
			<AddToDo onAddToDo={addTodo}></AddToDo>
			<ScrollView style={toDosStyles.fill}>
				{toDos.map((toDo) => (
					<ToDoListItem
						navigation={navigation}
						toDo={toDo}
						onDelete={() => deleteToDohandler(toDo.id)}
						onToggle={() => toggleToDoState(toDo.id)}
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
								setToDos((oldData) => {
									const data = [...oldData];
									data.find((el) => el.id === modal.toDo.id).toBeDeleted = true;
									return data;
								});
								setModal({ visible: false, toDo: {} });
							}}
						>
							<Text style={toDosStyles.textStyle}>Delete</Text>
						</Pressable>

						<Pressable
							style={[toDosStyles.button, toDosStyles.buttonCheck]}
							onPress={() => {
								toggleToDoState(modal.toDo.id);
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
