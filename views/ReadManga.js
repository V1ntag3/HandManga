
import * as React from 'react';
import { useState } from 'react';
import { View, Image } from 'react-native';
import Globals from '../Globals';
import PageFlipper from '../components/react-native-page-flipper';
import Api from '../Api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Logo from '../components/Logo';
import Menu from '../components/Menu';
export default ({ navigation, route }) => {
    const chapter = route.params;

    const [pages, setPages] = useState([])


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
        getPages()
    }, [])
    return (
        <GestureHandlerRootView style={[styles.body, { backgroundColor: Globals.COLOR.LIGHT.COLOR5 }]}>
            <View style={styles.body}>
                <Logo />

                {pages.length > 0 && <PageFlipper
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

                />}
            </View>
            <Menu navigation={navigation} />
        </GestureHandlerRootView>
    );
}


const styles = {
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
}