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
  HStack,
} from "native-base";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation'

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
    players: state.players
  }
}

function mapDispatchToProps(dispatch){
  return{
    modify_player_score: (player, score) => dispatch({type: 'MODYFY_PLAYER_SCORE', player: player, score: score})
  }
}


const gamePhrases = [
  {category: '' ,  text: ' bevi - sorsi ', malus: 3, type:''},
  {category: '' ,  text: ' se usi lo sparafoglie bevi - sorsi', malus: 4, type: ''},
  {category: '' ,  text: ' se se il piu vecchio bevi - sorsi', malus: 1, type: ''},
  {category: '' ,  text: ' gioca a pollicione con *, chi perde beve - sorsi', malus: 10, type: ''}
]

const colors = ["#e879f9", "#818cf8", "#0284c7", "#059669", "#a3e635"]

//this.props.players[Math.floor(Math.random() * (this.props.players.length - 1))]



class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      direction: 'column',
      player: this.props.players[Math.floor(Math.random() * 1000 )  % this.props.players.length],
      players: this.props.players,
      sip_number: Math.floor(Math.random() * 10) + 1,
      phrase: gamePhrases[Math.floor(Math.random() * (gamePhrases.length))].text,
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
    this.setState({
      player: this.props.players[Math.floor(Math.random() * 1000 )  % this.props.players.length],
      players: this.props.players,
      sip_number: Math.floor(Math.random() * 10) + 1,
      phrase: gamePhrases[Math.floor(Math.random() * (gamePhrases.length))].text,
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
      <HStack bg={this.state.background} justifyContent="center" alignItems="flex-start" mt="20">
      <Flex direction="column" >

        {this.props.players.map(player => (
          <View key={player.name}>
          <Text fontSize="md" style={{color:'white'}}>
            {player.name + ": " + player.score + ' sorsi'}
          </Text>
          </View>
        ))}
        </Flex>
      </HStack>
      </Box>
      <Center flex={1} bg={this.state.background}>
        <Box>
        <TouchableOpacity onPress={this.next}>
          <Flex direction="row" align="center" justify="center">
            <Center>
              <Text fontSize="2xl" style={{color:'white'}}> { this.state.player.name + "," + this.state.phrase.replace('-', this.state.sip_number).replace('*', this.state.players[Math.floor(Math.random()* 1000 )  % this.state.players.length].name )} </Text>
              </Center>
          </Flex>
          </TouchableOpacity>
        </Box>
      </Center>
      <HStack justifyContent="center" alignItems="center" bg={this.state.background}>
        <Button  mb="0" bg={'transparent'} size="md" style={{width: '50%'}} onPress={() => this.props.modify_player_score(this.state.player, this.state.player.score + this.state.sip_number)}>
          {"Segna " + this.state.sip_number + " sorsi a " + this.state.player.name}
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
