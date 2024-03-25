import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Globals from "../Globals";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({ setVizualization, vizualization }) {
    return (
        <View style={{ width: '95%', height: 65, borderRadius: 13, backgroundColor: Globals.COLOR.LIGHT.COLOR2 }}>
            <View style={styles.buttons2}>
                <TouchableOpacity onPress={async () => {
                    setVizualization(false)
                    await AsyncStorage.setItem(
                        'vizualization',
                        'false',
                    );
                }} style={[styles.button, { backgroundColor: !vizualization ? Globals.COLOR.LIGHT.COLOR2 : Globals.COLOR.LIGHT.COLOR4, }]}>
                    <Text style={styles.buttonText}>Vertical</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={async () => {
                    setVizualization(true)
                    await AsyncStorage.setItem(
                        'vizualization',
                        'true',
                    );
                }} style={[styles.button, { backgroundColor: vizualization ? Globals.COLOR.LIGHT.COLOR2 : Globals.COLOR.LIGHT.COLOR4 }]}>
                    <Text style={styles.buttonText}>Horizontal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    buttons2: {
        flexDirection: 'row',
        borderRadius: 13,
        marginBottom: 10,
        color: Globals.COLOR.LIGHT.COLOR2
    },
    button: {
        width: '50%',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Globals.COLOR.LIGHT.COLOR3
    }
})