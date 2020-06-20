import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [])

  function addProject() {
    api.post('projects', {
      name: `Projeto novo - ${Date.now()}`,
      owner: 'Helvécio Neto',
    }).then(response => {
      setProjects([...projects, response.data]);
    }).catch(err => {
      console.log(err.response.data);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4392f1" />

      <FlatList 
        data={projects}
        keyExtractor={project => project.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.projectName}>{item.name}</Text>
            <Text style={styles.projectOwner}>{item.owner}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={addProject}>
        <Text style={styles.buttonText}>Adicionar projeto</Text>
      </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4392f1',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  list: {
    width: '100%',
    marginBottom: 8,
  },
  card: {
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: '#dc493a',
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
  projectName: {
    fontSize: 22,
    color: '#ece8ef',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  projectOwner: {
    fontSize: 20,
    color: '#ece8ef',
  },
  button: {
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 32,
  },
  buttonText: {
    fontSize: 20,
    color: '#dc493a',
    fontWeight: 'bold',
  }
});
