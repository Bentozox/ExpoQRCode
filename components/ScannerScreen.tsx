import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet
} from 'react-native';

import {Text, View} from './Themed';
import {BarCodeScanner, PermissionStatus} from "expo-barcode-scanner";
import {BarCodeScannedCallback} from "expo-barcode-scanner/src/BarCodeScanner";


export default function ScannerScreen({ path }: { path: string }) {
  const [resultText, setResultText] = useState("Aucun résultat");
  const [hasRequestedPermission, setRequestedPermission] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
      setRequestedPermission(true);
    })();
  }, []);


  const handleBarCodeScanned : BarCodeScannedCallback = ({type, data}) => {
    setScanned(true);
    setResultText(data);
  };

  const handleReScanButton : () => void = () => {
    setScanned(false);
    setResultText("Aucun résultat");
  }

  if (hasRequestedPermission === false) {
    return <Text>Requesting for camera permission</Text>;
  } else if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>

        <Text>
          Scannez votre QR code : {resultText}
        </Text>
        {scanned && <Button title={'Tap to Scan Again'} onPress={handleReScanButton} />}
        {!scanned &&
        <BarCodeScanner
            onBarCodeScanned = { handleBarCodeScanned }
            style = {{
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
            }}
        >
        </BarCodeScanner>
        }
      </View>
  );




}
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});