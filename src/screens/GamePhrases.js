import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import { StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
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
  TextArea,
  Spacer,
  HStack,
  Divider,
} from "native-base";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const gamePhrases = [
  {category: '' ,  text: ' bevi - sorsi ', malus: 3, type:''},
  {category: '' ,  text: ' se hai gli occhi bevi - sorsi', malus: 4, type: ''},
  {category: '' ,  text: ' se se il piu vecchio bevi - sorsi', malus: 1, type: ''},
  {category: '' ,  text: ' gioca a pollicione con *, chi perde beve - sorsi', malus: 10, type: ''}
]

const colors = ["#e879f9", "#818cf8", "#0284c7", "#059669", "#a3e635"]


function mapStateToProps(state){
  return {
    players: state.players,
    phrases: state.phrases
  }
}

function mapDispatchToProps(dispatch){
  return{
    add_phrases: (phrases) => dispatch({type: 'ADD_PHRASE', phrases: phrases})
  }
}



class GamePhrases extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      direction: 'column',
      phrases:''

    }

  }


  add_phrases = () => {
    const phrases = this.state.phrases
    console.log(phrases)
    this.props.add_phrases(phrases)
  }

  handleChange = e => {
    console.log(e)
    this.setState({phrases: e})
  }

  render(){
    return(
      <NativeBaseProvider>
          <Center>
            <VStack space={5} mt={5} maxH={'70%'}>
                <Center maxW={400}  alignItems="center" justifyContent="center">
                <SafeAreaView style={{flex:1}}>
                  <ScrollView style={{height: 10}}>
                    {this.props.phrases.map((phrase, i) => (
                          <>
                            <TextArea
                              key={i}
                              w="100%"
                              type="text"
                              value={phrase.text}
                              style={{fontSize: 16, fontWeight: 'bold'}}
                            />
                            <Divider  bg="secondary.500" size={3} my={1} />
                          </>

                    ))}

                    </ScrollView>
                  </SafeAreaView>
                  </Center>

              </VStack>
              <Divider  bg="primary.500" size={2  } my={1} />

              <HStack space={2} mt={5}>
              <Center w={300}>
                  <TextArea
                    w="100%"
                    onChangeText={this.handleChange}
                    placeholder="Scrivi le frasi di gioco"
                  />

                  </Center>
                  <Center>
                   <Button onPress={this.add_phrases} >
                     <AddIcon color="white" />
                   </Button>
              </Center>
              </HStack>



            </Center>
         </NativeBaseProvider>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(GamePhrases)



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
