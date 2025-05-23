import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList, ActivityIndicator } from 'react-native';
// @ts-ignore
// import exercises from '../../assets/data/exercises.json'; for the mock data
import ExerciseListItem from '../components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client  from './graphqlClient';

const exercisesQuery = gql`
 Query exercises($muscle:string,name:string){
    exercises(muscle:$muscle, name: $name){
      name
      muscle
      equipment
    }
 }`;

export default function ExercisesScreen() {
const {data, isLoading,error} = useQuery({
  queryKey: ['exercises'],
  queryFn: async ()=>client.request(exercisesQuery),
});

if(isLoading){
  return <ActivityIndicator />
}
if(error){
  return <Text>Failed to fetch exercises</Text>
}

//  const exercise = exercises[0]; for the mock data
  return (
    <View style={styles.container}>
      <FlatList 
        data={data?.exercises} // {exercise}  For the mock data
        contentContainerStyle={{gap:5}}
        keyExtractor={(item , index)=> item.name + index}
        renderItem={({item, index})=> <ExerciseListItem  item={item} />} 
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding:10,
    paddingTop:70
  }
});
