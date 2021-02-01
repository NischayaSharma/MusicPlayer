import React, {useState, useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';

const SongContext = React.createContext();

const SongProvider = (props) => {
    const [song, setSong] = useState({});
    const[started,setStarted]=useState(false)
    const myEffect = async () => {
        if(started===false){
            const response = await fetch('http://127.0.0.1:5000/getAllSongs');
            var data = await response.json();
            console.warn("In Track Player");
            console.log(data);
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                // stopWithApp: false,
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
                ],
                compactCapabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
                ],
            });
            await TrackPlayer.add(data);
            await TrackPlayer.play();
            currentSong();
            setStarted(true)
        }
        
    }
    useEffect(() =>  {
        myEffect();
    });

    const isPlaying = async () => {
        const currentState = await TrackPlayer.getState()
        return currentState === TrackPlayer.STATE_PLAYING
    }

    const playPauseSong = () => {
        if (isPlaying()){
            pauseSong()
        } else {
            playSong()
        }
    }

    const playSong = () => {
        TrackPlayer.play()
        currentSong()
    }

    const pauseSong = () => {
        TrackPlayer.pause()
        currentSong()
    }

    const nextSong = () => {
        TrackPlayer.skipToNext()
        currentSong()
    }

    const prevSong = () => {
        TrackPlayer.skipToPrevious()
        currentSong()
    }

    const currentSong = async () => {
        var trackId = await TrackPlayer.getCurrentTrack();
        var trackObject = await TrackPlayer.getTrack(trackId);
        setSong(trackObject);
        // console.log(song);
    }
    
    return (
        <SongContext.Provider
            value={{
                song,
                isPlaying,
                playPauseSong,
                nextSong,
                prevSong,
            }}
        >
            {props.children}
        </SongContext.Provider>
    );
}

export {SongContext, SongProvider}