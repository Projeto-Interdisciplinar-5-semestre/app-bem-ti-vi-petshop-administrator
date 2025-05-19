import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        flex: 1,
        marginBottom: 70
    },
    scrollContent: {
        paddingBottom: 40,
        paddingHorizontal: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 32,
        gap: 16
    },
});