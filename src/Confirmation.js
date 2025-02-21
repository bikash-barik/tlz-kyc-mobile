import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import logo from '../assets/icon.png'

export default class Confirmation extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { navigation, route } = this.props
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        {route.params.type == 'payment' &&
          <View>
            <Text style={styles.title}>
              Payment Successful
            </Text>

            <Text style={styles.amount}>
              {route.params.paymentAmount}
            </Text>

            <View style={styles.row}>
              <Image
                style={styles.image}
                source={{ uri: `data:image/png;base64,${route.params.paymentMethod.image}` }}
              />
              <Text style={styles.message}>{route.params.paymentMethod.label}</Text>
            </View>
            <Text style={styles.message}>
              Verified user: {route.params.username}
            </Text>
            <Text style={styles.message}>
              Thank you for using TLZ!
            </Text>
          </View>
        }

        {route.params.type == 'CaptureYourLivePhoto' &&
          <View>
            <Text style={styles.title}>
              Face Detection Successful
            </Text>
            <Text style={styles.message}>
              User Name: {route.params.username}
            </Text>
          </View>
        }

        {route.params.type == 'failed' &&
          <View>
            <Text style={styles.title}>
              Payment Failed
            </Text>
            <Text style={styles.message}>
              Could not verify user.
            </Text>
            <Text style={styles.message}>
              Please register and try again.
            </Text>
          </View>
        }

        {route.params.type == 'declined' &&
          <View>
            <Text style={styles.title}>
              Payment Declined
            </Text>

            <View style={styles.row}>
              <Image
                style={styles.image}
                source={{ uri: `data:image/png;base64,${route.params.paymentMethod.image}` }}
              />
              <Text style={styles.message}>{route.params.paymentMethod.label}</Text>
            </View>
            <Text style={styles.message}>
              {route.params.error}.
            </Text>
            <Text style={styles.message}>
              Please try again.
            </Text>
          </View>
        }

        <TouchableHighlight
          style={styles.button}
          underlayColor="grey"
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>
            Home
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120
  },
  title: {
    fontSize: 25,
    color: "grey",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10
  },
  amount: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10
  },
  message: {
    color: "grey",
    textAlign: "center",
    marginTop: 2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 4
  },
  image: {
    width: 26,
    height: 20,
    marginRight: 5
  },
  button: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#009688",
    width: "70%"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
})
