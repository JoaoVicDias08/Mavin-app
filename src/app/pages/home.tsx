import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function Home() {
  const router = useRouter();

  // Dados do currículo
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [formacao, setFormacao] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [proficiencia, setProficiencia] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const cvRef = useRef<View>(null);


  // Gerar / baixar CV
  const handleDownloadCV = async () => {
    if (!cvRef.current) return;
    try {
      const uri = await captureRef(cvRef, { format: "png", quality: 1 });
      const fileUri = FileSystem.documentDirectory + "meu_cv.png";
      await FileSystem.copyAsync({ from: uri, to: fileUri });
      await Sharing.shareAsync(fileUri);
    } catch (err) {
      console.error("Erro ao gerar CV:", err);
    }
  };

  // Selecionar foto
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  // Salvar CV
  const saveCV = async () => {
    const cv = { nome, dataNascimento, endereco, formacao, experiencia, proficiencia, foto };
    const curriculosJson = await AsyncStorage.getItem("curriculos");
    const curriculos = curriculosJson ? JSON.parse(curriculosJson) : [];
    curriculos.push(cv);
    await AsyncStorage.setItem("curriculos", JSON.stringify(curriculos));
  };

  return (
    <ScrollView className="flex-1 bg-background pt-20 p-4">
      <Text className="font-titulo text-titulo text-2xl mb-4 bg-blue-500 rounded-2xl py-3 text-center">
        Preencha seu Currículo
      </Text>

      {/* Upload de foto */}
      <TouchableOpacity
        onPress={pickImage}
        className="items-center justify-center bg-inputBackground border-borda p-4 rounded mb-4"
      >
        {foto ? (
          <Image source={{ uri: foto }} className="w-24 h-24 rounded-full" />
        ) : (
          <Text className="font-texto text-borda">
            Clique para adicionar foto
          </Text>
        )}
      </TouchableOpacity>

      {/* Formulário */}
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        className="bg-inputBackground border-borda p-3 rounded mb-2 font-texto"
        placeholderTextColor="black"
      />
      <TextInput
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        className="bg-inputBackground border-borda p-3 rounded mb-2 font-texto"
        placeholderTextColor="black"
      />
      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        className="bg-inputBackground border-borda p-3 rounded mb-2 font-texto"
        placeholderTextColor="black"
      />

      <View className="bg-inputBackground border-borda rounded mb-2">
        <Picker
          selectedValue={formacao}
          onValueChange={(itemValue) => setFormacao(itemValue)}
        >
          <Picker.Item label="Selecione sua formação" value="" />
          <Picker.Item label="Ensino Médio" value="Ensino Médio" />
          <Picker.Item label="Graduação" value="Graduação" />
          <Picker.Item label="Pós-Graduação" value="Pós-Graduação" />
          <Picker.Item label="Mestrado" value="Mestrado" />
          <Picker.Item label="Doutorado" value="Doutorado" />
        </Picker>
      </View>

      <TextInput
        placeholder="Experiência Profissional"
        value={experiencia}
        onChangeText={setExperiencia}
        className="bg-inputBackground border-borda p-3 rounded mb-2 font-texto"
        placeholderTextColor="black"
      />

      <View className="bg-inputBackground border-borda rounded mb-4">
        <Picker
          selectedValue={proficiencia}
          onValueChange={(itemValue) => setProficiencia(itemValue)}
        >
          <Picker.Item label="Selecione seu nível de proficiência" value="" />
          <Picker.Item label="Básico" value="Básico" />
          <Picker.Item label="Intermediário" value="Intermediário" />
          <Picker.Item label="Avançado" value="Avançado" />
          <Picker.Item label="Fluente" value="Fluente" />
          <Picker.Item label="Nativo" value="Nativo" />
        </Picker>
      </View>

      {/* Preview do CV */}
      <Text className="font-titulo text-titulo text-xl mb-2">
        Preview do CV
      </Text>
      <View
        ref={cvRef}
        className="bg-white p-4 rounded shadow-md mb-4"
        collapsable={false}
      >
        {foto && (
          <Image
            source={{ uri: foto }}
            className="w-24 h-24 rounded-full mb-2 self-center"
          />
        )}
        <Text className="font-titulo text-2xl mb-1">{nome || "Seu Nome"}</Text>
        <Text className="font-texto text-borda">
          Data de Nascimento: {dataNascimento || "dd/mm/aaaa"}
        </Text>
        <Text className="font-texto text-borda">
          Endereço: {endereco || "Seu endereço"}
        </Text>

        <Text className="font-titulo text-lg mt-2">Formação</Text>
        <Text className="font-texto">
          {formacao || "Sua formação acadêmica"}
        </Text>

        <Text className="font-titulo text-lg mt-2">Experiência</Text>
        <Text className="font-texto">
          {experiencia || "Sua experiência profissional"}
        </Text>

        <Text className="font-titulo text-lg mt-2">
          Proficência Linguística
        </Text>
        <Text className="font-texto">
          {proficiencia || "Suas línguas e nível"}
        </Text>
      </View>

      {/* Botões */}
      <TouchableOpacity
        className="bg-botaoPrimario p-4 rounded-xl mb-3"
        onPress={async () => {
          await handleDownloadCV();
          await saveCV();
        }}
      >
        <Text className="font-titulo text-background text-center text-lg">
          Gerar / Baixar CV
        </Text>
      </TouchableOpacity>
      <View className="h-20" />
    </ScrollView>
  );
}
