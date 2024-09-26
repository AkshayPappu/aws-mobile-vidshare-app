// app/index.tsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig"; 
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
export default function Index() {
  const [loading, setLoading] = useState(true); // State to track if we are checking auth status
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        router.replace("/home/upload"); // Redirect to home if logged in
      } else {
        router.replace("/login"); // Redirect to login if not logged in
      }
      setLoading(false); // Finished checking auth status
    });

    return unsubscribe; // Cleanup on component unmount
  }, [router]);

  if (loading) {
    // Loading screen while we check the user's authentication state
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return null; // No UI, as it will redirect before rendering
}
