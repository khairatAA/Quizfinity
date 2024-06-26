import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

type OptionsUIType = {
  option?: string;
  onPress?: any;
  selected?: boolean;
};

const OptionsUI = ({ option, onPress, selected }: OptionsUIType) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, selected && styles.selectedOption]}
    >
      <Text style={styles.singleOption}>{option}</Text>
    </TouchableOpacity>
  );
};

export default OptionsUI;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.primary400,
    borderRadius: 20,
    marginBottom: 20,
  },
  selectedOption: {
    backgroundColor: Colors.light.primary200, // Change color to indicate selection
  },
  singleOption: {
    color: "#1E1F24",
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
  },
});
