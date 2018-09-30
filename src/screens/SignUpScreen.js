import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

class SignUpScreen extends Component {


  state = {
    email: '',
    password: ''
  }

  handleSignIn = async () => {
    console.log('signing up!');

    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
    //   console.log(res.user, 'user!');
    //   this.props.navigation.navigate('App');
    //
    // })

    const data = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(err => console.log(err, 'err'));
    if(data){
       this.props.navigation.navigate('App');
    } else {
      console.log('THERE WAS AN ERROR');
    }
  }

  render(){
    // console.log(firebase.auth().currentUser);
    return (
      <View style={styles.container}>
        <Text>Sign Up Screen</Text>
        <TextInput
          style={styles.input}
          placeholder={'email'}
          onChangeText={email => this.setState({email})}/>

        <TextInput
          style={styles.input}
          autoCapitalize={"none"}
          placeholder={'password'}
          onChangeText={password => this.setState({password})}/>
        <Button title="Submit" onPress={this.handleSignIn} />
      </View>
    )
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    marginVertical: 5
  }
})
