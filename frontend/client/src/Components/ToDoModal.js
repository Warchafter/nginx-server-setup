import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addNewTask, getToDoList, getToDoStatusList } from 'features/todo';
import { Navigate } from 'react-router-dom';

import "./css/ToDoModal.css";

const ToDoModal = () => {
    const dispatch = useDispatch();
	const { isAuthenticated } = useSelector(state => state.user);
    const { loading, listLoading, todoList, toDoStatusList } = useSelector(state => state.todo);

    const [checkedItems, setCheckedItems] = useState([]);

	const [formData, setFormData] = useState({
		todo_desc: '',
	});

	const { todo_desc } = formData;

    const handleToggle = (id) => {
        if (checkedItems.includes(id)) {
            setCheckedItems(checkedItems.filter((item) => item !== id));
        } else {
            setCheckedItems([...checkedItems, id]);
        }
    };

    const handleStatusButtonClick = (status) => {
        // Create an array of objects with the structure { id: 1, status: 0 }
        const updatedTasks = checkedItems.map((id) => ({ id, status }));

        // Dispatch action to update task status
        // dispatch(updateTaskStatus(updatedTasks));

        // Clear checked items list
        setCheckedItems([]);
    };

	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

    const onRefreshListButton = e => {
        e.preventDefault()
        dispatch(getToDoList())
    }

    useEffect(() => {
        dispatch(getToDoList());
        dispatch(getToDoStatusList());
    }, []);

	const onSubmit = e => {
		e.preventDefault();

		// dispatch(login({ todo_desc })); Make sure to change login once redux
        // is done for entry logic into backend
        // Make sure to pass this as 1 parameter (as an object {})
        dispatch(addNewTask({ todo_desc }));
	};

    const handleKeyDown = e => {
        if (e.key === 'Enter' || e.key === 'NumpadEnter') {
            onSubmit(e);
        }
    };

    const ToDoList = () => {
        if (listLoading) {
            return <p>Loading...</p>;
        } else {
            return todoList && todoList.length > 0 ? (
                todoList.map((item) => (
                    <>
                        <hr className="todo-item"></hr>
                        <div className="todo-list-item" key={item.id}>
                            <input type="checkbox" />
                            <p className="todo-item-text">{item.todo_desc}</p>
                        </div>
                    </>
                ))
            ) : (
                <p>No tasks available</p>
            );
        }
    };

    const ToDoStatusButtons = () => {
        if (toDoStatusList == null) {
            return <p>Loading...</p>;
        } else {
            console.log("the list should have loaded");
            return toDoStatusList && toDoStatusList.length > 0 ? (
                toDoStatusList.map((item) => (
                    <button className="button-13" name={item.name} onClick={() => {handleStatusButtonClick(item.id)}}>{item.name}</button>
                ))
            ) : (
                <p>No tasks available</p>
            );
        }
    }

    // Idea: when sending the form, if the response is 401,404,etc
    // do not delete the info in the field and change the color to red

    if (!isAuthenticated) {return <Navigate to='/login' />}

    return (
        <div className="todo-main-box">
            <div className="todo-title">
                <h2 style={{color: 'BLACK'}}>To Do List</h2>
            </div>
            <div className="todo-entry-wrapper">
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="+ add an entry"
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        name="todo_desc"
                        value={todo_desc}
                        className="input-field"
                    ></input>
                </form>
            </div>
            <div className="todo-list">
                <ToDoList />
            </div>
            <div className="todo-footer">
                <div className="todo-left-icons">
                    <button className="button-13" onClick={onRefreshListButton}>Refresh</button>
                    <p>test | test | 3 items remaining</p>
                </div>
                <div className="todo-right-icons">
                    <ToDoStatusButtons />
                </div>
            </div>
        </div>
    )
}

export default ToDoModal;