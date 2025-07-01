
import React from 'react'
import { Tabs } from 'expo-router'
import color from '../../constants/color'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';





const _layout = () => {
  return (
    <Tabs
    screenOptions={({route})=>({
      tabBarStyle:{
        backgroundColor: color.background,
        elevation:10,
        width:390,
        height:60,
        justifyContent:'center',
        alignContent:'center,',
        alignItems:'center',
        margin:3,
        paddingRight:23

      },
      tabBarActiveTintColor: color.primary,
      tabBarInactiveTintColor:'white',
      tabBarIcon:({focused, color, size})=>{
        let iconName ='Home';
        switch (route.name) {
          case 'Home':
            iconName= focused?'Home':'home-outline'
            break;
            case 'save':
              iconName = focused? 'save':'save-outline'
              break;
              case 'Create':
                iconName = focused? 'Create': 'Create-Outline'
                break;
                case 'profile': 
                iconName = focused? 'profile' : 'profile-outline'
        
          default:
            break;
        }
        return <Ionicons name={iconName} size={size} color={color}/>
      }
      
      
    })}
    >
        <Tabs.Screen
        name='Home'
        options={{
          title:'Home',
          headerShown:false,
         tabBarIcon:({color})=>(
            
            <Entypo name="home" size={24} color={color} />
            
         )

        
        }}
        /> 
          <Tabs.Screen
        name='save'
        options={{
          title:'Save',
          headerShown:false,
          tabBarIcon:({color})=>(

        <Entypo name="save" size={24} color={color} />

          )
         

        
        }}/>

        <Tabs.Screen
        name='Create'
        options={{
          title:'Create',
          headerShown:false,
           tabBarIcon:({color})=>(

       <Ionicons name="create-sharp" size={24} color={color} />

         )
         

        
        }}

        /> 
          <Tabs.Screen
        name='profile'
        options={{
          title:'profile',
          headerShown:false,
          tabBarIcon:({color})=>(
<MaterialIcons name="account-circle" size={24} color={color} />
            
         )
        
        }}
        /> 
    </Tabs>
      
  )
}

export default _layout