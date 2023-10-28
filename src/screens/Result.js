import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        fontSize: 160,
        marginTop: 100,
        marginBottom: 100
    }
});

export const Result = (props) => {

    const goBack = () => {
       props.navigation.popToTop()
    }

    return <View style={styles.container}>
        <Text style={styles.icon}>✅</Text>
        <Button
        onPress={goBack}
        title="Go back"
        accessibilityLabel="Go back to check in another attendee"
    /></View>

}

export default Result