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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 16,
        backgroundColor: '#EADDFF',
        marginTop: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20
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
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 4
    },
    title: {
        fontFamily: 'Montserrat-Black',
        fontSize: 18,
        color: '#333',
        marginRight: 8
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
        textAlign: 'center',
        marginBottom: 5
    },
    subtitle: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    },
    listContainer: {
        width: '100%',
        marginBottom: 20
    },
    adminCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    adminImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
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
    actionButton: {
        padding: 5
    },
    actionIcon: {
        width: 24,
        height: 24,
    },
    cadastrarButton: {
        backgroundColor: '#256489',
        borderRadius: 30,
        padding: 16,
        width: '100%',
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20
    },
    cadastrarButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 0.5,
        marginLeft: 8
    },
    cadastrarButtonIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#fff'
    }
});