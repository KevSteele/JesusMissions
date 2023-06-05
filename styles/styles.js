import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 32, // Change this to the size you want
    fontWeight: 'bold',
    marginBottom: 20, // This gives space below the heading
  },
  logoContainer: {
    justifyContent: 'left'
  },
  jesus: {  
    fontSize: 32,  
    fontWeight: '900',  // Simulate Arial Black 
    color: '#ffffff',     // White color
    marginBottom: -1
  },  
  missions: {  
    fontSize: 32,  
    fontWeight: 'bold',  
    color: '#ffffff',     // White color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // This gives space below the buttons
  },
  signon_signin_Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // This gives space below the buttons
  },
  button: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pressableText: {
    color: 'blue', // This makes the pressable's look like hyperlinks
    textDecorationLine: 'underline', // This underlines the pressable's text
    marginLeft: 20,
    marginRight: 20
  },
});
