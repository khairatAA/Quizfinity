import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TextInputInterface from '../ui/TextInputInterface'
import {Controller, useForm} from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons';


type CustomInputType = {
    control: any;
    name: string;
    fieldName: string;
    rules?: any | {};
    placeholder?: string;
    keyboardType?: any;
    autoCapitalize?: any;
    secureTextEntry?: any;
}

const CustomInput = ({ control, name, fieldName, rules, placeholder, keyboardType, autoCapitalize, secureTextEntry }: CustomInputType) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <TextInputInterface fieldName={fieldName} style={[{borderColor: error ? '#FF7F7F' : '#E0E1E6'}, name === "password" && styles.passwordInput]}>
                        <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        autoCapitalize={autoCapitalize}
                        secureTextEntry={name === "password" && !isPasswordVisible}
                        />
                        {
                        name === "password" &&
                        <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                            <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#1E1F24" />
                        </TouchableOpacity>
                        }
                    </TextInputInterface>
                    {error && (
                        <Text style={{color: '#FF7F7F', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                    )}
                </>
            )}
        />
    )
}

export default CustomInput

const styles = StyleSheet.create({
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
    },
})
