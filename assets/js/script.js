// variables to source elemets
let titleEl = $("#taskT");
let dueEl = $("#taskDD");
let descEl = $("#taskC");
let button = $("#btn");
let toDo = $('#to-do');
let deleteBtn = $('.swim-lanes')

// These fvariables were part of base code i chose not to use them
// let taskList = JSON.parse(localStorage.getItem("tasks"));
// let nextId = JSON.parse(localStorage.getItem("nextId"));

//function to save to local storage, use after and chages are made to cards
function saveTasksToStorage(TaskObects){
    localStorage.setItem("tasks",JSON.stringify(TaskObects));
  }

//function that adds form details to local storage oce user clicks submit
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

     //test code delete
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

//function to pull all tasks that are stored in local storage to an array
function readTasksFromStorage() {
    let tasks = [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks){
    tasks=savedTasks;
    }
    return tasks;
}

//function to create cards and change color
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

    //changes color based on due date
if (task.dueDate && task.status !== "done") {
    const catchDate = dayjs();
    const taskDue = dayjs(task.dueDate, "DD/MM/YYYY");
    console.log('1')
    if (catchDate.isSame(taskDue, "day")) {
        taskCard.addClass("bg-warning text-white");
        console.log('2')
      } else if (catchDate.isAfter(taskDue)) {
        taskCard.addClass("bg-danger text-white");
        deleteBtn.addClass("border-light");
        console.log('3')
      }
    }
    
    // appends the cards
taskBody.append(cardContent, dueDate, deleteBtn)
taskCard.append(cardTitle, taskBody)
return taskCard;




}

//pulls all cards from storage with storage function and prints them to page in correct position
//also adds dragable functionality
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

      //adds jquery dragable functionality
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

//fucntion to delete tasks via delete button
function handleDeleteTask(){
    const taskId = $(this).attr("data-task-id");
    const taskss = readTasksFromStorage();
        //keep index start at -1
    let idxToDel = -1; 
    for (let i = 0; i < taskss.length; i++) {
        if(taskss[i].id===taskId){
          console.log("This id matches")
          console.log(taskss[i])
          idxToDel = i;
        }
    }

    taskss.splice(idxToDel,1);
    saveTasksToStorage(taskss);
    renderTaskList()
}

//changes status when dropin tasks in new column
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


//page load 
renderTaskList()
button.on("click", handleAddTask);
deleteBtn.on("click", ".delete", handleDeleteTask);

//date picker
$("#taskDD").datepicker({
    changeMonth: true,
    changeYear: true,
  });
//jquery dragable cards
  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });