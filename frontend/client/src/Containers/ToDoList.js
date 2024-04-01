import DefaultLayout from "hoc/Layout/DefaultLayout";
import ToDoModal from "Components/ToDoModal";

const ToDoList = () => {
    return (
        <DefaultLayout>
            <div className="todo-wrapper">
                <ToDoModal></ToDoModal>
            </div>
        </DefaultLayout>
    )
}

export default ToDoList;