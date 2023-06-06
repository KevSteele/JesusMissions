import { StyleSheet } from 'react-native';  

export const styles = StyleSheet.create({  
  container: {  
    flex: 1,
  },  
  heading: {  
    backgroundColor: '#1b1b1b',  
    fontSize: 32,
    fontWeight: 'bold',  
    marginBottom: 20,
  },  
  homeHeader: {  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },  
  homeHeaderText: {  
    fontSize: 20,  
    fontWeight: 'bold',  
    color: '#ffffff',  
  },  
  homeBodyContainer: {  
    flex: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },  
  homeLogo: {  
    flex: 3,
    width: '45%',  
    resizeMode: 'contain',
  },  
  buttonContainer: {  
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },  
  signon_signin_Container: {  
    flexDirection: 'row',  
    justifyContent: 'center',
  },  
  button: {  
    backgroundColor: '#ffffff',  
    padding: 10,  
    paddingLeft: 30,  
    paddingRight: 30,  
    borderRadius: 30,
  },  
  buttonText: {  
    color: '#1b1b1b',  
    textAlign: 'center',  
    fontWeight: 'bold',
  },  
  pressableText: {  
    color: '#1b1b1b',  
    textDecorationLine: 'underline',  
    marginLeft: 20,  
    marginRight: 20,  
    backgroundColor: '#ffffff',  
    padding: 3,
  }
});
