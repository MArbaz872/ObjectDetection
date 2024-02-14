import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import { loadTensorflowModel } from 'react-native-fast-tflite';

const App = () => {
  const load = async () => {
    // const model = await loadTensorflowModel('https://tfhub.dev/google/lite-model/object_detection_v1.tflite')
    // const model = await loadTensorflowModel({url:'https://tfhub.dev/google/lite-model/object_detection_v1.tflite'})
    const model = await loadTensorflowModel(require('./assets/redbull-weights-ir.tflite'))
    //  console.log(model,"--- model");
  }

  useEffect(() => {
    load()
  }, []);
  const chooseFile = async () => {
    return
    launchImageLibrary({ mediaType: 'photo' }, async response => {
      if (!response.didCancel) {
        if (response.assets && response.assets.length > 0) {
          try {
            const res =
              await CustomObjectDetectionModule.startCustomObjectDetection(
                response.assets[0].uri,
              );
            console.log(res, '<<<res');
            setImage(response.assets[0].uri);
            setResult(res);
          } catch (error) {
            Alert.alert('Error', 'No Object Detected', [{ text: 'OK' }]);
            setImage({});
            setResult('');
          }
        }
      } else {
        console.log(response.errorMessage);
      }
    });
  };

  const openCamera = () => {
    return
    launchCamera({ mediaType: 'photo' }, async response => {
      if (!response.didCancel) {
        if (response.assets && response.assets.length > 0) {
          try {
            const res =
              await CustomObjectDetectionModule.startCustomObjectDetection(
                response.assets[0].uri,
              );
            setImage(response.assets[0].uri);
            setResult(res);
          } catch (error) {
            Alert.alert('Error', 'No Object Detected', [{ text: 'OK' }]);
            setImage({});
            setResult('');
          }
        }
      } else {
        console.log(response.errorMessage);
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textStyle}>Object Detection</Text>
      {/* <Image
        style={styles.imageStyle}
        source={{
          uri: null,
        }}
      /> */}
      <Text style={styles.textStyle}>{`Result: `}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={chooseFile}>
          <Text style={styles.buttonLabelStyle}>Launch gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={openCamera}>
          <Text style={styles.buttonLabelStyle}>Launch Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonStyle: {
    height: '35%',
    backgroundColor: '#D15060',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  imageStyle: {
    height: '70%',
    width: '80%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonLabelStyle: { fontSize: 15, fontWeight: '500', color: '#FFFFFF' },
});
export default App;
