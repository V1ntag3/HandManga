import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import Globals from '../Globals'
export default function ({ navigation, item }) {
    return (
        <TouchableOpacity onPress={() => { navigation.navigate("ListChaptersManga", item) }} style={styles.card}>

            <Image style={styles.cover} source={{ uri: item.cover }} />
            <View style={{ marginLeft: 10, justifyContent: 'center' }} >
                <Text numberOfLines={5} style={styles.text}>{item.attributes.title.en}</Text>
            </View>
            {
                item.attributes.lastChapter !== "" && <Text style={styles.chapter}>#{item.attributes.lastChapter}</Text>

            }

        </TouchableOpacity>)
}

const styles = StyleSheet.create({
    chapter: {
        position: 'absolute',
        right: 10,
        top: 5,
        fontSize: 16,
        fontWeight: '900',
        color: 'white'
    },
    cover: {
        width: 70,
        height: 100,
        objectFit: 'cover'
    },
    card: {
        backgroundColor: Globals.COLOR.LIGHT.COLOR1,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        color: 'white',
        width: (Globals.WIDTH * 0.95) - 100
    }
})