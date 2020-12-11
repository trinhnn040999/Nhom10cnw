function checklist() {
  $(document).ready(function () {
    // get box count
    var count = 0;
    var checked = 0;

    function countBoxes() {
      count = $("input[type='checkbox']").length;
      console.log("count : " + count);
    }

    countBoxes();
    $(":checkbox").click(() => {
      debugger;
      countBoxes();
      //   if ($(":checkbox").is(":checked")) {
      //     $("li.row p.col-sm-11").css("text-decoration", "none");
      //   } else $("li.row p.col-sm-11").css("text-decoration", "line-through");
    });
    // count checks

    function countChecked() {
      checked = $("input:checked").length;
      console.log("checked : " + checked);
      if (count !== 0) {
        var percentage = parseInt((checked / count) * 100, 10);
        $(".progressbar-bar").progressbar({
          value: percentage,
        });
        $(".progressbar-label").text(percentage + "%");
      }
    }

    countChecked();
    $(":checkbox").click(() => {
      countChecked();
    });
  });
}
// format date theo định dạng
function formatDate(date) {
  const d = date;
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}/${mo}`;
}

let root = document.getElementById("root");

class todoList {
  constructor(place, title = "List") {
    this.place = place;
    this.state = {
      text: title,
    };
    this.cardArray = [];

    this.render();
  }

  addToDo() {
    let text = this.input.value;
    this.cardArray.push(new Card(text, this.div, this));
  }

  createToDoListElement() {
    //Create elements
    this.h2 = document.createElement("h2");
    // this.h2.innerText = this.state.text;
    this.divAdd = document.createElement("div");
    this.divAdd.className = "row";
    this.input = document.createElement("input");
    this.input.classList.add("comment");
    this.input.className = "comment col-sm-8";
    this.button = document.createElement("button");
    this.button.innerText = "Add";
    this.button.classList.add("btn-save");
    this.button.className = "btn-save col-sm-3";
    this.divAdd.append(this.input, this.button);
    this.button.id = "to-do-list-button";
    // ul bao card
    this.div = document.createElement("ul");
    this.div.classList.add("sortable");
    this.div.classList.add("ui-sortable");
    this.div.id = "sort";
    // bao ngoài cùng
    this.todoListElement = document.createElement("div");

    //Add Event listener
    this.button.addEventListener("click", () => {
      if (this.input.value != "") {
        this.addToDo.call(this);
        this.input.value = "";
      }
    });

    //Append elements to the to-do list element
    this.todoListElement.append(this.h2);
    this.todoListElement.append(this.divAdd);
    // this.todoListElement.append(this.button);
    this.todoListElement.append(this.div);
    this.todoListElement.classList.add("todoList");
  }

  render() {
    this.createToDoListElement();
    this.place.append(this.todoListElement);

    this.editableTitle = new EditableText(
      this.state.text,
      this.h2,
      this,
      "title",
      "input",
      "h2"
    );
  }
}

class Card {
  constructor(text, place, todoList, endDate = formatDate(new Date())) {
    this.place = place;
    this.todoList = todoList;
    this.state = {
      text: text,
      endDate: endDate,
      description: "Click to write a description...",
      checklist: [{ title: "xin chào", checked: "checked" }],
      comments: [],
    };
    this.render();
  }
  getCountChecked() {
    let count = 0;
    this.state.checklist.forEach((c) => {
      if (c.checked == "checked") count++;
    });
    return count;
  }
  // render html
  render() {
    this.card = document.createElement("li");
    this.card.classList.add("card-item");
    this.card.addEventListener("click", (e) => {
      if (e.target != this.deleteButton) {
        this.showMenu.call(this);
      }
    });
    this.divTop = document.createElement("div");
    this.divBottom = document.createElement("div");
    this.p = document.createElement("p");
    this.p.innerText = this.state.text;
    this.divTop.className = "content-top";
    this.divBottom.className = "content-bottom";
    this.divBottom.innerHTML = this.addContentBottom();
    this.deleteButton = document.createElement("button");
    this.deleteButton.innerText = "X";
    this.deleteButton.addEventListener("click", () => {
      this.deleteCard.call(this);
    });
    this.divTop.append(this.p);
    this.divTop.append(this.deleteButton);

    this.card.append(this.divTop);
    this.card.append(this.divBottom);

    this.place.append(this.card);
  }

  addContentBottom() {
    return (
      `
    <ul class="nav">
      <li class="nav-item disabled date">
          <i class="fas fa-hourglass-start"></i><span>` +
      this.state.endDate +
      `</span></li>
      <li class="nav-item disabled number-comment" >
          <i class="fas fa-comments"></i> <span>` +
      this.state.comments.length +
      `</span>
      </li>
      <li class="nav-item disabled number-check">
          <i class="far fa-check-square"></i>
          <span class="checked">` +
      this.getCountChecked() +
      `</span>/<span class="sum">` +
      this.state.checklist.length +
      `</span>
      </li>
    </ul>
    `
    );
  }

  deleteCard() {
    this.card.remove();
    let i = this.todoList.cardArray.indexOf(this);
    this.todoList.cardArray.splice(i, 1);
  }

  showMenu() {
    //Create elements
    this.menu = document.createElement("div");
    this.menuContainer = document.createElement("div");
    this.menuTitle = document.createElement("div");
    this.menuDescription = document.createElement("div");
    this.commentsInput = document.createElement("input");
    this.commentsButton = document.createElement("button");
    this.menuComments = document.createElement("div");
    this.menuChecklist = document.createElement("div");
    this.menuLeft = document.createElement("div");
    this.menuRight = document.createElement("div");
    this.progressBar = document.createElement("div");
    this.checklist = document.createElement("div");
    this.formCheckbox = document.createElement("form");
    this.ulCheckbox = document.createElement("ul");
    //Add class names
    this.menuChecklist.className = "menuChecklist checklist";
    this.menu.className = "menu row";
    this.menuContainer.className = "menuContainer";
    this.menuTitle.className = "menuTitle";
    this.menuDescription.className = "menuDescription";
    this.menuComments.className = "menuComments";
    this.commentsInput.className = "commentsInput comment";
    this.commentsButton.className = "commentsButton btn-save";
    this.menuRight.className = "menu-right col-sm-4";
    this.menuLeft.className = "menu-left col-sm-8";
    //Add inner Text
    this.progressBar.innerHTML = `
