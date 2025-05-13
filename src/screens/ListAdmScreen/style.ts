import { StyleSheet } from "react-native";

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
        paddingBottom: 30,
        paddingHorizontal: 16
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        marginTop: 10
    },
    backIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
        tintColor: '#256489',
    },
    backText: {
        fontSize: 16,
        color: '#256489',
        fontFamily: 'Montserrat-Medium',
    },
    greetingContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center'
    },
    greetingText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: '#333',
        textAlign: 'center'
    },
    listContainer: {
        width: '100%'
    },
    adminCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    adminImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    adminName: {
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#333',
    },
    adminActions: {
        flexDirection: 'row',
        gap: 15,
    },
    actionIcon: {
        width: 24,
        height: 24,
    }
});