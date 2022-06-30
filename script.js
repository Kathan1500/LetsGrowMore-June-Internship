// getting all required elements
const inputBox = document.querySelector(".inputBox input");
const addBtn = document.querySelector(".inputBox button");
const todoList = document.querySelector("#tasks");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userData = inputBox.value; //getting user entered value
  if(userData.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userData = inputBox.value; //getting input field value
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorage == null){ //if localstorage has no data
    listArr = []; //create a blank array
  }else{
    listArr = JSON.parse(getLocalStorage);  //transforming json string into a js object
  }
  listArr.push(userData); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks(){
  let getLocalStorage = localStorage.getItem("New Todo");
  if(getLocalStorage == null){
    listArr = []; 
  }else{
    listArr = JSON.parse(getLocalStorage); 
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //passing the array length in pendingtask
  if(listArr.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fa fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //set the item in localstorage
  showTasks(); //call the showTasks function
}  