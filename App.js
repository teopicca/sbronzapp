import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
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
import Home from './src/screens/Home.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Game from './src/screens/Game.js'

const initStore = {
  players: []
}

const appReducer = (state = initStore, action) => {
  switch(action.type){

    case 'ADD_PLAYER':
        let exist = false
        state.players.map(player => {
          if(player.name == action.player_name)
            exist = true
        })
        return {
          ...state,
          players: ! exist ? [...state.players, {name: action.player_name, score: 0} ] : state.players
        }

    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter(player => player.name != action.player.name)
      }

    case 'MODYFY_PLAYER_SCORE':

    let players = state.players.map(player =>
      player.name == action.player.name ? player : player
    )

    console.log(players)


      return {
        ...state,
        players: state.players.map(player =>
          player.name == action.player.name ? {...player, score: action.score} : player
        )
      }

    default:
      return state
  }
}

const store = createStore(appReducer);

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  render(){
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }


}

class GameScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  render(){
    return(
      <Provider store={store}>
        <Game />
      </Provider>
    )
  }




}

const AppNavigator = createStackNavigator({
  Home : {
    screen: HomeScreen
  },
  Game: {
    screen: GameScreen
  }
})

const AppContainer = createAppContainer(AppNavigator)


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
    }
  }

  async componentDidMount() {

    this.setState({ isLoaded: true });
  }

  render(){
      if(!this.state.isLoaded){
        return <AppLoading />
      }

      return(
        <AppContainer />
      );
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
