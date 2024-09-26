// app/login.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FIREBASE_AUTH } from "@/FirebaseConfig"; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleLogin = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then(() => {
        // Redirect to upload page if login is successful
        router.replace('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style='light' />
      <Image className='h-full w-full absolute' source={require('../assets/images/background.png')} />
      
      {/* lights */}
      <View className='flex-row justify-around w-full absolute'>
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className='h-[225] w-[90]' source={require('../assets/images/light.png')} />
        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className='h-[160] w-[65]' source={require('../assets/images/light.png')} />
      </View>

      {/* title and form */}
      <View className='h-full w-full flex justify-around pt-40 pb-10'>
        <View className='flex items-center'>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl'>
            Login
          </Animated.Text>
        </View>

        <View className='flex items-center mx-4 space-y-4'>
          <Animated.View entering={FadeInDown.duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full'>
            <TextInput placeholder='Email' placeholderTextColor={'gray'} onChangeText={setEmail}/>
          </Animated.View> 
          <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} className='bg-black/5 p-5 rounded-2xl w-full mb-3'>
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry onChangeText={setPassword}/>
          </Animated.View> 
          <Animated.View entering={FadeInDown.duration(1000).delay(400).springify()} className='w-full'>
            <TouchableOpacity className='w-full bg-sky-400 p-3 rounded-2xl mb-3' onPress={handleLogin}>
              <Text className='text-xl font-bold text-white text-center'>Login</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(1000).delay(600).springify()} className='flex-row jusitify-center'>
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
              <Text className='text-sky-600' onPress={() => router.push('/signup')}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View> 
        </View>
      </View>
    </View>
  );
}
