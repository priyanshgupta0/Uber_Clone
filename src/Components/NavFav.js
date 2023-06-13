import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, ScrollView, Text, Button, StyleSheet, ActivityIndicator, Dimensions, Switch, TextInput, SafeAreaView, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Icon } from '@rneui/themed';
import tailwind from 'twrnc';

const data = [
    {
        id: '123',
        icon: 'home',
        location: "Home",
        destination: "Swastik Nagar, Indore, MP"
    },
    {
        id: '245',
        icon: 'briefcase',
        location: "Work",
        destination: "AITR, Mangliya"
    }
];

const NavFav = () => {

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (<View
                style={{ height: 0.5, width: "100%", backgroundColor: 'black' }}
            />
            )}
            renderItem={({ item: { location, destination, icon } }) => (
                <TouchableOpacity style={tailwind`flex-row items-center p-5`}>
                    <Icon
                        style={tailwind`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        type='ionicon'
                        color='white'
                        size={18}
                    />
                    <View>
                        <Text style={tailwind`font-semibold text-lg text-black`}>{location}</Text>
                        <Text style={tailwind`text-gray-500`}>{destination}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};


export default NavFav;