import React, { createContext ,useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import contants from 'expo-constants'
import Home from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { startClock } from 'react-native-reanimated';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer,initstate} from './reducers/reducer'

//const store = createStore(reducer)
export const mycontext=createContext()


const stack = createStackNavigator();
const myopt={

  title:"Home Page",
headerTintColor:"white",
headerStyle:{
  backgroundColor:"#006aff"

  }
}
 function App() {
  return (
    <View style={styles.container}>
 
      <stack.Navigator>
        <stack.Screen name="home" component={Home} 
        
          options={myopt}
        />
        <stack.Screen name="create" component={CreateEmployee} options={{...myopt,title:"Create"}}
        />
        <stack.Screen name="profile" component={Profile} 
        options={{...myopt,title:"Profile"}}
        />
        {/* <stack.Screen name="Notifications" component={Notifications} /> */}
        {/* <stack.Screen name="Settings" component={Settings} /> */}


      </stack.Navigator>

      {/* <Profile /> */}
      {/* <CreateEmployee /> */}
    {/* <Home /> */}
      
    </View>
  );
}
export default ()=>{
  const [state,dispatch]= useReducer(reducer,initstate)

  return(

    <mycontext.Provider value={{state:state,dispatch:dispatch}}>
      
    <NavigationContainer>
<App />

    </NavigationContainer>
    </mycontext.Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#daf',

    //marginTop:contants.statusBarHeight,
    //alignItems: 'center',
    //reverses function
    //flexDirection:"row",
    //justifyContent: 'center',
  },
});
