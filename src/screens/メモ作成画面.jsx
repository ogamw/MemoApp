import React from 'react';
import {
  View, StyleSheet, TextInput,
// KeyboardAvoidingView,
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';
import KeyboadSafeView from '../components/KeyboadSafeVie';

export default function メモ作成画面() {
  return (
    // <KeyboardAvoidingView style={styles.container} behavior="height">
    <KeyboadSafeView style={styles.container}>
      <AppBar />
      <View style={styles.inputContainer}>
        <TextInput value="買" multiline style={styles.input} />
      </View>
      <CircleButton name="check" />
    </KeyboadSafeView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});
