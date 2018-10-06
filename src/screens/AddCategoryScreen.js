import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { addCategory } from '../actions/getCountActions';

class AddCategoryScreen extends Component {


  state = {
    categoryText: ''
  }

  addCategory = () => {
    console.log('adding category');
    this.props.addCategory(this.state.categoryText)
    this.props.navigation.goBack();

  }
  render(){

    return (
      <View style={styles.container}>
        <Text>
          Add Category
        </Text>

        <TextInput
          style={styles.input}
          placeholder={'category'}
          onChangeText={categoryText => this.setState({categoryText})}/>

          <TouchableOpacity style={styles.submit} onPress={this.addCategory}>
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
    addCategory: title => dispatch(addCategory(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryScreen);

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
