import { useRef, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Switch,
	TouchableOpacity,
	Animated,
} from "react-native";

import * as Device from "expo-device";

const ToDoListItem = ({
	navigation,
	toDo,
	onDelete,
	onToggle,
	onLongPress,
}) => {
	const [toBeDeleted, setToBeDeleted] = useState(false);

	const fadeRef = useRef(
		new Animated.Value(toDo.toBeDeleted || toBeDeleted ? 1 : 0)
	).current;

	useEffect(() => {
		Animated.timing(fadeRef, {
			toValue: toDo.toBeDeleted || toBeDeleted ? 0 : 1,
			duration: 500,
			useNativeDriver: true,
		}).start(() => {
			if (toDo.toBeDeleted || toBeDeleted) {
				onDelete();
			}
		});
	});

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("ToDo", { toDo: toDo });
			}}
			onLongPress={onLongPress}
		>
			<Animated.View
				style={[toDoListItemStyles.item, { opacity: fadeRef }]}
				key={toDo.id}
			>
				<View
					style={toDoListItemStyles.left}
					onClick={(event) => {
						event.stopPropagation();
					}}
				>
					<Switch value={toDo.checked} onValueChange={onToggle} />
					<Text style={toDoListItemStyles.text}>{toDo.text}</Text>
				</View>
				{Device.manufacturer === null ? (
					<View
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						<Button
							title="Delete"
							onPress={() => {
								// Animated.timing(new Animated.Value(0), {
								// 	toValue: 1,
								// 	duration: 500,
								// 	useNativeDriver: true,
								// }).start(() => {
								// 	onDelete();
								// });
								setToBeDeleted(true);
							}}
						/>
					</View>
				) : (
					<View
						style={toDoListItemStyles.left}
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						<Text>click/long press</Text>
					</View>
				)}
			</Animated.View>
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
