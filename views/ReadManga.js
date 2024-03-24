
import * as React from 'react';
import { useState } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import Globals from '../Globals';
import PageFlipper from '../components/react-native-page-flipper';
import Api from '../Api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
export default ({ navigation, route }) => {
    const chapter = route.params;

    const [pages, setPages] = useState([])
    const [render, setRender] = useState(false)


    const getPages = () => {

        Api.get("at-home/server/" + chapter.id).then((response) => {
            console.log(response.data.chapter)
            var array = []
            response.data.chapter.data.map((elem) => {
                array.push(response.data.baseUrl + '/data/' + response.data.chapter.hash + '/' + elem)
            })

            console.log(array)

            setPages(array)
        })
    }

    React.useEffect(() => {
        getPages()
    }, [])
    return (
        <GestureHandlerRootView style={styles.body}>
            <View style={styles.body}>
                {pages.length > 0 && <PageFlipper
                    data={pages}
                

                    enabled={true}
                    singleImageMode={true}
                    portrait={true}
                    pressable={true}
                    contentContainerStyle={{

                        width:'100%',
                        borderWidth: 3,
                        borderColor: "black",
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    renderPage={(data) => <Image source={{ uri: data }} style={{ height: '100%', width: '100%' }} />}

                />}
            </View>

        </GestureHandlerRootView>
    );
}


const styles = {
    body: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        width: '100%'
        , borderWidth: 4, borderColor: "black"

    },

    listScheduling: {
        width: '95%',
        backgroundColor: 'transparent',
        marginTop: 10,
    },
}