// WelcomeScreen.tsx
import React from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';

function WelcomeScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.welcomeContainer}>
      <Image source={require('../assets/images/vurimi_ai.png')} style={styles.welcomeImage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#ffffff',
  },
  welcomeImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make it round
    borderWidth: 2,
    borderColor: '#ccc',
  },
});

export default WelcomeScreen;
