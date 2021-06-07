import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import メモリスト画面 from './src/screens/メモリスト画面';
import メモ詳細画面 from './src/screens/メモ詳細画面';
import メモ編集画面 from './src/screens/メモ編集画面';
import メモ作成画面 from './src/screens/メモ作成画面';
import ログイン画面 from './src/screens/ログイン画面';
import サインアップ画面 from './src/screens/サインアップ画面';

const Stack = createStackNavigator();

export default function App() {
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
        }}
      >
        <Stack.Screen name="MemoList" component={メモリスト画面} />
        <Stack.Screen name="MemoDetail" component={メモ詳細画面} />
        <Stack.Screen name="MemoEdit" component={メモ編集画面} />
        <Stack.Screen name="MemoCreate" component={メモ作成画面} />
        <Stack.Screen name="LogIn" component={ログイン画面} />
        <Stack.Screen name="signUp" component={サインアップ画面} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
