import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    medium: require('../assets/fonts/Poppins-Medium.ttf')
  });
  useEffect(()=>{
    if(loaded){
      SplashScreen.hideAsync();
    }
  },[loaded]);
  if (!loaded){
    return null;
  }
  return (
<>
<StatusBar hidden={true}/>
<Stack>
  
  <Stack.Screen name="index" options={{headerShown:false}}/> 
  <Stack.Screen name="(auth)" options={{headerShown:false}}/>
  <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
  <Stack.Screen name="(home)" options={{headerShown:false}}/>

</Stack>
</>
  )
}
