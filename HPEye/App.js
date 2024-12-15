import React from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeIcon from './assets/home.png';
import LiveIcon from './assets/live.png';
import UploadIcon from './assets/upload.png';
import LiveScreen from './components/Livescreen.js'
import UploadScreen from './components/Uploadscreen.js';
import MainScreen from './components/Mainscreen.js';




const Tab = createBottomTabNavigator();


export default function App() {
  return (
        <NavigationContainer screenOptions={{
          tabBarStyle: {
            height: 60, // Adjusted height of the tab bar
            paddingBottom: 10, // Added space at the bottom
            paddingTop: 5, // Added space at the top
            backgroundColor: '#ff6347', // Background color of the tab bar
          },
          tabBarLabelStyle: {
            fontSize: 14, // Increased font size for labels
            marginBottom: 5, // Added spacing below the label
          },
          tabBarIconStyle: {
            marginTop: 5, // Added spacing above the icon
          },
        }}>
{/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/}
                <Tab.Navigator screenOptions={{headerShown: false}}>

                  <Tab.Screen name="Home" component={MainScreen} options={{
                    tabBarIcon: ( { focused } ) => (
                      <Image source={HomeIcon} style={[ styles.icon, { tintColor: focused ? 'rgb(0, 122, 255)' : 'gray' } ]} />   // Đổi màu dựa trên trạng thái 
                    )
                  }}/>

                  {/*------------------------------------------------------------------------------------------------------------------------------------------------*/}

                  <Tab.Screen name="Live" component={LiveScreen} options={{
                    tabBarIcon: ( { focused } ) => (
                      <Image source={LiveIcon} style={[ styles.iconLive, { tintColor: focused ? 'rgb(0, 122, 255)' : 'gray' } ]} />    // Đổi màu dựa trên trạng thái
                    )
                  }}/>
                  {/*------------------------------------------------------------------------------------------------------------------------------------------------*/}

                  <Tab.Screen name="Upload" component={UploadScreen} options={{
                    tabBarIcon: ( { focused } ) => (
                      <Image source={UploadIcon} style={[ styles.icon, { tintColor: focused ? 'rgb(0, 122, 255)' : 'gray' } ]} />   // Đổi màu dựa trên trạng thái
                    )
                  }}/>

                </Tab.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    flex:1,
    width:25,
    height:30,
    marginBottom: 5,
    resizeMode: "stretch",
  },
  iconLive: {
    flex:1,
    width:32,
    height: 5,
    marginBottom: 1,
    resizeMode: "stretch",
  },
  
});