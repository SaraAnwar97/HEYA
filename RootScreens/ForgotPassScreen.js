import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';


export default function ForgotPasswordScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find your account</Text>
            <Text style={styles.description}>Please enter your email address or mobile number to search for your account.</Text>
            <View style={styles.inputBox}>
                <TextInput
                    placeholder="Email or phone number" />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.buttonIcon, { backgroundColor: '#900C3F' }]} >
                    <Text style={{ color: "#ffffff"}}>Search</Text>
                </TouchableOpacity >
                <TouchableOpacity style={[styles.buttonIcon, { borderWidth: 1 }, { borderColor: '#BDBDBD' }]} onPress={() => navigation.navigate("SignInScreen")}>
                    <Text style={{ color: '#900C3F' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        color: '#900C3F',
        fontWeight: 'bold',
        paddingVertical: 15
    },
    description: {
        marginHorizontal: 40,
        fontSize: 16
    },
    inputBox: {
        borderWidth: 3,
        borderColor: '#E0E0E0',
        width: 310,
        height: 40,
        marginVertical: 20,
        padding: 10,
        borderRadius: 5
    },
    buttonIcon: {
        marginHorizontal: 30,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 5
    }


});