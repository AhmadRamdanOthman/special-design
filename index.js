//click on toggle settengs gear
document.querySelector(".toggle-setting i").addEventListener("click",()=>{
    document.querySelector(".toggle-setting i").classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
})

//switch colors
let colorsLi = document.querySelectorAll(".colors-list li");
let mainColor = window.localStorage.getItem("color-option");
if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color",mainColor);
    colorsLi.forEach((li)=>{
        li.classList.remove("active");
        if(li.dataset.color === mainColor){
            li.classList.add("active");
        };   
    });    
};
colorsLi.forEach((li)=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        window.localStorage.setItem("color-option",e.target.dataset.color);
        activeAdd(e);
    });
});
//switch background
let randomBackground = document.querySelectorAll(".random-background span");
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = window.localStorage.getItem("background-option");
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === "true"){
        backgroundOption = true;
    }else{
        backgroundOption =false;
    }
    randomBackground.forEach(element=>{
        element.classList.remove("active");   
    }); 
    if( backgroundLocalItem === "true"){
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    } 
}; 
randomBackground.forEach((span)=>{
    span.addEventListener("click",(e)=>{
        activeAdd(e)
        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            window.localStorage.setItem("background-option",true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            window.localStorage.setItem("background-option",false);
        };
    });
});
//select landing page element
let landingPage = document.querySelector(".landing-page");
let imgsArray = ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg'];

function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(()=>{
            let randomImg = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage=`url("imgs/${imgsArray[randomImg]}")`;
        },1000);
    }
}

randomizeImgs();

let skills = document.querySelector(".skills");
window.onscroll = function(){
    let skillsOffsetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop =  this.pageYOffset;
    if(windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight) - 100){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach((el)=>{
            el.style.width = el.dataset.progress;
        })
    }else{
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach((el)=>{
            el.style.width = 0;
        })
    }
}
//gallery section
let ourGallery = document.querySelectorAll(".images-box img");
ourGallery.forEach((img)=>{
    img.addEventListener('click',(e)=>{
        let overlay = document.createElement("div");
        overlay.className= 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        if(img.alt !== null){
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        let closeSpan = document.createElement("span");
        closeSpan.className = 'close'
        let closeText = document.createTextNode('X');
        let popupImg = document.createElement("img");
        closeSpan.appendChild(closeText);
        popupBox.appendChild(closeSpan);
        popupImg.src = e.target.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
    })
})
document.addEventListener("click",(e)=>{
    if(e.target.className === "close"){
        e.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }
})
/* Start Nav bullets  */
let navBullets = document.querySelectorAll(".nav-bullets .bullet ");
let allLinks = document.querySelectorAll(".links a ");
function scrollToEveryParts(elements){
    elements.forEach((ele)=>{
        ele.addEventListener("click",(e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({behavior: "smooth"});
        });
    });
};
scrollToEveryParts(navBullets);
scrollToEveryParts(allLinks);
/* End Nav bullets  */
function activeAdd(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach((el)=>{
        el.classList.remove("active");
    })
    ev.target.classList.add("active");
}

let showBullets = document.querySelectorAll(".bullets-option span");
let bulletsLocalItem = window.localStorage.getItem("bullet-option");
if(bulletsLocalItem !== null){
    showBullets.forEach(element=>{
        element.classList.remove("active");   
    }); 
    if( bulletsLocalItem === "true"){
        document.querySelector(".bullets-option .yes").classList.add("active");
        document.querySelector(".nav-bullets").style.display = "block";
    }else{
        document.querySelector(".bullets-option .no").classList.add("active");
        document.querySelector(".nav-bullets").style.display = "none";
    } 
}
showBullets.forEach((span)=>{
    span.addEventListener("click",(e)=>{
        if(e.target.dataset.bullet === "yes"){
            document.querySelector(".nav-bullets").style.display = "block";
            window.localStorage.setItem("bullet-option",true);
        }else{
            document.querySelector(".nav-bullets").style.display = "none";
            window.localStorage.setItem("bullet-option",false);
        };
        activeAdd(e)
    });
})

document.querySelector(".reset-options").onclick = function(){
    window.localStorage.clear();
    window.location.reload()
} 
let toggleBtn = document.querySelector(".toggle-menu");
let myLinks = document.querySelector(".links");
let myMenu = document.querySelector(".toggle-menu");
toggleBtn.onclick = function(e){
    e.stopPropagation()
    myLinks.classList.toggle("open");
    myMenu.classList.toggle("menu-active");
}
document.addEventListener("click",(e)=>{
    if(e.target !== toggleBtn  &&  e.target !== myLinks){
        myMenu.classList.remove("menu-active");
        myLinks.classList.remove("open");
    }
})
myLinks.onclick = function(e){
    e.stopPropagation();
} 