import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSaves } from "../SavesContext";

export default function Saves() {
  const { saves } = useSaves();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Saved Scans</Text>
      <FlatList
        data={[...saves].reverse()}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photoUri }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardNotes}>Notes: {item.notes}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e"
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#f2f2f2"
  },
  card: {
    backgroundColor: "#292020",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16
  },
  cardImage: {
    width: "100%",
    height: 200
  },
  cardContent: {
    padding: 12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#edebeb",
    marginBottom: 4
  },
  cardNotes: {
    fontSize: 14,
    color: "#f2f2f2"
  }
});