
let plus=document.querySelector(".plus")
let swipe=document.querySelector(".swipe")
let formCard=document.querySelector(".card")
let cate=document.querySelector(".categoryColor")
let fullName=document.querySelector("#name")
let card=document.querySelector(".con")
let img=document.querySelector("#imageUrl")
let prupose=document.querySelector("#purpose")
let cateselection=document.querySelector("#Category")
let themeLocal=localStorage.getItem("Theme")
console.log(themeLocal)
if(themeLocal==="dark"){
    document.body.classList.add(`${themeLocal}`)
    let darkbtn=document.querySelector(".darkbtn")
                darkbtn.style.display="initial"
                let lightbtn=document.querySelector(".lightbtn")
                lightbtn.style.display="none"

} else{
    let darkbtn=document.querySelector(".darkbtn")
                darkbtn.style.display="none"
                let lightbtn=document.querySelector(".lightbtn")
                lightbtn.style.display="initial"
                 localStorage.setItem("Theme","light")

}

let Task=[]

let form=document.querySelector("form")

plus.addEventListener("click",()=>{
    const card = document.querySelector(".con"); 
    const formCard = document.querySelector(".card");
    const swipe = document.querySelector(".swipe");
    const cate = document.querySelector(".categoryColor");

    if (!card) return; 

    swipe.style.display = "none";
    card.style.display = "none";
    cate.style.display = "none";
    formCard.style.display = "initial";
})
let close=document.querySelector("#closeBtn")
close.addEventListener("click",()=>{
formCard.style.display="none"
swipe.style.display="initial"
    card.style.display="flex"
    cate.style.display="flex"

})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
   const imageRegex = /^(https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?|data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+)$/i;
 const fullNameRegex = /^([A-Za-z]+[ '-]?){3,}$/;

    const purposeRegex = /^(?:[A-Za-z]{3,}(?:'[A-Za-z]{1,})?\s*){1,12}$/;




    if (!imageRegex.test(img.value) || !fullNameRegex.test(fullName.value) || !purposeRegex.test(prupose.value)){
       let error=document.querySelector(".error")
       error.style.display="initial"
       let input=document.querySelectorAll("input")
       input.forEach(element => {
        
           element.style.border="1px solid red"
       });
       img.value=""
       fullName.value=""
       prupose.value=""
    }
    else{
        let formData={
            img:img.value,
            fullName:fullName.value,
            prupose:prupose.value,
            cate:cateselection.value
            
        } //create obj format and collect data from input
        if(localStorage.getItem("Task")===null){//if There is no Task excuate this
            let oldTasks=[];//create blank array for push obj
            oldTasks.push(formData) //then push input obj to array
        
            localStorage.setItem("Task",JSON.stringify(oldTasks))//then store to local storage because localStorage store only string we have to make obj to  string 
           
            
        }else{// if the data exist in localStorage then excuate this code
            let oldTasks=localStorage.getItem("Task")  //get data from localStorage
            oldTasks=JSON.parse(oldTasks)//because data is sting form we have to convert obj form
            oldTasks.push(formData)//after converting now it's ready to accept new data as a form of obj so we will push data from obj to data
            localStorage.setItem("Task",JSON.stringify(oldTasks))//after pushed data now we have to update the data 
            
            

      

        }
        form.reset()
        showCard()
        formCard.style.display="none"
        swipe.style.display="initial"
         card.style.display="flex"
         cate.style.display="flex"
    }
    
    

   
    
    
}

)
function showCard(){
    let allTasks=localStorage.getItem("Task")
    allTasks=allTasks? JSON.parse(allTasks) :[];
    const con = document.querySelector(".con");
    con.innerHTML=""
    allTasks.forEach(e=>{
       
        
        
      
        const callCard = document.createElement("div");
        callCard.classList.add("callCard");
        
        
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img");
        
        const img = document.createElement("img");
        img.src = e.img;
        img.alt = "profile";
        
        imgDiv.appendChild(img);
        callCard.appendChild(imgDiv);
        
        
        const h2 = document.createElement("h2");
        h2.classList.add("h2");
        h2.textContent = e.fullName;
        callCard.appendChild(h2);
        
        
        const locationDiv = document.createElement("div");
        locationDiv.classList.add("location");
        
        const locUl = document.createElement("ul");
        
        const li1 = document.createElement("li");
        li1.textContent = "Home town";
        const li2 = document.createElement("li");
        li2.textContent = "Singapore";
        
        locUl.appendChild(li1);
        locUl.appendChild(li2);
        locationDiv.appendChild(locUl);
        
        callCard.appendChild(locationDiv);
        
        
        const bookingDiv = document.createElement("div");
        bookingDiv.classList.add("booking");
        
        const bookUl = document.createElement("ul");
        
        const li3 = document.createElement("li");
        li3.textContent ="Purpose" ;
        const li4 = document.createElement("li");
        li4.textContent =e.prupose;
        
        bookUl.appendChild(li3);
        bookUl.appendChild(li4);
        bookingDiv.appendChild(bookUl);
        
        callCard.appendChild(bookingDiv);
        
        // --- Button Group ---
        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("buttonGroup");
        
        const callBtn = document.createElement("button");
        callBtn.classList.add("call");
        callBtn.innerHTML = `<span class="material-symbols-outlined">call</span>Call`;
        
        const msgBtn = document.createElement("button");
        msgBtn.classList.add("message");
        msgBtn.textContent = "Message";
        
        buttonGroup.appendChild(callBtn);
        buttonGroup.appendChild(msgBtn);
        
        callCard.appendChild(buttonGroup);
        
      
        con.appendChild(callCard);
    })

    }
    if (localStorage.getItem("Task")!==null){
        showCard()
    }
    let upbtn=document.querySelector(".uparrow")
    let dnbtn=document.querySelector(".downarrow")
    upbtn.addEventListener("click",()=>{
        
        let fistChild=card.firstElementChild
        let lastChild=card.lastElementChild
        card.insertBefore(lastChild,fistChild)
    })
    dnbtn.addEventListener("click",()=>{
        let firstChild=card.firstElementChild
        let lastChild=card.lastElementChild
        card.insertBefore(firstChild,lastChild)
    })
    let them=document.querySelector(".theme")
    

    //this is theme update and set as in local storage theme
  
    
        let themebtn=document.querySelector(".themButton")
        themebtn.addEventListener("click",()=>{
            document.body.classList.toggle("dark")
            if (document.body.classList.contains("dark")){
    
                let darkbtn=document.querySelector(".darkbtn")
                darkbtn.style.display="initial"
                let lightbtn=document.querySelector(".lightbtn")
                lightbtn.style.display="none"
                localStorage.setItem("Theme","dark")
               
            }
            else{
                 let darkbtn=document.querySelector(".darkbtn")
                darkbtn.style.display="none"
                let lightbtn=document.querySelector(".lightbtn")
                lightbtn.style.display="initial"
                 localStorage.setItem("Theme","light")
                
                
    
            }
        })

    



