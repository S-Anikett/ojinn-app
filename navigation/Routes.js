import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import axios from 'axios';


const Routes = () => {

  const{user,setUser,setSyncedEmail}=useContext(AuthContext);
  const[initializing, setInitializing]=useState(true);

  const addUser = async (email) => {
    if(email!=null){
        try {
          const response = await axios.post('https://champagne-termite-fez.cyclic.app/addUser', { email });
        } catch (error) {
          console.error(error);
        }
  }
  };

  const onAuthStateChanged=(user)=>{
    setUser(user);
    setSyncedEmail(user?.email)
    addUser(user?.email)
    if(initializing) setInitializing(false);
  }

  useEffect(()=>{
    const subscriber=auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    
  },[]);

  

if(initializing) return null;
  
  return(
 <NavigationContainer>
    { user ?<AppStack/> : <AuthStack/>}
 </NavigationContainer> 
  );
};

export default Routes;