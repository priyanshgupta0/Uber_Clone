import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import Map from '../Components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../Components/NavigateCard'
import RideOptionsCard from '../Components/RideOptionsCard'
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'


const MapScreen = () => {

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Homescreen")}
                style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                <Icon
                    name='chevron-left'
                    type='fontawesome'
                    color='black'
                />
            </TouchableOpacity>
            <View style={tailwind`h-1/2`}>
                <Map />
            </View>
            <View style={tailwind`h-1/2 bg-blue-300`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen;