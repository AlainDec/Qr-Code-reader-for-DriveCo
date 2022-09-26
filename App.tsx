import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import Scan from './src/screens/Scan';
import { LogBox } from 'react-native';

// Ignorer les notifications de log
LogBox.ignoreAllLogs();

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerButton}>
        <Scan />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
  },
  containerButton: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sizeLogo: {
    marginTop: 10,
    width: '60%',
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  }
});

export default App;
