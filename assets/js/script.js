let titleEl = $("#taskT");
let dueEl = $("#taskDD");
let descEl = $("#taskC");
let button = $("#btn");
let toDo = $('#to-do');
let deleteBtn = $('.swim-lanes')

// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id




function readTasksFromStorage() {
    let tasks = [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks){
    tasks=savedTasks;
    }
    return tasks;
}

function saveTasksToStorage(TaskObects){
    localStorage.setItem("tasks",JSON.stringify(TaskObects));
  }

// Todo: create a function to create a task card DONEEEEEEEEEEEEEE
function createTaskCard(task) {

    // creates the card
const taskCard = $('<section>')
taskCard.addClass('card task-card draggable my-3')
taskCard.attr("data-task-id", task.id);
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
deleteBtn.attr("data-task-id",task.id);
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

      $(".draggable").draggable({
        opacity: 0.7,
        zIndex: 100,
        elper: function (e) {
            const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
        return original.clone().css({
            width: original.outerWidth(),
          });
        },
      });


}

// Todo: create a function to handle deleting a task
function handleDeleteTask(){
    const taskId = $(this).attr("data-task-id");
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
   event.preventDefault();

    const title = titleEl.val()
    const dueDate = dueEl.val()
    const content = descEl.val()

    const newCard = {
        id: crypto.randomUUID(),
        title: title,
        dueDate: dueDate,
        content: content,
        status: "to-do"
    }
    console.log(newCard)

    const tasks = readTasksFromStorage();
    tasks.push(newCard)

    saveTasksToStorage(tasks);
    renderTaskList()

    titleEl.val('');
    dueEl.val('');
    descEl.val('');
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
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;

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


$("#taskDD").datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });