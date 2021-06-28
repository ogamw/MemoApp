import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';

import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import KeyboadSafeView from '../components/KeyboadSafeVie';
import Loading from '../components/Loading';

export default function メモ作成画面(props) {
  const { navigation } = props;
  const [bodyText, setBodyText] = useState('');
  const [isLoading, setLoading] = useState(false);

  function handlePress() {
    setLoading(true);
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`);
    ref.add({
      bodyText,
      updatedAt: new Date(),
    })
      .then((docRef) => {
        console.log('Created!', docRef.id);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error!', error);
      })
      .then(() => {
        setLoading(false);
      });
  }

  return (
    <KeyboadSafeView style={styles.container}>
      <View style={styles.inputContainer}>
        <Loading isLoading={isLoading} />
        <TextInput
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => { setBodyText(text); }}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
      />
    </KeyboadSafeView>
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
