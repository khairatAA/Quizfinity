import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

type LoginWithGoogleType = {
    InstructionText: string,
    ActionLink: string,
    onPress: any,
    style?: any,
    handleGoogle?: any
}

const LoginWithGoogle = ( {InstructionText, ActionLink, onPress, style, handleGoogle}: LoginWithGoogleType ) => {
  return (
    <View style={[styles.container, style]}>
      <Animated.Text entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.OrText}>Or</Animated.Text>

      <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} style={{width: '100%'}}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogle}>
          <Image source={require('../../assets/icons/search.png')} style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.Text entering={FadeInDown.delay(1000).duration(1000).springify()} style={styles.Instruction}>{InstructionText} <TouchableOpacity onPress={onPress}><Text style={styles.ActionLink}>{ActionLink}</Text></TouchableOpacity></Animated.Text>
    </View>
  )
}

export default LoginWithGoogle

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    gap: 30,
  },
  OrText:{
    marginTop:30,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#1E1F24'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    padding: 12,
    borderRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#B9BBC6',
  },
  googleButtonText:{
    color: '#1E1F24',
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  Instruction: {
    color: '#1E1F24',
    fontFamily: 'OpenSans-Regular',
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: 'center'
  },
  ActionLink:{
    color: '#614BF2',
    fontFamily: 'OpenSans-Bold',
  }

})