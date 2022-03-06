  import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppLoading  from 'expo-app-loading';
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



function mapStateToProps(state){
  return {
    players: state.players
  }
}

function mapDispatchToProps(dispatch){
  return{
    add_player : (player_name) => dispatch({type: 'ADD_PLAYER', player_name: player_name}),
    remove_player: (player) => dispatch({type: 'REMOVE_PLAYER', player: player})
  }
}


class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      direction: 'column',
      player_name: ''
    }

    this.clear_text = this.clear_text.bind(this)



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
        <Center flex={1}>
          <Center>
               <Box>
                 <Heading size="md" mb={3}>
                   SBRONZAPP
                 </Heading>
               </Box>
               <Flex direction="column">
               <Flex direction="row" >

               <Center>
               <Input
                 w="100%"
                 mx={3}
                 mr={50}
                 type="text"
                 value={this.state.palyer_name}
                 onChangeText={(text) => this.setState({player_name: text }) }
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
                <VStack space={2} mt="10">
                  {this.props.players.map((player, i) => (

                    <Flex direction='row' align="center" justify="space-around" key={i}>

                    <Text fontSize="xl" style={{color:'black'}}> {player.name} </Text>
                    <Spacer />
                    <Spacer />
                    <Button ml="10" size="sm" colorScheme="danger" onPress={() => this.props.remove_player(player)}>
                      <CloseIcon size="15px" />
                    </Button>
                    </Flex>

                  )
                 )}
                 </VStack>
                </Center>
               </Flex>

             </Center>
           </Center>
           <HStack justifyContent="center" alignItems="center">
             <Button disabled={!this.props.players.length > 1}   size="lg" style={{width: '100%'}} onPress={() =>  this.props.navigation.navigate('Game')}>
               Gioca
             </Button>
           </HStack>

         </NativeBaseProvider>

    )
  }


}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Home))



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
