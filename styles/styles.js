import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: '#f00',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    backgroundColor: '#1b1b1b',
    fontSize: 32, // Change this to the size you want
    fontWeight: 'bold',
    marginBottom: 20, // This gives space below the heading
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
  homeBodyContainer: {
    height: '80%',
    justifyContent: 'space-around',
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  homeLogo: {
    width: '45%',
    height: '25%',
    resizeMode: 'contain',
    // marginBottom: 20
  },
  buttonContainer: {
    position: 'absolute',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    alignSelf: 'center'
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
