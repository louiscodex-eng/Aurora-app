import {Text,  SafeAreaView, ScrollView, View, Image } from 'react-native'
import styles from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {Video} from 'expo-av'

const profile = () => {
   const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const saved = await AsyncStorage.getItem('movieData');
      if (saved) {
        setMovies(JSON.parse(saved));
      }
    };
    loadMovies();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 24, color: 'white', marginVertical: 40}} >profile</Text>
      <View>
                 <Text style={{color:'#CDCDE0', fontFamily:'PoppinsRegular'}}>Welcome Back</Text>
                 <Text style={{color:'#CDCDE0',fontFamily:'semiBold', fontSize:24}}>Oji Louis</Text>
             </View>
    <ScrollView style={{ padding: 16, flex: 1 }}>
      <Text style={{ fontSize: 24, color: 'white', marginBottom: 20 }}>🎬 Your Uploaded Movies</Text>
      {movies.map((movie, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>{movie.originalTitle} ({movie.startYear})</Text>
          <Text style={{ color: 'gray' }}>{movie.description}</Text>
          {movie.primaryImage && (
            <Image
              source={{ uri: movie.primaryImage }}
              style={{ width: '100%', height: 200, marginTop: 10 }}
              resizeMode="cover"
            />
          )}
          {movie.primaryVideo && (
            <Video
              source={{ uri: movie.primaryVideo }}
              useNativeControls
              shouldPlay={false}
              isLooping
              resizeMode="cover"
              style={{ width: '100%', height: 200, marginTop: 10 ,marginBottom:30}}
            />
          )}
        </View>
      ))}
    </ScrollView>
    </SafeAreaView>
  )
}

export default profile