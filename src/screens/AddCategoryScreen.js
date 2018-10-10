import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import { addCategory } from '../actions/getCountActions';

import mainStyles from '../assets/styles';
import icons from '../assets/iconNames.json';

class AddCategoryScreen extends Component {


  state = {
    categoryText: '',
    categoryIcon: ''
  }

  componentDidMount(){
    this.textinput.focus();
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
      <View style={{flex:1}}>

        <LinearGradient colors={[mainStyles.darkPurple, '#6560A4']}   start={{x: 0.3, y: 1}} end={{x: 1, y: 0.1}} style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Add New Category
          </Text>
        </View>


        <View style={styles.borderContainer}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            keyboardAppearance={'dark'}
            placeholder={'category'}
            placeholderTextColor={'#6661A1'}
            onChangeText={categoryText => this.setState({categoryText})}
            maxLength={25}
            ref={input => this.textinput = input}
            />

          {/*<View style={{width: 30, height: '100%'}}>
          </View>*/}
        </View>


        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 20}}>

          {icons.map((item, ind) => {
            return (

              <TouchableOpacity key={ind} style={{padding: 10}} onPress={() => this.setState({categoryIcon: item})}>
                <Icon name={item} size={25} color={this.state.categoryIcon === item ? mainStyles.accentGreen : mainStyles.lightText}/>
              </TouchableOpacity>
            )
          })}

        </View>


          <TouchableOpacity style={styles.submit} onPress={this.addTodo}>
            <Text style={{color: '#fff'}}>Add Category</Text>
          </TouchableOpacity>
        </LinearGradient>

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
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  header: {
    padding: 30,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    color: mainStyles.lightText,
    fontSize: 25,
    fontFamily: mainStyles.mainFont,
  },
  input: {
    // backgroundColor: 'white',
    // opacity: 0.3,
    paddingVertical: 10,
    width: '100%',
    fontSize: 18,
    // marginVertical: 5
    // marginRight: 30
    color: mainStyles.lightText,
    marginTop: 30,
  },
  submit: {
    marginTop: 5,
    backgroundColor: '#F6374C',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 20,
    width: '50%',
    borderRadius: 50
  },
  borderContainer: {
    borderBottomWidth: 1,
    borderColor: '#6661A1',
    marginLeft: 20,
    paddingRight: 50,
    width: '100%',
    // opacity: 0.15,
  }
})
