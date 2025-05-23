import {View , Text, StyleSheet, ScrollView} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import {useState} from 'react';
 // @ts-ignore

// import exercises from '../../assets/data/exercises.json'; this is for mock
import {gql} from 'graphql-request';
import {QueryClient, useQuery} from '@tanstack/react-query';
import graphqlClient  from './graphqlClient';
import { ActivityIndicator } from 'react-native-web';
import NewSteInput from '../components/newSetInput';


const exercisesQuery = gql`
  Query exercises(name:string){
    exercises(name: $name){
      name
      muscle
      instructions
      equipment
    }
 }`;

export  default function ExerciseDetailScreen(){ 
    // const params = useLocalSearchParams();  // This is for mock data
    const { name } = useLocalSearchParams();
    const { data,isLoading, error } = useQuery({
      queryKey:['exercises', name],
      queryFn:()=> graphqlClient.request(exercisesQuery, { name })
    })
    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);
    
    if(isLoading){
      return <ActivityIndicator/>;
    }
    if(error){
      return <Text>Failed to fetch data</Text>;
    }
    // const exercise = exercises.find(item=>item.name === params.name)    // This is for mock data
    const exercise = data.exercises[0];
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
          <NewSteInput />
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