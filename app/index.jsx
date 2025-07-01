import { Text, SafeAreaView, Image, View } from 'react-native'
import styles from './styles';
import color from '@/constants/color';
import Button from '../components/button';
import { router} from 'expo-router';


const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/logo.png')} width={115} resizeMode='center' style={{alignSelf:'center'}}/>
      <Image source={require('../assets/images/img.png')} style={{alignSelf:'center',width:375,height:298}}/>
    <View>
    <Text style={{color:'white',fontFamily:'PoppinsSemiBold',textAlign:'center',fontSize:28}}>Discover Endless Possibilities with <Text style={{color:color.primary}}>Aora</Text></Text>
    <Image source={require('../assets/images/Path 1.png')} style={{width:65,height:13, position:'absolute',right:4,bottom:8}}/>
    </View>
    
     <Text style={{color:'white', textAlign:'center',fontFamily:'PoppinsRegular'}}>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora</Text>
     <Button onPressed={()=>{
      router.navigate('/SignUp')
     }} text={"Continue with Email"}/>
    </SafeAreaView>
  )
}

export default index