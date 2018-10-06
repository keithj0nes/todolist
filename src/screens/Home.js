import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getCount, addCategory, addCategoryKey, getCategories } from '../actions/getCountActions';

import AddModal from '../components/AddModal';

class Home extends Component {


  state = {
    catText: '',
    displayName: '',
    addModalVisible: false,
  }

  componentDidMount(){
    const { displayName } = firebase.auth().currentUser;

    this.setState({displayName});
    this.props.getCategories();
    this.props.getCount();
  }


  goToTasksScreen = async (categoryKey) => {

    console.log('awaitng');
    await this.props.addCategoryKey(categoryKey);
    console.log('done, navigating');
    this.props.navigation.navigate('Todo');

  }


  addCategory = () => {
    this.props.addCategory(this.state.catText)
  }

  handleCategoryText = (catText) => {
    this.setState({catText})
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.helloText}>Hello {this.state.displayName}</Text>
            <Text style={styles.tasksCompletedText}>{this.props.totalCount} total tasks</Text>
            <Text style={styles.tasksCompletedText}>{this.props.closedCount} completed tasks</Text>

          </View>

          <View style={styles.categoryContainer}>

            {/*<View style={styles.category}>
              <View style={[styles.categoryIcon, {backgroundColor: 'purple'}]}></View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>Work</Text>
                <Text style={styles.categoryTasks}>3 tasks</Text>
              </View>
            </View>

            <View style={styles.category}>
              <View style={[styles.categoryIcon, {backgroundColor: 'blue'}]}></View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>Personal</Text>
                <Text style={styles.categoryTasks}>5 tasks</Text>
              </View>
            </View>

            <View style={styles.category}>
              <View style={styles.categoryIcon}></View>
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryTitle}>Life</Text>
                <Text style={styles.categoryTasks}>2 tasks</Text>
              </View>
            </View>*/}

            {/*<TouchableOpacity style={[styles.category, {justifyContent: 'center'}]} onPress={()=>this.setState({addModalVisible: !this.state.addModalVisible})}>
              <Text style={styles.categoryAdd}> + </Text>
            </TouchableOpacity>*/}


            {this.props.categories && Object.keys(this.props.categories).map(categoryKey => {
              return (
                <TouchableOpacity style={styles.category} key={categoryKey} onPress={() => this.goToTasksScreen(categoryKey)} >
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryTitle}>{this.props.categories[categoryKey].title}</Text>
                    <Text>{this.props.categories[categoryKey].count}</Text>
                  </View>
                </TouchableOpacity>
              )

            })}

            <TouchableOpacity style={{backgroundColor: 'red', padding: 20}} onPress={()=>this.setState({addModalVisible: !this.state.addModalVisible})}>
              <Text style={styles.categoryAdd}> + </Text>
            </TouchableOpacity>



          </View>
        </View>

        <AddModal
          isVisible={this.state.addModalVisible}
          toggleFunc={()=>{this.setState({addModalVisible: !this.state.addModalVisible})}}
          onChangeText={this.handleCategoryText}
          onSubmit={this.addCategory}
          />
      </View>


    )
  }
}

const mapStateToProps = state => {
  console.log(state, 'state home');
  return {
    totalCount: state.counts.total,
    closedCount: state.counts.closed,
    categories: state.categories.allCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCount: () => dispatch(getCount()),
    addCategory: title => dispatch(addCategory(title)),
    addCategoryKey: key => dispatch(addCategoryKey(key)),
    getCategories: () => dispatch(getCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  header: {
    // backgroundColor: 'red',
    // flex: 1,
    width: '100%',
    marginTop: 30
  },
  categoryContainer: {
    backgroundColor: 'blue',
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingTop: 22,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  helloText: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#444',
  },
  tasksCompletedText: {
    fontSize: 18,
    color: '#aaa'
  },
  category: {
    // height: 180,
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25
  },
  categoryIcon: {
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: 'pink',
    opacity: 0.35
  },
  categoryTextContainer: {
    // backgroundColor: 'green',
    marginTop: 45,
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: 21,
    color: '#333',
    fontWeight: 'bold'
  },
  categoryTasks: {
    fontSize: 16,
    color: '#bbb',
  },
  categoryAdd: {
    alignSelf: 'center',
    fontSize: 38,
    color: '#bbb'
  }
})
