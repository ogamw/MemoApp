import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function MemoList(){
  return (



    <View>
      <View style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2021年3月6日 10:00</Text>
        </View>
        <View>
          <Text>X</Text>
        </View>
      </View>

      <View style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2021年3月6日 10:00</Text>
        </View>
        <View>
          <Text>X</Text>
        </View>
      </View>

      <View style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListTitle}>買い物リスト</Text>
          <Text style={styles.memoListItemDate}>2021年3月6日 10:00</Text>
        </View>
        <View>
          <Text>X</Text>
        </View>
      </View>
    </View>
    );
  }
  
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
      // *memolists* //

  });