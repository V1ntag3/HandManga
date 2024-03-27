import PublicStack from "./routes/PublicStack";
import { useFonts } from "expo-font";
import SplashScreen from './views/SplashScreen';
import { useNetInfo } from '@react-native-community/netinfo';
import { useState, useEffect } from "react";
export default function App() {
  const [fontsLoaded] = useFonts({
    'OceanRush': require('./assets/fonts/OceanRush.otf'),
  });
  const [isLoading, setIsLoading] = useState(true);
  const netInfo = useNetInfo();
  const [disconnected, setDisconnected] = useState(false)

  useEffect(() => {

    var valor = netInfo.isConnected

    if (valor) setDisconnected(false)

    setTimeout(() => {
      if (valor) {
        setDisconnected(false)
        setIsLoading(false);

      } else {
        setDisconnected(true)
      }
    }, 1000);

  }, [netInfo]);

  if (!fontsLoaded) {
    return null;
  }

  if (disconnected) {
  }

  if (isLoading) {
    return <SplashScreen />;
  }


  return (
    <PublicStack />
  );
}