<div class="progressbar-container">
<div class="progressbar-bar"></div>
<div class="progressbar-label"></div>
</div> `;
    this.menuRight.innerHTML = ` <nav>
<ul>
    <li class="title-select">
        ADD TO CARD
    </li>
    <li class="select-menu">
    <div class="dropdown">
    <button type="button" class="btn btn-light dropdown-toggle" id="btn-member" data-toggle="dropdown">
    <i class="fas fa-user"></i> Members
    </button>
    <div class="dropdown-menu" style= "width :100%;">
            <div class="form-group" style="margin-left: 10px; margin-right: 10px;">
            <input type="text" class="form-control" placeholder="Search members" id="searchUser">
            </div> 
            <ul id="users">
              <li class="dropdown-item">Link 1</li>
              <li class="dropdown-item">Siêu nhân đỏ</li>
              <li class="dropdown-item">CHuối gay</li>
            </ul>         
    </div>
  </div>
    </li>
    <li class="select-menu">
    <div class="dropdown">
        <button type="button"  id="btn-check" class="btn btn-light dropdown-toggle" data-toggle="dropdown">
        <i class="fas fa-calendar-check"></i> Checklist
        </button>
      <div class="dropdown-menu">
          <div class="form-group" style="margin-left: 10px; margin-right: 10px;">
              <input type="text" class="form-control" placeholder="Title..." id="checkboxInput">
              <button class="btn btn-success" style="text-align: center; margin-top: 10px;" id="addCheckbox">Add checklist</button>
          </div>
      </div>
    </div>
    </li>
    <li class="select-menu">
    <div class="dropdown">
      <button type="button" class="btn btn-light dropdown-toggle" id="btn-due" data-toggle="dropdown">
          <i class="far fa-calendar-alt"></i> Due Date
      </button>
      <div class="dropdown-menu">
          <form id="form" name="form" class="form-inline">
              <ul style="flex: 1 0 220px; text-align: left;">
                  <li>
                      <label for="startDate" style="justify-content: left; margin-left: 10px;">Start Date:</label>
                      <input id="startDate" name="startDate" type="text" class="form-control" style="margin:10px; " />
                  </li>
                  <li>
                      <label for="endDate" style="justify-content: left; margin-left: 10px;">End Date:</label>
                      <input id="endDate" name="endDate" type="text" class="form-control" style="margin: 10px;" />
                  </li>
              </ul>
              <button type="submit" class="btn btn-success" style="text-align: center; margin: 10px;">Ok</button>
          </form>
      </div>
    </div>
    </li>
