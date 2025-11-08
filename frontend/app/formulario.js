import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';


const API_URL = 'http://192.168.15.186:5000/api/alunos';

export default function FormularioAluno() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { alunoId } = params; 
    const isEditMode = !!alunoId; 
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');


const [carregandoCEP, setCarregandoCEP] = useState(false);
const numeroInputRef = useRef(null);


    useEffect(() => {
        if (isEditMode) {
            const fetchAlunoData = async () => {
        try {
            const response = await fetch(`${API_URL}/${alunoId}`);
            const data = await response.json();
        if (response.ok) {
            setCodigo(data.codigo);
            setNome(data.nome);
            setCep(data.cep || '');
            setRua(data.rua || '');
            setNumero(data.numero || '');
            setCidade(data.cidade || '');
          } 
          else {
            Alert.alert("Erro", "Não foi possível carregar os dados do aluno.");
                }
        } 
        catch (error) {
            Alert.alert("Erro", "Falha na conexão ao buscar dados.");
        }
      };
      fetchAlunoData();
    }
  }, [alunoId]); 
    const handleCepBlur = async () => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      return;
    }
    setCarregandoCEP(true); 
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('CEP Inválido', 'Não foi possível encontrar este CEP.');
        setRua('');
        setCidade('');
      } else {
        setRua(data.logradouro);
        setCidade(data.localidade);   

        if (numeroInputRef.current) {
          numeroInputRef.current.focus();
        }
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Alert.alert('Erro', 'Não foi possível buscar o CEP.');
    } finally {
      setCarregandoCEP(false); 
    }
  };

  const handleSalvar = async () => {
    const alunoData = { codigo, nome, cep, rua, numero, cidade };
    const url = isEditMode ? `${API_URL}/${alunoId}` : API_URL;
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alunoData),
      });
      const data = await response.json();
      if (response.ok || response.status === 201) {
        Alert.alert('Sucesso', `Aluno ${isEditMode ? 'atualizado' : 'criado'}!`);
        router.back(); 
      } else {
        Alert.alert('Erro', data.erro || 'Não foi possível salvar.');
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert('Erro', 'Não foi possível conectar à API.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{ title: isEditMode ? 'Editar Aluno' : 'Novo Aluno' }} 
      />

      <Text style={styles.label}>Código:</Text>
      <TextInput
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
        placeholder="Digite o código do aluno (ex: A001)"
        editable={!isEditMode} 
      />

      <Text style={styles.label}>Nome Completo:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome completo"
      />
      
      <Text style={styles.label}>CEP:</Text>
      <View style={styles.cepContainer}>
        <TextInput
          style={styles.inputCep}
          value={cep}
          onChangeText={setCep}
          placeholder="Digite o CEP"
          keyboardType="numeric"
          maxLength={8}
  
          onBlur={handleCepBlur} 
        />
        {
            
        }
        {
        carregandoCEP && <ActivityIndicator size="small" color="#0000ff" />
        }
      </View>
      
      <Text style={styles.label}>Rua:</Text>
      <TextInput
        style={styles.input}
        value={rua}
        onChangeText={setRua}
        placeholder="Será preenchido automaticamente"

        editable={!carregandoCEP} 
      />

      <Text style={styles.label}>Número:</Text>
      <TextInput
    
        ref={numeroInputRef} 
        style={styles.input}
        value={numero}
        onChangeText={setNumero}
        placeholder="Digite o número (ex: 123A)"
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Será preenchida automaticamente"

        editable={!carregandoCEP}
      />
      <Button 
        title={isEditMode ? 'Atualizar Aluno' : 'Salvar Aluno'} 
        onPress={handleSalvar} 
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputCep: {
    flex: 1, 
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginRight: 10, 
  },
});