import { useState, useCallback } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function Salvos() {
  const [curriculos, setCurriculos] = useState<any[]>([]);

  // Carregar CVs do AsyncStorage
  const carregarCVs = async () => {
    const dados = await AsyncStorage.getItem("curriculos");
    if (dados) {
      setCurriculos(JSON.parse(dados));
    } else {
      setCurriculos([]);
    }
  };

  // Atualiza sempre que a aba ganha foco
  useFocusEffect(
    useCallback(() => {
      carregarCVs();
    }, [])
  );

  // Excluir CV
  const excluirCV = async (index: number) => {
    const novos = [...curriculos];
    novos.splice(index, 1);
    await AsyncStorage.setItem("curriculos", JSON.stringify(novos));
    setCurriculos(novos);
  };

  return (
    <View className="flex-1 bg-background w-full pt-20 p-5">
      <Text className="text-2xl font-titulo mb-4 text-titulo text-center bg-blue-500 rounded-2xl py-3">
        Meus Currículos
      </Text>

      {curriculos.length === 0 ? (
        <Text className="text-titulo">Nenhum currículo salvo ainda.</Text>
      ) : (
        <FlatList
          data={curriculos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="bg-card p-4 rounded mb-3">
              {item.foto && (
                <Image
                  source={{ uri: item.foto }}
                  className="w-16 h-16 rounded-full mb-2"
                />
              )}
              <Text className="text-titulo">Nome:{item.nome}</Text>
              <Text className="text-titulo">Data de Nascimento: {item.dataNascimento}</Text>
              <Text className="text-titulo">Endereço: {item.endereco}</Text>
              <Text className="text-titulo">Formação: {item.formacao}</Text>
              <Text className="text-titulo">Experiência: {item.experiencia}</Text>
              <Text className="text-titulo">Proficência: {item.proficiencia}</Text>

              <TouchableOpacity
                onPress={() => excluirCV(index)}
                className="bg-red-500 p-2 rounded mt-3"
              >
                <Text className="text-titulo text-center">Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
