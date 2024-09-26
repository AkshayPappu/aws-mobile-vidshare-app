// AuthWrapper.tsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function AuthWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
        router.replace("/login"); // Redirect to login if not logged in
      }
      setLoading(false); // Finished checking auth status
    });

    return unsubscribe; // Cleanup on component unmount
  }, [router]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Only render the children if logged in
  return isLoggedIn ? <>{children}</> : null;
}