import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../constants/styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import color from '@/constants/color'
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'




const Home = () => {
const[topMovieData,setTopMovieData] =useState([])
const [query, setQuery]=useState()
const[filteredMovies,setFilteredMovies]=useState([])

 const getMoviesData = async() =>{
  try{
   const options = {
  method: 'GET',
  url: 'https://imdb236.p.rapidapi.com/api/imdb/top250-movies',
  headers: {
    'x-rapidapi-key': '3aa1e0c573msh6b6e591a489c644p1736e0jsn5d49d9380471',
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};
console.log('options',options)
   const response = await axios.request(options)
   console.log('response',response)
   setTopMovieData(response.data)
   console.log('data',response.data)

  }
  catch(err){
    console.log(err)
  }
 }

useEffect(()=>{
  getMoviesData();
},[])

useEffect(()=>{
  if(!query || query.trim()===''){
   setFilteredMovies(topMovieData);
  }else{
    const lowerQuery = query.toLowerCase();
    const filtered =topMovieData.filter((movie)=>
      movie.originalTitle?.toLowerCase().includes(lowerQuery));
    setFilteredMovies(filtered)
  }

},[query,topMovieData])


  return (
    <SafeAreaView style={styles.container}>
    <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30, alignItems:'center'}}>
       <View>
           <Text style={{color:'#CDCDE0', fontFamily:'PoppinsRegular'}}>Welcome Back</Text>
           <Text style={{color:'#CDCDE0',fontFamily:'semiBold', fontSize:24}}>Oji Louis</Text>
       </View>
              <Image source={require('../../assets/images/logo2.png')} resizeMode='contain' style={{height:30,width:34}}/>
    </View>
    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:color.Inputbackground, borderRadius:8,paddingRight:20,marginTop:30}}>
       <TextInput style={{height:58,backgroundColor:color.Inputbackground, fontFamily:"PoppinsRegular", color:'white',paddingLeft:20,width:'90%',borderRadius:8}}
       placeholder='Search for a video topic' placeholderTextColor={color.text} onChangeText={(Text)=>setQuery(Text)}
       />
       <Feather name="search" size={24} color="white" />
    </View>
    <View style={{marginVertical:30}}>
      <Text style={{fontFamily:'PoppinsRegular', color:'white'}}>Trending Videos</Text>
    </View>

<View>
  {
    topMovieData.length < 1 ? <ActivityIndicator size={'large'} animating={true} color={color.primary}/> //spinner for loading 

  :
  
  <FlatList
  data={filteredMovies}
  keyExtractor={(item,index)=>item.id?.toString()|| index.toString()}
   renderItem={(movie)=>{
    return(
      <View style={{justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>{router.push({pathname:'/details',params:{movie:JSON.stringify(movie.item)}})}}>
              <Image source={{uri:movie?.item?.primaryImage}} resizeMethod='contain' style={{width:'90%',height:250}}/>
        </TouchableOpacity>
        
      <Text style={{color:'white',fontSize:20, marginTop:5}}>{movie?.item?.originalTitle}</Text>
      <Text style={{color:'white', marginTop:5,marginBottom:15}}>{movie?.item?.description}</Text>
     
      </View>
    )
   }}/>
  }
</View>

    </SafeAreaView>
  )
}

export default Home