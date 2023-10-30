import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [syncedEmail,setSyncedEmail]=useState(null)
    
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                syncedEmail,
                setSyncedEmail,
                googleLogin: async () => {
                    try {
                     
                        const { idToken } = await GoogleSignin.signIn();

                     
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        await auth().signInWithCredential(googleCredential);
                        
                
                    }
                    catch (e) {
                        console.log(e);
                    }

                },
                logout : async () => {
                    try {
                        setUser(null);
                     
                      await auth().signOut();
            
                      await GoogleSignin.signOut();
        
                     
                    } catch (error) {
                      console.log(error);
                    }
                  }
            }}

        >
            {children}
        </AuthContext.Provider >
    );
}