import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  colorPicker: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  previewBox: {
    height: 50,
    marginVertical: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  panel:{
    marginVertical: 12,
    borderRadius: 24
  },
  previewBorder:{
    borderColor:'#000',
    borderWidth:2,
    marginVertical: 12,
    borderRadius: 24
  }
});