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

import Button from '../components/Button';
import Loading from '../components/Loading';
import { translateErrors } from '../utils';

i18n.translations = {
  ja: {
    ログインタイトル: 'ログイン', 登録確認メッセージ: 'はじめての方はこちら', サインアップ画面へ: 'データ登録', お試し版の紹介: '登録をせずにログインしますか？', 匿名ログイン: 'ゲストとしてログイン',
  },
  en: {
    ログインタイトル: 'Log In', 登録確認メッセージ: 'Not registred?', サインアップ画面へ: 'Sign Up here!', お試し版の紹介: 'Log in as the', 匿名ログイン: 'Guest user.',
  },
};
// アプリの最初に一度地域設定する。
i18n.locale = Localization.locate;
// 言語に値がない場合、キーが存在する別の言語に処理する。
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
          {i18n.t('ログインタイトル')}
        </Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => { setEmail(text); }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Adress"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => { setPassword(text); }}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {i18n.t('登録確認メッセージ')}
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
              {i18n.t('サインアップ画面へ')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {i18n.t('お試し版の紹介')}
          </Text>
          <TouchableOpacity
            onPress={gestLogIn}
          >
            <Text style={styles.footerLink}>
              {i18n.t('匿名ログイン')}
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
    // 横並びにする
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
