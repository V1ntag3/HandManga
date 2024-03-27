
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Globals from '../Globals';
import Menu from '../components/Menu';
export default ({ navigation }) => {

    return (
        <View
            style={styles.body}
        >
            <Text style={styles.logo}>HandManga</Text>
            <Menu navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Globals.COLOR.LIGHT.COLOR5,
        paddingVertical: 15,
        position: 'relative'
    },
    logo: {
        color: Globals.COLOR.LIGHT.COLOR2,
        fontFamily: 'OceanRush',
        fontSize: 60
    },
})