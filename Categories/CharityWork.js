import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View, Alert } from 'react-native';
import { Divider, Card, Title, Paragraph, Button, Subheading } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const PaymentAlert = () =>
    Alert.alert(
      "Donations",
      "Payment is successfully done!",
      [
        
        { text: "OK"}
      ]
    );



export default function Charity({ navigation }) {
    useEffect(() => {
        getDonations()
        getCharity();
        getCampaigns();
    });


    const [value, setValue] = useState("");

    /*************************GET DONATIONS*********** */

    const [donation, setDonation] = useState([]);
    async function getDonations() {
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .get(
                `http://192.168.1.38:3000/donations/posts`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            ).then((data) => {
                //console.log(data.data);
                setDonation(data.data.donation);
                //console.log(donation);

            });

    }

    /*************************GET CHARITY EVENTS*********** */

    const [charity, setCharity] = useState([]);
    async function getCharity() {
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .get(
                `http://192.168.1.38:3000/CharityEvents`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            ).then((data) => {
                //console.log(data.data);
                setCharity(data.data.events);
                //console.log(charity);

            });

    }
    /*************************GET CAMPAIGNS*********** */
    const [campaign, setCampaign] = useState([]);
    async function getCampaigns() {
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .get(
                `http://192.168.1.38:3000/Campaigns`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            ).then((data) => {
                //console.log(data.data);
                setCampaign(data.data.campaigns);
                //console.log(campaign);

            });

    }

    return (

        <View style={styles.container}>
            <ScrollView >
                <Image style={styles.images} source={require('../Images/charity.jpg')} />
                <Title style={styles.titles}>Donations</Title>
                <View style={styles.containers}>
                    <Text style={styles.text}>Donate by:  </Text>
                    <View style={[styles.selector, { marginLeft: 20 }]}>
                        <RNPickerSelect
                            onValueChange={(value) => setValue(value)}
                            style={pickerStyle}
                            placeholder={{ label: "Choose your donation...", value: null, color: '#cc0e74' }}
                            items={[
                                { label: 'Money', value: 'money' },
                                { label: 'Clothes', value: 'clothes' },
                            ]}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 16, padding: 10 }}>Search</Text>
                </TouchableOpacity>
                <Divider style={{ borderWidth: 0.5, borderColor: '#9E9E9E' }} />
                {donation.map((item) => {
                    return (

                        <Card style={styles.CardContainer}>
                            <View >
                                <Card.Content>
                                    <Title style={styles.CardsSubtitle}>{item.title}</Title>
                                    <Text>Area: {item.area}</Text>
                                    <Text style={styles.organizations}>By: {item.organization}</Text>
                                    <Text>Amount: {item.amount} EGP</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button color='#ffffff' style={{ backgroundColor: '#e05389' }} onPress={PaymentAlert}>Donate</Button>
                                    </View>
                                </Card.Actions>
                            </View>
                        </Card>
                    );
                })}
                <Title style={styles.titles}>Volunteer</Title>
                {charity.map((item) => {
                    return (
                        <Card style={styles.CardContainer}>
                            <Card.Content>
                                <Title style={styles.CardsSubtitle}>{item.title}</Title>
                                <Text style={styles.organizations}>{item.location}</Text>
                                <Text>Available spots : {item.capacity} </Text>
                            </Card.Content>
                            <Card.Actions>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Button color='#ffffff' style={{ backgroundColor: '#e05389' }}>Volunteer</Button>
                                </View>
                            </Card.Actions>
                        </Card>
                    );
                })}
                <Title style={styles.titles}>Awareness Campaigns</Title>
                {campaign.map((item) => {
                    return (
                        <Card style={styles.CardContainer}>
                            <Card>
                                <Card.Content>
                                    <Title style={styles.CardsSubtitle}>{item.title}</Title>
                                    <Text style={styles.organizations}>{item.moderator}</Text>
                                    <Text>Area: {item.area}</Text>
                                    <Text>Date and Time: {item.date}</Text>
                                    <Text>Available spots: {item.capacity} </Text>
                                </Card.Content>
                                <Card.Actions>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button color='#ffffff' style={{ backgroundColor: '#e05389' }}>Attend</Button>
                                    </View>
                                </Card.Actions>
                            </Card>
                        </Card>
                    );
                })}
            </ScrollView>
        </View>


    );
}

const pickerStyle = {
    inputIOS: {
        color: 'black',
        padding: 10,
        borderRadius: 5,

    },
    placeholder: {
        color: 'black',

    },
    inputAndroid: {
        color: 'black',
        padding: 10,
    }
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#fceef5'

    },
    containers: {
        flexDirection: 'row',
        margin: 10
    },
    text: {

        color: '#D81B60',
        fontWeight: '700',
        paddingTop: 10,
        fontSize: 16
    },
    selector: {
        borderWidth: 1,
        borderColor: '#9E9E9E',
        height: 50,
        width: 250,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    titles: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        letterSpacing: 1
    },
    CardsSubtitle: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '600'
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: '#e05389',
        width: 75,
        margin: 10,
        borderRadius: 5,

    },
    CardContainer: {
        marginBottom: 30,
        borderBottomWidth: 0.6,
        marginHorizontal: 10
    },
    organizations: {
        color: '#0C905D',
        fontWeight: '700',
        paddingVertical: 5
    },
    images: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: 250,
        marginBottom: 10
    },

});
