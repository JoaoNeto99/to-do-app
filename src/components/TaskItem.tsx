import React, {useEffect, useRef, useState} from "react";
import {Image, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconAnt from "react-native-vector-icons/AntDesign";
import trashIcon from "../assets/icons/trash/trash.png";
import {Task} from "./TasksList";

type TaskItemProps = {
    index: number,
    item: Task,
    toggleTaskDone: (id: number) => void,
    removeTask: (id: number) => void
    editTask: (id: number, title: string) => void
}


export function TaskItem({index, item, toggleTaskDone, removeTask, editTask}: TaskItemProps) {
    const [isEditting, setIsEdditing] = useState(false);
    const [title, setTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEdditing(true)
    }

    function handleCancelEditing() {
        setIsEdditing(false)
        setTitle(item.title)
    }

    function handleSubmitEditing() {
        editTask(item.id, title)
        setIsEdditing(false)
    }

    useEffect(() => {
        isEditting ? textInputRef.current?.focus() : textInputRef.current?.blur()
    }, [isEditting])


    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    //TODO - use onPress (toggle task) prop
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        //TODO - use style prop
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {item.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={title}
                        onChangeText={(e) => setTitle(e)}
                        editable={isEditting}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                    />

                </TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
                {
                    isEditting
                        ? (
                            <TouchableOpacity
                                testID={`cancel-${index}`}
                                onPress={() => handleCancelEditing()}
                                //TODO - use onPress (remove task) prop
                            >
                                <IconAnt
                                    name="close"
                                    size={24}
                                    color="#B2B2B2"
                                />
                            </TouchableOpacity>)
                        : (<TouchableOpacity
                            testID={`edit-${index}`}
                            onPress={() => handleStartEditing()}
                        >
                            <IconAnt
                                name="edit"
                                size={24}
                                color="#B2B2B2"
                            />
                        </TouchableOpacity>)


                }
                <View style={{width: 1, backgroundColor: "rgba(178,178,178,0.6)", marginHorizontal: 12}}></View>

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={[{paddingRight: 24}, isEditting ? {opacity: 0.2} : {opacity: 1}]}
                    onPress={() => removeTask(item.id)}
                    disabled={isEditting}
                >
                    <Image source={trashIcon}/>
                </TouchableOpacity>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    }
})
