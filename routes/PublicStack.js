import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importe suas telas
import Home from '../views/Home';
import ListChaptersManga from '../views/ListChaptersManga';
import ReadManga from '../views/ReadManga';
import Search from '../views/Search';
import Config from '../views/Config';
import FilterChapters from '../components/FilterChapters';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ListChaptersManga" component={ListChaptersManga} />
      <Stack.Screen name="Config" component={Config} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function AppDrawer({ navigation, route }) {
  return (
    <Drawer.Navigator drawerContent={() => { return (<FilterChapters navigation={navigation} mangaData={route.params} />) }} screenOptions={{ headerShown: false, drawerPosition: 'right' }}>
      <Drawer.Screen name="ReadManga" component={ReadManga} initialParams={route.params} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppStack" component={AppStack} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
