import { ScrollView, Text, View, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router';

const Search = () => {
const [savedMovies, setSavedMovies]=useState([])

  
    const getSavedMovies = async()=>{
      try{
       const movieList = await AsyncStorage.getItem('movieData');
       const parsedMovie =movieList? JSON.parse(movieList):[];
       setSavedMovies(Array.isArray(parsedMovie)? parsedMovie : []) ;     }
      catch(err){
console.log(err)
      }
  }
  useFocusEffect(
    useCallback(()=>{
      getSavedMovies();
    },[])
  )
  return (
    <SafeAreaView  style={styles.container}>
      <Text style={{color:'white',textAlign:'start',fontSize:20,marginVertical:20}}>Saved Movies</Text>
      <ScrollView>
{
  savedMovies.length ===0 ? (
    <Text style={{color:'white'}}>No saved Movies</Text>
  ):(
    savedMovies.map((movie,index)=>(

      <View key={index} style={{marginBottom: 20, alignItems: 'center'}}>
        {movie.primaryImage && (
                <Image
                  source={{ uri: movie.primaryImage }}
                  style={{ width: 200, height: 300, borderRadius: 10 }}
                  resizeMode="cover"
                />
              )}

    <Text key={index} style={{color:'white'}}>{movie.originalTitle}</Text>
  </View>

 
 
    ))
  )
}
</ScrollView>
    </SafeAreaView>
  )
}

export default Search