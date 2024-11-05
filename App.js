import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { analytics, db } from './credenciales';
import { collection, getDocs } from 'firebase/firestore'; 
import Categoria from './screens/categoria';
import Agregar from './screens/agregar';
import Eliminar from './screens/eliminar';
import Modificar from './screens/modificar';
import Listar from './screens/listar';
import Inicio from './screens/inicio';

export default function App() {
  const Stack = createStackNavigator();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosCollection = collection(db, 'productos');
        const productosSnapshot = await getDocs(productosCollection);
        const productosList = productosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosList); 
      } catch (error) {
        console.error('Error al recuperar productos: ', error);
      }
    };

    fetchProductos();
    
    // Analytics
    if (typeof window !== 'undefined' && analytics) {
      console.log("Firebase Analytics initialized");
    }
  }, []);

  const agregarProducto = (producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
  };

  const eliminarProducto = (id) => {
    setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
  };

  const modificarProducto = (productoModificado) => {
    setProductos((prevProductos) => 
      prevProductos.map((producto) => 
        producto.id === productoModificado.id ? productoModificado : producto
      )
    );
  };

  const agregarCategoria = (categoria) => {
    setCategorias((prevCategorias) => [...prevCategorias, categoria]);
  };

  const eliminarCategoria = (nombre) => {
    setCategorias((prevCategorias) => prevCategorias.filter(cat => cat.nombre !== nombre));
  };

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="inicio" 
          component={Inicio} 
          options={{ 
            title: 'SCRUM5M', 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#3E8E41' }, 
            headerTintColor: 'black' 
          }} 
        />
        <Stack.Screen 
          name="categoria" 
          options={{ 
            title: 'Agregar Categoría', 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#3E8E41' }, 
            headerTintColor: 'black' 
          }}
        >
          {(props) => <Categoria {...props} eliminarCategoria={eliminarCategoria} agregarCategoria={agregarCategoria} categorias={categorias} />}
        </Stack.Screen>
        <Stack.Screen 
          name="agregar" 
          options={{ 
            title: 'Agregar Productos', 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#3E8E41' }, 
            headerTintColor: 'black' 
          }}
        >
          {(props) => <Agregar {...props} agregarProducto={agregarProducto} categorias={categorias} />}
        </Stack.Screen>
        <Stack.Screen 
          name="eliminar" 
          options={{ 
            title: 'Eliminar Producto', 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#3E8E41' }, 
            headerTintColor: 'black' 
          }}
        >
          {(props) => <Eliminar {...props} productos={productos} eliminarProducto={eliminarProducto} />}
        </Stack.Screen>
        <Stack.Screen 
          name="modificar" 
          options={{ 
            title: 'Modificar Producto', 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#3E8E41' }, 
            headerTintColor: 'black' 
          }}
        >
          {(props) => <Modificar {...props} productos={productos} modificarProducto={modificarProducto} categorias={categorias} />}
        </Stack.Screen>
        <Stack.Screen 
          name="listar" 
          options={{ 
            title: 'Listar Productos', 
            headerTitleAlign: 'center', 
            headerStyle: { backgroundColor: '#3E8E41' }, 
            headerTintColor: 'black' 
          }}
        >
          {(props) => <Listar {...props} productos={productos} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
