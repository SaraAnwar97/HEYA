import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default function Jobs({ navigation }) {
  return (

    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.images} source={require('../Images/jobs.jpg')} />
        <Text style={{ marginHorizontal: 20, paddingVertical: 10, fontSize: 18 }}>Our aim is to help you beautfiful ladies find  a variety of job opportunities that match your specifications and area of expertise. More or less, we are also keen on providing the suitable guidance for any of you who are are unsure how to start their careers or where to begin through career coaching sessions and articles.</Text>
        <TouchableOpacity onPress={() => navigation.navigate("JobOffers")}>
          <Text style={styles.ButtonText}>Job Opportunities</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CareerCoaching")}>
          <Text style={styles.ButtonText}>Career Coaching</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fceef5'

  },
  ButtonText: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#900C3F',
    letterSpacing: 3
  },
  images: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 250,
    marginBottom: 10
  }


});