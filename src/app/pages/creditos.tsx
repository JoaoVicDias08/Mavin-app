import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

const devs = [
  {
    nome: "João Victor",
    foto: "https://avatars.githubusercontent.com/u/182776975?v=4",
    github: "https://github.com/JoaoVicDias08",
    instagram: "https://www.instagram.com/joaov.md?igsh=MTF0ZTJ4ZXV0amwzZQ==",
  },
  {
    nome: "Davi Campos",
    foto: "https://avatars.githubusercontent.com/u/182918963?s=130&v=4",
    github: "https://github.com/Napoli06",
    instagram: "https://www.instagram.com/davi.cnapoli?igsh=MXZkemY5ZnBuMGhmOQ==",
  },
  {
    nome: "Giovanna Momesso",
    foto: "https://avatars.githubusercontent.com/u/178737392?v=4",
    github: "https://github.com/GiovannaMomesso",
    instagram: "https://www.instagram.com/gigimcdp?igsh=aW1lNTZ4cWJyZzJp",
  },
  {
    nome: "Hillary Isabelle",
    foto: "https://avatars.githubusercontent.com/u/181978345?v=4",
    github: "https://github.com/hihi1502",
    instagram: "https://www.instagram.com/hillary_motah?igsh=MXI2cHFpa2tjNWFl",
  },
];

export default function Creditos() {
  return (
<ScrollView
  className="flex-1 bg-background"
  contentContainerStyle={{ paddingTop: 70, paddingHorizontal: 20, paddingBottom: 48 }}
>
  <Text className="text-2xl font-bold text-center text-white mb-6 bg-blue-500 rounded-2xl py-3">
    Contate-nos
  </Text>

  {devs.map((dev, index) => (
    <View
      key={index}
      className="bg-card rounded-2xl p-4 mb-6 shadow-lg items-center"
    >
      <Image
        source={{ uri: dev.foto }}
        className="w-24 h-24 rounded-full mb-3"
      />
      <Text className="text-xl font-bold mb-2 text-titulo">{dev.nome}</Text>

      <View className="flex-row justify-center items-center space-x-6 gap-2">
        <TouchableOpacity onPress={() => Linking.openURL(dev.github)}>
          <Text className="text-blue-600 font-bold">GitHub</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL(dev.instagram)}>
          <Text className="text-pink-500 font-bold">Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  ))}
</ScrollView>
  );
}
