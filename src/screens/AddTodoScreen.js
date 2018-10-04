import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class AddTodoScreen extends Component {


  state = {
    uid: '',
    categoryKey: '',
    todoText: ''
  }




  componentDidMount(){
    const uid = this.props.navigation.getParam('uid');
    const categoryKey = this.props.navigation.getParam('categoryKey');
    this.setState({uid, categoryKey});
  }


  render(){

    return (
      <View style={styles.container}>
        <Text>
          AddTodoScreen
        </Text>
      </View>
    )
  }
}

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ff44',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})
