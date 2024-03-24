import { Text, TouchableOpacity } from 'react-native'
import Globals from '../Globals'
export default function ItemCard({ navigation, item }) {
    return <TouchableOpacity onPress={() => {
        navigation.navigate("ReadManga", item)

    }} style={styles.card}>
        {
            <Text style={styles.text}>#{item.attributes.chapter}</Text>
        }

    </TouchableOpacity>
}

const styles = {

    card: {
        backgroundColor: Globals.COLOR.LIGHT.COLOR1,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical:10,
        paddingHorizontal:10,
        flex:0.32,
        maxWidth:"32%"

    },
    text: {
        color:'white'
    },
}