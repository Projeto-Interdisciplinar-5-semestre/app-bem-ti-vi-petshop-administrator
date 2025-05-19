import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    formContainer: {
        marginTop: 20,
        paddingHorizontal: 16
    },
    inputContainer: {
        marginBottom: 20
    },
    label: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#333',
        marginBottom: 8
    },
    input: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 12,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    imagePicker: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEE'
    },
    imagePickerText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        color: '#666'
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    }
});