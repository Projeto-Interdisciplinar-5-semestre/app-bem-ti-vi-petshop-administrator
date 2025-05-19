import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: '#F5F5F5'
    },
    button: {
        borderRadius: 10,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderBottomWidth: 3,
        padding: 10,
        margin: 10,
        width: '40%',
        height: 50,
        backgroundColor: '#FFFFFF',
        elevation: 1,
        justifyContent: 'center',
        borderColor: '#DDD'
    },
    buttonText: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: 'google-sans',
        textAlign: 'center',
        color: '#333'
    }
});