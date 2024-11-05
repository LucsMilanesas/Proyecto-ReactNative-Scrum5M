import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Listar = ({ productos }) => {
  const handleProductoPress = (producto) => {
    Alert.alert('Detalles del Producto', 
      `Nombre: ${producto.nombre}\nCategoría: ${producto.categoria}\nStock: ${producto.stock}\nPrecio: $${producto.precio}`
    );
  };

  const renderProducto = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductoPress(item)} style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.nombre}</Text>
      <Text style={styles.itemText}>Categoría: {item.categoria}</Text>
      <Text style={styles.itemText}>Stock: {item.stock}</Text>
      <Text style={styles.itemText}>Precio: ${item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={renderProducto}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay productos disponibles</Text>}
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
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});

export default Listar;
