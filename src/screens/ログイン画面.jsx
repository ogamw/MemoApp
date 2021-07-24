import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
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

export default function ログイン画面(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  function handlePress() {
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      .then(() => {
        setLoading(false);
      });
  }

  function gestLogIn() {
    setLoading(true);
    firebase.auth().signInAnonymously()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MemoList' }],
        });
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
          {i18n.t('login.ログインタイトル')}
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
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {i18n.t('login.登録確認メッセージ')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>
              {i18n.t('login.サインアップ画面へ')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {i18n.t('login.お試し版の紹介')}
          </Text>
          <TouchableOpacity
            onPress={gestLogIn}
          >
            <Text style={styles.footerLink}>
              {i18n.t('login.匿名ログイン')}
            </Text>
          </TouchableOpacity>
        </View>
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
