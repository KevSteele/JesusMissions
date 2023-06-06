import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f00',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  homeHeader: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%'
  },
  homeHeaderText: {
    fontSize: 20,  
    fontWeight: 'bold',  
    color: '#ffffff',   
  },
  homeLogo: {
    height: 100
  },
  homeBodyContainer: {
    height: '80%',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  heading: {
    backgroundColor: '#1b1b1b',
    fontSize: 32, // Change this to the size you want
    fontWeight: 'bold',
    marginBottom: 20, // This gives space below the heading
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'left',
    paddingLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20, // This gives space below the buttons
  },
  signon_signin_Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginBottom: 20, // This gives space below the buttons
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10
  },
  buttonText: {
    color: '#1b1b1b',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  pressableText: {
    color: '#1b1b1b', // This makes the pressable's look like hyperlinks
    textDecorationLine: 'underline', // This underlines the pressable's text
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    padding: 3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
