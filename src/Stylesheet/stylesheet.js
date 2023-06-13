import { StyleSheet, Dimensions } from 'react-native';

let mobileW = Dimensions.get('window').width;
const mobileh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;