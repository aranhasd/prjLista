import { useIsFocused } from '@react-navigation/native';
import { Link, Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const API_URL = 'http://192.168.15.186:5000/api/alunos';

export default function TelaListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter(); 
  const isFocused = useIsFocused(); 

  const buscarAlunos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API local:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setCarregando(true);
      buscarAlunos();
    }
  }, [isFocused]);

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              onPress={() => router.push('formulario')}
              title="+"
            />
          ),
        }}
      />
      
      <FlatList
        data={alunos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Link href={{ pathname: "detalhes", params: { alunoId: item._id } }} asChild>
            <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemTexto}>{item.nome}</Text>
              <Text style={styles.itemSubTexto}>{item.codigo}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerCarregando: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemContainer: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemTexto: { fontSize: 18, fontWeight: 'bold' },
  itemSubTexto: { fontSize: 14, color: 'gray' }
});