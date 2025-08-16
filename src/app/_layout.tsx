import '../styles/global.css';
import { Stack } from "expo-router";
import { View } from "react-native";

/**
 * RootLayout: Layout principal do app
 * Define o Stack de navegação e estilo de fundo global
 */
export default function RootLayout() {
  return (
    <View className="flex-1 bg-background"> {/* Fundo principal do app */}
      <Stack 
        screenOptions={{
          headerShown: false,        // Remove o header padrão
          contentStyle: {            // Garantir que o fundo do conteúdo siga o background
            backgroundColor: '#0F172A',
          },
        }} 
      />
    </View>
  );
}
