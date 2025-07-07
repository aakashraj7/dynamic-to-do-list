function divIsEmpty(){
    var lister = document.getElementById("list-content")
    if(lister.children.length === 0 && lister.textContent.trim.length == 0){
        var emptyMessage = document.createElement("h1")
        emptyMessage.className = "empty-message"
        emptyMessage.textContent = "No Plans Yet"
        emptyMessage.style.textAlign = "center"
        emptyMessage.style.margin = "auto"
        emptyMessage.style.color = "whitesmoke"
        lister.appendChild(emptyMessage)
    }else{
        var inpBox = document.getElementById("inp-box")
        inpBox.placeholder = "Your Next Plan. . ."
    }
    if(lister.querySelector(".elem") !== null && lister.querySelector(".empty-message") !== null){
        var emptyMessage = lister.querySelector(".empty-message")
        lister.removeChild(emptyMessage)
    }
    console.log(lister.querySelector(".elem"))
}
retrieveTasks()
divIsEmpty()
function saveTasks(){
    var i = 0
    while(localStorage.getItem(i.toString()) !== null || localStorage.getItem((i+100).toString) !== null){
        if(localStorage.getItem(i.toString()) !== null){
            localStorage.removeItem(i.toString())
        }
        if(localStorage.getItem((100+i).toString()) !== null){
            localStorage.removeItem((100+i).toString())
        }
        i++
    }
    var lister = document.getElementById("list-content")
    if(lister.childElementCount == 1 && lister.querySelector("h1") !== null){
        messageNow("No Tasks Found !")
        return ""
    }
    var divs = lister.querySelectorAll(".elem")
    var collec = []
    divs.forEach(div => {
        var pair = []
        let span = div.querySelector("span")
        pair.push(span.textContent.trim())
        console.log(span.style.textDecoration)
        console.log(span.style.textDecoration == "line-through")
        if(span.style.textDecoration == "line-through"){
            pair.push(true.toString())
        }else{
            pair.push("")
        }
        collec.push(pair)
    })
    for(let i=0;i<collec.length;i++){
        localStorage.setItem(i.toString(),collec[i][0])
        localStorage.setItem((i+100).toString(),collec[i][1])
    }
    messageNow("Saved all Tasks !")
}
function retrieveTasks(){
    var lister = document.getElementById("list-content")
    let i = 0
    while(localStorage.getItem(i.toString()) !== null){
        //Creating a new element
        var elem = document.createElement("div")
        elem.className = "elem"
        //Creating tik button
        var tikButton = document.createElement("button")
        tikButton.className = "tik"
        tikButton.onclick = stikeText
        // tikButton.innerHTML = "&#10004;"
        //Creating span tag
        var span = document.createElement("span")
        span.innerHTML = localStorage.getItem(i.toString())
        //creating wrong button
        var wrongButton = document.createElement("button")
        wrongButton.onclick = deleteElem
        wrongButton.className = "wrong"
        wrongButton.innerHTML = "&#10006;"
        //Restoring Status
        if(Boolean(localStorage.getItem((100+i).toString())) == true){
            span.style.textDecoration = "line-through"
            tikButton.innerHTML = "&#9719;"
            tikButton.style.color = "lightgreen"
            tikButton.style.backgroundColor = "green"
        }else{
            span.textDecoration = "none"
            tikButton.innerHTML = "&#10004;"
            tikButton.style.backgroundColor = "lightgreen"
            tikButton.style.color = "green"
        }
        //Placing Elements
        elem.appendChild(tikButton)
        elem.appendChild(span)
        elem.appendChild(wrongButton)
        lister.appendChild(elem)
        i++
    }
}
function nextStep(){
    var contain = document.querySelector(".contain");
    var stater = contain.querySelector(".start")
    var savCont = contain.querySelector(".sav-cont")
    stater.style.display = "none" // Hides the Starting Message
    var topH1 = contain.querySelector(".top")
    topH1.style.display = "block"
    var doList = contain.querySelector(".to-do-list")
    doList.style.display = "flex"
    savCont.style.display = "inline"  // Span tag comes back again
    doList.classList.add("animate")
    var inpFld = document.querySelector(".inp-fld")
    inpFld.classList.add("animate")
};
function messageNow(text){
    var msgElem = document.getElementById("message")
    msgElem.innerHTML = text
    msgElem.classList.add("animate-it")
    msgElem.style.display = "block"
    setTimeout(() => {
        msgElem.classList.remove("animate-it")
        msgElem.style.display = "none"
    }, 3000);
}
function addElem(){
    var inpBox = document.getElementById("inp-box");
    var lister = document.getElementById("list-content")
    var val = inpBox.value 
    if(val != ""){
    messageNow("Added !")
    //Adding a new Div Element
    var newDiv = document.createElement("div")
    newDiv.className = "elem"
    //Createing a Tik Button
    var tikButton = document.createElement("button")
    tikButton.title = "Mark / Unmark"
    tikButton.className = "tik"
    tikButton.onclick = stikeText
    tikButton.innerHTML = "&#10004;"
    // Creating a Wrong Button
    var wrongButton = document.createElement("button")
    wrongButton.title = "Remove"
    wrongButton.className = "wrong"
    wrongButton.onclick = deleteElem
    wrongButton.innerHTML = "&#10006;"
    // Creating Span tag
    var spanTag = document.createElement("span")
    spanTag.textContent = val
    newDiv.appendChild(tikButton)
    newDiv.appendChild(spanTag)
    newDiv.appendChild(wrongButton)
    lister.appendChild(newDiv)
    divIsEmpty()
    // Clearning the Input Box
    var inBox = document.getElementById("inp-box")
    inBox.value = ""
    inBox.placeholder = " Your Next Plan . . ."
    }
    else{
        messageNow("No Task Specified")
    }
}
function stikeText(event){
    if(event.target.className == "tik"){
        var parentDiv = event.target.closest(".elem")
        var sTag = parentDiv.querySelector("span")
        var tikBut = parentDiv.querySelector(".tik")
        if(sTag.style.textDecoration == "line-through"){
            sTag.style.textDecoration = "none"
            tikBut.innerHTML = "&#10004;"
            tikBut.style.backgroundColor = "lightgreen"
            tikBut.style.color = "green"
            messageNow("Unmarked !")
        }
        else{
            sTag.style.textDecoration = "line-through"
            tikBut.innerHTML = "&#9719;"
            tikBut.style.backgroundColor = "green"
            tikBut.style.color = "lightgreen"
            messageNow("Marked Done !")
        }
    }
}
function deleteElem(event){
    if(event.target.className == "wrong"){
        messageNow("Plan Removed !")
        var parentDiv = event.target.closest(".elem")
        parentDiv.remove()
        divIsEmpty()
    }
}