import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "react-native-vector-icons"
import Slider from '@react-native-community/slider';

const SoundPlayer = ({ sound }) => {
    return (
        <View style={styles.container}>
            <AntDesign name="play" size={20} color="#e75480" />
            <Text>0:00 / 0:02</Text>
            <Slider
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#e75480"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#e75480"
                value={0}
                style={styles.slider}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        margin: 10,
        borderRadius: 25,
        padding: 15,
        width: "auto",
        alignItems: "center",
        gap: 15,
        flexDirection: "row",
        backgroundColor: '#ddffee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    slider: {
        width: "auto"
    }
})

export default SoundPlayer;