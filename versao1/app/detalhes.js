import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function TelaDetalhesAlunos() {
 
  const params = useLocalSearchParams();
  const alunoString = params.aluno;
  const aluno = alunoString ? JSON.parse(alunoString) : null;


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Código:</Text>
        <Text style={styles.info}>{aluno.login.uuid}</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.info}>{`${aluno.name.first} ${aluno.name.last}`}</Text>

        <Text style={styles.label}>CEP:</Text>
        <Text style={styles.info}>{aluno.location.postcode}</Text>

        <Text style={styles.label}>Rua e Número:</Text>
        <Text style={styles.info}>{`${aluno.location.street.name}, ${aluno.location.street.number}`}</Text>

        <Text style={styles.label}>Cidade:</Text>
        <Text style={styles.info}>{aluno.location.city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  card: { backgroundColor: 'white', borderRadius: 8, padding: 20, elevation: 3 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, color: '#333' },
  info: { fontSize: 18, color: '#555' },
});