import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Image, StyleSheet, View, SafeAreaView } from 'react-native';

export default function Articles({ navigation }) {
  return (
    
    <SafeAreaView style={styles.container}>
  <Image style={styles.images} source={require('../Images/article.jpg')}/>
      <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate("ArticleTab")}>
      <Text style={styles.ButtonText}>Know your rights</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={()=> navigation.navigate("Parenthood")}>
          <Text style={styles.ButtonText}>Parenthood</Text>
      </TouchableOpacity>
    </SafeAreaView>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fceef5'

  },
  Button: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  ButtonText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color:'#900C3F',
    letterSpacing:3
  },
  images:{
    flex:1,
    justifyContent:'center',
    width:'100%',
    height: 250,
    marginBottom:10
  },

});