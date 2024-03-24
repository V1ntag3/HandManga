import PublicStack from "./routes/PublicStack";
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, } from "react-native-gesture-handler";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    // <><Text> Text</Text>
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <NativeBaseProvider>
    //     <SafeAreaProvider>

          <PublicStack />

    //     </SafeAreaProvider>
    //   </NativeBaseProvider>
    // </GestureHandlerRootView></>
  );
}
