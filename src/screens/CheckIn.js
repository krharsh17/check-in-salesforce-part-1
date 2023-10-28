import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native"
import { checkIfLeadExists } from "../util/salesforce-helper";
import { addCheckin } from "../util/datastore";

const styles = StyleSheet.create({
    container: {
        paddingTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        width: "90%",
        borderBottomWidth: 1,
        padding: 10,
    },
    checkInButton: {
        marginTop: 20,
        width: "90%"
    },
    viewCheckInsButton: {
        marginTop: 100,
        width: "90%"
    }
});

const CheckIn = (props) => {
    const [attendeeEmail, setAttendeeEmail] = useState("");

    const onAttendeeEmailChange = newEmail => setAttendeeEmail(newEmail)

    const checkIn = () => {
         checkIfLeadExists(attendeeEmail, exists => {

            if (exists) {
                addCheckin(attendeeEmail)
                .then(r => props.navigation.navigate('Result'))
            } else {
                props.navigation.navigate('CreateLead', {attendeeEmail})
            }
         }, (message, error) => {
            console.log("Error occured")
         })
    }

    const viewCheckins = () => {
        props.navigation.navigate('ViewCheckins')
    }

    // This is where you would check for incorrect email format
    const isValidEmail = () => {
        return attendeeEmail === ""
    }

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={onAttendeeEmailChange}
            value={attendeeEmail}
            placeholder={"Enter attendee email here"}
        />
        <View style={styles.checkInButton}>
            <Button
                onPress={checkIn}
                title="Check In Attendee"
                disabled={isValidEmail()}
                accessibilityLabel="Check in a new attendee"
            />
        </View>
        <View style={styles.viewCheckInsButton}>
            <Button
                onPress={viewCheckins}
                title="View Checkins"
                accessibilityLabel="View check-ins done so far"
            />
        </View>
    </View>
}

export default CheckIn