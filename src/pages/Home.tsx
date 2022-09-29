import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import {Header} from '../components/Header';
import {Task, TasksList} from '../components/TasksList';
import {TodoInput} from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        const taskAlreadyExist = tasks.find((task) => task.title === newTaskTitle)
        if (taskAlreadyExist) {
            Alert.alert(
                "Atenção",
                "Esta tarefa já existe, mude seu titulo",
                [{text: 'Ok', onPress: () => console.log('ok')}]
            )
            return;
        }
        const newTask: Task = {id: new Date().getTime(), title: newTaskTitle, done: false}
        setTasks([...tasks, newTask])
    }

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map((task) => {
            if (task.id == id) {
                task.done = !task.done;
            }

            return task
        })

        setTasks(updatedTasks)
    }

    function handleRemoveTask(id: number) {
        Alert.alert(
            "Atenção",
            "Você deseja mesmo excluir esta tarefa?",
            [
                {text: 'Sim', onPress: () => removetask()},
                {text: 'Não', onPress: () => console.log('cancelar'), style: "cancel"}
            ]
        )

        function removetask() {
            const updatedTasks = tasks.filter((task) => {
                if (task.id != id) return task
            })

            setTasks(updatedTasks)
        }
    }

    function handleSubmitEditing(id: number, newTitle: string) {
        const updatedTasks = tasks.map((item) => {
            if (item.id === id) {
                item.title = newTitle;
            }
            return item
        })

        setTasks(updatedTasks)
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length}/>

            <TodoInput addTask={handleAddTask}/>

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                editTask={handleSubmitEditing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB'
    }
})
