import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

class SignInScreen extends Component {

  render(){
    return (
      <View style={styles.container}>
        <Text>SignInScreen</Text>
        <TextInput style={styles.input}/>
        <TextInput style={styles.input}/>
      </View>
    )
  }
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'red',
    padding: 4,
    width: '100%',
    marginVertical: 5
  }
})
