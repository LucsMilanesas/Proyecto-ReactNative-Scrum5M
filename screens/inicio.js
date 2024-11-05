import React from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';

export default function Inicio(props) {
  return (
    <ScrollView>
        <View>
            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('categoria')}>
                <Text style={styles.textoboton}> CATEGORIA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('agregar')}>
                <Text style={styles.textoboton}> AGREGAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('eliminar')}>
                <Text style={styles.textoboton}> ELIMINAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('modificar')}>
                <Text style={styles.textoboton}> MODIFICAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={()=>props.navigation.navigate('listar')}>
                <Text style={styles.textoboton}> LISTAR</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  boton:{
    backgroundColor: "#3E8E41",
    borderColor: "#3E8E41",
    borderWidth: 3,
    borderRadius:20,
    marginLeft:50,
    marginRight:50,
    marginTop:30
  },
  textoboton:{
    textAlign:"center",
    padding:10,
    color: "black",
    fontSize:15
  },
})