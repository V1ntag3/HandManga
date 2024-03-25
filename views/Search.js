
import * as React from 'react';
import { useState } from 'react';
import { Keyboard, View, FlatList, StyleSheet } from 'react-native';
import Globals from '../Globals';
import InputSearch from '../components/InputSearch'
import Api from '../Api';
import ItemCard from '../components/ItemCard'
import ImageText from '../components/ImageText';
import SearchImg from '../assets/imgs/SearchImg';
import NotFound from '../assets/imgs/NotFound';
import Menu from '../components/Menu'
import Logo from '../components/Logo';
import LogoAnimation from '../components/LogoAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation }) => {
    const [search, setSearch] = useState("")
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(32)
    const [total, setTotal] = useState(null)
    const [mangas, setMangas] = useState([])
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [language, setLanguage] = React.useState(null);

    const searchFunc = async () => {

        if (mangas.length !== total && (loading === false)) {
            setLoading(true)
            await Api.get("manga?limit=" + limit + "&offset=" + offset + "&availableTranslatedLanguage[]=" + language + "&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&title=" + search + "&includedTagsMode=AND&excludedTagsMode=OR").then((response) => {

                var array = response.data.data
                array.map(elem => {
                    elem.relationships.map(elem2 => {
                        if (elem2.type === "cover_art") {
                            elem.cover = 'https://mangadex.org/covers/' + elem.id + '/' + elem2.attributes.fileName
                        }
                    })
                })
                setOffset(offset + array.length)
                setSearched(true)
                setTotal(response.data.total)
                setMangas(mangas.concat(array))

            }).finally(() => {
                setLoading(false)
            })
        }

    }
    useState(()=>{
        AsyncStorage.getItem('languageManga').then((value) => {
            if (value != null) {
                setLanguage(value)
            } else {
                setLanguage('pt-br')
            }
        })
    },[])
    return (
        <View style={styles.body}>
            <Logo />
            <InputSearch onChange={(value) => {
                setSearch(value)
                setOffset(0)
                setTotal(null)
                setSearched(false)
                if (mangas.length > 0) {
                    setMangas([])
                }
                setLoading(false)
            }} value={search} placeholder={'Pesquise aqui o mangá'} func={() => {
                setOffset(0)
                setTotal(null)
                setSearched(false)
                setMangas([])
                setLoading(false)
                Keyboard.dismiss();
                searchFunc()
                
            }} />

            {
               loading && mangas.length === 0 ? <LogoAnimation /> :  (searched === false ? <ImageText Image={SearchImg} text="Fique a vontade para procurar um mangá" /> : (mangas.length > 0 ? ( <FlatList
                    disableVirtualization={false}
                    style={[styles.listScheduling, { height: Globals.HEIGHT, marginBottom: 58 }]}
                    data={mangas}
                    renderItem={({ item }) => <ItemCard navigation={navigation} item={item} />}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, i) => i}
                    onEndReached={() => { searchFunc() }}
                    onEndReachedThreshold={0.1}
                />) : <ImageText Image={NotFound} text="Não encontramos nenhum mangá com esse nome" />))
            }
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
    listScheduling: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10
    }
})