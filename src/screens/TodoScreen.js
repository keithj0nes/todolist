import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getTasks, deleteTask, toggleTask } from '../actions/getCountActions';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditSlideOut from '../components/EditSlideOut';

class TodoScreen extends Component {

  state = {
    editModalVisible: false
  }

  componentDidMount(){
    this.props.getTasks();
  }

  handleDelete = (key) => {
    console.log('deleting key', key)
    Alert.alert(
      'Are you sure?',
      'This cannot be undone',
      [
        {text: 'cancel', onPress:()=>console.log('canceled')},
        {text: 'delete', onPress:()=>this.props.deleteTask(key)}
      ]
    )
  }


  renderTodos = () => {


    if(this.props.tasks){
      if(Object.keys(this.props.tasks).length > 0){
        return Object.keys(this.props.tasks).map(item => {
          // console.log(this.props.tasks[item]);
          return (
            <View style={{backgroundColor: '#fff', padding: 10, width: '100%', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc'}} key={item}>
              <TouchableOpacity style={{position: 'absolute', left: 10, top: 7}} onPress={()=>this.props.toggleTask(item)}>
                <Icon name={this.props.tasks[item].completed ? 'checkbox-marked-circle' :'checkbox-blank-circle-outline'} color={'#00ff44'} size={25}/>
              </TouchableOpacity>

              <Text style={{color: this.props.tasks[item].completed ? '#ccc' : '#666'}}>{this.props.tasks[item].title}</Text>

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
        <View style={styles.header}>


          <Text style={styles.title}>{this.props.categoryName}</Text>

            <TouchableOpacity onPress={()=>this.setState({editModalVisible: !this.state.editModalVisible})}>
              <Icon name={'square-edit-outline'} color={'#000'} size={15}/>

            </TouchableOpacity>





        </View>


        <View style={styles.todosContainer}>

          {this.renderTodos()}

          <TouchableOpacity style={styles.addButton} onPress={()=>this.props.navigation.navigate('AddTodo')}>
            <Text style={{fontSize: 40, color: '#fff'}}> + </Text>
          </TouchableOpacity>
        </View>


        <EditSlideOut
          navigation={this.props.navigation}
          isVisible={this.state.editModalVisible}
          toggleFunc={()=>{this.setState({editModalVisible: !this.state.editModalVisible})}}
          onChangeText={this.handleCategoryText}
          onSubmit={this.addCategory}
          />

      </View>
    )
  }
}

const mapStateToProps = state => {

  return {
    categoryName: state.categories.allCategories[state.categories.categoryKey].title,
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
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 25,
    // alignSelf: 'center',
    // flex: 1,
  },
  todosContainer: {
    backgroundColor: 'yellow',
    flex: 5,
    // justifyContent: 'center',
    paddingTop: 20,
    alignItems: 'center'
  },
  addButton: {
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F6374C',
    padding: 14
  }
})