</ul>
</nav>`;

    this.commentsButton.innerText = "Add";
    this.commentsInput.placeholder = "Write a comment...";

    //Event listeners
    this.menuContainer.addEventListener("click", (e) => {
      console.log(e.target);
      if (e.target.classList.contains("menuContainer")) {
        this.menuContainer.remove();
      }
    });
    // event thêm
    this.commentsButton.addEventListener("click", () => {
      if (this.commentsInput.value != "") {
        this.state.comments.push(this.commentsInput.value);
        this.divBottom.innerHTML = this.addContentBottom();
        this.renderComments();
        this.commentsInput.value = "";
      }
    });

    //Append

    this.menu.append(this.menuLeft);
    this.menu.append(this.menuRight);
    this.menuLeft.append(this.menuTitle);
    this.menuLeft.append(this.progressBar);
    this.menuLeft.append(this.menuDescription);
    this.menuLeft.append(this.menuChecklist);
    this.menuLeft.append(this.commentsInput);
    this.menuLeft.append(this.commentsButton);
    this.menuLeft.append(this.menuComments);
    this.formCheckbox.append(this.ulCheckbox);
    this.menuChecklist.append(this.formCheckbox);
    this.menuContainer.append(this.menu);
    root.append(this.menuContainer);

    this.editableDescription = new EditableText(
      this.state.description,
      this.menuDescription,
      this,
      "description",
      "textarea",
      "p"
    );
    this.editableTitle = new EditableText(
      this.state.text,
      this.menuTitle,
      this,
      "text",
      "input",
      "h5"
    );

    this.renderComments();
    this.renderChecklist();
    $(document).ready(function () {
      $("#searchUser").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#users li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
      // mới chỉnh chỗ này chú ý
    });
    this.btnChecklist = document.getElementById("addCheckbox");
    this.checklistInput = document.getElementById("checkboxInput");

    this.btnChecklist.addEventListener("click", () => {
      if (this.checklistInput.value.trim() != "") {
        var checkbox = {
          title: this.checklistInput.value,
          checked: this.checklistInput.checked,
        };
        this.state.checklist.push(checkbox);
        this.renderChecklist();
        this.divBottom.innerHTML = this.addContentBottom();
        this.checklistInput.value = "";
        checklist();
      }
    });

    checklist();
    // due time
    $(function () {
      var sd = new Date(),
        ed = new Date();

      $("#startDate").datetimepicker({
        pickTime: false,
        format: "YYYY/MM/DD",
        defaultDate: sd,
        maxDate: ed,
      });

      $("#endDate").datetimepicker({
        pickTime: false,
        format: "YYYY/MM/DD",
        defaultDate: ed,
        minDate: sd,
      });

      //passing 1.jquery form object, 2.start date dom Id, 3.end date dom Id
      bindDateRangeValidation($("#form"), "startDate", "endDate");
    });
  }
  //Chỉnh comment
  renderComments() {
    let currentCommentsDOM = Array.from(this.menuComments.childNodes);
    currentCommentsDOM.forEach((commentDOM) => {
      commentDOM.remove();
    });
    this.state.comments.forEach((comment) => {
      // new Comment(comment, this.menuComments, this);
      new Comment(
        comment,
        this.menuComments,
        this,
        "Lê Đình Tài",
        "12/12/2020"
      );
    });
  }

  //Chỉnh comment
  renderChecklist() {
    let currentChecklistDOM = Array.from(this.ulCheckbox.childNodes);
    currentChecklistDOM.forEach((item) => {
      item.remove();
    });
    this.state.checklist.forEach((checkbox) => {
      // new Comment(comment, this.menuComments, this);
      new Checklist(checkbox.title, this.ulCheckbox, this, checkbox.checked);
    });
  }
}
// để chỉnh sửa khi click vào text
class EditableText {
  constructor(text, place, card, property, typeOfInput, element = "p") {
    this.text = text;
    this.elementContainer = element;
    this.place = place;
    this.card = card;
    this.property = property;
    this.typeOfInput = typeOfInput;
    this.render();
  }

  render() {
    this.div = document.createElement("div");
    this.p = document.createElement(this.elementContainer);
    this.p.innerText = this.text;

    this.p.addEventListener("click", () => {
      this.showEditableTextArea.call(this);
    });

    this.div.append(this.p);
    this.place.append(this.div);
  }

  showEditableTextArea() {
    let oldText = this.text;

    this.input = document.createElement(this.typeOfInput);
    this.saveButton = document.createElement("button");

    this.p.remove();
    this.input.value = oldText;
    this.saveButton.innerText = "Save";
    this.saveButton.className = "btn-save";
    this.input.classList.add("comment");

    this.saveButton.addEventListener("click", () => {
      this.text = this.input.value;
      this.card.state[this.property] = this.input.value;
      if (this.property == "text") {
        this.card.p.innerText = this.input.value;
      }
      this.div.remove();
      this.render();
    });

    function clickSaveButton(event, object) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        object.saveButton.click();
      }
    }

    this.input.addEventListener("keyup", (e) => {
      if (this.typeOfInput == "input") {
        clickSaveButton(e, this);
      }
    });

    this.div.append(this.input);

    if (this.typeOfInput == "textarea" || this.typeOfInput == "input") {
      this.div.append(this.saveButton);
    }

    this.input.select();
  }
}

class Comment {
  //chưa code xong, cần tạo đối tượng user
  constructor(text, place, card, user, date) {
    this.text = text;
    this.place = place;
    this.card = card;
    this.user = user;
    this.date = date;
    this.render();
  }

  render() {
    this.div = document.createElement("div");
    this.div.className = "comment";
    this.div.innerHTML = this.formatComment();
    this.place.append(this.div);
    LetterAvatar.transform();
  }
  formatComment() {
    return (
      `<div class="media">
