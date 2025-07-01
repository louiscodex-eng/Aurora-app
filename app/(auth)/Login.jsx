import {SafeAreaView} from "react-native-safe-area-context"
import styles from '../styles'
import { Image, Text, TextInput, TouchableOpacity, View} from "react-native"
import authStyles from "./styles"
import Button from '../../components/button';
import color from "../../constants/color";
import { router} from 'expo-router';
import { useState } from "react";
import Entypo from '@expo/vector-icons/Entypo';

const Login = ()=>{
   const[Password,setPassword]= useState('')
      const[passwordShown,setPasswordShown]=useState(false)
      const[focusedInput, setFocusedInput] = useState(null)
    return(
        <SafeAreaView  style={styles.container}>

        <Image source={require('../../assets/images/logo.png')} resizeMode="center" style={{width:115,marginLeft:20}} />
   <Text style={authStyles.authText}>Login</Text>
   <View style={authStyles.secondaryContainer}>


      <View style={authStyles.formContainer}>
         <Text style= {authStyles.formText}>Email</Text>
         <TextInput
         cursorColor={'#FF8F01'}
         style={[authStyles.input,focusedInput === 'email' && authStyles.focusedBorder]} onFocus={()=>setFocusedInput('email')} onBlur={()=>setFocusedInput(null)}/>
      </View>

      <View style={authStyles.formContainer}>
         <Text style= {authStyles.formText}>Password</Text>
         <View style={[focusedInput === 'password' && authStyles.focusedBorder,
             
             { flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#1E1E2D', borderRadius:8, paddingRight:20}
             ] 
            }
             onFocus={()=>setFocusedInput('password')} onBlur={()=>setFocusedInput(null)}>
         <TextInput
         cursorColor={'#FF8F01'}
         onFocus={()=>setFocusedInput('password')}
         onBlur={()=>setFocusedInput(null)}
         value={Password}
         onChangeText={setPassword}
         style={[authStyles.input,{width:'95%'}]}/>
        <TouchableOpacity onPress={()=>setPasswordShown(prev => !prev)}>
               {passwordShown?<Entypo style={{position:'absolute',right:-9,top:-14}} name="eye" size={24} color="#7B7B8B" />
               : <Entypo style={{position:'absolute',right:-9,top:-14}} name="eye-with-line" size={24} color="#7B7B8B" />}
         </TouchableOpacity>
         </View>

         <Text style={{fontFamily:'PoppinsRegular',color:'#CDCDE0', textAlign:'right'}}>Forgot Password?</Text>
      </View>
   </View>

   <View style={authStyles.buttonContainer}>
   
   <Button
   onPressed={()=>{
      router.navigate('/Home')
   }}
   text={'Login'}/>
    

   </View>
   
   <Text style={authStyles.footerNote}>Don't have an account?<Text onPress={()=>{router.navigate('/SignUp')}} style={{color:color.primary}}>Sign Up</Text></Text>

   </SafeAreaView>
)
}

export default Login