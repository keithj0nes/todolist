import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { getCount, addCategory, addCategoryKey, getCategories } from '../actions/getCountActions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import mainStyles from '../assets/styles';
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

        <View style={styles.container}>
          <View style={styles.header}>

            <LinearGradient colors={[mainStyles.darkPurple, '#544F9A']}  start={{x: 0.3, y: 1}} end={{x: 1, y: 0.4}} style={styles.helloTextContainer}>
              <Text style={styles.helloText}>Hello</Text>
              <Text style={styles.helloText}>{this.state.displayName}</Text>
            </LinearGradient>


            <View style={styles.countContainer}>
              <View style={styles.counts}>
                <Text style={styles.countsNumber}>{this.props.totalCount}</Text>
                <View>
                  <Text style={styles.grayText}>Created</Text>
                  <Text style={styles.grayText}>Tasks</Text>
                </View>
              </View>

              <View style={styles.counts}>
                <Text style={styles.countsNumber}>{this.props.closedCount}</Text>
                <View>
                  <Text style={styles.grayText}>Completed</Text>
                  <Text style={styles.grayText}>Tasks</Text>
                </View>
              </View>


            </View>


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
                    <Icon name={this.props.categories[categoryKey].iconName} color={styles.icon.color} size={25} />
                    <Text style={styles.categoryTitle}>{this.props.categories[categoryKey].title}</Text>
                    <Text style={styles.categoryTasks}>{this.props.categories[categoryKey].count} tasks</Text>
                  </View>
                </TouchableOpacity>
              )

              // other layout

              // return (
              //   <TouchableOpacity style={styles.category} key={categoryKey} onPress={() => this.goToTasksScreen(categoryKey)} >
              //       <View style={{backgroundColor: 'pink', paddingRight: 15}}>
              //
              //         <Icon name={this.props.categories[categoryKey].iconName} color={styles.icon.color} size={25} />
              //       </View>
              //       <View style={{backgroundColor: 'yellow', flexWrap: 'wrap'}}>
              //
              //         <Text style={styles.categoryTitle}>{this.props.categories[categoryKey].title}</Text>
              //         <Text style={styles.categoryTasks}>{this.props.categories[categoryKey].count} tasks</Text>
              //
              //       </View>
              //   </TouchableOpacity>
              // )

            })}

            {/*<TouchableOpacity style={{backgroundColor: 'red', padding: 20}} onPress={()=>this.setState({addModalVisible: !this.state.addModalVisible})}>*/}
            {/*<TouchableOpacity style={{backgroundColor: 'red', padding: 20}} onPress={()=>this.props.navigation.navigate('AddCategory')}>

              <Text style={styles.categoryAdd}> + </Text>
            </TouchableOpacity>*/}



          </View>



          <TouchableOpacity style={styles.addButton} onPress={()=>this.props.navigation.navigate('AddCategory')}>
            <Text style={{fontSize: 40, color: '#fff'}}> + </Text>
          </TouchableOpacity>
        </View>



    )
  }
}

const mapStateToProps = state => {
  // console.log(state, 'state home');
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
    // paddingHorizontal: 20,
    // paddingTop: 22,
    backgroundColor: '#eee',
  },
  header: {
    // backgroundColor: 'red',
    // flex: 1,
    backgroundColor: mainStyles.lightPurple,
    width: '100%',
    // marginTop: 30
  },

  helloTextContainer: {
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  helloText: {
    fontSize: 38,
    color: mainStyles.lightText,
    // paddingVertical: 40,
    // paddingHorizontal: 30,
    fontFamily: mainStyles.mainFont
  },


  countContainer: {
    backgroundColor: mainStyles.darkPurple,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 40,
  },

  counts: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
    // width: '50%'

  },
  countsNumber: {
    color: mainStyles.lightText,
    fontSize: 25,
    paddingRight: 8,
  },

  grayText: {
    color: mainStyles.lightText,
  },

  categoryContainer: {
    backgroundColor: '#eee',
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    // paddingTop: 22,
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  category: {
    // height: 180,
    width: '50%',
    backgroundColor: '#eee',
    // backgroundColor: 'red',
    // borderRadius: 12,
    // marginTop: 20,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 15
    // padding: 25
  },
  categoryIcon: {
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: 'pink',
    opacity: 0.35
  },
  icon: {
    color: mainStyles.accentGreen,
  },
  categoryTextContainer: {
    // backgroundColor: 'green',
    // marginTop: 45,
    alignItems: 'center'
  },
  categoryTitle: {
    fontSize: 18,
    color: mainStyles.darkText,
    // fontWeight: 'bold'
    paddingBottom: 4,
    paddingTop: 6
  },
  categoryTasks: {
    fontSize: 14,
    color: mainStyles.darkText,
  },
  categoryAdd: {
    alignSelf: 'center',
    fontSize: 38,
    color: '#bbb'
  },
  addButton: {
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: mainStyles.warnRed,
    padding: 14
  }
})
