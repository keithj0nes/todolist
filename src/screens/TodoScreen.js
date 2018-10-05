import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getTasks } from '../actions/getCountActions';
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
    // firebase.database().ref(`users/${uid}/categories/${categoryKey}/todos`).on('value', snapshot => {
    //   this.setState({ todos: snapshot.val() || [], uid, categoryKey })
    // })
    console.log(categoryKey, 'CATEGORY KEY IN TODO SCREEN');
    this.props.getTasks(categoryKey);
  }

  renderTodos = () => {


  if(this.props.tasks){
    if(Object.keys(this.props.tasks).length > 0){
      return Object.keys(this.props.tasks).map(item => {
        console.log(item, 'logging item');
        return (
          <View style={{backgroundColor: '#e9e8c3', padding: 10}} key={item}>
            <Text>{this.props.tasks[item].title}</Text>
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


  }

  render(){
    console.log(this.props, 'PROPS SON!');
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

const mapStateToProps = state => {
  return {
    tasks: state.getTasks.payload
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: (categoryKey) => dispatch(getTasks(categoryKey))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoScreen);


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
