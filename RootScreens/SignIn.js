import React from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from 'react-native-animatable';
import axios from 'axios'
import { AsyncStorage } from "react-native";

export default function SignInScreen({ navigation }) {
    const [data, setData] = React.useState({
        userName: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true
    })
    /*******************************SIGN IN HANDLER************ */

    async function loginUser() {
        var token = ""
        var id = ""
        ///* let response = await 
        axios.post('http://192.168.1.38:3000/auth/login',
            {
                "userName": data.userName,
                "password": data.password,
            }
        ).then(res => {
            if (res.status == 200) {
                token = res.data.token;
                id = res.data.userId;
                AsyncStorage.setItem("HERToken", JSON.stringify(token));
                AsyncStorage.setItem("HERUserID", JSON.stringify(id));
                navigation.replace('HomePage')
            }
        }).catch((err) => console.log(err, "Error"))

    };


    /*****************EMAIL TEXT INPUT HANDLER**********/
    const textInputChange = (val) => {
        if (val.length >= 0) {
            setData({
                ...data,
                userName: val,
                check_textInputChange: true,
                isValidUserName: true
            }
            );
        } else {
            setData({
                ...data,
                userName: val,
                check_textInputChange: false,
                isValidUserName: false
            });
        }
    }



    const handleValidUsername = (val) => {
        if (val.includes("@") && val.includes('.com')) {
            setData({
                ...data,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                isValidEmail: false,
            });
        }
    }
    /**********************PASSWORD SECURITY HANDLER ***********/
    const handlePasswordChange = (val) => {
        if (val.length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = (val) => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,

        }
        );
    }



    return (
        <View style={styles.container}>
            <Text style={[styles.Titles, { textAlign: 'center' }]}>Welcome</Text>

            {/* *****************************************EMAIL********************** */}
            <Text style={styles.Context}>Username</Text>
            <View style={[styles.action, { paddingBottom: 20 }]}>
                <FontAwesome
                    name="user-o"
                    size={20}
                    color="gray"
                />
                <TextInput style={styles.inputText}
                    placeholder="Username"
                    /*onSubmitEditing={() => this.password.focus()}*/
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e) => handleValidUsername(e.nativeEvent.text)} />
                {data.check_textInputChange ?
                    <Animatable.View animation="bounceIn">
                        <Feather
                            name="check-circle"
                            color='#900C3F'
                            size={20}
                        />
                    </Animatable.View>
                    : null}
            </View>
            {data.isValidEmail ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username missing or incorrect.</Text>
                </Animatable.View>
            }


            {/* ****************************PASSWORD**************************** */}
            <Text style={styles.Context}>Password</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="lock"
                    size={20}
                    color="gray"
                />
                <TextInput style={styles.inputText}
                    placeholder="********"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => handlePasswordChange(val)}
                /*  ref={(input) => this.password = input} */
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                    <Feather
                        name='eye-off'
                        color='gray'
                        size={15}
                    />
                </TouchableOpacity>
            </View>
            {data.isValidPassword ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                </Animatable.View>
            }

            {/* /*****************************Login Botton */}
            <TouchableOpacity style={styles.button} onPress={() => loginUser()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>



            {/************  FORGET PASSWORD AND SIGN UP *********/}

            <View style={styles.login}>
                <TouchableOpacity onPress={() => navigation.replace("ForgotPasswordScreen")}>
                    <Text style={{ color: 'gray', fontSize: 16 }}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")} >
                    <Text style={{ color: '#900C3F', fontSize: 16 }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignContent: 'center',

    },
    Titles: {
        paddingBottom: 80,
        letterSpacing: 3,
        fontSize: 40,
        color: '#900C3F',
        fontWeight: 'bold',
    },
    Context: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        color: '#900C3F',
        fontWeight: '400',
        fontSize: 16
    },
    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: 300,
        marginHorizontal: 5
    },
    action: {
        flexDirection: 'row',
        marginHorizontal: 30
    },
    button: {
        width: 350,
        backgroundColor: '#900C3F',
        borderRadius: 5,
        margin: 30,
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        padding: 25,
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 12,
        marginLeft: 30
    }

});
