import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import Globals from '../Globals'
import ES from '../assets/imgs/ES';
import CH from '../assets/imgs/CH';
import PTBR from '../assets/imgs/PTBR';
import JP from '../assets/imgs/JP';
import KR from '../assets/imgs/KR';
import EN from '../assets/imgs/EN';
import FR from '../assets/imgs/FR';
import ID from '../assets/imgs/ID';
import IT from '../assets/imgs/IT';
import RU from '../assets/imgs/RU';
import UK from '../assets/imgs/UK';
export default function ({ navigation, item }) {
    return <TouchableOpacity onPress={() => {
        navigation.navigate("ReadManga", item)

    }} style={styles.card}>
        {
            <><Text style={styles.text}>#{item.attributes.chapter}</Text>
                <View style={{ height: 20, width: 28 }}>
                    {
                        (item.attributes.translatedLanguage.includes("es")) && <ES />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("zh")) && <CH />
                    }
                    {
                        (item.attributes.translatedLanguage === "pt-br") && <PTBR />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("js")) && <JP />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("ko")) && <KR />
                    }
                    {
                        (item.attributes.translatedLanguage === "en") && <EN />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("it")) && <IT />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("id")) && <ID />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("fr")) && <FR />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("ru")) && <RU />
                    }
                    {
                        (item.attributes.translatedLanguage.includes("uk")) && <UK />
                    }
                </View>

            </>

        }

    </TouchableOpacity>
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: Globals.COLOR.LIGHT.COLOR1,
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 0.49,
        maxWidth: "49%",
        flexDirection: 'row',
        justifyContent: "space-between"

    },
    text: {
        color: 'white'
    },
})