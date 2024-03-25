
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import Globals from "../Globals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function InputSearch({ value, onChange, placeholder, func }) {
    return (
        <View style={{ position: 'relative', width: '95%' }}>
            <TouchableOpacity onPress={func} style={{ top: 12, zIndex: 1000, right: 10, position: 'absolute' }} >
                <FontAwesomeIcon icon={faSearch} size={25} color={Globals.COLOR.LIGHT.COLOR5} />
            </TouchableOpacity>
            <TextInput
                onKeyPress={(event) => {
                    if (event.nativeEvent.key === 'Enter') {
                        func()
                    }
                }}
                onSubmitEditing={func}
                placeholderTextColor={Globals.COLOR.LIGHT.COLOR5}
                selectionColor={Globals.COLOR.LIGHT.COLOR5}
                inputMode='search'
                placeholder={placeholder}
                style={[styles.input]}
                value={value}
                onChangeText={onChange}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 18,
        backgroundColor: '#fff',
        color: Globals.COLOR.LIGHT.COLOR5,
        borderRadius: 9,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontWeight: '600'
    },
    infoText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 700,
        textAlign: 'center'
    }
}) 