import { View, Text, TouchableOpacity } from 'react-native'
export default function ItemCard({ navigation, item }) {
    return <TouchableOpacity onPress={() => {
        navigation.navigate("ReadManga", item)

    }} style={styles.card}>
        {
            <Text style={styles.text}>{item.attributes.chapter}</Text>
        }

    </TouchableOpacity>
}

const styles = {
    body: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    card: {
        backgroundColor: '#e2e2e2',
        borderRadius: 10,
        marginBottom: 10,
        height: 70
    },
    title: {
        color: 'black'
    },
    listScheduling: {
        backgroundColor: 'transparent',
        marginTop: 10
    },
}