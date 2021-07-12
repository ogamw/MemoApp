import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import firebase from 'firebase';

import メモリスト画面 from './src/screens/メモリスト画面';
import メモ詳細画面 from './src/screens/メモ詳細画面';
import メモ編集画面 from './src/screens/メモ編集画面';
import メモ作成画面 from './src/screens/メモ作成画面';
import ログイン画面 from './src/screens/ログイン画面';
import サインアップ画面 from './src/screens/サインアップ画面';

import { firebaseConfig } from './env';

require('firebase/firestore');

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      /* eslint no-empty: "error" */
      if (status === 'granted') {
        // empty
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          headerStyle: { backgroundColor: '#467Fd3' },
          headerTitleStyle: { color: '#ffffff' },
          headerTitle: 'Memo App',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="MemoList" component={メモリスト画面} />
        <Stack.Screen name="MemoDetail" component={メモ詳細画面} />
        <Stack.Screen name="MemoEdit" component={メモ編集画面} />
        <Stack.Screen name="MemoCreate" component={メモ作成画面} />
        <Stack.Screen
          name="LogIn"
          component={ログイン画面}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={サインアップ画面}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
