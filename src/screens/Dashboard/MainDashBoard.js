import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import bell from '../../assests/bell.png';
import db from '../../assests/db.png';
import note from '../../assests/note.png';
import documentI from '../../assests/document.png';
import Footer from '../../components/Footer';

const MainDashBoard = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 20}}>Dashboard</Text>
        <Image source={bell} style={{position: 'absolute', right: '5%'}} />
      </View>

      {/* White box with border */}
      <TouchableOpacity style={styles.whiteBox} onPress={() => navigation.navigate('appJourney')}>
        <Image source={note} />
        <Text style={{marginLeft: '6%', fontSize: 17}}>
          Application Journey
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whiteBox} onPress={() => navigation.navigate('docVault')}>
        <Image source={db} style={styles.cardIcon} />
        <Text style={styles.cardText}>Document Vault</Text>
      </TouchableOpacity>

      {/* Personal Details Card */}
      <View style={styles.whiteBox}>
        <Image source={documentI} style={styles.cardIcon} />
        <Text style={styles.cardText}>Personal Details</Text>
      </View>
    
        <Footer extraStyle={{marginLeft:'7%'}}/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#52ABC7',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
  },
  cardText:{
    marginLeft: '6%', 
    fontSize: 17
  }
});

export default MainDashBoard;
