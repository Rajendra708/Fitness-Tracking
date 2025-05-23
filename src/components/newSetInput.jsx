import {View , Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-web';
import { useState } from 'react'

 const NewSteInput = () =>{
    const [reps, setReps] = useState('')
    const [weight, setWeight]= useState('')
    const addSet = () =>{
        console.warn('Add Set', reps,weight);
        setReps('');
        setWeight('');
    }
    return (
        <View style={styles.container}>
            <TextInput 
                value={reps} 
                onChangeText={setReps} 
                placeholder='Reps' 
                style={styles.input}
                keyboardType='numeric'
            />
            <TextInput 
                value={weight} 
                onChangeText={setWeight} 
                placeholder='Weight'  
                style={styles.input}
                keyboardType='numeric'
            />
            <Button title='Add' onPress={addSet}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5, 
        flexDirection:'row',
        gap:10
    },
    input :{
        borderWidth:1,
        borderColor:'gainsboro',
        padding:20,
        flex:1,
        borderRadius:5
    }
});

export default NewSteInput;