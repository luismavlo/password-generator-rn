import { StyleSheet } from 'react-native';

export const colors = {
  background: '#e3edd2',
  colorText: '#2a091c',
  errorText: '#c04d1f',

  trackFalse: '#767577',
  trackTrue: '#81b0ff',
  thumbFalse: '#f4f3f4',
  thumbTrue: '#f5dd4b',
}


export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10
  },

  button: {
    height: 50,
    width: '100%',
    backgroundColor: colors.colorText,
    borderRadius: 10,
    justifyContent: 'center',
  },

  buttonText: {
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    color: 'white',
    fontWeight: '300'
  },
})