
import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Globals from '../Globals';

export default ({ text, Image, style }) => {

    return (
        <><Image style={styles.image} /><Text style={styles.text}>{text}</Text></>
    );
}


const styles = StyleSheet.create({

    image: {
        width: '95%',
        height: 400,
        marginTop:60
    },
    text: {
        width: '95%',
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
        color: Globals.COLOR.LIGHT.COLOR2
    },
})