import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SavesProvider } from './SavesContext';

export default function RootLayout() {
  return (
    <>
    <SavesProvider>
      <Stack screenOptions={{headerShown: false}} />
      <StatusBar style='light' />
    </SavesProvider>
    </>
  );
}