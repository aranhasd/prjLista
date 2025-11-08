import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index" 
        options={{ title: 'Lista de Alunos' }}
      />
      <Stack.Screen
        name="detalhes" 
        options={{ title: 'Detalhes do Aluno' }}
      />
      <Stack.Screen
        name="formulario" 
        options={{ title: 'Novo Aluno', presentation: 'modal' }}
      />
    </Stack>
  );
}