import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { Checkbox } from 'react-native-paper';



const MyComponent = () => {

  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      color='#0C905D'
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
        
      }}
    />

  );
};
const MyTimeComponent = () => {

  const [checkedTime, setCheckedTime] = React.useState(false);

  return (
    <Checkbox
      color='#0C905D'
      status={checkedTime ? 'checked' : 'unchecked'}
      onPress={() => {
        setCheckedTime(!checkedTime);
      }}
    />

  );
};


export default class Driving extends React.Component {
  state = {
    selectedDate: "",
    markedDates: {},

  }

  render() {
    const getSelectedDayEvents = (date) => {
      let markedDates = {};
      markedDates[date] = { selected: true, marked: true, color: '#00B0BF', textColor: '#FFFFFF' };
      let serviceDate = moment(date);
      serviceDate = serviceDate.format("DD.MM.YYYY");
      this.setState({
        selectedDate: serviceDate,
        markedDates: markedDates,

      });
    };

    return (
      <View style={styles.container}>
        <ScrollView>
        <Image style={styles.images} source={require('../Images/driving.jpg')}/>
          <Text style={styles.titles}>Driving Classes</Text>
          <Text style={{ paddingHorizontal: 15, fontSize: 22 }}>Instructors</Text>
          <Text style={{ paddingVertical: 10, paddingHorizontal: 15}}>Choose your instructor</Text>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.action}>
              <FontAwesome
                name="user-circle"
                color="black"
                size={18}
                style={{ paddingTop: 12 }}
              />
              <View >
                <Text style={styles.instructors}>Yasmin Ibrahim</Text>
                <Text style={styles.description}> Rating of 4.3 out of 5.0</Text>
              </View>
              <MyComponent />

            </View>

            <View style={styles.action}>
              <FontAwesome
                name="user-circle"
                color="black"
                size={18}
                style={{ paddingTop: 12 }}
              />
              <View>
                <Text style={styles.instructors}>Farah Ameen</Text>
                <Text style={styles.description}> Rating of 4.2 out of 5.0</Text>
              </View>
              <MyComponent />
            </View>
          </View>
          <Calendar
            theme={{
              arrowColor: '#cc0e74',
              selectedDayBackgroundColor: '#cc0e74',
              todayTextColor: '#cc0e74',

            }}
            currentDate={"serviceDate"}
            minDate={moment().format}
            maxDate={"2021-07-25"}
            markedDates={this.state.markedDates}
            onDayPress={(day) => {
              getSelectedDayEvents(day.dateString);

            }}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>  9:00am  </Text>
            <MyTimeComponent />
            <Text style={styles.timeText}>  12:00pm  </Text>
            <MyTimeComponent />
            <Text style={styles.timeText}>  3:00pm  </Text>
            <MyTimeComponent />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#e05389', marginRight: 30, borderRadius: 5, padding: 10 }}>
              <Text style={{ color: '#ffffff', padding: 15, width: 100, textAlign: 'center', fontWeight: '700' }}>Book</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor:'#ffff', marginLeft: 30, borderRadius: 5, borderWidth: 0.4 }}>
              <Text style={{ color:'#900C3F', paddingVertical: 25, width: 100, textAlign: 'center', fontWeight: '700' }}>Chat </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fceef5',

  },
  images:{
    flex:1,
    justifyContent:'center',
    width:'100%',
    height: 250,
    marginBottom:10
  },
  titles: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    paddingHorizontal: 10,
    letterSpacing: 1
  },
  action: {
    flexDirection: 'row',
    marginLeft: 30,
    paddingVertical: 10


  },
  instructors: {
    marginHorizontal: 15,
    paddingTop: 10,
    fontWeight:'600',
    fontSize: 18,
  },
  description: {
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: '700',
    color: '#e05389'
  },

  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth:0.4,
    borderRadius: 5
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


});
