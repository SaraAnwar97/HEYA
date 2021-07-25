import React from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { TabActions } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
export default function HomeScreen({ navigation }) {
  const jumpToArticles = TabActions.jumpTo('Articles');
  const jumpToJobs = TabActions.jumpTo('Jobs');
  const jumpToCharity = TabActions.jumpTo('Charity');
  const jumpToTherapist = TabActions.jumpTo('Therapist');
  const jumpToGynecologist = TabActions.jumpTo('Gynecologist');
  const jumpToDriving = TabActions.jumpTo('Driving Classes');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(jumpToArticles)}>
            <Image style={styles.images} source={require('../Images/article.jpg')} />
            <Text style={styles.ButtonText}>Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.dispatch(jumpToTherapist)}>
            <Image style={styles.images} source={require('../Images/therapist-2.jpg')} />
            <Text style={styles.ButtonText}>Therapists </Text>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(jumpToJobs)}>
            <Image style={styles.images} source={require('../Images/jobs.jpg')} />
            <Text style={styles.ButtonText}>Jobs </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.dispatch(jumpToDriving)}>
            <Image style={styles.images} source={require('../Images/driving.jpg')} />
            <Text style={styles.ButtonText}>Driving Classes </Text>
          </TouchableOpacity>

        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.dispatch(jumpToGynecologist)}>
            <Image style={styles.images} source={require('../Images/gynecologist.jpg')} />
            <Text style={styles.ButtonText}>Gynecologists </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.dispatch(jumpToCharity)}>
            <Image style={styles.images} source={require('../Images/charity.jpg')} />
            <Text style={styles.ButtonText}>Charity </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'

  },
  Homebuttons: {

    width: 175,
    height: 125,
    marginVertical: 15,

  },
  ButtonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: '500',
    color: "black"
  },
  images: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 180,
    margin: 10,
    borderRadius: 10
  }
});