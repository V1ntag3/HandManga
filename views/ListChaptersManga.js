
import * as React from 'react';
import { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import Globals from '../Globals';
import ItemCardChapters from '../components/ItemCardChapters'
import Api from '../Api';

export default ({ navigation, route }) => {
    const manga = route.params;

    const [chapters, setChapters] = useState([])

    const getChapters = () => {
        Api.get("manga/" + manga.id + "/feed?limit=96&order[volume]=desc&order[chapter]=desc&offset=0").then((response) => {
            setChapters(response.data.data)
        })
    }

    React.useEffect(()=>{
        getChapters()
    },[])
    return (
        <View
            style={styles.body}
        >
            <FlatList
                disableVirtualization={false}
                style={[styles.listScheduling, { height: Globals.HEIGHT - 65, }]}
                data={chapters}
                renderItem={({ item }) => <ItemCardChapters navigation={navigation} item={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, i) => i}
            />
        </View>
    );
}


const styles = {
    body: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },

    listScheduling: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10,
    },
}