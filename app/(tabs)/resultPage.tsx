import { router, useLocalSearchParams } from 'expo-router';
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const ResultsPage = () => {
  const { photoUri, identified } = useLocalSearchParams();

  const onSearch = () => {
    router.push('/')
  };

  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#25292e' }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <Text style={styles.header}>Results</Text>

        {/* Main Shoe Info Section */}
        <View style={styles.imageWrapper}>
            <Image
            source={{ uri: photoUri as string }}
            style={styles.mainImage}
            resizeMode="contain"
            />
        </View>

        <View style={styles.infoContainer}>
            <Text style={styles.shoeName}>Identified: {identified}</Text>
        </View>

        <View>
            <TouchableOpacity style={styles.button} onPress={onSearch}>
            <Text style={styles.buttonText}>Search Another</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#f2f2f2',
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainImage: {
    width: 340,
    height: 280,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  infoContainer: {
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  shoeName: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: '#f2f2f2',
    textAlign: 'center',
  },
  detectedText: {
    fontSize: 16,
    color: '#f2f2f2',
    textAlign: 'center',
  },
  button: {
    width: 300,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#660000',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    color: '#f2f2f2',
  },
});

export default ResultsPage;