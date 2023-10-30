import { StyleSheet } from "react-native";
const FocusScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ECECEC",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 500,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 0.99
    },
    backButton: {
        marginRight: 8,
    },
    selectAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    selectAllButtonText: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: "bold",
    },
    focusContainer: {
        flex: 0.15,
        marginLeft: "5%",
        paddingTop: "2%",
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1
    },
    focusHeader: {
        flexDirection: "row",
        alignItems: "center"
    },
    focusHeading: {
        fontSize: 16,
        fontWeight: 900,
        flex: 0.95
    },
    focusDescription: { 
        fontSize: 12, 
        fontWeight: 400, 
        color: "#808080", 
        lineHeight: 16 },
    focusTypes: { 
        flex: 0.12, 
        borderBottomWidth: 1, 
        borderBottomColor: "#F5F5F5", 
        alignItems: "center", 
        marginHorizontal: "5%", 
        flexDirection: "row" 
    },
    focusMode: { 
        flexDirection: "row", 
        alignItems: "center", 
        flex: 0.95 
    },
    focusItem: { 
        flex: 0.1, 
        borderBottomWidth: 1, 
        borderBottomColor: "#F5F5F5", 
        alignItems: "center", 
        marginHorizontal: "5%", 
        flexDirection: "row" 
    },
    focusImage: { 
        height: 16, 
        width: 16 
    },
    focusTitle: { 
        fontSize: 14, 
        fontWeight: 500, 
        color: "#020E1E" 
    }
});
export default FocusScreenStyles
