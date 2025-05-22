import {View , Text, StyleSheet, ScrollView} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import {useState} from 'react';
// @ts-ignore
import exercises from '../../assets/data/exercises.json';

export  default function ExerciseDetailScreen(){
    const params = useLocalSearchParams();
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    const exercise = exercises.find(item=>item.name === params.name)
    if(!exercise) {
        return <Text> Exercise not found </Text>;
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Stack.Screen options={{title: exercise.name}}/>
          <View style={styles.panel}>
            <Text style={styles.exerciseName}>
                {exercise.name}
            </Text>
            <Text style={styles.exerciseSubtitle}>
                <Text style={styles.subValue}>{exercise.muscle}</Text> | <Text style={styles.subValue}>{exercise.equipment} </Text>
            </Text >
          </View>
          <View style={styles.panel}>
            <Text style={styles.instruction} numberOfLines={isInstructionExpanded ? 0 : 3}>{exercise.instructions}</Text>
            <Text onPress={()=>setIsInstructionExpanded(!isInstructionExpanded)} style={styles.seeMore}>{isInstructionExpanded ? 'See less' : 'See more'}</Text>
          </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    gap:10
  },
  panel:{
    backgroundColor:'white',
    padding:10,
    borderRadius:5
  },
  exerciseName:{
    fontSize:20, 
    fontWeight:'500',
  },
  exerciseSubtitle :{
    color:'dimgray'
  },
  subValue:{
    textTransform:'capitalize',
  },
  instruction:{
    fontSize:16,
    lineHeight:22
  },
  seeMore:{
    alignSelf:'center',
    padding:10,
    fontWeight:'600',
    color:'gray'
  }
});