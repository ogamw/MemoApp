import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import firebase from 'firebase';
import ja from '../locales/ja.json';
import en from '../locales/en.json';

import Button from '../components/Button';
import Loading from '../components/Loading';
import { translateErrors } from '../utils';

i18n.translations = {
  ja,
  en,
};

i18n.locale = Localization.locate;

i18n.fallbacks = true;

export default function アカウント変換画面(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  function handlePress() {
    setLoading(true);
    const { currentUser } = firebase.auth();
    if (!currentUser) { return; }
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    currentUser.linkWithCredential(credential)
      .then(() => {
        Alert.alert('登録完了', '登録したメールアドレスとパスワードは大切に保管してください。', [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({ index: 0, routes: [{ name: 'MemoList' }] });
            },
          },
        ]);
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      .then(() => {
        setLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>
          {i18n.t('signup.サインアップタイトル')}
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="メールアドレス"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          placeholder="パスワード"
          secureTextEntry
          textContentType="password"
        />
        <Button
          label="送信する"
          onPress={handlePress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3',
  },
});
