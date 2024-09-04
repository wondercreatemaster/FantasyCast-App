import { StyleSheet, Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import { IconButton } from "react-native-paper";

const SoundPlayer = ({ sound }) => {
    return (
        <View
            className="rounded-2xl p-4 border-2 border-[#606074] text-[#606074]"
            style={styles.container}
        >
            <IconButton icon="play" size={20} iconColor="#1976D2" style={{ marginHorizontal: -10 }} />
            <View className="w-[50%]">
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#1976D2"
                    maximumTrackTintColor="#606074"
                    thumbTintColor="#1976D2"
                    value={50}
                    style={styles.slider}
                />
            </View>
            <Text style={{ width: "30%" }}>0:00 / 0:02</Text>
            <IconButton icon="volume-high" size={20} iconColor="#606074" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        height: 60,
        justifyContent: "space-between"
    },
    slider: {
        width: "100%"
    }
})

export default SoundPlayer;