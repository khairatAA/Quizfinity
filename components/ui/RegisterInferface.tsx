import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type RegisterInterfaceType = {
  onPress?: any;
  title: string;
  children: any;
  style?: any;
}
const RegisterInterface = ({ onPress, title, children, style }: RegisterInterfaceType) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <View style={[styles.titleContainer, style]}>
        <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
          <AntDesign name="arrowleft" size={28} color="#614BF2" />
        </TouchableOpacity>
        <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.titleText}>{title}</Animated.Text>
      </View>

      <View style={styles.form}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default RegisterInterface

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#614BF2',
  },
  titleContainer: {
    backgroundColor: '#614BF2',
    height: width * 0.5,
    padding: 25,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 40,
    color: Colors.light.primary100,
    alignSelf: 'center',
    textAlign: 'center',
  },
  form: {
    backgroundColor: Colors.light.primary100,
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    paddingTop: 40,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 200,
    backgroundColor: Colors.light.primary100,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
