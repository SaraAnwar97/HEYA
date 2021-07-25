import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Linking } from 'react-native';


export default function JobOffers({ navigation }) {
    useEffect(() => {
        getJobs();
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


    /*************************GET JOBS*********** */

    const [jobs, setJobs] = useState([]);
    async function getJobs() {
        var token = await AsyncStorage.getItem("HERToken");
        axios
            .get(
                `http://192.168.1.38:3000/GetJobs`,
                {
                    headers: {
                        Authorization: "Bearer " + JSON.parse(token),
                    }
                }
            ).then((data) => {
                console.log(data.data.jobs);
                setJobs(data.data.jobs);
                console.log(jobs);

            });

    }
    return (
        <View style={styles.container}>
            <ScrollView >
                <Text style={styles.titles}>Job Opportunities</Text>
                <Text style={{ marginHorizontal: 10, paddingVertical: 10 }}>Search for jobs</Text>
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
                    <Text style={styles.text}>Job</Text>
                    <TextInput style={styles.input} placeholder="Search Job" />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Search name..."
                    />
                </View>
                <View style={styles.containers}>
                    <Text style={styles.text}>Position</Text>
                    <View style={[styles.selector, { marginLeft: 25 }]}>
                        <RNPickerSelect
                            onValueChange={(value) => setValue(value)}
                            style={pickerStyle}
                            placeholder={{ label: "Choose job position...", value: null, color: '#cc0e74' }}
                            items={[
                                { label: "Internship", value: "intern" },
                                { label: "Entry level", value: "entry" },
                                { label: "Student", value: "student" },
                                { label: "Experienced", value: "experienced" },
                                { label: "Manager", value: "manager" },
                            ]}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ flex: 1, textAlign: 'center', color: '#ffffff', fontSize: 16, padding: 10 }}>Search</Text>
                </TouchableOpacity>
                <Divider style={{ borderWidth: 0.5, borderColor: '#9E9E9E' }} />
                {jobs.map((item) => {
                    return (
                        <Card style={styles.card}>
                            <Card.Content>
                                <Title>Title: {item.title}</Title>
                                <Text>Area: {item.area}</Text>
                                <Text>City: {item.city}</Text>
                                <Text style={{ color: '#0C905D', fontWeight: '800', paddingVertical: 5 }}>Position: {item.position}</Text>
                                <Text>Requirements needed: {item.requirements}</Text>
                                <Text style={{ color: 'blue' }}
                                    onPress={() => Linking.openURL(item.url)}>
                                    Apply Here
                                </Text>
                            </Card.Content>
                            <Card.Actions>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Button color='#e05389'>Apply</Button>
                                </View>
                            </Card.Actions>
                        </Card>
                    );
                })}
            </ScrollView>
        </View>

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
        margin: 10,
        backgroundColor: '#fceef5'

    },
    titles: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 10,
        paddingHorizontal: 10,
        letterSpacing: 1
    },
    containers: {
        flexDirection: 'row',
        margin: 10
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: '#e05389',
        width: 75,
        margin: 10,
        borderRadius: 5,

    },
    input: {
        padding: 5,
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: '#9E9E9E',
        marginLeft: 55,
        borderRadius: 10,
        backgroundColor: '#ffffff'
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
    card: {
        marginVertical: 10,
    }



});
