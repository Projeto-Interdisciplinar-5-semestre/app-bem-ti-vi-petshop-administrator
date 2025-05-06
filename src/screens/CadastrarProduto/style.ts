import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
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
    marginRight: 8
  },
  menuIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  sectionHeader: {
    paddingTop: 35,
    paddingBottom: 6,
    alignItems: 'center',
    marginBottom: 8
  },
  sectionTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#333',
    textAlign: 'center'
  },
  divider: {
    height: 3,
    backgroundColor: '#000',
    width: '65%',
    marginBottom: 10
  },
  formGroup: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginLeft: 4
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    fontFamily: 'Montserrat-Medium',
    marginTop: 4
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    overflow: 'hidden',
    justifyContent: 'center',
    marginTop: 4
  },
  picker: {
    height: 55,
    width: '100%',
    color: '#333',
    paddingVertical: 10,
    backgroundColor: 'transparent'
  },
  pickerPlaceholder: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: '#999',
    top: 16
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    justifyContent: 'center',
    marginTop: 4
  },
  imagePickerActive: {
    borderColor: '#6200EE',
    backgroundColor: 'rgba(243, 237, 252, 0.7)'
  },
  imagePickerText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 2
  },
  imagePickerTextActive: {
    color: '#6200EE',
    fontFamily: 'Montserrat-Medium'
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    backgroundColor: 'rgba(236, 234, 234, 0.4)',
    height: 150,
    textAlignVertical: 'top',
    fontFamily: 'Montserrat-Medium',
    marginTop: 4
  },
  submitButtonWrapper: {
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 30,
    alignItems: 'center'
  },
  submitButton: {
    backgroundColor: '#006516',
    borderRadius: 35,
    width: 205,
    height: 55,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.5
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 60,
    padding: 5,
    position: 'relative'
  },
  navIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36
  },
  activeIndicator: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D3E5F5',
    zIndex: 0
  },
  navIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    zIndex: 1
  },
  navLabel: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Montserrat-Medium',
    marginTop: 2
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
    marginTop: 8,
  },
});

export default styles;