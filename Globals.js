import { Dimensions } from "react-native";

export default {
    BASE_URL: 'https://api.mangadex.org/',
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    COLOR: {
        LIGHT: {
            COLOR1: '#24B385',
            COLOR2: '#00E69D',
            COLOR3: '#328067',
            COLOR4: '#2E4C43',
            COLOR5: '#293330'
        }
    },
    FONT_FAMILY: {
        ITALIC: 'DMSans-Italic',
        REGULAR: 'DMSans',
    },
    MONTH: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    COLOR_ERROR: '#FA0501',
    COLOR_PENDENCY: '#C42627',
    COLOR_NO_PENDENCY: '#2F80ED'

};