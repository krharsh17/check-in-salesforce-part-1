import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Result from './src/screens/Result';
import CheckIn from './src/screens/CheckIn';
import CreateLead from './src/screens/CreateLead';
import ViewCheckins from './src/screens/ViewCheckins';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});

const Stack = createStackNavigator();

export const App = function() {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" options={{ title: "Check in Attendee"}} component={CheckIn} />
            <Stack.Screen name="CreateLead" options={{ title: "Provide some more details"}} component={CreateLead} />
            <Stack.Screen name="Result" options={{ title: "Check in Succesful!"}} component={Result} />
            <Stack.Screen name="ViewCheckins" options={{ title: "Check-ins so far"}} component={ViewCheckins} />
          </Stack.Navigator>
        </NavigationContainer>
    );
}