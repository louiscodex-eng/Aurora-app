import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, Alert, Pressable} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import styles from '../styles'
import color from '../../constants/color'
import { Linking } from 'react-native'
import Button from '../../components/button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import { WebView } from 'react-native-webview';


const details = ({}) => {

  const getEmbedUrl = (url) => {
  if (!url) return '';
  const videoId = url.split('v=')[1]?.split('&')[0];
  return `https://www.youtube.com/embed/${videoId}`;
};

  
    const {movie} = useLocalSearchParams()
    const movieData = JSON.parse(movie)
    const trailerEmbedUrl = getEmbedUrl(movieData.trailer);

    const saveToWatchLater = async()=>{
      try{
        const existing = await AsyncStorage.getItem('movieData')
        let existingList = [];
          //await AsyncStorage.setItem('movieData', JSON.stringify(movieData))  
          //const existingList = existing? JSON.parse(existing) : []
          
        //  const updatedList = [...existingList,movieData]
          try{
            const parsed =JSON.parse(existing);
            //Ensure its an array
            existingList = Array.isArray(parsed)?parsed :[]
          }
           catch (parseError) {
      console.log("Parse error or corrupted data:", parseError);
      existingList = [];
    }
            //const jsonData = JSON.stringify(updatedList);
           // 
           //   
          
           //check for duplicates
           const alreadySaved = existingList.some((m)=>m.originalTitle===movieData.originalTitle);
           if(alreadySaved){
           Alert.alert("Already Saved", "This movie is already in your Watch Later list.");
          return;

          }
          // Add and save the new movie
    const updatedList = [...existingList, {
      originalTitle: movieData.originalTitle,
      description: movieData.description,
      primaryImage: movieData.primaryImage,
      url: movieData.url,
      startYear: movieData.startYear,
      releaseDate: movieData.releaseDate,
      trailer: movieData.trailer
    }];
    await AsyncStorage.setItem('movieData', JSON.stringify(updatedList))
    Alert.alert('Success!!!',"Movie has been successfully saved")
        
      }
      catch(err){
        console.log("err", err)
         Alert.alert('Error!!!',"There was an error saving the movie")
      }
    }
  return (
    <SafeAreaView style={[styles.container,{paddingTop:40}]}>
      <Pressable
       onPress={()=>{
         router.back()
       }}
      style={{marginLeft:'3%', marginTop:15}}>
        <Ionicons name='arrow-back' size={24} color='white'/>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
    
      <View style={{justifyContent:'center', marginVertical:15}}>
            <Text style={{color:color.text, fontSize:20}}>{movieData.originalTitle}</Text>
          <TouchableOpacity
           activeOpacity={0.8}
           onPress={()=>Linking.openURL(movieData.url)}
           style={{width:'100%', height: 450, marginVertical:20}}
          >
              <Image 
           source={{uri:movieData.primaryImage}}
           style={{width: 300, height:450}} resizeMode='contain'
           />
           </TouchableOpacity>
           
<View style={{flexDirection:'row',justifyContent:'space-between', marginTop:5,paddingHorizontal:10}}>
  <Text style={{color:color.text, fontSize:20}}>Start Year:</Text>
  <Text style={{color:color.primary}}>{movieData.startYear}</Text>
</View>
                   <Text style={{color:color.text,marginVertical:2,paddingHorizontal:10}}>{movieData.description}</Text>
                  
 {trailerEmbedUrl ? (
<View style={{height:250, marginTop:20}}>
 <Text style={{color:color.text,fontSize:18,marginBottom:5, paddingHorizontal:10}}>Watch Trailer</Text>
 <WebView 
 source={{uri:trailerEmbedUrl}}
 style={{flex:1}}
 javaScriptEnabled
 allowsFullscreenVideo/>
</View>
 ) : null}

                   <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:15,paddingHorizontal:10}}>
            <Text style={{color:color.text,fontSize:20}}>Rating
              </Text>
              <Text style={{color:color.primary,textAlign:'center'}}>
              {movieData.averageRating}</Text>
      </View>
         
         <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:5,paddingHorizontal:10}}>
                  <Text style={{color:color.text, fontSize:20}}>Released Date:</Text>
                 <Text style={{color:color.primary}}>{movieData.releaseDate}</Text>
        </View>
        <View style={{marginTop:30}}>
                <Button  onPressed={()=>{
                  saveToWatchLater()
                }}
                text={'Watch Later'}/>
        </View>
      
      
      </View>

</ScrollView>
      
    </SafeAreaView>
  )
}

export default details