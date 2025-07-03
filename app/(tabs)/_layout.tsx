import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e63900',
        headerStyle: {
        backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
        backgroundColor: '#25292e',
        },
    }}
    >
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'camera' : 'camera-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="resultPage"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} color={color} size={24}/>
          ),
        }}
      />
      <Tabs.Screen
        name="saves"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'save-sharp' : 'save-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
