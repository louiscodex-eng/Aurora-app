import {Text, TextInput, SafeAreaView, Alert, ScrollView, TouchableOpacity, View, Image } from 'react-native'
import styles from '../styles'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {Video} from 'expo-av'
import { useNavigation } from 'expo-router';




const Create = () => {
  const [title,setTitle]=useState('');
  const[desc,setDesc]= useState('');
  const[year,setYear]=useState('')
  const[videoUri,setVideoUri]=useState(null)
  const [videos, setVideos] = useState([]);
  const[imageUri,setImageUri]=useState(null)

  useEffect(()=>{
    const fetchVideos = async ()=> {
      const saved = await AsyncStorage.getItem('movieData')
      if(saved){
        setVideos(JSON.parse(saved))
      }
    };
    fetchVideos()
  },[])
 const navigation = useNavigation()
const pickVideo = async()=>{
  //ask for permission
  const {status}= await ImagePicker.requestMediaLibraryPermissionsAsync();
  if(status !== 'granted'){
    Alert.alert("Permission required","Permission to access gallery is needed!");
    return;
  }
  //launch image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,quality:1,
  })
  if(!result.canceled){
    setVideoUri(result.assets[0].uri)
  }
   
}

const pickImage1 = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'Permission to access gallery is needed!');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
};
const saveMovie = async()=>{
  if(!title || !desc || !year){
    Alert.alert("Error", "Please fill all required fields")
    return
  }
  const movie ={
    originalTitle:title,
    description:desc,
    startYear:year,
    primaryVideo:videoUri,
    primaryImage:imageUri
  };
  try{
    const existing = await AsyncStorage.getItem('movieData');
    const parsed = existing? JSON.parse(existing):[];
    parsed.push(movie);
    await AsyncStorage.setItem('movieData', JSON.stringify(parsed));
    Alert.alert("Success","Movie added successfully!");
    setTitle(''); setYear(''); setVideoUri(''); 
  }
  catch(e){
    Alert.alert("Error", "Failed to save movie");
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color:'white',textAlign:'start',fontSize:20,marginVertical:40}}>Create Movies</Text>
      <ScrollView>
         <TextInput 
         placeholderTextColor='gray'
         style={{
          borderColor:'#FF8F01',
          borderWidth:1,
          color:'white',
          padding:17,
          borderRadius:8
         }} placeholder="enter movie title" value={title} onChangeText={setTitle} />
         <TextInput
         placeholderTextColor='gray'
         style={{
          borderColor:'#FF8F01',
          borderWidth:1,
          color:'white',
          padding:17,
          marginVertical:20,
          borderRadius:8
         }}
         placeholder="description" value={desc} onChangeText={setDesc} multiline />
         <TextInput
          placeholderTextColor='gray'
         style={{
          borderColor:'#FF8F01',
          borderWidth:1,
          color:'white',
          padding:17,
          borderRadius:8,
          height:56
         }}
         placeholder="year" value={year} onChangeText={setYear} keyboardType="numeric" />
          
            <TouchableOpacity style={styles2.button} onPress={pickVideo}>
            <Text style={styles2.buttonText}>ADD VIDEO</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles2.button} onPress={pickImage1}>
            <Text style={styles2.buttonText}>ADD IMAGE</Text>
          </TouchableOpacity>
          {
            (videoUri || imageUri) && ( videoUri?
               (<Video source={{uri:videoUri}}
            rate={1.0} isMuted={false} volume={2.0} resizeMode='cover'
            shouldPlay={true}
            style={{ width: '100%', height: 200, marginVertical: 10 }}/>
               ):(
                <Image
      source={{ uri: imageUri }}
      style={{ width: '100%', height: 200, marginVertical: 10 }}
      resizeMode="cover"
    />
  )
               )
          }
          <TouchableOpacity style={styles2.button} onPress={saveMovie}>
            <Text style={styles2.buttonText}>SAVE FILE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles2.button} onPress={() => navigation.navigate('profile')}>
              <Text style={styles2.buttonText}>VIEW UPLOADED MOVIES</Text>
       </TouchableOpacity>

          


      </ScrollView>
    </SafeAreaView>
  )
}
const styles2 = StyleSheet.create({
  button: {
    backgroundColor: '#FF8F01',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Create