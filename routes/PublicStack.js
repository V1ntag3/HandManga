import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/Home'
import ListChaptersManga from '../views/ListChaptersManga'
import ReadManga from '../views/ReadManga'

const Stack = createNativeStackNavigator();


export default function PublicStack() {
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ListChaptersManga" component={ListChaptersManga} />
                <Stack.Screen name="ReadManga" component={ReadManga} />


            </Stack.Navigator>
        </NavigationContainer>

    );
}