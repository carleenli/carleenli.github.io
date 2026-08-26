console.log("Hello from the external file!");
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".timeline");
  const progressLine = document.getElementById("progressLine");
  const rows = document.querySelectorAll(".timeline-row");

  // 1. Line Fill Calculation Engine
  function updateProgressLine() {
    const rect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate how much of the timeline container has entered the screen
    const totalHeight = rect.height;
    const scrolledInside = (viewportHeight / 2) - rect.top;

    // Bound percentage strictly between 0% and 100%
    let percentage = (scrolledInside / totalHeight) * 100;
    percentage = Math.max(0, Math.min(100, percentage*1.2));

    progressLine.style.height = `${percentage}%`;
  }

  // 2. Card Entrance Detection (Intersection Observer)
  const entryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // Optional: remove if you do not want animation to reset on scroll up
        entry.target.classList.remove("visible");
      }
    });
  }, {
    root: null,
    rootMargin: "-25% 0px -25% 0px", // Fires as elements clear margins
    threshold: 0.1
  });

  // Bind Listeners
  rows.forEach(row => entryObserver.observe(row));
  window.addEventListener("scroll", updateProgressLine);
  
  // Initial frame check
  updateProgressLine();
});
