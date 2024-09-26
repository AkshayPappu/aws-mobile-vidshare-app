// app/index.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig"; 
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { NativeWindStyleSheet } from 'nativewind';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthWrapper from "./AuthWrapper";
import { NavigationContainer } from "@react-navigation/native";
import Upload from "./home/upload";
import MyVideos from "./home/myVideos";
import Icon from 'react-native-vector-icons/FontAwesome';

NativeWindStyleSheet.setOutput({
  default: 'native',
})

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <AuthWrapper>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "";

            // Determine the icon for each route
            if (route.name === "Upload") {
              iconName = "cloud-upload"; 
            } else if (route.name === "My Videos") {
              iconName = "video-camera"; 
            } else if (route.name === "Settings") {
              iconName = "cog"; 
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#38bdf8', // Active tab color
          tabBarInactiveTintColor: 'gray',  // Inactive tab color
          headerShown: false, // Hide header
        })}
      >
        <Tab.Screen name="Upload" component={Upload} />
        <Tab.Screen name="My Videos" component={MyVideos} />
      </Tab.Navigator>
    </AuthWrapper>
  );
}
