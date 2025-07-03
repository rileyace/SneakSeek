import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import Constants from "expo-constants";
import * as ImageManipulator from 'expo-image-manipulator';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function identifySneaker(base64Image: string) {
  const apiKey = Constants.expoConfig.extra.googleVisionApiKey;
  const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const body = {
    requests: [
      {
        image: {
          content: base64Image,
        },
        features: [
          {
            type: "LABEL_DETECTION",
            maxResults: 5,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    console.log("Vision results:", JSON.stringify(result, null, 2));

    // pull the top label:
    const topLabel = result.responses[0].labelAnnotations?.[0]?.description;
    console.log("Top sneaker guess:", topLabel);
    return topLabel;

  } catch (err) {
    console.error("Error calling Google Vision:", err);
    return null;
  }
}

async function handleCapture() {
  if (cameraRef.current) {
    const photo = await cameraRef.current.takePictureAsync({ base64: true });
    console.log('Photo taken:', photo.uri);

    const targetAspect = 340 / 280;

    let cropWidth = photo.width;
    let cropHeight = cropWidth / targetAspect;

    if (cropHeight > photo.height) {
      cropHeight = photo.height;
      cropWidth = cropHeight * targetAspect;
    }

    const originX = (photo.width - cropWidth) / 2;
    const originY = (photo.height - cropHeight) / 2;

    const cropped = await ImageManipulator.manipulateAsync(
      photo.uri,
      [
        {
          crop: {
            originX,
            originY,
            width: cropWidth,
            height: cropHeight,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    console.log('Cropped photo:', cropped.uri);

    // call Google Vision on the BASE64 of the original photo
    const identified = await identifySneaker(photo.base64);
    console.log('Identified sneaker:', identified);

    router.push({
      pathname: '/resultPage',
      params: {
        photoUri: cropped.uri,
        identified: identified ?? "Unknown sneaker"
      },
    });
  }
}

  return (
    <View style={styles.container}>
      {/* Camera view */}
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} ratio='1:1' />

      {/* Capture button */}
      <TouchableOpacity style={styles.captureButton} onPress={handleCapture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: '#f2f2f2',
  },
  permissionButton: {
    backgroundColor: '#660000',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#f2f2f2',
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#660000',
    borderRadius: 35,
  },
});