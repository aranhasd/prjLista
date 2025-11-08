import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
const API_URL = 'http://192.168.15.186:5000/api/alunos';

export default function TelaDetalhesAlunos() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { alunoId } = params;
    const [aluno, setAluno] = useState(null);
    const [carregando, setCarregando] = useState(true);
      useEffect(() => {
          if (alunoId) {
        const buscarAlunoPorId = async () => {
        try {
          const response = await fetch(`${API_URL}/${alunoId}`);
          const data = await response.json();
          if (response.ok) {
            setAluno(data);
          } else {
            Alert.alert("Erro", "Aluno não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar aluno:", error);
          Alert.alert("Erro", "Não foi possível ligar à API.");
        } finally {
          setCarregando(false);
        }
      };
      buscarAlunoPorId();
    }
  }, [alunoId]); 
  const handleApagar = () => {
    Alert.alert(
      "Apagar Aluno",
      `Tem a certeza que quer apagar o aluno ${aluno.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Apagar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/${aluno._id}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                Alert.alert("Sucesso", "Aluno apagado.");
                router.back();
              } else {
                Alert.alert("Erro", "Não foi possível apagar o aluno.");
              }
            } catch (error) {
              Alert.alert("Erro", "Não foi possível ligar à API.");
            }
          }
        }
      ]
    );
  };
  
  const handleEditar = () => {
    router.push({ pathname: 'formulario', params: { alunoId: aluno._id } });
  };


  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Text>Aluno não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Código:</Text>
        <Text style={styles.info}>{aluno.codigo}</Text>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{aluno.nome}</Text>
        <Text style={styles.label}>CEP:</Text>
        <Text style={styles.info}>{aluno.cep}</Text>
        <Text style={styles.label}>Rua e Número:</Text>
        <Text style={styles.info}>{aluno.rua}, {aluno.numero}</Text>
        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.info}>{aluno.cidade}</Text>
        
        {}
        <View style={styles.botoesContainer}>
          <Button
            title="Editar"
            onPress={handleEditar}
            color="#007BFF"
          />
          <Button
            title="Apagar"
            onPress={handleApagar}
            color="#FF5A5F"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  containerCarregando: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 20, elevation: 3 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, color: '#333' },
  info: { fontSize: 18, color: '#555', marginBottom: 5 },
  botoesContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row', 
    justifyContent: 'space-around', 
  }
});