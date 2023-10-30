import { StyleSheet } from "react-native";

const AddDevicesScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.42,
    alignItems: "center",
    paddingVertical: "10%",
  },
  image: {
    height: 206,
    width: 237,
  },
  text: {
    paddingVertical: "8%",
  },
  addButton: {
    width: "90%",
    backgroundColor: "#3584EF",
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
  },
  addedDevicesHeader: {
    flex: 0.1,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    flexDirection: "row",
  },
  addedDevicesTextContainer: {
    alignSelf: "flex-end",
    paddingHorizontal: "5%",
    paddingBottom: "2%",
  },
  addedDevicesTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  addedDevicesDescription: {
    fontWeight: "400",
    fontSize: 14,
    color: "#808080",
  },
});

export default AddDevicesScreenStyles;
