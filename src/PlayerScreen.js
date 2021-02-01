import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, ImageBackground, Image, TextTicker, ActivityIndicator, Dimensions } from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SongContext } from './SongProvider';


export default function PlayerScreen() {
    const data = useContext(SongContext)
    console.log("in Player Screen");
    console.log(data.song);
    const renderPlayPauseButton = () => {
        switch (data.isPlaying) {
            case "playing":
                return <MaterialIcons name="play-arrow" size={70} style={styles.icon} />
            case "pause":
                return <MaterialIcons name="pause" size={70} style={styles.icon} />
            default:
                return <ActivityIndicator size={70} color="#303030" />
        }
    };
    return (
        <ImageBackground source={{ uri: data.song.artwork }} style={styles.image}>
            <View style={styles.container}>

                <TouchableOpacity style={{ position: 'absolute', left: 20, top: 40 }} onPress={() => setReady(true)}>
                    <AntDesign name='down' size={30} color='white' />
                </TouchableOpacity>
                <View >
                    <View style={styles.artworkContainer}>
                        <Image
                            style={styles.artwork}
                            source={{ uri: data.Artwork }}
                        />
                        <View style={styles.titleParent}>
                            <TextTicker
                                style={styles.title}
                                duration={8000}
                                loop
                                bounce
                                repeatSpacer={100}
                                marqueeDelay={5000}
                            >
                                {data.Title}
                            </TextTicker>
                            <Text style={styles.artist}>{data.Artist}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.controllerParent}>
                    <View style={styles.controller}>
                        <TouchableOpacity >
                            <MaterialIcons name="shuffle" size={25} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={data.prevSong} >
                            <MaterialIcons name="skip-previous" size={40} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={data.playPauseSong}>
                            {renderPlayPauseButton()}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={data.nextSong}>
                            <MaterialIcons name="skip-next" size={40} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <MaterialIcons name="loop" size={25} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const { width, height } = Dimensions.get('window');
const bottomwidth = width / 8;

const styles = StyleSheet.create({
    bottomMusicPlayer: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: bottomwidth,
        flex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
    },
    musicImage: {
        width: 60,
        height: 60,
        margin: 10
    },
    musicCredits: {
        marginLeft: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    musicArtist: {
        color: '#ffffff90'
    },
    musicName: {
        color: 'white'
    },
    icon: {
        color: 'white'
    },
    musicController: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 10
    },
    bottomBar: {
        position: 'absolute',
        bottom: -height - bottomwidth,
        backgroundColor: 'red',
        width: width,
    },
    playerBar: {
        backgroundColor: 'red',
        height: height + bottomwidth,
        width: width,
        marginBottom: -bottomwidth
    },
    artworkContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 50
    },
    artwork: {
        width: 300,
        height: 300,
    },
    controllerParent: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    controller: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    container: {
        height: '100%',
        backgroundColor: '#00000090',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,

    },
    title: {
        marginTop: 20,
        fontSize: 25,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    titleParent: {
        width: 320,
    },
    artist: {
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#FFFFFF',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        padding: 0,
        marginTop: 20
    },
    timeContainerParent: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
        alignItems: 'center',
    },
    timers: {
        color: '#fff',
    },
    slider: {
        marginTop: 30
    },
})
