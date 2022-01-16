import { StyleSheet, Text, View } from "react-native";

const Header = ({ totalCount, totalUncheckedCount }) => {
	return (
		<View style={headerStyles.HeaderContainer}>
			<View style={headerStyles.counters}>
				<Text>TODO Count:</Text>
				<Text style={headerStyles.count}>{totalCount}</Text>
			</View>
			<View style={headerStyles.counters}>
				<Text>Unchecked TODO Count:</Text>
				<Text style={headerStyles.count}>{totalUncheckedCount}</Text>
			</View>
		</View>
	);
};

export default Header;

const headerStyles = StyleSheet.create({
	HeaderContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 15,
		paddingHorizontal: 10,
		margin: 20,
		borderRadius: 20,
		backgroundColor: "#fff",
	},
	counters: {
		flexDirection: "row",
		alignItems: "center",
	},
	count: {
		fontWeight: "bold",
		marginHorizontal: 5,
		color: "#55bcf6",
	},
});
