import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const [isLogin, setIsLogin] = useState(false); //False = cadastro inicial
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const router = useRouter();

type Usuario = {
  nome: string;
  email: string;
  senha: string;
};

const handleSubmit = async () => {
  if (!isLogin && nome.trim() === "" || email.trim() === "" || senha.length < 6) {
    alert("Preencha todos os campos corretamente");
    return;
  }

  // Pega os usuários salvos
  const usuariosJson = await AsyncStorage.getItem("usuarios");
  const usuarios: Usuario[] = usuariosJson ? JSON.parse(usuariosJson) : [];

  if (!isLogin) {
    // Cadastro
    const existe = usuarios.some((u: Usuario) => u.email === email);
    if (existe) {
      alert("Email já cadastrado");
      return;
    }

    // Adiciona novo usuário
    usuarios.push({ nome, email, senha });
    await AsyncStorage.setItem("usuarios", JSON.stringify(usuarios));
    await AsyncStorage.setItem("Token", email);
    router.replace("/home");
  } else {
    // Login
    const usuario = usuarios.find((u: Usuario) => u.email === email && u.senha === senha);
    if (!usuario) {
      alert("Email ou senha inválidos");
      return;
    }
    await AsyncStorage.setItem("Token", email);
    router.replace("/home");
  }
};


  return (
    <View className="flex-1 justify-center px-5 bg-background">
      <Text className="text-3xl mb-6 text-center font-titulo text-black bg-inputBackground p-1 rounded max-w-xs mx-auto px-8">{isLogin ? "Entrar" : "Criar conta"}</Text>

      {!isLogin && (
        <TextInput 
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
          className="border p-3 rounded mb-3 bg-titulo"
        />
      )}

       <TextInput 
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border p-3 rounded mb-3 bg-titulo"
        />

         <TextInput 
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          className="border p-3 rounded mb-3 bg-titulo"
        />

        <TouchableOpacity
        onPress={handleSubmit}
        className="bg-blue-500 p-3 rounded max-w-xs mx-auto px-8">
          <Text className="text-white text-center font-bold">
            {isLogin ? "Entrar" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          className="mt-4"
        >
          <Text className="text-blue-500 text-center">
            {isLogin ? "Criar conta" : "Já possui uma conta? Entre"}
          </Text>
        </TouchableOpacity>

    </View>
  );
}
