const MAX_CONCURRENT = 5; // Maximum number of progress bars that can run concurrently
const totalBars = 20; // Total number of progress bars
const bars = []; // Store progress bar objects
const queue = []; // Queue to manage paused bars

function createProgressBar(index) {
  // Create the DOM structure for a progress bar
  const container = document.createElement("div");
  container.className = "progress-container";

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";

  const innerBar = document.createElement("div");
  innerBar.className = "progress-bar-inner";

  progressBar.appendChild(innerBar);
  container.appendChild(progressBar);

  const controls = document.createElement("div");
  controls.className = "controls";

  const pauseBtn = document.createElement("button");
  pauseBtn.textContent = "Pause";
  pauseBtn.className = "button";
  pauseBtn.onclick = () => pauseProgress(index);

  const resumeBtn = document.createElement("button");
  resumeBtn.textContent = "Resume";
  resumeBtn.className = "button";
  resumeBtn.onclick = () => resumeProgress(index);

  controls.appendChild(pauseBtn);
  controls.appendChild(resumeBtn);
  container.appendChild(controls);

  document.getElementById("progress-bars").appendChild(container);

  return { index, innerBar, status: "pending", resolve: null }; // Add status and resolve for management
}

function runProgress(bar) {
  return new Promise((resolve) => {
    let progress = bar.progress ?? 0;

    function updateProgress() {
      if (bar.status === "paused") return; // Stop if paused

      progress += Math.random() * 10; // Increment progress
      if (progress >= 100) {
        progress = 100;
        bar.innerBar.style.width = progress + "%";
        bar.status = "completed";

        resolve(); // Mark as completed
        manageQueue(); // Start the next bar in the queue
      } else {
        bar.innerBar.style.width = progress + "%";
        setTimeout(updateProgress, 100); // Continue updating
      }
      bar.progress = progress; // Save progress
    }

    bar.status = "running";
    updateProgress();
  });
}

function pauseProgress(index) {
  const bar = bars[index];
  if (bar.status === "running") {
    bar.status = "paused";
  }
}

function resumeProgress(index) {
  const bar = bars[index];
  if (bar.status === "paused") {
    bar.status = "pending";
  } else if (bar.status === "completed") {
    bar.status = "pending";
    bar.progress = 0;
    bar.innerBar.style.width = "0%";
  }
  queue.push(bar); // Add it back to the queue
  manageQueue(); // Manage the queue
}

function manageQueue() {
  const runningBars = bars.filter((bar) => bar.status === "running").length;

  // Start more bars if there's room
  while (runningBars < MAX_CONCURRENT && queue.length > 0) {
    const nextBar = queue.shift();
    if (nextBar.status === "pending") {
      runProgress(nextBar);
    }
  }
}

function startProgressBars() {
  // Initialize progress bars
  for (let i = 0; i < totalBars; i++) {
    const bar = createProgressBar(i);
    bars.push(bar);
    queue.push(bar); // Add to the queue initially
  }

  manageQueue(); // Start managing the queue
}

document.getElementById("start").onclick = startProgressBars;
