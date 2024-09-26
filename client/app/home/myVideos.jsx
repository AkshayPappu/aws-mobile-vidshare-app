import { View, Text, ScrollView, TouchableOpacity, Linking, Share, Image } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { SERVER_URL } from '@env';
import { getUserInfo } from '../../utils/authUtils';
import Icon from 'react-native-vector-icons/FontAwesome';
import FoundationIcon from 'react-native-vector-icons/Foundation'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';


export default function MyVideos() {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(getUserInfo());

  const fetchVideos = async () => {
    const payload = {
      user_id: user.id,
    };

    fetch(`${SERVER_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Server Error: ${text}`);
          });
        }
      })
      .then(data => {
        console.log('Server Response:', data);
        setVideos(data.videos);
      });
  };

  const deleteVideo = async (video_name, user_id) => {
    const payload = {
      video_name: video_name,
      user_id: user_id,
    };

    fetch(`${SERVER_URL}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Server Error: ${text}`);
          });
        }
      })
      .then(data => {
        console.log('Server Response:', data);
        fetchVideos();
      });
  };

  const onShare = async (video) => {
    try {
      const result = await Share.share({
        message: `Check out this video! ${video}`,
      });

      if (result && result.action) {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log('Shared with activity type:', result.activityType);
          } else {
            console.log('Shared');
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('Dismissed');
        }
      } else {
        console.log('No action detected in share result:', result);
      }
    } catch (error) {
      console.error('Error during share:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchVideos();
    }, [])
  );

  const handlePress = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style='light' />
      <Image className='absolute h-full w-full' source={require('../../assets/images/background.png')} />

      {/* title and form */}
      <View className='flex justify-around h-full w-full pt-40 pb-10'>
        <View className='flex items-center'>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl'>
            My Videos
          </Animated.Text>
        </View>
        <View className='items-center pt-20'>
          <Animated.View entering={FadeInUp} className=" w-4/7">
            {/* Video Rows */}
            {videos.map((video, index) => (
              <View
                key={index}
                className="flex-row items-center bg-white border-b border-gray-300 dark:border-gray-700 rounded-lg shadow-sm mb-4 px-4 py-3"
              >
                <Text className="flex-1 text-gray-900 dark:text-white font-medium">
                  {video[0]}
                </Text>
                <TouchableOpacity onPress={() => handlePress(video[1])}>
                  <Text className="text-blue-500 underline px-4">
                    <FoundationIcon name='play-video' size={32} color='#38bdf8' />
                  </Text>
                </TouchableOpacity>
                <View className='flex flex-row space-x-3'>
                  <TouchableOpacity onPress={() => deleteVideo(video[0], user.id)}>
                    <Icon name='trash-o' size={32} color='black' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onShare(video[1])} className='pt-1'>
                    <Icon name='share-square-o' size={30} color='black'/>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
}