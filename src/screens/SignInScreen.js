import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';

import Modal from '../components/Modal';
import mainStyles from '../assets/styles'

class SignInScreen extends Component {

  state = {
    email: '',
    password: '',

    modalVisible: false,
    message: '',
    loading: false
  }

  handleSignIn = async () => {
    console.log('signing in!');
    this.setState({loading: true})

    const reg = /^[a-zA-Z0-9]{6,}$/;
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const {email, password} = this.state;

    if(!email || !password){
      return this.setState({message: 'Please enter both email and password', modalVisible: true, loading: false});
    }

    if(!regEmail.test(email)){ //reg.testEmail is looking for characters between @ and ., and at least 2 characters after .
      return this.setState({message: 'Incorrect email or password', modalVisible: true, loading: false});
    }

    if(!reg.test(password)){  //reg.test is looking for one uppercase, one special, and at least 6 characters
      return this.setState({message: 'Incorrect email or password', modalVisible: true, loading: false})
    }


    const data = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(err => console.log(err, 'err'));
    if(data){
       this.props.navigation.navigate('App');
    } else {
      return this.setState({message: 'Incorrect email or password', modalVisible: true, loading: false})
    }
  }

  render(){
    return (
      <View style={{flex: 1}}>

      <View style={styles.container}>
        <Text>SignInScreen</Text>
        <TextInput
          style={styles.input}
          autoCapitalize={"none"}
          placeholder={'email'}
          onChangeText={email => this.setState({email : email.toLowerCase()})}/>

        <TextInput
          style={styles.input}
          autoCapitalize={"none"}
          placeholder={'password'}
          onChangeText={password => this.setState({password})}
          secureTextEntry
          autoCorrect={false}/>

        <Button title="Submit" onPress={this.handleSignIn} />

        <View  style={{marginTop: 40}}/>
        <Button title="Sign Up"   color="green" onPress={() => this.props.navigation.navigate('SignUp')} />

      </View>

      <Modal
        isVisible={this.state.modalVisible}
        toggleFunc={()=>{this.setState({modalVisible: !this.state.modalVisible})}}
        message={this.state.message}
        />

      </View>

    )
  }
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mainStyles.light,
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
