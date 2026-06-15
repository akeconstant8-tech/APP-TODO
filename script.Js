const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

addBtn.addEventListener("click", addTask);

// Ajouter une tâche
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${taskText}</span>
        <div class="actions">
            <button class="check">✓</button>
            <button class="delete">✕</button>
        </div>
    `;

    taskList.appendChild(li);

    // Marquer comme terminée
    li.querySelector(".check").addEventListener("click", () => {
        li.classList.toggle("completed");

        // Réappliquer le filtre actif
        const activeFilter = document.querySelector(".filters .active");
        if (activeFilter) {
            applyFilter(activeFilter.dataset.filter);
        }
    });

    // Supprimer une tâche
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
    });

    taskInput.value = "";
}

// Ajout avec la touche Entrée
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Gestion des filtres
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        applyFilter(button.dataset.filter);
    });

});

function applyFilter(filter) {

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {

        switch (filter) {

            case "active":
                task.style.display =
                    task.classList.contains("completed")
                        ? "none"
                        : "flex";
                break;

            case "completed":
                task.style.display =
                    task.classList.contains("completed")
                        ? "flex"
                        : "none";
                break;

            default:
                task.style.display = "flex";
        }

    });
}

/* ==========================
   Fond animé
========================== */

const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const particles = [];

for (let i = 0; i < 120; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
    });
}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(p.x + p.y) % 360},100%,70%)`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animate);
}

animate();