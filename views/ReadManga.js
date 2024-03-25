
import * as React from 'react';
import { useState } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Globals from '../Globals';
import PageFlipper from '../components/react-native-page-flipper';
import Api from '../Api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation, route }) => {
    const chapter = route.params;

    const [pages, setPages] = useState([])
    const [vizualization, setVizualization] = useState(false)
    const renderHeader = () => {
        return (
            <View style={styles.buttons2}>
                <TouchableOpacity onPress={async () => {
                    setVizualization(false)
                    await AsyncStorage.setItem(
                        'vizualization',
                        'false',
                    );
                }} style={[styles.button, { backgroundColor: !vizualization ? Globals.COLOR.LIGHT.COLOR2 : Globals.COLOR.LIGHT.COLOR4, }]}>
                    <Text style={styles.buttonText}>Vertical</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                    setVizualization(true)
                    await AsyncStorage.setItem(
                        'vizualization',
                        'true',
                    );
                }} style={[styles.button, { backgroundColor: vizualization ? Globals.COLOR.LIGHT.COLOR2 : Globals.COLOR.LIGHT.COLOR4 }]}>
                    <Text style={styles.buttonText}>Horizontal</Text>
                </TouchableOpacity>
            </View>)

    }
    const getPages = () => {
        Api.get("at-home/server/" + chapter.id).then((response) => {
            var array = []
            response.data.chapter.data.map((elem) => {
                array.push(response.data.baseUrl + '/data/' + response.data.chapter.hash + '/' + elem)
            })
            setPages(array)
        })
    }

    React.useEffect(() => {
        AsyncStorage.getItem('vizualization').then((value) => {
            if (value != null) {
                setVizualization(value === 'true' ? true : false)
            } else {
                setVizualization(false)
            }
            getPages()

        })
    }, [])

    return (
        <GestureHandlerRootView style={[styles.body, { backgroundColor: Globals.COLOR.LIGHT.COLOR5 }]}>
            <View style={styles.subBody}>
                <Logo />
                {pages.length > 0 && vizualization && <View style={{ width: '95%', height: 65, borderRadius: 13, backgroundColor: Globals.COLOR.LIGHT.COLOR2 }}>{renderHeader()}</View>}
                {pages.length > 0 && (vizualization ? <PageFlipper
                    data={pages}
                    enabled={true}
                    singleImageMode={true}
                    portrait={true}
                    pressable={true}
                    contentContainerStyle={{
                        width: '95%',
                        shadowColor: 'black',
                        shadowOffset: {
                            width: '100%',
                        },
                        shadowRadius: 1000,
                        elevation: 20,
                        shadowOpacity: 0.4
                    }}
                    renderPage={(data) => <Image source={{ uri: data }} style={{ height: '100%', width: '100%' }} />}

                /> : <FlatList
                    ListHeaderComponentStyle={styles.buttons}
                    ListHeaderComponent={renderHeader()}
                    data={pages}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                    keyExtractor={(item, i) => i}
                    contentContainerStyle={styles.imageContainer}
                />)

                }
            </View>
            <Menu navigation={navigation} />
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    subBody: {
        height: Globals.HEIGHT - 100,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    listScheduling: {
        width: '100%',
        flexDirection: 'column'
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: Globals.WIDTH,
        height: Globals.HEIGHT - 290,
        resizeMode: 'contain',
    },
    buttons: {
        display: 'flex',
        flex: 1,
        height: 65,
        width: '95%',
        backgroundColor: 'white',
        borderRadius: 13,
        marginBottom: 10,
        backgroundColor: Globals.COLOR.LIGHT.COLOR2
    },
    buttons2: {
        flexDirection: 'row',
        borderRadius: 13,
        marginBottom: 10,
        color: Globals.COLOR.LIGHT.COLOR2
    },
    button: {
        width: '50%',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: Globals.COLOR.LIGHT.COLOR3
    }
})