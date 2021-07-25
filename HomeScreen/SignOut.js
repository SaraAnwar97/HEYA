import React from 'react';
import{Alert, StyleSheet, View} from 'react-native';


export default function SignOut({navigation}){

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
          // Prevent default behavior
            e.preventDefault();
              Alert.alert(
                "Sign out",
                " Are you sure you want to sign out?",
                [
                  {
                    text: "Cancel",
                    style: "cancel"
                  },
                  { text: "Yes", onPress: () => navigation.replace("RootScreen") }
                ]
              );
            });
        
    
        return unsubscribe;
      }, [navigation]);
    


    return(
     <View style= {styles.container}>
     </View>
    );
}
const styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'

}


});
