import { StyleSheet } from 'react-native';  

export const styles = StyleSheet.create({  
  container: {  
    flex: 1,
  },
  headerText: {  
    fontSize: 20,  
    fontWeight: 'bold',  
    color: '#ffffff',
  },
  mapContainer: {
    flex: 0.5, // This controls the size of the map. Change this value to adjust the size of the map relative to other components in the view.
    borderWidth: 2, // This sets the thickness of the border.
    borderColor: 'black', // This sets the color of the border.
    borderRadius: 50,
    margin: 10, // This creates space around the map.
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'center', // This centers the map vertically within the View.
    alignItems: 'center' // This centers the map horizontally within the View.
  }
});