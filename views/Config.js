
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globals from '../Globals';
import Menu from '../components/Menu';
import Logo from '../components/Logo';
import { SelectList } from 'react-native-dropdown-select-list'
import ArrowDown from '../assets/imgs/ArrowDown';
import SearchIcon from '../assets/imgs/SearchIcon';
import Close from '../assets/imgs/Close';
import ButtonVizualization from '../components/ButtonVizualization';

export default ({ navigation }) => {
    const [language, setLanguage] = React.useState(null);
    const [defaultItem, setDefault] = React.useState(null);
    const [vizualization, setVizualization] = React.useState(false)

    const data = [
        { key: ' ', value: 'Todos', },
        { key: 'pt-br', value: 'Português Brasileiro', },
        { key: 'en', value: 'Inglês', },
        { key: 'es', value: 'Espanhol', },
        { key: 'es-la', value: 'Espanhol Latino', },
        { key: 'ja', value: 'Japonês', },
        { key: 'fr', value: 'Francês', },
        { key: 'ko', value: 'Coreano', },

    ]

    React.useEffect(() => {
        AsyncStorage.getItem('vizualization').then((value) => {
            if (value != null) {
                setVizualization(value === 'true' ? true : false)
            } else {
                setVizualization(false)
            }
        })
    }, [])

    React.useEffect(() => {
        AsyncStorage.getItem('languageManga').then((value) => {
            if (value !== null) {
                var find = data.find((elem) => {
                    return elem.key === value
                })
                setDefault(find)
                setLanguage(value)
            } else if (value === null) {
                setDefault(data[0])
                setLanguage(data[0])
            } else {
                setDefault(data[1])
                setLanguage(data[1])
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

                <ButtonVizualization vizualization={vizualization} setVizualization={setVizualization} />

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
    subContainer: {
        alignItems: 'center',
        width: '100%'

    },
    input: {
        color: 'white',
        width: '95%',
        borderColor: 'white',
        backgroundColor: Globals.COLOR.LIGHT.COLOR2,
        // height:47
    },
    label: {
        color: 'white',
        textAlign: 'left',
        width: '95%',
        fontWeight: '800',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 3
    }
})