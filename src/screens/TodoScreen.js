import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getTasks, deleteTask } from '../actions/getCountActions';
import firebase from 'firebase';

class TodoScreen extends Component {

  componentDidMount(){
    this.props.getTasks();
  }


  handleDelete = (key) => {
    console.log('deleting key', key)
    this.props.deleteTask(key);
  }
  renderTodos = () => {


    if(this.props.tasks){
      if(Object.keys(this.props.tasks).length > 0){
        return Object.keys(this.props.tasks).map(item => {
          return (
            <View style={{backgroundColor: '#e9e8c3', padding: 10, width: '100%', alignItems: 'center'}} key={item}>
              <Text>{this.props.tasks[item].title}</Text>
              <TouchableOpacity style={{position: 'absolute', right: 10, top: 10}} onPress={()=>this.handleDelete(item)}>
                <Text >[delete]</Text>
              </TouchableOpacity>
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TodoScreen</Text>

        <View style={styles.todosContainer}>

          {this.renderTodos()}

          <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddTodo')}>
            <Text>Add Todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks.payload,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTasks: () => dispatch(getTasks()),
    deleteTask: key => dispatch(deleteTask(key))
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
