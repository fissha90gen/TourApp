import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Tips = () => {
  // Sample data for 10 contacts
  const data = [
    { id: '1', name: 'Tour Agent A', number: '09 11 11 11 11' },
    { id: '2', name: 'Tour Agent A', number: '09 11 11 11 12' },
    { id: '3', name: 'Hotel A', number: '09 22 22 22 22' },
    { id: '4', name: 'Hotel B', number: '09 22 22 22 23' },
    { id: '5', name: 'Police Station A', number: '09 33 33 33 33' },
    { id: '6', name: 'Police Station b', number: '09 33 33 33 34' },
    { id: '7', name: 'Tour Shopping Center A', number: '09 44 44 44 44' },
    { id: '8', name: 'Tour Shopping Center A', number: '09 44 44 44 45' },
    { id: '9', name: 'Gas Staion A', number: '09 44 44 44 46' },
    { id: '10', name: 'Gas Staion B', number: '09 44 44 44 47' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.contactNumber}>{item.number}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor:"#f8f8f8",
  },
  item: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
  },
});

export default Tips;
