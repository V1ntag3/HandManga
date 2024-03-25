import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Globals from '../Globals';
import * as Animatable from 'react-native-animatable';

export default () => {
    const logoName = ['H', 'a', 'n', 'd', 'M', 'a', 'n', 'g', 'a'];
    const [animationComplete, setAnimationComplete] = useState(true);

    const handleAnimationEnd = () => {
        setTimeout(() => {
            setAnimationComplete(false)
        }, 300);
        setTimeout(() => {
            setAnimationComplete(true)
        }, 600);
    };

    return (
        <View style={{ flexDirection: 'row', marginTop:120 }}>
            {animationComplete && logoName.map((elem, i) => (
                <Animatable.Text
                    key={i}
                    delay={100 * i}
                    useNativeDriver={true}
                    animation='fadeInLeft'
                    duration={600}
                    style={styles.logo}
                    onAnimationEnd={i === logoName.length - 1 ? handleAnimationEnd : undefined}
                >
                    {elem}
                </Animatable.Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        color: Globals.COLOR.LIGHT.COLOR2,
        fontFamily: 'OceanRush',
        fontSize: 30
    },
});
