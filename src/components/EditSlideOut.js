import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { updateCategoryName, deleteCategory } from '../actions/getCountActions';

import Proptypes from 'prop-types';

class EditSlideOut extends Component {


  static propTypes = {
    isVisible: Proptypes.bool.isRequired,
    toggleFunc: Proptypes.func.isRequired,
    message: Proptypes.string,
    onDone: Proptypes.func
  };

  state = {
    categoryName: this.props.categoryName
  }

  handleChangeCategory = () => {
    console.log('done button pressed');
    this.props.updateCategoryName(this.state.categoryName);
    this.props.toggleFunc();
    this.editInput.blur();
  }

  handleDeleteCategory = () => {
    Alert.alert(
      'Are you sure?',
      'This will delete all tasks in this category and cannot be undone',
      [
        {text: 'Cancel', onPress: () => console.log('canceled delete')},
        {text: 'Delete', onPress: () => {this.props.navigation.goBack(); this.props.deleteCategory()}}
      ]
    )
  }

  handleCancel = () => {
    console.log('haha');
    console.log(this.editInput);
    this.editInput.blur();
    this.props.toggleFunc()
  }

  componentDidUpdate(){
    console.log(this.props.isVisible, 'did update!');
    if(this.props.isVisible){
      this.editInput.focus();
    }
  }



  render(){
    // console.log(this.props, 'this.props');


    if(true){
      return (
        <View style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={this.handleCancel}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <Text>Category Settings</Text>

            <TouchableOpacity onPress={this.handleChangeCategory}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text>Category Name</Text>
            <TextInput
              style={styles.input}
              placeholder={'Enter Category'}
              defaultValue={this.props.categoryName}
              ref={input => this.editInput = input}
              onChangeText={categoryName => this.setState({categoryName})}/>

            {/*<TouchableOpacity style={{width: '90%', marginTop: 100,backgroundColor: 'red', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding: 12}} onPress={this.handleDeleteCategory}>
              <Text>Delete</Text>
            </TouchableOpacity>*/}

            <View style={{flexDirection: 'row'}}>
              <View>
              <Text>Danger Zone</Text>
              <Button color={mainStyles.warnRed} title="Delete" onPress={this.handleDeleteCategory} />

              </View>

            </View>
          </View>


        </View>
      )
    }
    return null
  }
}

const mapStateToProps = state => {
  return {
    categoryName: state.categories.allCategories[state.categories.categoryKey] && state.categories.allCategories[state.categories.categoryKey].title || null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCategoryName: title => dispatch(updateCategoryName(title)),
    deleteCategory: () => dispatch(deleteCategory())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditSlideOut);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: mainStyles.backgroundGray,
    alignItems: 'center',
    position: 'absolute',
  },
  header: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 30
  },
  box: {
    padding: 20,
    backgroundColor: 'white'
  },
  input: {
    width: '100%',
    padding: 8,
    backgroundColor: '#fff',
  },
  body: {
    // backgroundColor: 'yellow',
    flex: 1,
    width: '100%',
    padding: 10,
  }
})
