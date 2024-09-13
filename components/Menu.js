
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Globals from "../Globals";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faHome, faGear } from "@fortawesome/free-solid-svg-icons";

export default function Menu({ navigation }) {

    return (
        <View style={styles.menu}>

            <TouchableOpacity onPress={() => {
                navigation.navigate("Home")
            }} style={styles.item} >
                <FontAwesomeIcon icon={faHome} size={25} color={"white"} />
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate("Search")

            }} style={styles.item} >
                <FontAwesomeIcon icon={faSearch} size={25} color={"white"} />
                <Text style={styles.text}>Pesquisar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                navigation.navigate("Config")

            }} style={styles.item} >
                <FontAwesomeIcon icon={faGear} size={25} color={"white"} />
                <Text style={styles.text}>Configurações</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '33.3%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menu: {
        height: 75,
        width: '100%',
        backgroundColor: Globals.COLOR.LIGHT.COLOR1,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: "space-around",
        shadowColor: '#010101',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    text: {
        color: 'white',
        fontWeight: '700'
    }
}) 