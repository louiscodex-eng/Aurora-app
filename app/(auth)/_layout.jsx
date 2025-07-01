import { Stack } from "expo-router"

const AuthScreen =()=>{
    return(
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="Login"/>
            <Stack.Screen name="SignUp"/>
        </Stack>
    )
}
export default AuthScreen