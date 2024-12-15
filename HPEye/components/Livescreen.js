import React, { useState, useCallback, useEffect, useRef  } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const LiveScreen = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const hasMediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    return <View style={styles.text1}><Text style={{fontSize: 20 }}>Đang gửi yêu cầu...</Text></View>
  } else if (!hasCameraPermission) {
    return <View style={styles.text1}><Text style={{fontSize: 20 }}>Không thể truy cập vào camera</Text></View>
  }
  
  let recordVideo = async () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      mute: true,
    };
    cameraRef.current.recordAsync(options).then((recordVideo) => {
      setVideo(recordVideo);
      setIsRecording(false);
    });
  };

  let stopRecording = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  }



  if (video) {
    let shareVideo = async() => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    }

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() =>{
        setVideo(undefined);
      });
    };

    return(
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode="contain"
          isLooping
        /> 
        <Button title="Share" onPress={shareVideo}/>
        {hasMediaLibraryPermission ? <Button title="Save" onPress={() => {}} /> : undefined} 
        <Button title="Discard" onPress={() => setVideo(undefined)}/>
      </SafeAreaView>
    )
  }

  return (
      <Camera style={styles.container} 
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          
          <Button title={isRecording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} />
        </View>
      </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontSize: 18,
  },
});



export default LiveScreen;