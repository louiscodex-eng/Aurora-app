import { Text, TouchableOpacity } from 'react-native'
import color from '../constants/color'


const Button = ({text, onPressed,textColor}) => {
  return (
    <TouchableOpacity onPress={onPressed} style={{marginTop:30, height:55,backgroundColor:color.primary, borderRadius:8,justifyContent:'center',paddingHorizontal:90}}>
        <Text style={{textAlign:'center',color:textColor?textColor:color.background, fontFamily:'PoppinsRegular',fontWeight:'bold',fontSize:15}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button