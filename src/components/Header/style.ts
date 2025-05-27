import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        elevation: 5
    },

    backButton: {
        position: 'absolute',
        left: 16,
        zIndex: 1
    },

    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'Montserrat-Black',
        fontSize: 18,
        color: '#333',
        marginRight: 4
    },

    menuIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: 4
    },

    backIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
}) 