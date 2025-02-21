import React, { useState, useEffect, useReducer, useRef } from 'react'
import * as FaceDetector from 'expo-face-detector'
import { Camera } from 'expo-camera'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import MaskedView from '@react-native-community/masked-view'
import Footer from './components/Footer'

const { width: windowWidth } = Dimensions.get('window')

const PREVIEW_SIZE = 325
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE
}

const instructionsText = {
  initialPrompt: 'Position your face in the circle',
  tooClose: 'You\'re too close. Hold the device further.'
}

const initialState = {
  faceDetected: 'no',
  faceTooBig: 'no',
  progressFill: 0,
  processComplete: false
}

const detectionReducer = (state, action) => {
  switch (action.type) {
    case 'FACE_DETECTED':
      if (action.payload === 'yes') {
        return { ...state, processComplete: true }
      }
      else {
        return initialState
      }

    case 'FACE_TOO_BIG':
      return { ...state, faceTooBig: action.payload }

    default:
      throw new Error('Unexpected action type.')
  }
}

export default function Registration({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false)
  const [state, dispatch] = useReducer(detectionReducer, initialState)
  const [cameraRef, setCameraRef] = useState(null)
  const [username] = useState('TLZ') // Default username

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }
    requestPermissions()
  }, [])

  const onFacesDetected = (result) => {
    if (result.faces.length !== 1) {
      dispatch({ type: 'FACE_DETECTED', payload: 'no' })
      return
    }

    const face = result.faces[0]
    const faceRect = {
      minX: face.bounds.origin.x,
      minY: face.bounds.origin.y,
      width: face.bounds.size.width,
      height: face.bounds.size.height
    }

    const edgeOffset = 50
    const faceRectSmaller = {
      width: faceRect.width - edgeOffset,
      height: faceRect.height - edgeOffset,
      minY: faceRect.minY + edgeOffset / 2,
      minX: faceRect.minX + edgeOffset / 2
    }

    const contains = ({ outside, inside }) => {
      const outsideMaxX = outside.minX + outside.width
      const insideMaxX = inside.minX + inside.width

      const outsideMaxY = outside.minY + outside.height
      const insideMaxY = inside.minY + inside.height

      return !(inside.minX < outside.minX || insideMaxX > outsideMaxX || inside.minY < outside.minY || insideMaxY > outsideMaxY)
    }

    const previewContainsFace = contains({
      outside: PREVIEW_RECT,
      inside: faceRectSmaller
    })

    if (!previewContainsFace) {
      dispatch({ type: 'FACE_DETECTED', payload: 'no' })
      return
    }

    if (state.faceDetected === 'no') {
      const faceMaxSize = PREVIEW_SIZE - 90
      if (faceRect.width >= faceMaxSize && faceRect.height >= faceMaxSize) {
        dispatch({ type: 'FACE_TOO_BIG', payload: 'yes' })
        return
      }

      if (state.faceTooBig === 'yes') {
        dispatch({ type: 'FACE_TOO_BIG', payload: 'no' })
      }
    }

    if (state.faceDetected === "no") {
      dispatch({ type: 'FACE_DETECTED', payload: 'yes' })
    }
  }

  const captureImage = async () => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({ base64: true })
      // Navigate to eSignScreen after capturing the image
      // console.log(photo);
      navigation.navigate('eSignScreen')
    } else {
      navigation.navigate('CaptureYourLivePhoto')
    }
  }

  useEffect(() => {
    if (state.processComplete) {
      captureImage()
    }
  }, [state.processComplete])

  if (hasPermission === false) {
    return <Text style={{ textAlign: "center", marginTop: 100 }}>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={<View style={styles.mask} />}
      >
        <Camera
          style={StyleSheet.absoluteFill}
          type={Camera.Constants.Type.front}
          onFacesDetected={onFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.all,
            minDetectionInterval: 125,
            tracking: false
          }}
          ref={ref => { setCameraRef(ref) }}
        >
          <AnimatedCircularProgress
            style={styles.circularProgress}
            size={PREVIEW_SIZE}
            width={5}
            backgroundWidth={7}
            fill={state.progressFill}
            tintColor="#337ab7"
            backgroundColor="#e8e8e8"
          />
        </Camera>
      </MaskedView>
      <View style={styles.instructionsContainer}>
        {!state.processComplete &&
          <Text style={styles.instructions}>
            {state.faceDetected === "no" &&
              state.faceTooBig === "no" &&
              instructionsText.initialPrompt}

            {state.faceTooBig === "yes" && instructionsText.tooClose}
          </Text>
        }
        {state.processComplete &&
          <Text style={styles.processing}>
            Please Wait ...
          </Text>
        }
      </View>
      <Footer/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mask: {
    borderRadius: PREVIEW_SIZE / 2,
    height: PREVIEW_SIZE,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: "center",
    backgroundColor: "white"
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    top: 15
  },
  processing: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 25
  }
})
