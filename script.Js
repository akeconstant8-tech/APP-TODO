const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask(){

    if(taskInput.value.trim() === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskInput.value}</span>
        <div class="actions">
            <button class="check">✓</button>
            <button class="delete">✕</button>
        </div>
    `;

    taskList.appendChild(li);

    li.querySelector(".check").onclick = () =>{
        li.classList.toggle("completed");
    };

    li.querySelector(".delete").onclick = () =>{
        li.remove();
    };

    taskInput.value="";
}

/* Fond animé */
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<120;i++){
    particles.push({
        x:Math.random()*canvas.width,
        y:Math.random()*canvas.height,
        r:Math.random()*3+1,
        dx:(Math.random()-0.5)*0.5,
        dy:(Math.random()-0.5)*0.5
    });
}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsl(${Math.random()*360},100%,70%)`;
        ctx.fill();

        p.x+=p.dx;
        p.y+=p.dy;

        if(p.x<0 || p.x>canvas.width) p.dx*=-1;
        if(p.y<0 || p.y>canvas.height) p.dy*=-1;
    });

    requestAnimationFrame(animate);
}

animate();