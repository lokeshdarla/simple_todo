import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: String(Date.now()),
          text: newTask,
          completed: false,
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.taskItem}>
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Simple ToDo App</Text>
      <View>
        <Image style={styles.image} source={require('./assets/todo_img.png')} />
      </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.taskList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image:{
    width:150,
    height:150,
    margin:10,
  },
  heading:{
    fontSize:20,
    margin:10,
  },
  container: {
    marginTop:100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical:5,
  },
  addButton: {
    backgroundColor: '#4285f4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
});

export default App;
