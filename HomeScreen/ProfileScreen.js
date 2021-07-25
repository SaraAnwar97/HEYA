import React, { Component } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default function ProfileScreen()  {
    const [FirstName, onChangeFirst] = React.useState("");
    const [LastName, onChangeLast] = React.useState("");
    const [Email, onChangeEmail] = React.useState("");
    const [Age, onChangeAge] = React.useState("");
    const [PhoneNo, onChangePhone] = React.useState("");
        return (
            <View style={[styles.container], { marginTop: getStatusBarHeight() }}>
                <ScrollView>

                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={require('../Images/girl.jpg')} />
                        <Text style={styles.name}> SaraRizk </Text>
                    </View>


                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.titles} >Information</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.info}>First Name: </Text>
                            
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeFirst}
                                value={FirstName}
                                placeholder="Sara"
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.info}>Last Name: </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeLast}
                                value={LastName}
                                placeholder="Rizk"
                            />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.info}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeEmail}
                                value={Email}
                                placeholder="example@gmail.com"
                                keyboardType='email-address'
                            />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.info}>Age:</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeAge}
                                value={Age}
                                placeholder="26"
                                keyboardType='numeric'
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.info}>Phone Number:</Text>
                            
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangePhone}
                                value={PhoneNo}
                                placeholder="0123456789"
                                keyboardType='number-pad'
                            />
                        </View>
                        <Divider style={{ marginVertical: 20, borderWidth: 0.3 }} />
                        <Text style={styles.titles} >Bookings</Text>
                        <Text style={styles.subtitles}>Therapists </Text>
                        <View style={{ marginLeft: 30 }}>
                            <View style={{ flexDirection: 'row' }}>

                                <Text style={styles.doctors} t>Dr. Ahmed Kamal</Text>
                                <TouchableOpacity >
                                    <Text style={{ marginLeft: 80, marginTop: 10, color: '#fceef5', fontWeight: '500', backgroundColor: '#900C3F', padding: 10 }}>Cancel Booking</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text>Sunday</Text>
                                <Text>11 am</Text>
                            </View>
                        </View>

                        <Text style={styles.subtitles}>Gynecologist</Text>
                        <View style={{ marginLeft: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.doctors}>Dr. Samer Aly</Text>
                                <TouchableOpacity>
                                    <Text style={{ marginLeft: 108, marginTop: 10, color: '#fceef5', fontWeight: '500', backgroundColor: '#900C3F', padding: 10 }}>Cancel Booking</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text>Monday</Text>
                                <Text>9 am</Text>
                            </View>

                        </View>
                        <Text style={styles.subtitles}>Support Groups</Text>
                        <View style={{ marginLeft: 30 }}>
                            <Text style={{ fontSize: 18, margin: 10, fontWeight: '500' }}>Drug Addiction</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.doctors} t>Dr. Mai Adel</Text>
                                <TouchableOpacity>
                                    <Text style={{ marginLeft: 120, marginTop: 10, color: '#fceef5', fontWeight: '500', backgroundColor: '#900C3F', padding: 10 }}>Cancel Booking</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text>Monday</Text>
                                <Text>10 am</Text>
                            </View>
                        </View>
                        <Text style={styles.subtitles}>Driving Classes</Text>
                        <View style={{ marginLeft: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.doctors}>Yasmin Ibrahim</Text>
                                <TouchableOpacity>
                                    <Text style={{ marginLeft: 93, marginTop: 10, color: '#fceef5', fontWeight: '500', backgroundColor: '#900C3F', padding: 10 }}>Cancel Booking</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 20 }}>
                                <Text>Tuesday</Text>
                                <Text>10 am</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
}

const styles = StyleSheet.create({

    headerContent: {
        padding: 30,
        alignItems: 'center',
        backgroundColor: '#900C3F'
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#ffffff",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {

        alignItems: 'flex-start',
        padding: 10,
        fontSize: 18,
        color: "#000",
    },
    titles: {
        fontSize: 25,
        color: '#900C3F',
        fontWeight: 'bold',
        margin: 10,
        letterSpacing: 1,
    },
    subtitles: {
        fontSize: 22,
        paddingHorizontal: 10,
        marginTop: 20,
        fontWeight: '500',
        color: '#900C3F'
    },
    doctors: {
        fontSize: 18,
        margin: 10,
        color: '#0C905D',
        fontWeight: '500'
    },
    input: {
        margin: 12,
        width:160,
        borderColor:'gray',
        borderRadius:5,
        borderWidth: 1,
        paddingHorizontal:10
      },
});

