import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import { StyleSheet, View } from 'react-native';
import {
  Flex,
  Center,
  Heading,
  Button,
  Box,
  NativeBaseProvider,
  Input,
  AddIcon,
  VStack,
  Text,
  CloseIcon,
  Spacer,
  HStack
} from "native-base";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

String.prototype.replaceAll = function (stringToFind, stringToReplace) {
    if (stringToFind === stringToReplace) return this;
    var temp = this;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
};



function mapStateToProps(state){
  return {
    players: state.players,
    phrases: state.phrases,
  }
}

function mapDispatchToProps(dispatch){
  return{
    modify_player_score: (player, score) => dispatch({type: 'MODYFY_PLAYER_SCORE', player: player, score: score})
  }
}


const gamePhrases = [
  {category: '' ,  text: ' bevi - sorsi ', malus: 3, type:''},
  {category: '' ,  text: ' se hai gli occhi bevi - sorsi', malus: 4, type: ''},
  {category: '' ,  text: ' se se il piu vecchio bevi - sorsi', malus: 1, type: ''},
  {category: '' ,  text: ' gioca a pollicione con *, chi perde beve - sorsi', malus: 10, type: ''}
]

const colors = ["#e879f9", "#818cf8", "#0284c7", "#059669", "#a3e635"]




class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      direction: 'column',
      player_selected: 0,
      phrase_selected: 0,
      player: this.props.players[0],
      players: this.props.players,
      other_players: this.props.players.filter((p, i) => i !== 0),
      sip_number: Math.floor(Math.random() * 10) + 1,
      phrase: this.props.phrases[0].text,
      background: colors[Math.floor(Math.random() * 1000) % colors.length],

    }


    this.clear_text = this.clear_text.bind(this)



  }


  componentDidUpdate(prevProps, prevState){
    if(prevState.players.length != this.state.players.length){
      this.set_players()
    }

  }


  componentDidMount(){
    this.set_players()
    console.log(this.props.players)
  }

  set_players = () => {
    this.setState({players: this.props.players.filter(player => player.name != this.state.player.name)})

  }

  next = () => {

    let player_selected = this.state.player_selected
    let phrase_selected = this.state.phrase_selected

    if(player_selected == this.state.players.length ){
      player_selected = 0
    }
    else{
      player_selected += 1
    }

    if(phrase_selected == this.props.phrases.length - 1 ){
      phrase_selected = 0
    }
    else{
      phrase_selected += 1
    }


    this.setState({
      player: this.props.players[player_selected],
      player_selected: player_selected,
      other_players: this.props.players.filter((p, i) => i !== player_selected),
      sip_number: Math.floor(Math.random() * 4) + 1,
      phrase_selected: phrase_selected,
      phrase: this.props.phrases[phrase_selected].text,
      background: colors[Math.floor(Math.random() * 1000) % colors.length],
    })
  }

  clear_text = () => {
    this.setState({player_name : ''})
  }

  add_player = () =>{
    this.props.add_player(this.state.player_name)

  }

  render(){

    return(
      <NativeBaseProvider>
      <Box bg={this.state.background}>
      <VStack bg={this.state.background} space={4} justifyContent="center" alignItems="center" mt="20">
          {this.props.players.map(player => (
            <View key={player.name}>
            <HStack space={5} alignItems="center">
              <Text fontSize="md" style={{color:'white', fontSize: 25}}>
                {player.name + ': '}
              </Text>
              <Text style={{color:'white', fontSize: 25}} fontWeight="bold">
                {player.score}
              </Text>
              <Icon name="beer" size={30} color="#900" />

              </HStack>
            </View>
          ))}
      </VStack>
      </Box>
      <Center flex={1} bg={this.state.background}>
        <TouchableOpacity onPress={this.next}>
          <Center _text={{textAlign:'center'}} p="10">
              <Text fontSize="3xl" fontWeight="bold" style={{color:'white'}}>
                {

                  this.props.players[this.state.player_selected].name + "," +
                  this.state.phrase.replace('-', this.state.sip_number).replace('*', this.state.other_players[Math.floor(Math.random()* 1000 )  %  (this.props.players.length - 1)].name
                )}
              </Text>
          </Center>
          </TouchableOpacity>
      </Center>
      <HStack justifyContent="center" alignItems="center" bg={this.state.background}>
        <Button  mb="0" bg={'transparent'} size="md" style={{width: '50%'}} onPress={() => this.props.modify_player_score(this.state.player, this.state.player.score + this.state.sip_number)}>
            <Text style={{fontSize:20, color:'white'}}> {"Segna " + this.state.sip_number + " sorsi a " + this.state.player.name} </Text>
        </Button>
      </HStack>


        </NativeBaseProvider>

    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Game)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
