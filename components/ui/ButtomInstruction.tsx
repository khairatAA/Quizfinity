import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

type ButtomInstructionType = {
  InstructionText: string;
  ActionLink?: string;
  onPress: any;
  style?: any;
};

const ButtomInstruction = ({
  InstructionText,
  ActionLink,
  onPress,
  style,
}: ButtomInstructionType) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(1000).duration(1000).springify()}
      style={[styles.container, style]}
    >
      <Text style={styles.Instruction}>{InstructionText} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.ActionLink}>{ActionLink}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ButtomInstruction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 3,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  Instruction: {
    color: "#1E1F24",
    fontFamily: "OpenSans-Regular",
  },
  ActionLink: {
    color: "#614BF2",
    fontFamily: "OpenSans-Bold",
    textDecorationLine: "underline",
  },
});
