import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import TextInputInterface from "../ui/TextInputInterface";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

type CustomInputType = {
  control: any;
  name: string;
  fieldName: string;
  rules?: any | {};
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: any;
  secureTextEntry?: any;
  showPasswordIcon?: boolean;
  defaultValue?: string;
};

const CustomInput = ({
  control,
  name,
  fieldName,
  rules,
  placeholder,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  showPasswordIcon,
  defaultValue,
}: CustomInputType) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <TextInputInterface
            fieldName={fieldName}
            style={[{ borderColor: error ? "#FF7F7F" : "#E0E1E6" }]}
          >
            <TouchableOpacity style={styles.inputContainer} onPress={() => {}}>
              <TextInput
                style={styles.textInput}
                value={value}
                defaultValue={defaultValue}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={
                  (name === "password" || showPasswordIcon) &&
                  !isPasswordVisible
                }
                onFocus={() => {}} // Ensure TextInput gets focus
              />
              {(name === "password" || showPasswordIcon) && (
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={togglePasswordVisibility}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#1E1F24"
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </TextInputInterface>
          {error && (
            <Text style={{ color: "#FF7F7F", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  textInput: {
    flex: 1,
  },
  iconContainer: {
    // padding: 10,
  },
});
