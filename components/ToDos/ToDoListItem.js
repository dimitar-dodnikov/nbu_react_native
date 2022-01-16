import {
	StyleSheet,
	Text,
	View,
	Button,
	Switch,
	TouchableOpacity,
} from "react-native";

const ToDoListItem = ({
	navigation,
	toDo,
	onDelete,
	onToggle,
	onLongPress,
}) => {
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("ToDo", { toDo: toDo });
			}}
			onLongPress={onLongPress}
		>
			<View style={toDoListItemStyles.item}>
				<View
					style={toDoListItemStyles.left}
					onClick={(event) => {
						event.stopPropagation();
					}}
				>
					<Switch value={toDo.checked} onValueChange={onToggle} />
					<Text style={toDoListItemStyles.text}>{toDo.text}</Text>
				</View>
				<View
					onClick={(event) => {
						event.stopPropagation();
					}}
				>
					<Button title="Delete" onPress={onDelete} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ToDoListItem;

const toDoListItemStyles = StyleSheet.create({
	item: {
		backgroundColor: "#fff",
		padding: 5,
		paddingRight: 15,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		margin: 5,
		marginBottom: 10,
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	text: {
		maxWidth: "80%",
		marginLeft: 10,
	},
});
