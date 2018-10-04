import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

class TodoScreen extends Component {

  state = {
    todos: [],
    uid: '',
    categoryKey: ''
  }

  componentDidMount(){
    const categoryKey = this.props.navigation.getParam('categoryKey');
    const uid = this.props.navigation.getParam('uid');
    firebase.database().ref(`users/${uid}/categories/${categoryKey}/todos`).on('value', snapshot => {
      this.setState({ todos: snapshot.val() || [], uid, categoryKey })
    })
  }

  renderTodos = () => {
    if(this.state.todos.length > 0){
      this.state.todos.map((item, index) => {
        console.log(item, 'logging item');
        return (
          <View key={index}>
            <Text>{item}</Text>
          </View>
        )
      })
    } else {
      return (
        <View>
          <Text>No todos yet, add a todo!</Text>
        </View>
      )
    }
  }

  render(){
    console.log(this.state.todos, 'todossss');
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TodoScreen</Text>

        <View style={styles.todosContainer}>

          {this.renderTodos()}

          <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddTodo', {uid: this.state.uid, categoryKey: this.state.categoryKey})}>
            <Text>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default TodoScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 25,
    alignSelf: 'center',
    flex: 1,
  },
  todosContainer: {
    backgroundColor: 'yellow',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
