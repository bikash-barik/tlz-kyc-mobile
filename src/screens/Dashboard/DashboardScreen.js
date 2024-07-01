import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image ,TouchableOpacity} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Footer from '../../components/Footer';


const tasks = [
    { name: 'Package Confirmation', progress: 30 },
    { name: 'Business Entity Details', progress: 50 },
    { name: 'KYC & Compliance', progress: 75 },
    { name: 'Payment', progress: 100 },
    { name: 'Trade Licence Application', progress: 30 },
    { name: 'Entity Card Application', progress: 50 },
    { name: 'Visa Application', progress: 30 },
    { name: 'Visa Application', progress: 30 },
    { name: 'Visa Application', progress: 30 },
    { name: 'Visa Application', progress: 30 },
  
];

const Dashboard = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>
            </View> */}
            <View style={styles.rowheader}>
                <TouchableOpacity onPress={() => navigation.navigate('DocumentVault')} style={styles.touchableOpacity}>
                    {/*<Image source={require('../assets/Mask group.png')} style={styles.leftarowicon} />*/}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')} style={styles.touchableOpacity}>
                    <Text style={styles.headerText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')} style={styles.touchableOpacity}>
                    <Image source={require('../../assests/bell.png')} style={styles.notification} />
                </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>

                <View>
                    <Text style={styles.statusTitle}>Application Status</Text>
                    <View style={styles.nextStepsButton}>
                        <Text style={styles.nextStepsText}>Next Steps</Text>
                    </View>
                </View>
                <View>
                    <AnimatedCircularProgress
                        size={100}
                        width={8}
                        fill={78.6}
                        tintColor={78.6 === 100 ? 'green' : '#3498db'}
                        backgroundColor="#e0e0e0"
                        rotation={0}
                        lineCap="round"
                    >
                        {fill => (
                            <Text style={[styles.progressText, fill === 100 ? styles.greenText : null]}>
                                {`${fill.toFixed(1)}%`}
                            </Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                {tasks.map((task, index) => (
                    <View key={index} style={styles.taskContainer}>
                        <View style={styles.column}>
                            <View>
                                <Image
                                    source={require('../../assests/package.png')}
                                    style={styles.image}
                                />
                            </View>
                            <View>
                                <Text style={styles.taskTitle}>{task.name}</Text>
                                <Text style={styles.stepsRemaining}>12 Steps Remaining</Text>
                            </View>
                        </View>

                        <AnimatedCircularProgress
                            size={50}
                            width={4}
                            fill={task.progress}
                            tintColor={task.progress === 100 ? 'green' : '#3498db'}
                            backgroundColor="#e0e0e0"
                            rotation={0}
                            lineCap="round"
                        >
                            {fill => (
                                <Text style={[styles.taskProgressText, task.progress === 100 ? styles.greenText : null]}>
                                    {`${task.progress}%`}
                                </Text>
                            )}
                        </AnimatedCircularProgress>
                    </View>
                ))}
            </ScrollView>
            <Footer navigation={navigation}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    rowheader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "90%",
        paddingHorizontal: 20, // Adjust as needed
        marginTop: 20, // Adjust as needed
    },
    touchableOpacity: {
        flex: 1,
    },
    leftarowicon: {
        height: 10,
        width: 10,
        // Your styles for leftarowicon
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        width:150,
        color:"#000"
        // Your styles for headerText
    },
    notification: {
        height: 20,
        width: 20,
        marginLeft:90,
        // Your styles for notification
    },
    column:{
        flexDirection: 'row',
        gap:10,
    },
    
    statusContainer: {
        flexDirection: 'row',
        backgroundColor: '#074E76',
        padding: 20,
        margin: 16,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statusTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
    },
    progressText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
    },
    greenText: {
        color: 'green',
    },
    nextStepsButton: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        width:"60%",
    },
    nextStepsText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        
    },
    scrollView: {
        flex: 1,
        marginTop: 10,
    },
    taskContainer: {
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
    },
    image: {
        width: 40,
        height: 40,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color:"#000",
    },
    stepsRemaining: {
        fontSize: 12,
        color: '#888',
    },
    taskProgressText: {
        fontSize: 12,
        fontWeight: 'bold',
        color:"#000",
    },
});

export default Dashboard;