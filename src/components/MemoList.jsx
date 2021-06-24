import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
// useNavigationを参照→https://reactnavigation.org/docs/use-navigation/
import { useNavigation } from '@react-navigation/native';
import {
  shape, string, instanceOf, arrayOf,
} from 'prop-types';

export default function MemoList(props) {
  const { memos } = props;
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail'); }}
      >
        <View>
          <Text style={styles.memoListTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{String(item.updatedAt)}</Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { Alert.alert('Are you sure?'); }}
        >
          <Feather name="x" size={16} color="#B0B0B0" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

MemoList.propTypes = {
  memos: arrayOf(shape({
    id: string,
    bodyText: string,
    apdatedAt: instanceOf(Date),
  })).isRequired,
};

const styles = StyleSheet.create({
  // *memolists* //
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // 垂直方向の内側の余白 paddingVertical
    paddingVertical: 16,
    // 水平方向の内側の余白 paddingHorizontal
    paddingHorizontal: 19,
    // xボタンを水平にする
    alignItems: 'center',
    // ボーダー
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
  // *memolists* //
});
