
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../credenciales'; 
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const Modificar = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      const productosCollection = collection(db, 'productos');
      const productosSnapshot = await getDocs(productosCollection);
      const productosList = productosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Productos recuperados:', productosList);
      setProductos(productosList);
    };

    const fetchCategorias = async () => {
      const categoriasCollection = collection(db, 'categorias'); 
      const categoriasSnapshot = await getDocs(categoriasCollection);
      const categoriasList = categoriasSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Categorías recuperadas:', categoriasList); 
      setCategorias(categoriasList);
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  const handleModificar = () => {
    if (!nombre || !categoria || !stock || !precio) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    Alert.alert(
      'Modificar Producto',
      `¿Estás seguro de que deseas modificar el producto ${nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Modificar', onPress: () => modificarProducto() }
      ]
    );
  };

  const modificarProducto = async () => {
    const productoModificado = {
      nombre,
      categoria,
      stock: parseInt(stock),
      precio: parseFloat(precio),
    };

    try {
      await updateDoc(doc(db, 'productos', productoSeleccionado.id), productoModificado);
      Alert.alert('Producto Modificado', `Producto ${nombre} modificado correctamente`);
      
      setProductoSeleccionado(null);
      setNombre('');
      setCategoria(null);
      setStock('');
      setPrecio('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo modificar el producto');
      console.error("Error al modificar producto: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seleccionar Producto a Modificar:</Text>
      <Picker
        selectedValue={productoSeleccionado?.id}
        onValueChange={(itemValue) => {
          const producto = productos.find(prod => prod.id === itemValue);
          setProductoSeleccionado(producto);
          setNombre(producto.nombre);
          setCategoria(producto.categoria);
          setStock(producto.stock.toString());
          setPrecio(producto.precio.toString());
        }}
      >
        <Picker.Item label="Selecciona un producto" value={null} />
        {productos.map((prod) => (
          <Picker.Item key={prod.id} label={prod.nombre} value={prod.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Nombre del Producto:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Categoría:</Text>
      <Picker selectedValue={categoria} onValueChange={setCategoria}>
        <Picker.Item label="Selecciona una categoría" value={null} />
        {categorias.map((cat) => (
          <Picker.Item key={cat.id} label={cat.nombre} value={cat.nombre} />
        ))}
      </Picker>

      <Text style={styles.label}>Stock:</Text>
      <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />

      <Text style={styles.label}>Precio:</Text>
      <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric" />

      <TouchableOpacity style={styles.button} onPress={handleModificar}>
        <Text style={styles.buttonText}>Modificar Producto</Text>
      </TouchableOpacity>
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
});

export default Modificar;
