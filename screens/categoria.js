import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import { db } from '../credenciales'; 
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const Categoria = ({ eliminarCategoria }) => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);

  
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categorias'), (snapshot) => {
      const categoriasList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategorias(categoriasList);
    });

    return () => unsubscribe(); 
  }, []);

  const handleAgregarCategoria = async () => {
    if (!nombreCategoria) {
      Alert.alert('Error', 'El nombre de la categoría es obligatorio');
      return;
    }

    const nuevaCategoria = {
      nombre: nombreCategoria,
    };

    try {
      await addDoc(collection(db, 'categorias'), nuevaCategoria);
      Alert.alert('Categoría Agregada', `Categoría ${nombreCategoria} agregada correctamente`);
      setNombreCategoria(''); 
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar la categoría');
      console.error("Error al agregar categoría: ", error);
    }
  };

  const handleEliminarCategoria = async (id, nombre) => {
    Alert.alert(
      'Eliminar Categoría',
      `¿Estás seguro de que deseas eliminar la categoría "${nombre}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'categorias', id));
              Alert.alert('Categoría Eliminada', `Categoría "${nombre}" eliminada correctamente`);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la categoría');
              console.error("Error al eliminar categoría: ", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la Nueva Categoría:</Text>
      <TextInput
        style={styles.input}
        value={nombreCategoria}
        onChangeText={setNombreCategoria}
      />

      <TouchableOpacity style={styles.button} onPress={handleAgregarCategoria}>
        <Text style={styles.buttonText}>Agregar Categoría</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Categorías Existentes:</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.nombre}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleEliminarCategoria(item.id, item.nombre)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#3E8E41',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  categoryText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default Categoria;
