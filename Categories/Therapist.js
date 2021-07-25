import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { Card, Divider, Title, Button } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Searchbar } from 'react-native-paper';
import * as React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { Checkbox } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const MytimeSelection = () => {
    const [checkedTime, setCheckedTime] = React.useState(false);

    return (
        <Checkbox
            color='#53E0AA'
            status={checkedTime ? 'checked' : 'unchecked'}
            onPress={() => {
                setCheckedTime(!checkedTime);
            }}
        />
    );
};
const MyDaySelection = () => {
    const [checkedDate, setCheckedDate] = React.useState(false);

    return (
        <Checkbox
            color='#0C905D'
            status={checkedDate ? 'checked' : 'unchecked'}
            onPress={() => {
                setCheckedDate(!checkedDate);
            }}
        />
    );
};
export default function Therapist({ navigation }) {
    useEffect(() => {
        getInfo();
        getGroups();
    });
    const [City, setCityValue] = useState("");
    const [Area, setAreaValue] = useState("");
    const [dynamicPickerArr, setDynamicPickerArr] = useState(City)
    const [text, onChangeText] = React.useState(null);
    const AlexArea = [
        { label: 'Smouha', value: 'smouha' },
        { label: 'Loran', value: 'loran' },
        { label: 'Gleem', value: 'gleem' },
    ];
    const CairoArea = [
        { label: 'New Cairo', value: 'newCairo' },
        { label: 'Maadi', value: 'maadi' },
        { label: 'Dokki', value: 'dokki' },
    ];
    /************************GET THERAPIST*************** */
    const [doctors, setDoctors] = useState([]);
    async function getInfo() {
        var doctorsArr = [];
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .get(
                `http://192.168.1.38:3000/therapists`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            )
            .then((data) => {
                for (var i = 0; i < data.data.therapists.length; i++)
                    doctorsArr.push(data.data.therapists[i]);
                setDoctors(doctorsArr);

            })
    }

    /*************************SEARCH THERAPIST*********** */
    var doctorArr = [];
    const [doctor, setDoctor] = useState([]);

    async function searchTherapists() {
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .post(
                `http://192.168.1.38:3000/therapists/therapist-info`,
                {
                    "city": City,
                    "area": dynamicPickerArr,
                    "name": text,
                }, {
                headers: {
                    Authorization: "Bearer " + JSON.parse(token),
                }
            }
            ).then((data) => {
                for (var i = 0; i < data.data.therapists.length; i++)
                    doctorArr.push(data.data.therapists[i]);
                setDoctor(doctorArr);

            });

    }

    /***********************BOOK GROUP************ */
    const [groupid, setGroupid] = useState('');
    async function bookGroup() {
        console.log("hereee")
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .post(
                `http://192.168.1.38:3000/BookSupportGroup/60e1bd3f78dec6dfcda3f1fc`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            ).then(res => {
                if (res.status == 200) {
                    console.log("booking done");
                }
            })
    }

    /************************GET GROUPS*************** */
    const [groups, setGroups] = useState([]);

    async function getGroups() {
        var groupsArr = [];
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .get(
                `http://192.168.1.38:3000/SupportGroups`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            )
            .then((data) => {
                for (var i = 0; i < data.data.groups.length; i++)
                    groupsArr.push(data.data.groups[i]);
                setGroups(groupsArr);
                // for (var i = 0; i < data.data.groups.length; i++)
                //     console.log(groups[i]._id, "sssssssss");

            })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image style={styles.images} source={require('../Images/therapist-2.jpg')} />
                <Text style={styles.titles}>Therapists</Text>
                <Text style={{ marginHorizontal: 10, paddingVertical: 10 }}>Search for therapists</Text>
                <View style={styles.containers}>
                    <Text style={styles.text}>City </Text>
                    <View style={[styles.selector, { marginLeft: 50 }]}>
                        <RNPickerSelect
                            items={[
                                { label: 'Alexandria', value: 'alexandria' },
                                { label: 'Cairo', value: 'cairo' },
                                { label: 'Tanta', value: 'tanta' },
                            ]}
                            onValueChange={(City) => {
                                setCityValue(City)

                                if (City == 'alexandria')
                                    return alexandria = setDynamicPickerArr(AlexArea)
                                if (City == 'cairo')
                                    return cairo = setDynamicPickerArr(CairoArea)
                            }}
                            style={pickerStyle}
                            placeholder={{ label: "Choose your city...", value: null, color: '#cc0e74' }}

                        />
                    </View>
                </View>
                <View style={styles.containers}>
                    <Text style={styles.text}>Area</Text>
                    <View style={[styles.selector, { marginLeft: 50 }]}>
                        <RNPickerSelect
                            onValueChange={(Area) => setAreaValue(Area)}
                            style={pickerStyle}
                            placeholder={{ label: "Choose your area...", value: null, color: '#cc0e74' }}
                            items={dynamicPickerArr}
                        />
                    </View>
                </View>
                <View style={styles.containers}>
                    <Text style={styles.text}>Doctor </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Search name..."
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={searchTherapists}>
                    <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 16, padding: 10 }}>Search</Text>
                </TouchableOpacity>
                <Divider style={{ borderWidth: 0.5, borderColor: '#9E9E9E' }} />

                {doctor.map((item) => {
                    return (

                        <Card style={styles.CardContainer}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                                    <FontAwesome
                                        name="user-o"
                                        color="black"
                                        size={20}

                                    />
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}> {item.name} </Text>
                                </View>
                                <View style={{ paddingHorizontal: 70, flexDirection: 'row', paddingVertical: 5 }}>
                                    <FontAwesome
                                        name="star"
                                        color="black"
                                        size={13}

                                    />
                                    <FontAwesome
                                        name="star"
                                        color="black"
                                        size={13}

                                    />
                                    <FontAwesome
                                        name="star"
                                        color="black"
                                        size={13}

                                    />
                                    <FontAwesome
                                        name="star"
                                        color="gray"
                                        size={13}

                                    />
                                </View>
                                <Text style={{ paddingHorizontal: 70, fontWeight: '800', color: '#e05389' }}>{item.rating}</Text>
                                <View style={styles.information}>
                                    <FontAwesome
                                        name="location-arrow"
                                        color="black"
                                        size={15}

                                    />
                                    <Text >  {item.area}</Text>
                                </View>
                                <View style={styles.information}>
                                    <FontAwesome
                                        name="dollar"
                                        color="black"
                                        size={15}

                                    />
                                    <Text> {item.phone}</Text>
                                </View>
                                <View style={styles.information}>
                                    <FontAwesome
                                        name="phone"
                                        color="black"
                                        size={15}

                                    />
                                    <Text>{item.fees}</Text>
                                </View>

                                <View style={styles.information}>
                                    <Feather
                                        name="clock"
                                        color="black"
                                        size={15}
                                    />
                                    <Text> {item.workingHours}</Text>
                                </View>
                                <View style={styles.information}>
                                    <Icon name="chatbubbles-outline" color="#000000" size={15} />
                                    <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                                        <Text style={{ color: '#e05389' }}> Chat </Text>
                                    </TouchableOpacity>
                                </View>
                            </Card.Content>
                            <View style={{ marginTop: 20, marginLeft: 10 }}>
                                <Text style={{ fontSize: 16 }}> Date: </Text>
                                <Text style={{ color: 'gray', fontSize: 12, paddingBottom: 10 }}> (Choose suitable date) </Text>

                            </View>
                            <View style={styles.dateContainer}>
                                <Text style={styles.dateText}> Sun </Text>
                                <MyDaySelection />
                                <Text style={styles.dateText}> Mon </Text>
                                <MyDaySelection />
                                <Text style={styles.dateText}> Tues </Text>
                                <MyDaySelection />
                                <Text style={styles.dateText}>  Wed </Text>
                                <MyDaySelection />
                            </View>
                            <View style={{ marginTop: 20, marginLeft: 10 }}>
                                <Text style={{ fontSize: 16 }}> Time </Text>
                                <Text style={{ fontSize: 12, color: 'gray' }}> (Choose suitable time) </Text>
                            </View>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>  9:00am  </Text>
                                <MytimeSelection />
                                <Text style={styles.timeText}>  12:00pm  </Text>
                                <MytimeSelection />
                                <Text style={styles.timeText}>  3:00pm  </Text>
                                <MytimeSelection />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                <TouchableOpacity style={{ backgroundColor: '#e05389', marginRight: 30, borderRadius: 5, padding: 10 }}>
                                    <Text style={{ color: '#fceef5', padding: 15, width: 100, textAlign: 'center', fontWeight: '700' }}>Book</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginLeft: 30, borderRadius: 5, borderWidth: 0.4 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#900C3F', paddingVertical: 25, width: 100, textAlign: 'center', fontWeight: '700' }}>Cancel </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    );
                })}

                <Title style={styles.titles}>Support Groups</Title>

                {groups.map((item) => {
                    return (

                        <Card style={styles.CardContainer}>
                            <Card>
                                <Card.Content>
                                    <Title style={styles.CardsSubtitle}>{item.title}</Title>
                                    <Text style={styles.supportDr}> By Dr. Salma Walid</Text>
                                    <Text>Area: {item.area} </Text>
                                    <Text>Date and Time: {item.time}</Text>
                                    <Text>Available spots: {item.capacity}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button
                                            color='#ffffff'
                                            style={{ backgroundColor: '#e05389' }}
                                            onPress={bookGroup}
                                        >Attend</Button>
                                    </View>
                                </Card.Actions>
                            </Card>
                        </Card>
                    );
                })}

            </ScrollView>
        </View >
    );
}
const pickerStyle = {
    inputIOS: {
        color: '#000000',
        padding: 10,
        borderRadius: 5,

    },
    placeholder: {
        color: 'gray',

    },
    inputAndroid: {
        color: '#000000',
        padding: 10,
    }
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fceef5',

    },
    titles: {
        fontSize: 24,
        fontWeight: '600',
        marginVertical: 10,
        paddingHorizontal: 10,
        letterSpacing: 1
    },
    containers: {
        flexDirection: 'row',
        margin: 10
    },
    text: {
        marginVertical: 10,
        color: '#D81B60',
        fontWeight: '700',
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
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: '#e05389',
        width: 75,
        margin: 10,
        borderRadius: 5,

    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
        backgroundColor: '#fceef5',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#900C3F'
    },
    timeText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#900C3F',
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 20,
        paddingHorizontal: 5,

    },
    images: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: 250,
        marginBottom: 10
    },
    dateContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        backgroundColor: '#fceef5',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#900C3F'
    },
    dateText: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#900C3F',
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 20,
        paddingHorizontal: 5,

    },
    CardsSubtitle: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '600'
    },
    CardContainer: {
        marginHorizontal: 10,
        marginVertical: 20,
        borderBottomWidth: 0.6
    },
    input: {
        padding: 5,
        height: 50,
        width: 250,
        borderWidth: 1,
        marginLeft: 30,
        borderColor: '#9E9E9E',
        borderRadius: 10,
        backgroundColor: '#ffffff'
    },
    information: {
        paddingHorizontal: 70,
        paddingTop: 20,
        flexDirection: 'row'
    },
    supportDr: {
        color: '#53E0AA',
        fontWeight: '700',
        paddingVertical: 5
    },
});
