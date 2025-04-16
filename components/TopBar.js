// components/TopBar.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function TopBar() {
  return (
    <View style={styles.container}>
      {/* Left Spacer */}
      <View style={{ flex: 1 }} />

      {/* Centered Logo */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Right Spacer */}
      <View style={{ flex: 1 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  logo: {
    height: 50,
    resizeMode: 'contain',
  },
});
