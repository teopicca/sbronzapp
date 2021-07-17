import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Flex,
  Center,
  Heading,
  Button,
  Box,
  NativeBaseProvider,
  Input,
  AddIcon
} from "native-base";
import {Provider} from 'react-redux';
import {createStore, combineReducer} from 'redux';
import Home from './src/screens/Home.js'

const initStore = {
  players: []
}

const appReducer = (state = initStore, action) => {
  switch(action.type){

    case 'ADD_PLAYER':
        return{
          ...state,
          players: [...state.players, action.player]
        }

    default:
      return state
  }
}

const store = createStore(appReducer);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      direction: 'column'
    }
  }

  render(){
    return(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
