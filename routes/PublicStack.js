import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../views/Home'
import ListChaptersManga from '../views/ListChaptersManga'
import ReadManga from '../views/ReadManga'
import Search from '../views/Search';
import Config from '../views/Config';

const Stack = createNativeStackNavigator();


export default function PublicStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen  name="Home" component={Home} />
                <Stack.Screen name="ListChaptersManga" component={ListChaptersManga} />
                <Stack.Screen name="ReadManga" component={ReadManga} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Config" component={Config} />


            </Stack.Navigator>
        </NavigationContainer>
    );
}