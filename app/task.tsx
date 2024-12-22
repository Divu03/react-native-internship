import React from "react";
import { View,Text,StyleSheet, TouchableOpacity, Pressable } from "react-native";

const Task = (props:any) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Pressable onPress={() => props.onPress()}>
                    <View style={styles.squre}></View>    
                </Pressable>
                <Text style={styles.itemText}> {props.text}</Text>
            </View>
            <Pressable onPress={() => props.toDelete()}>
                <View style={styles.circular}></View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    item:{
        backgroundColor:"#FFF",
        padding:15,
        borderRadius:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom:20,
    },
    itemLeft:{
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    squre:{
        width:24,
        height:24,
        backgroundColor:'#55BCF6',
        opacity: 0.4,
        borderRadius:5,
        marginRight:15,
    },
    itemText:{
        maxWidth:'80%',
    },
    circular:{
        width:20,
        height:20,
        borderColor:'red',
        borderWidth:2,
        borderRadius:50,
    },
});

export default Task;