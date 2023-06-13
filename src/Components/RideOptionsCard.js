import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import tailwind from 'twrnc'
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { selectTeavelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const Surge_Charg_Rate = 2;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [Selected, setSelected] = useState(null);
  const travelTimeInfo = useSelector(selectTeavelTimeInformation);

  return (
    <SafeAreaView style={tailwind`bg-white flex-1`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tailwind`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon
            name='chevron-left'
            type='fontawesome'
            color='black'
          />
        </TouchableOpacity>
        <Text style={tailwind`text-black text-center py-5 text-xl`}>Select a ride - {travelTimeInfo?.distance?.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
            style={[tailwind`flex-row items-center justify-between px-10`, {
              backgroundColor: item.id === Selected?.id ? 'grey' : 'white'
              // ${item.id === Selected?.id && "bg-gray-200"}
            }]}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: item.image }}
            />
            <View>
              <Text style={tailwind`text-black font-semibold`}>{item.title}</Text>
              <Text style={tailwind`text-black`}>{travelTimeInfo?.duration?.text}</Text>
              <Text style={tailwind`text-black`}>Travel Time</Text>
            </View>
            <Text style={tailwind`text-black text-xl`}>
              {/* ₹999 */}
              {
                new Intl.NumberFormat('en-gb', {
                  style: 'currency',
                  currency: 'INR',
                }).format(
                  (travelTimeInfo?.duration?.value * Surge_Charg_Rate * item.multiplier) / 10
                )
              }

            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        disabled={!Selected}
        style={[tailwind`bg-black py-3 m-3`, {
          backgroundColor: !Selected ? 'grey' : 'black'
        }]}>
        <Text style={tailwind`text-white text-center text-xl`}>Choose {Selected?.title}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default RideOptionsCard