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
import Game from './src/screens/Game.js';
import GamePhrases from './src/screens/GamePhrases.js';

const initStore = {
  players: [],
  phrases: [
    {category: '' ,  text: ' bevi - sorsi ', malus: 3, type:''},
    {category: '' ,  text: ' se hai gli occhi bevi - sorsi', malus: 4, type: ''},
    {category: '' ,  text: ' se se il piu vecchio bevi - sorsi', malus: 1, type: ''},
    {category: '' ,  text: ' gioca a pollicione con *, chi perde beve - sorsi', malus: 10, type: ''},
    {category: '' ,  text: ' bevi - sorsi ', malus: 3, type:''},
    {category: '' ,  text: ' se hai gli occhi bevi - sorsi', malus: 4, type: ''},
    {category: '' ,  text: ' se se il piu vecchio bevi - sorsi', malus: 1, type: ''},
    {category: '' ,  text: ' gioca a pollicione con *, chi perde beve - sorsi', malus: 10, type: ''},
    {category: '' ,  text: ' bevi - sorsi ', malus: 3, type:''},
    {category: '' ,  text: ' se hai gli occhi bevi - sorsi', malus: 4, type: ''},
    {category: '' ,  text: ' se se il piu vecchio bevi - sorsi', malus: 1, type: ''},
    {category: '' ,  text: ' gioca a pollicione con *, chi perde beve - sorsi', malus: 10, type: ''},
  ],
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

      return {
        ...state,
        players: state.players.map(player =>
          player.name == action.player.name ? {...player, score: action.score} : player
        )
      }


    case 'ADD_PHRASE':

      let phrases_text = action.phrases.split('\n')
      console.log(phrases_text)
      let phrases = []
      phrases_text.map(p => {
        phrases.push(
          {category: '' ,  text: p, malus: 0, type:''},
        )
      })

        return {
          ...state,
          phrases: [...state.phrases, ...phrases]
        }

    case 'SHUFFLE_PHRASES':
      return {
        ...state,
        phrases: state.phrases.sort(() => Math.random() - 0.5)
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

class GamePhrasesScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  render(){
    return(
      <Provider store={store}>
        <GamePhrases />
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
  },
  GamePhrases: {
    screen: GamePhrasesScreen
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
