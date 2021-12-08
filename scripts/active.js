const githubLink = document.querySelector("#github-link");
const githubLogo = document.querySelector("#github-logo");
githubLink.addEventListener("pointerenter", () => githubLogo.style.transform = "rotate(540deg)");
githubLink.addEventListener("pointerleave", () => githubLogo.style.transform = "rotate(0deg)");

