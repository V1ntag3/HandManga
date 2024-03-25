
import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import Globals from '../Globals';

export default function () {
    return (
        <Text style={styles.logo}>HandManga</Text>
    );
}

const styles = StyleSheet.create({
    logo: {
        color: Globals.COLOR.LIGHT.COLOR2,
        fontFamily: 'OceanRush',
        fontSize: 30
    },
})