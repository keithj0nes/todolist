import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { addCategory } from '../actions/getCountActions';

import icons from '../assets/iconNames.json';

class AddCategoryScreen extends Component {


  state = {
    categoryText: '',
    categoryIcon: ''
  }

  addCategory = () => {
    console.log('adding category');
    if(!this.state.categoryText){
      return Alert.alert(
        'No Title',
        'Please enter a title for your category',
        [{text: 'OK', onPress: () => console.log('OK pressed')}]
      )
    }
    this.props.addCategory(this.state.categoryText, this.state.categoryIcon || 'airplane')
    this.props.navigation.goBack();

  }
  render(){
    console.log(this.state, 'this.state');
    return (
      <View style={styles.container}>
        <Text>
          Add Category
        </Text>

        <TextInput
          style={styles.input}
          placeholder={'category'}
          onChangeText={categoryText => this.setState({categoryText})}/>

          {icons.map((item, ind) => {
            return (
              <TouchableOpacity key={ind} style={{backgroundColor: this.state.categoryIcon === item ? '#00d83a' : null}}onPress={() => this.setState({categoryIcon: item})}>
                <Icon name={item} size={25} color={'black'}/>
              </TouchableOpacity>
            )
          })}

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
    addCategory: (title, iconName) => dispatch(addCategory(title, iconName))
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
