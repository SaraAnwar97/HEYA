import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function SignUpScreen({ navigation }) {

    const [data, setData] = React.useState({
        firstname: '',
        lastName: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        cpassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidEmail: true,
        isValidPassword: true

    });
    /*******************************SIGN UP HANDLER************ */

    async function signupData() {

        fetch('http://192.168.1.38:3000/auth/signup', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                "firstName": data.firstname,
                "lastName": data.lastName,
                "userName": data.username,
                "email": data.email,
                "number": data.phone,
                "password": data.password,
                "confirmPassword": data.confirm_password,
            })
        }).then(res => {
            if (res.status == 200) {
                navigation.replace('SignInScreen')
            }
        })
    };

    /*******************************EMAIL HANDLER************** */

    const UsernameInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const emailInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val,
            });
        } else {
            setData({
                ...data,
                email: val,
            });
        }
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }
    const firstnameTextChange = (val) => {
        setData({
            ...data,
            firstname: val
        });
    }
    const lastnameTextChange = (val) => {
        setData({
            ...data,
            lastName: val
        });
    }
    const phoneTextChange = (val) => {
        setData({
            ...data,
            phone: val
        });
    }
    const handleValidEmail = (val) => {
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
    /***********************PASSWORD HANDLER************************** */

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

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={[styles.titles, { marginTop: getStatusBarHeight() }]}>Sign Up </Text>
                {/* ****************************FORM*********** */}

                <View style={{ flex: 1 }}>
                    <Text style={styles.context}>First Name </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="gray"
                            size={20}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="First Name"
                            onChangeText={(val) => firstnameTextChange(val)}
                        />
                    </View>

                    <Text style={styles.context}>Last Name </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="gray"
                            size={20}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="Last Name"
                            onChangeText={(val) => lastnameTextChange(val)}
                        />
                    </View>

                    <Text style={styles.context}>Username </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="gray"
                            size={20}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="username"
                            onChangeText={(val) => UsernameInputChange(val)}
                        />
                    </View>

                    <Text style={styles.context}>Phone Number </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="phone"
                            color="gray"
                            size={19}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="0123456789"
                            keyboardType='number-pad'
                            onChangeText={(val) => phoneTextChange(val)}
                        />
                    </View>

                    <Text style={styles.context}>Email </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="gray"
                            size={20}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="example@email.com"
                            autoCapitalize="none"
                            keyboardType='email-address'
                            onChangeText={(val) => emailInputChange(val)}
                            onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)} />
                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color="pink"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {data.isValidEmail ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Incorrect email format.</Text>
                        </Animatable.View>
                    }


                    <Text style={styles.context}>Password </Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="gray"
                            size={20}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="********"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={15}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={15}
                                />

                            }
                        </TouchableOpacity>
                    </View>
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    }

                    <Text style={styles.context}>Confirm Password </Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="gray"
                            size={20}
                        />
                        <TextInput style={styles.inputText}
                            placeholder="********"
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)}
                            secureTextEntry={data.secureTextEntry ? true : false}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="gray"
                                    size={15}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="gray"
                                    size={15}
                                />

                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {/* ****************************************TERMS AND CONDITION*************** */}
                <View style={{ flex: 0.3 }}>
                    <View style={[styles.terms, { paddingVertical: 5 }]}>
                        <Text>By proceeding , you are agreeing to our</Text>
                        <TouchableOpacity ><Text style={{ color: '#900C3F' }}> Terms of Services  </Text></TouchableOpacity>
                    </View>
                    <View style={styles.terms}>
                        <Text>and</Text>
                        <TouchableOpacity><Text style={{ color: '#900C3F' }}> Privacy Policy.</Text></TouchableOpacity>
                    </View>
                    {/* /************************************CONTINUE Botton *********************/}

                    <TouchableOpacity style={styles.button} onPress={() => signupData()}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* <Text>I agree to the Terms of Services and Privacy Policy.</Text> */}
                    <View style={styles.sign}>
                        <Text style={{ color: 'gray', fontSize: 14 }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace("SignInScreen")}>
                            <Text style={{ color: '#900C3F', fontSize: 14 }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#ffffff',

    },
    titles: {
        marginVertical: 30,
        letterSpacing: 3,
        textAlign: 'center',
        fontSize: 40,
        color: '#900C3F',
        fontWeight: 'bold',
    },
    context: {
        paddingHorizontal: 30,
        paddingVertical: 13,
        color: '#900C3F',
        fontWeight: '400',
        fontSize: 16
    },
    inputText: {
        flexGrow: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        width: 300,
        marginHorizontal: 5
    },
    action: {
        flexDirection: 'row',
        marginHorizontal: 30,
        paddingBottom: 10
    },

    errorMsg: {
        color: '#FF0000',
        fontSize: 12,
        marginLeft: 30
    },
    button: {
        width: 350,
        backgroundColor: '#900C3F',
        borderRadius: 5,
        marginTop: 10,
        marginHorizontal: 30,
    },
    buttonText: {
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    sign: {
        flexDirection: 'row',
        marginLeft: 30,
        justifyContent: 'center',
        paddingVertical: 10,

    },
    terms: {
        flexDirection: 'row',
        marginHorizontal: 30,
    }

});
