
import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globals from '../Globals';
import Menu from '../components/Menu';
import Logo from '../components/Logo';
import { SelectList } from 'react-native-dropdown-select-list'
import ArrowDown from '../assets/imgs/ArrowDown';
import SearchIcon from '../assets/imgs/SearchIcon';
import Close from '../assets/imgs/Close';

export default ({ navigation }) => {
    const [language, setLanguage] = React.useState(null);
    const [defaultItem, setDefault] = React.useState(null);
    const [vizualization, setVizualization] = React.useState(false)

    const data = [
        { key: 'pt-br', value: 'Português Brasileiro', },
        { key: 'en', value: 'Inglês', },
        { key: 'es', value: 'Espanhol', },
    ]
    const renderHeader = () => {
        return (
            <View style={{ width: '95%', height: 65, borderRadius: 13, backgroundColor: Globals.COLOR.LIGHT.COLOR2 }}>
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
                </View>
            </View>
        )

    }
    React.useEffect(() => {
        AsyncStorage.getItem('vizualization').then((value) => {
            console.log(value)
            if (value != null) {
                setVizualization(value === 'true' ? true : false)
            } else {
                setVizualization(false)
            }
        })
    }, [])

    React.useEffect(() => {
        AsyncStorage.getItem('languageManga').then((value) => {
            if (value != null) {
                var find = data.find((elem) => {
                    return elem.key === value
                })
                setDefault(find)
                setLanguage(value)
            } else {
                setDefault(data[0])
                setLanguage(data[0])
            }
        })
    }, [language])
    return (
        <View
            style={styles.body}
        >
            <Logo />
            <View style={styles.subContainer}>
                <Text style={styles.label}>Linguagem</Text>
                <SelectList
                    notFoundText="Não encontramos"
                    defaultOption={defaultItem}
                    placeholder='Selecione uma opção'
                    searchPlaceholder='Pesquise aqui'
                    setSelected={async (val) => {
                        console.log(val)
                        await AsyncStorage.setItem(
                            'languageManga',
                            val,
                        );
                        setLanguage(val)
                    }}
                    data={data}
                    save="name"

                    arrowicon={<ArrowDown />}
                    searchicon={<SearchIcon />}
                    closeicon={<Close />}

                    dropdownTextStyles={{ color: 'white' }}
                    dropdownItemStyles={[{ width: Globals.WIDTH * 0.95 }]}
                    inputStyles={styles.input}
                    dropdownStyles={styles.input}
                    boxStyles={styles.input}
                />
                <Text style={styles.label}>Vizualização</Text>

                {
                    renderHeader()
                }

            </View>
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
        position: 'relative'
    },
    logo: {
        color: Globals.COLOR.LIGHT.COLOR2,
        fontFamily: 'OceanRush',
        fontSize: 60
    },
    subContainer: {
        alignItems: 'center',
        width: '100%'

    },
    input: {
        color: 'white',
        width: '95%',
        borderColor: 'white',
        backgroundColor: Globals.COLOR.LIGHT.COLOR1
    },
    label: {
        color: 'white',
        textAlign: 'left',
        width: '95%',
        fontWeight: '800',
        fontSize: 13,
        marginTop:10,
        marginBottom: 5,
        marginLeft: 3
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