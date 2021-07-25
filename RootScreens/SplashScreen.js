import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';


export default function SplashScreen({ navigation }) {
    setTimeout(() => {
        navigation.replace("RootScreen");
    }, 5000)
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../Images/logo.png')} />
            <Text style={styles.logoText}>HEYA</Text>
            <Text style={styles.tagLine}>A community just for you</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#900C3F'


    },
    logo: {
        height: 150,
        width: 150,
        borderRadius:100
    },
    logoText: {
        fontSize: 50,
        letterSpacing: 10,
        fontWeight: '700',
        color: '#ffffff',
        paddingTop:30
    },
    tagLine: {
        padding: 20,
        letterSpacing: 4,
        color: '#e0e0e0',

    },
    Goto: {
        flexDirection: 'row',
        paddingTop: 60,
    }

});
