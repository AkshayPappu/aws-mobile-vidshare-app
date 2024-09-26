import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getUserInfo } from '../../utils/authUtils';
import { SERVER_URL } from '@env';
import Animated, { FadeInUp, FadeIn, FadeOut } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function Upload() {
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(getUserInfo());
  const [videoName, setVideoName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSelectedMessage, setShowSelectedMessage] = useState(false);

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      setShowSelectedMessage(true); // Show the "Video Selected" message
      setTimeout(() => {
        setShowSelectedMessage(false); // Hide after 5 seconds
      }, 2000); // 2 seconds timeout
    }
  };

  const uploadVideo = async (videoUri, user_id) => {
    setIsUploading(true); // Disable the button during upload

    const base64String = videoUri.split(',')[1];

    const payload = {
      video: base64String,
      user_id: user_id,
      file_name: videoName,
    };

    fetch(`${SERVER_URL}/upload`, {
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
        setVideo(null); // Clear the video and form
        setVideoName('');
        setUploadSuccess(true); // Show success message
        setTimeout(() => {
          setUploadSuccess(false); // Hide success message after 5 seconds
        }, 5000);
      })
      .catch(error => {
        console.error('Error during upload:', error.message);
      })
      .finally(() => {
        setIsUploading(false); // Enable the button again
      });
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style='light' />
      <Image className='absolute h-full w-full' source={require('../../assets/images/background.png')} />
      
      {/* Fixed position for the Upload button */}
      <View className="absolute top-1/4 w-full">
        <View className='flex items-center'>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl'>
            Upload
          </Animated.Text>
        </View>
      </View>
      
      <View className='absolute bottom-0 h-1/2 w-full items-center'>
        <View className="w-2/5 items-center">
          {!isUploading && !video && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Button 
                title='Select video from camera roll' 
                onPress={pickVideo} 
                disabled={isUploading} 
                color={isUploading ? 'gray' : '#38bdf8'} 
              />
            </Animated.View>
          )}
          
          {uploadSuccess && (
            <Animated.View entering={FadeIn} exiting={FadeOut} className="w-full bg-blue-600 mt-4 p-1 items-center">
              <Text className="text-white font-bold">Video uploaded successfully!</Text>
            </Animated.View>
          )}
  
          {video && !uploadSuccess && (
            <>
              {/* Show the message only if `showSelectedMessage` is true */}
              {!isUploading && (
                <>
                  <TextInput
                    placeholder="Video Name"
                    placeholderTextColor="gray"
                    onChangeText={setVideoName}
                    value={videoName}
                    className="border border-gray-500 p-3 bg-white mt-4 mb-4"
                  />
                  
                  {/* Centering the icons */}
                  <Animated.View entering={FadeIn} exiting={FadeOut} className="flex-row justify-center space-x-4 w-full items-center">
                    <View className="items-center">
                      <TouchableOpacity onPress={() => setVideo(null)}>
                        <Icon name='trash-o' size={32} color='black' />
                      </TouchableOpacity>
                    </View>
                    <View className="items-center">
                      <TouchableOpacity onPress={() => uploadVideo(video, user.id)}>
                        <Ionicon name='cloud-upload-outline' size={32} />
                      </TouchableOpacity>
                    </View>
                  </Animated.View>
                </>
              )}
                {isUploading && (
                  <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="black" />
                  </View>
                )}
            </>
          )}
  
        </View>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark overlay background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the overlay is on top
  },
});
