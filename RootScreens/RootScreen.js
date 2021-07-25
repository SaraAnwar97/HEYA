import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './SignIn';
import SignUpScreen from './SignUp';
import ForgotPasswordScreen from './ForgotPassScreen';
import Articles from '../Categories/Articles'
import Jobs from '../Categories/Jobs'
import Driving from '../Categories/DrivingClasses'
import Charity from '../Categories/CharityWork'
import Therapist from '../Categories/Therapist'
import Gynecologist from '../Categories/Gynecologist'
import JobOffers from '../Categories/JobOffers'
import CareerCoaching from '../Categories/CareerCoaching'
import ArticleTab from '../Components/ArticleTab'
import HomeScreen from '../HomeScreen/HomeScreen';
import Parenthood from '../Categories/Parenthood';

/*******************IN CASE OF FIRST USE OF APP***********/
const RootStack = createStackNavigator();
const RootScreen = () => {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
            <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        </RootStack.Navigator>
    );
}
/**********************THE USER LOGS IN ONCE AND THIS SHOWS FOREVER*********/
const MainStack = createStackNavigator();
const MainStackScreen = () => {
    return (
        <MainStack.Navigator headerMode='none'>
            <MainStack.Screen name="Home" component={HomeScreen} />
            <MainStack.Screen name="Articles" component={ArticleStackScreen} />
            <MainStack.Screen name="Jobs" component={JobStackScreen} />
            <MainStack.Screen name="Gynecologist" component={Gynecologist} />
            <MainStack.Screen name="Driving Classes" component={Driving} />
            <MainStack.Screen name="Therapist" component={Therapist} />
            <MainStack.Screen name="Charity" component={Charity} />
        </MainStack.Navigator>
    );
}
const JobStack = createStackNavigator();
const JobStackScreen = () => {
    return (
        <JobStack.Navigator headerMode='none'>
            <JobStack.Screen name="JobPage" component={Jobs} />
            <JobStack.Screen name="JobOffers" component={JobOffers}/>
            <JobStack.Screen name="CareerCoaching"   component={CareerCoaching} />
        </JobStack.Navigator>
    );
}
const ArticleStack = createStackNavigator();
const ArticleStackScreen = () => {
    return (
        <ArticleStack.Navigator headerMode='none'>
            <ArticleStack.Screen name="ArticlePage" component={Articles} />
            <ArticleStack.Screen name="ArticleTab" component={ArticleTab} />
            <ArticleStack.Screen name="Parenthood" component={Parenthood} />
        </ArticleStack.Navigator>
    );
}
export { RootScreen, MainStackScreen, JobStackScreen, ArticleStackScreen};