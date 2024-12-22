import { Text, View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React, {useState} from 'react';
import Task from './task';

export default function AboutScreen() {

  const [task, setTask] = useState<string>('');
  const [taskItems, setTaskItems] = useState<string[]>([]);
  const [completedTask, setCompletedTask] = useState<string[]>([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim().length > 0) {
      setTaskItems([...taskItems, task]);
      setTask('');
    }
  }

  const completeTask= (index:number, isInCompleted:boolean) =>{
    if(isInCompleted) {
      let itemsCopy = [...taskItems];
      const [completed] = itemsCopy.splice(index, 1);
      setCompletedTask([...completedTask, completed]);
      setTaskItems(itemsCopy);
    }else{
      let itemsCopy = [...completedTask];
      const [completed] = itemsCopy.splice(index, 1);
      setTaskItems([...taskItems, completed]);
      setCompletedTask(itemsCopy);
    }
  }

  const deleteTask = (index:number, listComplteted:boolean) =>{
    if(listComplteted){
    let itemsCopy = [...completedTask];
    itemsCopy.splice(index, 1);
    setCompletedTask(itemsCopy);
    }else{
      let itemsCopy = [...taskItems];
      itemsCopy.splice(index, 1);
      setTaskItems(itemsCopy);
    }
  }



  return (
    <View style={styles.container}>
    <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <View style={styles.items}>
        {
          taskItems.map((item, index)=>{
            return (
                <Task text={item} key={index} onPress={() => completeTask(index,true)} toDelete={() => deleteTask(index,false)}/> 
            )
          })
        }
      </View>
      <Text style={styles.sectionTitle}>Completed Tasks</Text>
      <View style={styles.items}>
        {
          completedTask.map((item, index)=>{
            return (
              <Task key={index} text={item} onPress={() => completeTask(index,false)} toDelete={() => deleteTask(index,true)}/> 
            )
          })
        }
      </View>
    </View>

    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.writeTaskWrapper}>

      <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>

    </KeyboardAvoidingView>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
