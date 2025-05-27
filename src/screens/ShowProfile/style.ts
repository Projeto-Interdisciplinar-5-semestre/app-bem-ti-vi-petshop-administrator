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
        paddingBottom: 40
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 10
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
        backgroundColor: '#fff'
    },
    profileLabel: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        color: '#333',
        marginTop: 10,
        textAlign: 'center'
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20
    },
    menuContainer: {
        marginBottom: 10
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingHorizontal: 5
    },
    menuItemIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 15,
        tintColor: '#256489'
    },
    menuItemText: {
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#333',
        letterSpacing: 0.15
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#256489',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginTop: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    logoutIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
        tintColor: '#FFF'
    },
    logoutText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#FFF',
        letterSpacing: 0.5
    }
});