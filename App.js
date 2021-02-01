import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SongProvider } from './src/SongProvider';
import PlayerScreen from './src/PlayerScreen';


const App = () => {
  return (
    <SongProvider>
      <View>
        <PlayerScreen/>
      </View>
    </SongProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
