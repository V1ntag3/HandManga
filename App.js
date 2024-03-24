import PublicStack from "./routes/PublicStack";
import { useFonts } from "expo-font";
export default function App() {
  const [fontsLoaded] = useFonts({
    'OceanRush': require('./assets/fonts/OceanRush.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PublicStack />
  );
}