<img class="round mr-3 mt-3" width="30" height="30" avatar="` +
      this.user +
      `">
<div class="media-body">
    <h6>` +
      this.user +
      `<small><i>   ` +
      this.date +
      `</i></small></h6>
    <p>
    ` +
      this.text +
      `
    </p>
</div>
</div>`
    );
  }
}

class Checklist {
  constructor(title, place, card, checked = "") {
    this.state = {
      text: title,
      checked: checked,
    };
    this.title = title;
    this.place = place;
    this.card = card;
    this.render();
  }
  render() {
    var lineThrough =
      this.state.checked == "checked" ? "text-decoration: line-through;" : "";
    this.li = document.createElement("li");
    this.li.className = "row";
    this.li.innerHTML =
      `
  <input type="checkbox" name="box1" class="col-sm-1"/` +
      this.state.checked +
      `>
  <p class="col-sm-11" style="margin-left: -20px; ` +
      lineThrough +
      `">` +
      this.state.text +
      `</p>
`;
    this.place.append(this.li);
  }
}

//-------------main------------

let addTodoListInput = document.getElementById("addTodoListInput");
let addTodoListButton = document.getElementById("addTodoListButton");
let memberButton = document.getElementById("btn-member");
let checkButton = document.getElementById("btn-check");
let dueButton = document.getElementById("btn-due");

addTodoListButton.addEventListener("click", () => {
  if (addTodoListInput.value.trim() != "") {
    new todoList(root, addTodoListInput.value);
    addTodoListInput.value = "";
    $(function () {
      $('ul[id^="sort"]')
        .sortable({
          connectWith: ".sortable",
        })
        .disableSelection();
    });
  }
});
for (let i = 0; i < 10; i++) {
  let todoList1 = new todoList(root);
}

// todoList1.input.value = "Xin chào";
// todoList1.addToDo();
// check box
checklist();
