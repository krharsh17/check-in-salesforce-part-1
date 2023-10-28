import { useState } from "react"
import { View, TextInput, StyleSheet, Button } from "react-native"
import { addCheckin } from "../util/datastore";
import { createLead } from "../util/salesforce-helper";


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
});


const CreateLead = (props) => {
    const [attendeeEmail, setAttendeeEmail] = useState(props.route.params.attendeeEmail || "")
    const [attendeeFirstName, setAttendeeFirstName] = useState("")
    const [attendeeLastName, setAttendeeLastName] = useState("")
    const [attendeeCompany, setAttendeeCompany] = useState("")

    const onAttendeeEmailChange = newEmail => setAttendeeEmail(newEmail)
    const onAttendeeFirstNameChange = newFirstName => setAttendeeFirstName(newFirstName)
    const onAttendeeLastNameChange = newLastName => setAttendeeLastName(newLastName)
    const onAttendeeCompanyChange = newCompany => setAttendeeCompany(newCompany)

    // This is where you would check for incorrect email format
    const isValidEmail = () => {
        return attendeeEmail === ""
    }

    const checkIn = () => {

        createLead({
            Email: attendeeEmail,
            FirstName: attendeeFirstName,
            LastName: attendeeLastName,
            Company: attendeeCompany
        }, () => {
            addCheckin(attendeeEmail)
                .then(r => props.navigation.navigate('Result'))
        }, () => console.log("Something went wrong while creating the new lead"))


    }

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={onAttendeeFirstNameChange}
            value={attendeeFirstName}
            placeholder={"Enter attendee first name here"}
        />
        <TextInput
            style={styles.input}
            onChangeText={onAttendeeLastNameChange}
            value={attendeeLastName}
            placeholder={"Enter attendee second name here"}
        />
        <TextInput
            style={styles.input}
            onChangeText={onAttendeeCompanyChange}
            value={attendeeCompany}
            placeholder={"Enter attendee company here"}
        />
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
    </View>
}

export default CreateLead