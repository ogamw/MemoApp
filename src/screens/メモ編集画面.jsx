import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  View, StyleSheet, TextInput,
// KeyboardAvoidingView,
} from 'react-native';

import CircleButton from '../components/CircleButton';
import KeyboadSafeView from '../components/KeyboadSafeVie';

export default function メモ編集画面() {
  return (
    // <KeyboardAvoidingView style={styles.container} behavior="height">
    <KeyboadSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput value="買い物リスト" multiline style={styles.input} />
      </View>
      <CircleButton
        name="check"
        onPress={() => { NavigationContainer.goback(); }}
      />
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
