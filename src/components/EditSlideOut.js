import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateCategoryName } from '../actions/getCountActions';

import Proptypes from 'prop-types';

class EditSlideOut extends Component {


  static propTypes = {
    isVisible: Proptypes.bool.isRequired,
    toggleFunc: Proptypes.func.isRequired,
    message: Proptypes.string,
    onDone: Proptypes.func
  };

  state = {
    categoryName: ''
  }

  handleChangeCategory = () => {
    console.log('done button pressed');
    this.props.updateCategoryName(this.state.categoryName);
    this.props.toggleFunc();
  }

  handleDeleteCategory = () => {
    Alert.alert(
      'Are you sure?',
      'This will delete all tasks in this category and cannot be undone',
      [
        {text: 'Cancel', onPress: () => console.log('canceled delete')},
        {text: 'Delete', onPress: () => console.log('DELETED!')}
      ]
    )
  }

  render(){
    console.log(this.props, 'this.props');
    if(this.props.isVisible ){
      return (
        <View style={styles.container}>

          <View style={{width: '100%', backgroundColor: 'blue', flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingTop: 30}}>
            <TouchableOpacity onPress={this.props.toggleFunc}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleChangeCategory}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder={'Enter Category'}
            defaultValue={this.props.categoryName}
            onChangeText={categoryName => this.setState({categoryName})}/>

          <TouchableOpacity style={{width: '90%', marginTop: 100,backgroundColor: 'red', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 12}} onPress={this.handleDeleteCategory}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }
}

const mapStateToProps = state => {
  return {
    categoryName: state.categories.allCategories[state.categories.categoryKey].title,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCategoryName: title => dispatch(updateCategoryName(title))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditSlideOut);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.75)',
    backgroundColor: 'yellow',
    // justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // padding: 20
  },
  box: {
    padding: 20,
    backgroundColor: 'white'
  },
  input: {
    width: '90%',
    padding: 10,
    backgroundColor: '#ccc',
    marginTop: 40,
  }
})
