
import * as React from 'react';
import { useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Globals from '../Globals';
import ItemCardChapters from '../components/ItemCardChapters'
import Api from '../Api';
import Logo from '../components/Logo';
import Menu from '../components/Menu'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation, route }) => {
    const manga = route.params;
    const [language, setLanguage] = React.useState(null);

    const [chapters, setChapters] = useState([])
    const [limit, setLimit] = useState(16)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(null)

    const [showMore, setShowMore] = useState(false)

    const getChapters = async () => {
        if (total !== chapters.length) {
            await Api.get("manga/" + manga.id + "/feed?limit=" + limit + (language !== " " ? ("&translatedLanguage[]=" + language) : "") + "&order[volume]=desc&order[chapter]=desc&offset=" + offset).then((response) => {
                var array = chapters
                array = array.concat(response.data.data)

                setTotal(response.data.total)
                setOffset(offset + response.data.data.length)
                setChapters(chapters.concat(response.data.data))
            })
        }
    }

    React.useEffect(() => {
        AsyncStorage.getItem('languageManga').then((value) => {
            if (value != null) {
                setLanguage(value)
            } else {
                setLanguage('pt-br')
            }
        })
    }, [])

    React.useEffect(() => {
        if (language != null) {
            getChapters()
        }
    }, [language])

    React.useEffect(() => {
        var items = (Globals.HEIGHT - 150) / 30

        if (language != null && total != null && chapters.length < total && items > chapters.length) {
            getChapters()
        }
    }, [chapters])

    return (
        <View style={styles.body} >
            <Logo />
            <View style={{ flexDirection: 'row', display: 'flex', width: '95%' }}>
                <Image style={styles.cover} source={{ uri: manga.cover }} />

                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={styles.textTitle}>{manga.attributes.title.en}</Text>

                    <Text numberOfLines={!showMore ? 8 : 30} style={styles.text}>{manga.attributes.description.en}</Text>

                    {showMore === false && <TouchableOpacity onPress={() => {
                        setShowMore(true)
                    }}>

                        <Text style={{ color: "white" }}>ver mais</Text>

                    </TouchableOpacity>
                    }


                    {showMore === true && <TouchableOpacity onPress={() => {
                        setShowMore(false)
                    }}>

                        <Text style={{ color: "white" }}>ver menos</Text>

                    </TouchableOpacity>
                    }

                </View>


            </View>
            <FlatList
                disableVirtualization={false}
                numColumns={2}
                style={[styles.listChapters, { height: Globals.HEIGHT, marginBottom: 58 }]}
                data={chapters}
                renderItem={({ item }) => <ItemCardChapters numberOfLines={2} navigation={navigation} item={item} manga={manga} screenRoute={"AppDrawer"} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, i) => i}
                columnWrapperStyle={{ justifyContent: 'space-between' }}

                onEndReached={() => { getChapters() }}
                onEndReachedThreshold={0.1}
            />
            <Menu navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Globals.COLOR.LIGHT.COLOR5,
        paddingVertical: 15,
    },
    listChapters: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10,

    },
    cover: {
        width: 120,
        height: 172,
        objectFit: 'cover'
    },
    text: {
        fontSize: 13,
        color: 'white',
        width: (Globals.WIDTH * 0.95) - 130,
    },
    textTitle: {
        width: (Globals.WIDTH * 0.95) - 130,
        fontSize: 17,
        color: 'white',
        fontWeight: '700'
    }

})