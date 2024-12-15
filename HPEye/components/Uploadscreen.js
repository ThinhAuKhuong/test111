import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';

const UploadScreen = () => (
    <View style={styles.screen}>
        <Text>Upload Page</Text>
    </View>
);

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff", // Thay đổi màu nền nếu cần
    },
  });

export default UploadScreen;