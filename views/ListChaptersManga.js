
import * as React from 'react';
import { useState } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import Globals from '../Globals';
import ItemCardChapters from '../components/ItemCardChapters'
import Api from '../Api';
import Logo from '../components/Logo';
import Menu from '../components/Menu'
export default ({ navigation, route }) => {
    const manga = route.params;

    const [chapters, setChapters] = useState([])
    const [limit, setLimit] = useState(100)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(null)

    const getChapters = () => {
        if(total !== chapters.length){
            Api.get("manga/" + manga.id + "/feed?limit=" + limit + "&order[volume]=desc&order[chapter]=desc&offset=" + offset).then((response) => {
                setChapters(chapters.concat(response.data.data))
                setTotal(response.data.total)
                setOffset(offset + response.data.data.length)
            })
        }
    }

    React.useEffect(() => {
        getChapters()
    }, [])

    return (
        <View style={styles.body} >
            <Logo />
            <View style={{ flexDirection: 'row', display: 'flex', width: '95%' }}>
                <Image style={styles.cover} source={{ uri: manga.cover }} />
                <Text numberOfLines={20} style={styles.text}>{manga.attributes.description.en}</Text>
            </View>
            <FlatList
                disableVirtualization={false}
                numColumns={3}
                style={[styles.listScheduling, { height: Globals.HEIGHT, marginBottom: 58 }]}
                data={chapters}
                renderItem={({ item }) => <ItemCardChapters navigation={navigation} item={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, i) => i}
                columnWrapperStyle={{ justifyContent: 'space-between' }}

                onEndReached={() => { getChapters() }}
                onEndReachedThreshold={0.1}
            />
            <Menu />
        </View>
    );
}


const styles = {
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Globals.COLOR.LIGHT.COLOR5,
        paddingVertical: 15,
    },
    listScheduling: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10,

    },
    cover: {
        width: 120,
        height: 160,
        objectFit: 'cover'
    },
    text: {
        fontSize: 13,
        color: 'white',
        width: (Globals.WIDTH * 0.95) - 130,
        marginLeft: 10
    }
}