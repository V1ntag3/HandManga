
import * as React from 'react';
import { useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import Globals from '../Globals';
import InputSearch from '../components/InputSearch'
import Api from '../Api';
import ItemCard from '../components/ItemCard'
export default ({ navigation }) => {
    const [search, setSearch] = useState("")
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(32)
    const [total,setTotal] = useState(null)
    const [mangas, setMangas] = useState([])
    const searchFunc = () => {
        if(offset !== total){
            Api.get("manga?limit="+ limit +"&offset="+offset+"&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&title=" + search + "&includedTagsMode=AND&excludedTagsMode=OR").then((response) => {

                var array = response.data.data
                array.map(elem => {
                    elem.relationships.map(elem2 => {
                        if (elem2.type === "cover_art") {
                            elem.cover = 'https://mangadex.org/covers/' + elem.id + '/' + elem2.attributes.fileName
                        }
                    })
                })
                setTotal(response.data.total)
                console.log(array)
                setMangas(array)
            })
        }
     

    }

    return (
        <View
            style={styles.body}
        >
            <InputSearch onChange={(value) => {
                setSearch(value)
                setOffset(0)
                setTotal(null)
                if(mangas.length > 0){
                    setMangas([])
                }
            }} value={search} placeholder={'Pesquise aqui o mangá'} func={searchFunc} />
            
            <FlatList
                disableVirtualization={false}
                style={[styles.listScheduling, { height: Globals.HEIGHT - 65, }]}
                data={mangas}
                renderItem={({ item }) => <ItemCard navigation={navigation} item={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, i) => i}
            />
        </View>
    );
}


const styles = {
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Globals.COLOR.LIGHT.COLOR5,
        paddingVertical: 15,
    },

    listScheduling: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10,
    },
}