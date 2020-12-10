 let root = document.getElementById("root");

 class todoList {
     constructor(place, title = "List", id) {

         this.place = place;
         this.title = title;
         this.cardArray = [];
         this.id = id
         this.render();
     }

     addToDo(id_) {
         let text = this.input.value;
         this.cardArray.push(new Card(text, this.ul, this, id_));
     }

     render() {
         this.createToDoListElement();
         this.place.append(this.todoListElement);
     }

     createToDoListElement() {
         //Create elements
         //  this.form = document.createElement('form')
         //  this.form.setAttribute('method', 'POST')
         //  this.form.setAttribute('action', '/broad/createCard/' + this.id)

         this.h2 = document.createElement('h2');
         this.h2.innerText = this.title;
         this.input = document.createElement('input');
         this.input.classList.add("comment");
         this.input.setAttribute('type', 'text')
         this.input.setAttribute('name', 'textCard' + '/' + this.id)
         this.button = document.createElement('button');
         this.button.innerText = 'Add';
         this.button.classList.add("btn-save");
         this.button.id = "to-do-list-button";
         //  this.button.setAttribute('type', 'submit')
         // ul bao card
         this.ul = document.createElement('ul');
         this.ul.classList.add('sortable');
         this.ul.classList.add('ui-sortable');
         this.ul.id = 'sort';
         // bao ngoài cùng
         this.todoListElement = document.createElement('div');
         this.todoListElement.classList.add("todoList");
         this.todoListElement.setAttribute('id', this.id)
             //  

         //Add Event listener
         this.button.addEventListener('click', () => {
             if (this.input.value != "") {
                 debugger
                 this.addToDo.call(this, '0');
                 //  this.input.value = "";
                 var data = {
                     'id_card': this.id,
                     'text_card': this.input.value
                 }
                 console.log('data')
                 console.log(data)
                 $.ajax({
                     type: 'POST',
                     url: '/broad/create_card',
                     data: data,
                     dataType: 'json'
                 });
                 this.input.value = "";
             }
         });

         //Append elements to the to-do list element
         //  this.todoListElement.append(this.form);

         this.todoListElement.append(this.h2);
         //  this.form.append(this.input)
         this.todoListElement.append(this.input);
         //  this.form.append(this.button)
         this.todoListElement.append(this.button);
         this.todoListElement.append(this.ul);
     }
 }


 class Card {
     constructor(text, place, todoList, id = '') {

         this.place = place;
         this.todoList = todoList;
         this.state = {
             text: text,
             description: "Click to write a description...",
             comments: []
         }
         this.id = id
         this.render();
     }

     render() {
         this.card = document.createElement('li');
         this.card.classList.add("card-item");
         this.card.setAttribute('id', 'id_on_card/' + this.id)
         this.card.addEventListener('click', (e) => {
             if (e.target != this.deleteButton) {
                 this.showMenu.call(this);
             }
         });

         this.p = document.createElement('p');
         this.p.innerText = this.state.text;

         this.deleteButton = document.createElement('button');
         this.deleteButton.innerText = "X";
         this.deleteButton.addEventListener('click', () => {
             this.deleteCard.call(this);
             var data = {
                 'id': this.id
             }
             $.ajax({
                 type: 'POST',
                 url: '/broad/delete_card',
                 data: data,
                 dataType: 'json'
             });
         });

         this.card.append(this.p);
         this.card.append(this.deleteButton);

         this.place.append(this.card);
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
             this.commentsButton = document.createElement('button');
             this.menuComments = document.createElement("div");

             this.menuLeft = document.createElement("div");
             this.menuRight = document.createElement("div");

             //Add class names
             this.menu.className = "menu row";
             this.menuContainer.className = "menuContainer";
             this.menuTitle.className = "menuTitle";
             this.menuDescription.className = "menuDescription";
             this.menuComments.className = "menuComments";
             this.commentsInput.className = "commentsInput comment";
             this.commentsButton.className = "commentsButton btn-save";
             this.menuRight.className = "menu-right col-sm-4";
             this.menuLeft.className = "menu-left col-sm-8";
             // this.

             //Add inner Text
             this.menuRight.innerHTML = ` <nav>
        <ul>
            <li class="title-select">
                ADD TO CARD
            </li>
            <li class="select-menu">
                <Button class="btn btn-light"><i class="fas fa-user"></i> Members</Button>
            </li>
            <li class="select-menu">
                <Button class="btn btn-light"><i class="fas fa-calendar-check"></i> Checklist</Button>
            </li>
            <li class="select-menu">
                <Button class="btn btn-light"><i class="far fa-calendar-alt"></i> Due Date</Button>
            </li>

        </ul>
    </nav>`;
             this.commentsButton.innerText = "Add";
             this.commentsInput.placeholder = "Write a comment...";

             //Event listeners
             this.menuContainer.addEventListener('click', (e) => {
                 console.log(e.target);
                 if (e.target.classList.contains("menuContainer")) {
                     this.menuContainer.remove();
                 }
             });

             this.commentsButton.addEventListener('click', () => {
                 if (this.commentsInput.value != "") {
                     this.state.comments.push(this.commentsInput.value);
                     this.renderComments();
                     this.commentsInput.value = "";
                 }
             })

             //Append
             this.menu.append(this.menuLeft);
             this.menu.append(this.menuRight);

             this.menuLeft.append(this.menuTitle);
             this.menuLeft.append(this.menuDescription);
             this.menuLeft.append(this.commentsInput);
             this.menuLeft.append(this.commentsButton);
             this.menuLeft.append(this.menuComments);

             this.menuContainer.append(this.menu);
             root.append(this.menuContainer);

             this.editableDescription = new EditableText(this.state.description, this.menuDescription, this, "description", "textarea");
             this.editableTitle = new EditableText(this.state.text, this.menuTitle, this, "text", "input");

             this.renderComments();
         }
         //Chỉnh comment
     renderComments() {
         let currentCommentsDOM = Array.from(this.menuComments.childNodes);
         currentCommentsDOM.forEach(commentDOM => {
             commentDOM.remove();
         });
         this.state.comments.forEach(comment => {
             // new Comment(comment, this.menuComments, this);

             new Comment(comment, this.menuComments, this, "Lê Đình Tài", "12/12/2020");
         });
     }
 }

 class EditableText {
     constructor(text, place, card, property, typeOfInput) {
         this.text = text;
         this.place = place;
         this.card = card;
         this.property = property;
         this.typeOfInput = typeOfInput;
         this.render();
     }

     render() {
         this.div = document.createElement("div");
         this.p = document.createElement("p");

         this.p.innerText = this.text;

         this.p.addEventListener('click', () => {
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

         this.saveButton.addEventListener('click', () => {
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
         this.div = document.createElement('div');
         this.div.className = "comment";
         this.div.innerHTML = this.formatComment();
         console.log(this.formatComment());
         this.place.append(this.div);
     }
     formatComment() {
         return `<div class="media p-3">
        <img class="round mr-3 mt-3" width="30" height="30" avatar="` + this.user + `">
        <div class="media-body">
            <h6>` + this.user + `<small><i>   ` + this.date + `</i></small></h6>
            <p>
            ` + this.text + `
            </p>
        </div>
    </div>`;
     }
 }


 //-------------main------------

 let addTodoListInput = document.getElementById("addTodoListInput");
 let addTodoListButton = document.getElementById("addTodoListButton");

 addTodoListButton.addEventListener('click', () => {
     if (addTodoListInput.value.trim() != "") {
         new todoList(root, addTodoListInput.value);
         //  addTodoListInput.value = "";
         $(function() {
             $('ul[id^="sort"]').sortable({
                 connectWith: ".sortable",
             }).disableSelection();
         });
     }
 });


 // dua du lieu vao broad
 $.ajax({
         url: '/api/broad',
         type: 'get'
     })
     .then(data => {
         // lay du lieu tu textCard
         $.ajax({
                 url: '/api/textCard',
                 type: 'get'
             })
             .then(data1 => {

                 console.log('card')
                 console.log(data1)

                 var data_task = data
                     // dua textCard vao data_task['title']
                 for (var i = 0; i < data_task['title'].length; i++) {
                     var id_card = data_task['title'][i]['id_card']
                         // bien a de chua thong tien cac task cung id_card
                     var a = data1.filter(function(x) {
                         return x['id_card'] == id_card
                     })
                     data_task['title'][i]['text_card'] = a[0]['text_card']
                     data_task['title'][i]['id'] = a[0]['id']
                 }

                 var title = data_task['title']

                 console.log('data_task')
                 console.log(data_task)
                 title.forEach(element => {
                     // tao cac todolist
                     let todo = new todoList(root, element['title'], element['id_card'])

                     try {
                         //  var text_card = element['text_card']
                         //  text_card.forEach(element => {
                         //      todo.input.value = element
                         //      todo.addToDo()
                         //      todo.input.value = ''
                         //  });
                         //  console.log(element['text_card'][0])
                         for (var i = 0; i < element['text_card'].length; i++) {
                             todo.input.value = element['text_card'][i]
                             todo.addToDo(element['id'][i])
                             todo.input.value = ''
                         }
                     } catch {}

                 });

                 // ham de bo sung class cho the ul
                 $(function() {
                     $('ul[id^="sort"]').sortable({
                         connectWith: ".sortable",
                     }).disableSelection();
                 });
             })
             .catch(err => {
                 console.log(err)
             })

         console.log(data)
     })
     .catch(err => {
         console.log(err)
     })


 // check box
 $(document).ready(function() {

     // get box count
     var count = 0;
     var checked = 0;

     function countBoxes() {
         count = $("input[type='checkbox']").length;
         console.log(count);
     }

     countBoxes();
     $(":checkbox").click(countBoxes);

     // count checks

     function countChecked() {
         checked = $("input:checked").length;

         var percentage = parseInt(((checked / count) * 100), 10);
         $(".progressbar-bar").progressbar({
             value: percentage
         });
         $(".progressbar-label").text(percentage + "%");
     }

     countChecked();
     $(":checkbox").click(countChecked);
 });



 $(document).ready(function() {   
    $('ul[id^="sort"]').sortable({
        connectWith: ".sortable",
    }).disableSelection();

    // $(".todoList").draggable();
    $(".todoList").droppable({
        drop: function(event, ui) {
            // lấy ra di của thằng cữ
            var idTaskOld = ui.draggable.attr("id");
            console.log('idTaskOld');
            console.log(idTaskOld);
                // lấy của thằng cữ
            var idTaskNew = $(this).attr("id");
            console.log('idTaskNew');
            console.log(idTaskNew);
        }
    });
 });