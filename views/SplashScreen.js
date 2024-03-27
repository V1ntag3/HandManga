import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Globals from "../Globals";


export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.body}>
      <View style={[styles.containerNome]}>
        <Text style={styles.nomeApp}>HandBook</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Globals.COLOR.LIGHT.COLOR5,
    flex: 1,
    zIndex: 10000
  },
  containerNome: {
    marginVertical: Globals.HEIGHT * 0.44,
    marginBottom: Globals.HEIGHT * 0.03,
  },
  nomeApp: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'OceanRush',
    fontWeight: '500',
    fontSize: 60,
    color: Globals.COLOR.LIGHT.COLOR2,
  }
});
