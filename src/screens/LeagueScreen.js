import { Image, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import backgroundImage from '../assets/images/bg.jpg';
import logoImage from '../assets/images/logo.png'
import { useState } from 'react';


const LeagueScreen = ({ navigation }) => {
    3
    const [search, setSearch] = useState('');

    return (
        <ImageBackground source={backgroundImage} style={styles.image}>
            <View style={styles.container}>
                <Image source={logoImage} style={styles.logo} />
                <View style={styles.tableBg}>
                    <Text style={styles.title}>
                        Your Leagues
                    </Text>
                    <View style={styles.table}>
                        <TextInput
                            placeholder="Search..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.input}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    tableBg: {
        display: "flex",
        gap: 5,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 15,
        marginTop: 30
    },
    table: {
        backgroundColor: "white",
        padding: 15
    },
    logo: {
        width: "20%",
        height: "8%",
        resizeMode: "contain"
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    title: {
        marginTop: 20,
        backgroundColor: 'rgb(73, 163, 241)',
        padding: 10,
        color: "white",
        fontSize: 30,
        borderRadius: 10,
        width: "90%",
        textAlign: "center",
        alignSelf: "center",
        marginTop: -40
    },
    form: {
        display: "flex",
        gap: 10,
        padding: 15,
        backgroundColor: 'rgba(35, 43, 85, .75)',
        borderRadius: 5,
        borderTopColor: "rgba(255,255,255,.5)",
        borderTopWidth: 1
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LeagueScreen;