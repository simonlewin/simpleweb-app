import React from 'react'

import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

const Button = ({ label, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight 
        style={styles.btn} 
        underlayColor='#1B5E20'
        onPress={onPress}
      >
        <Text style={styles.text}>{label}</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',  
  },
  btn: {
    marginVertical: 5,
    width: 200,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#388E3C',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  text: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default Button;
