let titleEl = $("#taskT");
let dueEl = $("#taskDD");
let descEl = $("#taskC");
let button = $("#btn");

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id



// Retrieve projects from localStorage and parse the JSON to an array


// Todo: create a function to create a task card DONEEEEEEEEEEEEEE
function createTaskCard(task) {

    // creates the card
const taskCard = $('<section>')
taskCard.addClass('card task-card draggable my-3')
taskCard.attr("data-project-id", task.id);
    //creates the title element
const cardTitle = $('<h2>')
cardTitle.addClass('task-card')
cardTitle.text(task.title)
    //creates the due date element
const dueDate = $('<p>')
dueDate.addClass('text')
dueDate.text(task.dueDate)
    //creates the description element
const cardContent = $('<p>')
cardContent.addClass('text')
cardContent.text(task.content)
    //creates body of the card
const taskBody = $("<div>");
taskBody.addClass("card-body");
    //creates the delete button
const deleteBtn = $("<button>");
deleteBtn.addClass("btn btn-danger delete");
deleteBtn.attr("data-project-id",task.id);
deleteBtn.text("Delete");

taskBody.append(cardContent, dueDate, deleteBtn)
taskCard.append(cardTitle, taskBody)
return taskCard;



}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();

    const todoList = $("#todo-cards");
    todoList.empty();
  
    const inProgressList = $("#in-progress-cards");
    inProgressList.empty();
  
    const doneList = $("#done-cards");
    doneList.empty();

    for (let task of tasks) {
        const tCard = createTaskCard(task);
        if(task.status==="to-do"){
          todoList.append(tCard)
        }else if(task.status==="in-progress"){
          inProgressList.append(tCard)
        } else {
          doneList.append(tCard)
        }
      }

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(){
    const taskId = $(this).attr("data-project-id");
    const taskss = readTasksFromStorage();

    let idxToDel = -1; 
    for (let i = 0; i < taskss.length; i++) {
        if(taskss[i].id===taskId){
          console.log("This id matches")
          console.log(taskss[i])
          idxToDel = i;
        }

    taskss.splice(idxToDel,1);
    saveTasksToStorage(taskss);
    renderTaskList()
}
}

// Todo: create a function to handle adding a new task MOSTLY DONE
function handleAddTask(event){
   
    // let tasks = []

    // const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    // if(savedTasks === null){
    //     tasks.push(newCard)
    //     console.log("test")
    //     localStorage.setItem("tasks",JSON.stringify(tasks))
    // } else{
    //     tasks.push(savedTasks)
    //     tasks.push(newCard)
    //     localStorage.setItem("tasks",JSON.stringify(tasks))
    // }
    // return tasks

}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readProjectsFromStorage();
    const taskId = ui.draggable[0].dataset.projectId;

    const changeStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskId) {
          task.status = changeStatus;
        }
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTaskList()

}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

renderTaskList()
button.on("click", handleAddTask);
deleteBtn.on("click", ".delete", handleDeleteTask);


