import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("./home"); // agora é só /home mesmo
  }, []);

  return null; // nada é renderizado aqui
}
