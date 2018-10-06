import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { addTask } from '../actions/getCountActions';

class AddTodoScreen extends Component {


  state = {
    uid: '',
    categoryKey: '',
    todoText: ''
  }


  addTodo = async () => {
    const { uid, categoryKey, todoText } = this.state
    const date = new Date();
    const todoInfo = {
      date,
      completed: false,
      title: todoText
    }


//     const newPostKey = firebase.database().ref(`users/${uid}/categories/${categoryKey}/todos`).push().key;
// //     const mainCount = firebase.database().ref(`users/${uid}/count/open`).once;
// //     const catCount = firebase.database().ref(`users/${uid}/categories/${categoryKey}/todos/count/open`);
// //
// // console.log(mainCount, 'mainCount');
// // console.log(catCount, 'catCount');
//
//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     var updates = {};
//     // updates[`users/${uid}/count/open`] += 1;
//     // updates[`users/${uid}/categories/${categoryKey}/todos/count/open`] += 1;
//     updates[`users/${uid}/categories/${categoryKey}/todos/${newPostKey}`] = todoInfo;
//     console.log('waiting for updates');
//     await firebase.database().ref().update(updates);
//
//     // const a = firebase.database().ref(`users/${uid}/categories/${categoryKey}/todos`).push(todoInfo);
//     this.props.navigation.goBack();

  console.log('adding task');
    this.props.addTask(todoText);
  }

  componentDidMount(){
    const uid = this.props.navigation.getParam('uid');
    const categoryKey = this.props.navigation.getParam('categoryKey');
    console.log(categoryKey, 'catky');
    this.setState({uid, categoryKey});
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
