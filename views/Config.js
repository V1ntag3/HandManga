import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globals from '../Globals';
import Logo from '../components/Logo';
import { SelectList } from 'react-native-dropdown-select-list';
import ArrowDown from '../assets/imgs/ArrowDown';
import SearchIcon from '../assets/imgs/SearchIcon';
import Close from '../assets/imgs/Close';
import ButtonVizualization from '../components/ButtonVizualization';

export default ({ navigation }) => {
    const [language, setLanguage] = useState(null);
    const [defaultItem, setDefaultItem] = useState(null);
    const [vizualization, setVizualization] = useState(false);

    const data = [
        { key: ' ', value: 'Todos' },
        { key: 'pt-br', value: 'Português Brasileiro' },
        { key: 'en', value: 'Inglês' },
        { key: 'es', value: 'Espanhol' },
        { key: 'es-la', value: 'Espanhol Latino' },
        { key: 'ja', value: 'Japonês' },
        { key: 'fr', value: 'Francês' },
        { key: 'ko', value: 'Coreano' },
    ];

    useEffect(() => {
        const loadVizualization = async () => {
            const value = await AsyncStorage.getItem('vizualization');
            setVizualization(value === 'true');
        };
        loadVizualization();
    }, []);

    useEffect(() => {
        const loadLanguage = async () => {
            const value = await AsyncStorage.getItem('languageManga');
            const find = data.find((elem) => elem.key === value) || data[1];
            setDefaultItem(find);
            setLanguage(find.key);
        };
        loadLanguage();
    }, []);

    const handleLanguageChange = async (val) => {
        await AsyncStorage.setItem('languageManga', val);
        setLanguage(val);
        // navigation.reset({
        //     routes: [{ name: 'Config' }],
        // });
    };

    return (
        <View style={styles.body}>
            <Logo />
            <View style={styles.subContainer}>
                <Text style={styles.label}>Linguagem</Text>
                <SelectList
                    notFoundText="Não encontramos"
                    defaultOption={defaultItem}
                    placeholder="Selecione uma opção"
                    searchPlaceholder="Pesquise aqui"
                    setSelected={handleLanguageChange}
                    data={data}
                    save="key"
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
                <ButtonVizualization
                    vizualization={vizualization}
                    setVizualization={setVizualization}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Globals.COLOR.LIGHT.COLOR5,
        paddingVertical: 15,
        position: 'relative',
        paddingTop: 0,
    },
    subContainer: {
        alignItems: 'center',
        width: '100%',
    },
    input: {
        color: 'white',
        width: '95%',
        borderColor: 'white',
        backgroundColor: Globals.COLOR.LIGHT.COLOR2,
    },
    label: {
        color: 'white',
        textAlign: 'left',
        width: '95%',
        fontWeight: '800',
        fontSize: 13,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 3,
    },
});
