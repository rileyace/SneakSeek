import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from "react-native-uuid";
import { useSaves } from "../SavesContext";

const ResultsPage = () => {
  const { photoUri, identified } = useLocalSearchParams();

  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState('');

  const onSearch = () => {
    router.push('/');
  };

  const { addSave } = useSaves();


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
          <TouchableOpacity
            style={[styles.button, { marginTop: 50 }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Save Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 15 }]}
            onPress={onSearch}
          >
            <Text style={styles.buttonText}>Search Another</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Scan Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()} // prevent tap inside from closing
          >
            <Text style={styles.modalTitle}>Notes</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Add your notes here"
              placeholderTextColor="#999"
              value={notes}
              onChangeText={setNotes}
              multiline
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 12 }]}
              onPress={() => {
                addSave({
                  id: uuid.v4() as string,
                  photoUri: photoUri as string,
                  label: identified as string,
                  notes
                });
                console.log("Saved to context:", notes);
                setNotes("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#25292e',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#f2f2f2',
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    color: '#f2f2f2',
  },
});

export default ResultsPage;