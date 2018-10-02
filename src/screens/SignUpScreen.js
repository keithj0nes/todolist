import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import firebase from 'firebase';

import Modal from '../components/Modal';
import mainStyles from '../assets/styles'


class SignUpScreen extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    modalVisible: false,
    message: '',
    loading: false
  }

  handleSignIn = async () => {
    console.log('signing up!');
    this.setState({loading: true})


    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
    //   console.log(res.user, 'user!');
    //   this.props.navigation.navigate('App');
    //
    // })

    const reg = /^[a-zA-Z0-9]{6,}$/;
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const {name, email, password, passwordConfirm} = this.state;


    if(!name || !email || !password){
      return this.setState({message: 'Please enter all fields', modalVisible: true, loading: false});
    }

    if(password !== passwordConfirm){
      return this.setState({message: 'Passwords must match', modalVisible: true, loading: false});
    }

    if(!regEmail.test(email.toLowerCase())){ //reg.testEmail is looking for characters between @ and ., and at least 2 characters after .
      return this.setState({message: 'Please enter a correct email', modalVisible: true, loading: false});
    }

    if(!reg.test(password)){  //reg.test is looking for one uppercase, one special, and at least 6 characters
      return this.setState({message: 'Password must be 6 characters long', modalVisible: true, loading: false})
    }

    const data = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(err => console.log(err, 'err'));
    if(data){
      data.user.updateProfile({displayName: this.state.name})
      const { uid } = data.user;
      firebase.database().ref(`users/${uid}/profile`).set({
        name: this.state.name,
        email: this.state.email
      })

      console.log(data, 'data');
      this.setState({loading: false})
      this.props.navigation.navigate('App');
    } else {
      console.log('THERE WAS AN ERROR');
      return this.setState({message: 'There was an error signing you up. Please try again', modalVisible: true, loading: false})

    }
  }

  render(){
    // console.log(firebase.auth().currentUser);
    return (
      <View style={{flex: 1}}>

        <View style={styles.container}>
          <View style={{position: 'absolute', top: 20, left: 5}}>
          <HeaderBackButton onPress={()=>this.props.navigation.goBack()} />

          </View>
          <Text>Sign Up Screen</Text>

          <TextInput
            style={styles.input}
            autoCapitalize={"none"}
            placeholder={'name'}
            onChangeText={name => this.setState({name})}
            secureTextEntry
            autoCorrect={false}/>


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

            <TextInput
              style={styles.input}
              autoCapitalize={"none"}
              placeholder={'confirm password'}
              onChangeText={passwordConfirm => this.setState({passwordConfirm})}
              secureTextEntry
              autoCorrect={false}/>

          <Button title="Submit" onPress={this.handleSignIn} />

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

export default SignUpScreen;

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
