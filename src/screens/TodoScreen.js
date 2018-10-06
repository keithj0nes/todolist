import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getTasks, deleteTask, toggleTask } from '../actions/getCountActions';
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
          console.log(this.props.tasks[item]);
          return (
            <View style={{backgroundColor: this.props.tasks[item].completed ? 'red' : '#e9e8c3', padding: 10, width: '100%', alignItems: 'center'}} key={item}>
              <TouchableOpacity style={{position: 'absolute', left: 10, top: 10}} onPress={()=>this.props.toggleTask(item)}>
                <Text >[toggle]</Text>
              </TouchableOpacity>
              <Text>{this.props.tasks[item].title}</Text>
              {this.props.tasks[item].completed && (
                <TouchableOpacity style={{position: 'absolute', right: 10, top: 10}} onPress={()=>this.handleDelete(item)}>
                  <Text >[delete]</Text>
                </TouchableOpacity>
              )}
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

          <TouchableOpacity style={{marginTop: 20}}onPress={()=>this.props.navigation.navigate('AddTodo')}>
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
    deleteTask: key => dispatch(deleteTask(key)),
    toggleTask: key => dispatch(toggleTask(key))
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
