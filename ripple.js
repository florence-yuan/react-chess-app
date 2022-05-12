function createRipple(event) {
    console.log("ripple");
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    // console.log("top", event.clientY - this.offsetTop - radius);
    circle.style.left = `${event.clientX - this.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - this.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    this.appendChild(circle);
    setTimeout(() => {
        circle.classList.add("active");
    }, 0);

}

function removeRipple() {
    const ripple = this.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.style.opacity = "0";
        ripple.addEventListener("transitionend", () => {
            ripple.remove();
        })
    }
}

const ripples = document.getElementsByClassName("ripple-effect");
for (const ripple of ripples) {
    ripple.addEventListener("mousedown", createRipple);
    ripple.addEventListener("mouseup", removeRipple);
    ripple.addEventListener("mouseleave", removeRipple);
}