import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, StyleSheet } from 'react-native';
import { db } from '../credenciales';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Eliminar = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosCollection = collection(db, 'productos');
      const productosSnapshot = await getDocs(productosCollection);
      const productosList = productosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosList);
    };

    fetchProductos();
  }, []);

  const handleEliminar = (id) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => eliminarProducto(id) },
      ]
    );
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id)); 
      Alert.alert('Producto Eliminado', 'El producto se ha eliminado correctamente');

      
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
      console.error("Error al eliminar producto: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.nombre}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleEliminar(item.id)}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      {productos.length === 0 ? (
        <Text>No hay productos disponibles</Text>
      ) : (
        <FlatList
          data={productos}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default Eliminar;

