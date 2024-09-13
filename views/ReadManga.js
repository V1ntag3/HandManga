
import * as React from 'react';
import { useState } from 'react';
import { View, Image, FlatList,Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Globals from '../Globals';
import PageFlipper from '../components/react-native-page-flipper';
import Api from '../Api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Logo from '../components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonVizualization from '../components/ButtonVizualization';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import LogoAnimationBig from '../components/LogoAnimationBig';
import { Zoomable } from '@likashefqet/react-native-image-zoom';
export default ({ navigation, route }) => {
    const chapter = route.params;
    const [pages, setPages] = useState([])
    const [vizualization, setVizualization] = useState(false)
    const [imageDimensions, setImageDimensions] = useState({});

    const onImageLoad = (width, height, index) => {
      const screenWidth = Dimensions.get('window').width;
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImageDimensions((prevState) => ({
        ...prevState,
        [index]: imageHeight, // Salva a altura da imagem específica
      }));
    };
    const getPages = async () => {
        setPages([])
        await Api.get("at-home/server/" + chapter.id).then((response) => {
            var array = []
            response.data.chapter.data.map((elem) => {
                array.push(response.data.baseUrl + '/data/' + response.data.chapter.hash + '/' + elem)
            })
            setPages(array)
        })
    }

    React.useEffect(() => {
        getPages()
    }, [chapter]);

    React.useEffect(() => {
        AsyncStorage.getItem('vizualization').then((value) => {
            setVizualization(value === 'true')
        })
    }, [navigation])


    return (
        <GestureHandlerRootView style={[styles.body, { backgroundColor: Globals.COLOR.LIGHT.COLOR5 }]}>
            <View style={styles.subBody}>
                <Text style={styles.textChapter}> {chapter.attributes.chapter != "" && chapter.attributes.chapter != "" && "#"}{chapter.attributes.chapter}</Text>
                <TouchableOpacity onPress={() => {
                    navigation.openDrawer()
                }} style={styles.filterIcon}>
                    <FontAwesomeIcon icon={faFilter} size={25} color={'white'} />
                </TouchableOpacity>

                <Logo />
                {pages.length > 0 && vizualization && <ButtonVizualization vizualization={vizualization} setVizualization={setVizualization} />}
                {pages.length > 0 ? (vizualization ? <PageFlipper
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

                /> : <Zoomable isDoubleTapEnabled={true}><FlatList
                    ListHeaderComponentStyle={styles.buttons}
                    ListHeaderComponent={<ButtonVizualization vizualization={vizualization} setVizualization={setVizualization} />}
                    data={pages}
                    renderItem={({ item, index }) => (
                        <Image  source={{ uri: item, cache:'force-cache'}}
                        style={[
                          styles.image,
                          { height: imageDimensions[index] }, // Altura padrão até carregar
                        ]}
                        resizeMode="contain"
                        onLoad={(e) =>
                          onImageLoad(e.nativeEvent.source.width, e.nativeEvent.source.height, index)
                        } />
                    )}
                    keyExtractor={(item, i) => i}
                    contentContainerStyle={styles.imageContainer}
                /></Zoomable> ) : <LogoAnimationBig />

                }
            </View>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingTop:20
    },
    subBody: {
        height: Globals.HEIGHT - 75,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    imageContainer: {
        alignItems: 'center',
        paddingBottom:20
    },
    image: {
        width: Globals.WIDTH,
    },
    buttons: {
        borderRadius: 13,
        marginBottom: 10,
        alignItems: 'center'
    },
    textChapter: {
        color: "white",
        position: 'absolute',
        top: 10,
        left: '2.5%',
        fontSize: 18,
        fontWeight: '900'
    },
    filterIcon: {
        position: 'absolute',
        top: 10,
        right: '2.5%',
        fontWeight: '900'
    }
})