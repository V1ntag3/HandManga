import { View, StyleSheet, FlatList } from "react-native";
import Globals from "../Globals";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCardChapters from '../components/ItemCardChapters'
import Api from "./../Api";
export default function ({ navigation, mangaData }) {
    const chapter = mangaData;

    const [language, setLanguage] = useState(null);

    const [chapters, setChapters] = useState([])
    const [limit, setLimit] = useState(16)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(null)

    const getChapters = async () => {
        if (total !== chapters.length) {
            await Api.get("manga/" + chapter.manga.id + "/feed?limit=" + limit + (language !== " " ? ("&translatedLanguage[]=" + language) : "") + "&order[volume]=desc&order[chapter]=desc&offset=" + offset).then((response) => {
                var array = chapters
                array = array.concat(response.data.data)
                setTotal(response.data.total)
                setOffset(offset + response.data.data.length)
                setChapters(chapters.concat(response.data.data))
            })
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('languageManga').then((value) => {
            if (value != null) {
                setLanguage(value)
            } else if (value == null) {
                setLanguage('pt-br')
            } else {
                setLanguage('')
            }
        })
    }, [navigation])

    useEffect(() => {
        if (language != null) {
            getChapters()
        }
    }, [language])


    return (
        <View style={styles.body}>
            <FlatList
                disableVirtualization={false}
                style={[styles.listChapters,]}
                data={chapters}
                renderItem={({ item }) => <ItemCardChapters numberOfLines={1} navigation={navigation} item={item} manga={item.manga} screenRoute={"ReadManga"} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, i) => i}

                onEndReached={() => { getChapters() }}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        // flex: 1,
        height: Globals.HEIGHT,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Globals.COLOR.LIGHT.COLOR5,
        paddingVertical: 15,
    },
    listChapters: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10,

    }
})