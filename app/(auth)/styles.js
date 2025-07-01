import { StyleSheet } from "react-native";

import color from "../../constants/color";

const authStyles = StyleSheet.create({
    authText:{
        fontFamily:'Semibold',
        color:color.white,
        fontSize:22,
        marginLeft:20
    },
    formContainer:{
       marginHorizontal:20
    },
    focusedBorder:{
         borderWidth:2,
         borderColor:color.primary
    },
    formText:{
     fontFamily :  'medium',
     fontSize:16,
     color: color.text,
     paddingTop:20

    },
    secondaryContainer:{
        marginTop:30,
        marginVertical:10,
        
    },
    input:{
      height:58,
      backgroundColor:color.Inputbackground,
      borderRadius:8,
      color:color.white,
      paddingLeft:20
    },
    buttonContainer:{
        marginVertical:30,
        marginHorizontal:20
    },
    footerNote:{
        color:color.white,
        textAlign:'center',
        fontFamily:'PoppinsRegular',
    
    }
})
export default authStyles