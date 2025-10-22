import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from 'react';
import AppStyles from "../AppStyles";

export default function Header() {
  return (
    <SafeAreaView style={styles.header}>
        <Text style={styles.headerJob}>Job<Text style={styles.headerPush}>Push</Text></Text>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    header: {
        height:'8%',
        width:"100%",
        backgroundColor:'#2B3033',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    headerJob: AppStyles.headerJob,
    headerPush: AppStyles.headerPush,
});
