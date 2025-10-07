import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TelaListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    fetch('https://randomuser.me/api/?results=20&nat=br')
      .then((res) => res.json())
      .then((data) => {
        setAlunos(data.results);
        setCarregando(false);
      })
      .catch((error) => {
        console.error(error);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => (
 
          <Link href={{ pathname: "detalhes", params: { aluno: JSON.stringify(item) } }} asChild>
            <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemTexto}>{`${item.name.first} ${item.name.last}`}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10 },
  containerCarregando: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  itemContainer: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemTexto: { fontSize: 18 },
});