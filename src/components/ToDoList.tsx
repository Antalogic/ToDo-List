import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from '../App';
import AddItemForm from './AddItemForm';
import EditAbleSpan from './EditAbleSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Task from './Task';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, toDoListID: string) => void,
    changeFilter: (value: FilterValuesType, toDoListID: string) => void,
    changeToDoListTitle: (toDoListID: string, title: string) => void
}

export const ToDoList = React.memo(function (props: PropsType) {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeToDoListTitle = useCallback((title: string) => {
        props.changeToDoListTitle(title, props.id)
    }, [props.changeToDoListTitle, props.id])
    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])


    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    return (
        <div>
            <h3>
                <EditAbleSpan value={props.title} changeValue={changeToDoListTitle}/>
                <IconButton onClick={() => {
                    props.removeToDoList(props.id)
                }}><Delete/></IconButton>

            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    toDoListID={props.id}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}/>)}
            </div>
            <div>
                <Button variant={'contained'}
                        style={{margin: '5px'}}
                        color={props.filter === 'all' ? 'primary' : 'default'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={'contained'}
                        style={{margin: '5px'}}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={'contained'}
                        style={{margin: '5px'}}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>)
})