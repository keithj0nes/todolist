import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { addTask } from '../actions/getCountActions';

class AddTodoScreen extends Component {

  addTodo = async () => {
    console.log('adding task');
    this.props.addTask(todoText);
    this.props.navigation.goBack();
  }
  render(){

    return (
      <View style={styles.container}>
        <Text>
          AddTodoScreen
        </Text>

        <TextInput
          style={styles.input}
          placeholder={'todo'}
          onChangeText={todoText => this.setState({todoText})}/>

          <TouchableOpacity style={styles.submit} onPress={this.addTodo}>
            <Text>Submit</Text>
          </TouchableOpacity>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: title => dispatch(addTask(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTodoScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00ff44',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    marginVertical: 5
  },
  submit: {
    backgroundColor: 'pink',
    padding: 20,
  }
})
