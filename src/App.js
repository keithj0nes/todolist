import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import './config';

////// Redux //////
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

////// Screens //////
import Home from './screens/Home';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import TodoScreen from './screens/TodoScreen';
import AddTodoScreen from './screens/AddTodoScreen';

const store = createStore(reducers, {}, applyMiddleware(thunk));



const AppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  Todo: {
    screen: TodoScreen,
    navigationOptions: {
      header: null
    }
  },
  AddTodo: {
    screen: AddTodoScreen,
    navigationOptions: {
      header: null
    }
  }
});

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    // navigationOptions: {
    //   headerStyle: {
    //     borderBottomWidth: 0,
    //     backgroundColor: mainStyles.light
    //   }
    // }
    navigationOptions: {
      header: null
    }
  }
});

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);



export default App = () => <Provider store={store}><RootStack /></Provider>;
