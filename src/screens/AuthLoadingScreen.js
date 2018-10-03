import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import firebase from 'firebase';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // const userToken = true;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log(userToken, 'usertoekn');
    const that = this;
    // setTimeout(function () {
      if(userToken){
        console.log('awaiting');
        await firebase.auth().signInWithEmailAndPassword()
        console.log('finished');
      }
      that.props.navigation.navigate(userToken ? 'App' : 'Auth');

    // }, 500);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
