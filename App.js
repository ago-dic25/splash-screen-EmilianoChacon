import React, { useState, useEffect, useCallback } from 'react'; // Agregué useCallback
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  FlatList, Alert, Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { estiloTextos, styles } from './misEstilos';

// Evita que el splash screen nativo se cierre antes de que estemos listos
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [contador, setContador] = useState(0);
  const [listaNombres, setListaNombres] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepararApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    };

    prepararApp();
  }, []);


  if (!isAppReady) {
    const loadingColors = ['#C5E1A5', '#C5E1A5'];

    return (
      <LinearGradient
        colors={loadingColors}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={require('./assets/splash.png')}
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
        />
        <Text style={{ color: '#5C5C5C', fontSize: 24, fontWeight: 'bold', marginTop: 30 }}>
          Cargando Aplicación...
        </Text>
      </LinearGradient>
    );
  }

  const abrirCamara = async () => { /* ... */ };
  const abrirGaleria = async () => { /* ... */ };
  const guardarImagen = async () => { /* ... */ };
  const onImagenPress = () => { /* ... */ };
  const mostrarMensaje = () => { /* ... */ };
  const agregarNombre = () => { /* ... */ };
  const limpiarCampos = () => { /* ... */ };
  const incrementarContador = () => setContador(contador + 1);
  const handleDeleteConfirmation = (nombreParaBorrar) => { /* ... */ };

  const emoji =
    nombre.trim().length === 0 ? '🙂' :
    nombre.trim().length < 5 ? '😄' :
    nombre.trim().length < 8 ? '😃' :
    nombre.trim().length < 15 ? '😁' :
    '🤩';

  return (
    <View style={styles.container}>
      <Text style={estiloTextos.texto}>Escribe tu nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tu nombre aquí"
        placeholderTextColor="#b8b8b8"
        value={nombre}
        onChangeText={setNombre}
      />
      <Text style={styles.contador}>Caracteres: {nombre.trim().length}</Text>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnPrimario} onPress={mostrarMensaje}>
          <Text style={styles.btnTexto}>Mostrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCuaternario} onPress={agregarNombre}>
          <Text style={styles.btnTexto}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecundario} onPress={limpiarCampos}>
          <Text style={styles.btnTexto}>Limpiar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.mensaje}>{mensaje}</Text>
      <View style={styles.contadorBtnContainer}>
        <TouchableOpacity style={styles.btnTerciario} onPress={incrementarContador}>
          <Text style={styles.btnTexto}>Contador</Text>
        </TouchableOpacity>
        <Text style={styles.contadorTexto}>{contador}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={styles.btnCamara} onPress={abrirCamara}>
          <Text style={styles.btnTexto}>Abrir Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCamara} onPress={abrirGaleria}>
          <Text style={styles.btnTexto}>Abrir Galería</Text>
        </TouchableOpacity>
      </View>
      {imagen && (
        <TouchableOpacity onPress={onImagenPress}>
          <Image source={{ uri: imagen }} style={styles.imagen} />
        </TouchableOpacity>
      )}
      <FlatList
        style={styles.lista}
        data={listaNombres}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDeleteConfirmation(item)}>
            <Text style={styles.listaItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() =>
          listaNombres.length > 0 && <Text style={styles.listaTitulo}>Nombres agregados:</Text>
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}