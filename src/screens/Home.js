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
import {connect} from 'react-redux'



function mapStateToProps(state){
  return {
    players: state.players
  }
}

function mapDispatchToProps(dispatch){
  return{
    add_player : (player) => dispatch({type: 'ADD_PLAYER', player: player})
  }
}


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      direction: 'column',
      player_name: ''
    }
  }


  add_player = () =>{
    this.props.add_player(this.state.player_name)
    console.log(this.props.players)
  }

  render(){
    return(
      <NativeBaseProvider>
      <Center flex={1}>


      <Center>
           <Box>
             <Heading size="md" mb={3}>
               SBRONZAPP
             </Heading>
           </Box>
           <Flex direction="column">
           <Flex direction="row" >

           <Center size="200">
           <Input
             w="100%"
             mx={3}
             mr={50}
             onChangeText={(text) => this.setState({player_name: text}) }
             placeholder="aggiungi giocatore"
             _light={{
               placeholderTextColor: "blueGray.400",
             }}
             _dark={{
               placeholderTextColor: "blueGray.50",
             }}
           />

           </Center>
           <Center>
            <Button onPress={this.add_player}>
              <AddIcon />
            </Button>
           </Center>


           </Flex>
            <Center>
            {/* @ts-ignore */}
              {this.props.players.map((player, i) => (
                <View key={i}>
                <Text style={{color:'black'}}> {player} </Text>
                </View>
              )
             )}
            </Center>
           </Flex>

           <Box>


           </Box>
         </Center>
         </Center>

         </NativeBaseProvider>

    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(Home)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
