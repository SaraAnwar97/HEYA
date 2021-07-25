import * as React from 'react';
import Law from '../Categories/Law';
import Religion from '../Categories/Religion'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';




const TopTab = createMaterialTopTabNavigator();
export default function ArticleTab (){
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#ffffff',
        allowFontScaling: true,
        labelStyle: { fontSize: 14, fontWeight: '600', color:'#000000' ,marginLeft:50},
        style: { backgroundColor: '#ffffff', padding: 10 },
        indicatorStyle: { borderColor: '#000000', borderWidth: 1, marginLeft:40 },
        scrollEnabled: true

      }}
    >
      <TopTab.Screen
        name="Religion"
        component={Religion}
        options={{ tabBarLabel: 'Religion' }}
      />
      <TopTab.Screen
        name="Law"
        component={Law}
        options={{ tabBarLabel: 'Law' }}
      />
    </TopTab.Navigator>
  );
}