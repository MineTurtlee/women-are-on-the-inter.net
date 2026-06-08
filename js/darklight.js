tailwind.config = { darkMode: "class" };

const states = ["light", "dark", "system"];
const icons = { light: "sun", dark: "moon", system: "monitor" };
const bg = {light: "bg-black", dark: "bg-white"};

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
    } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
    } else {
        // system
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.classList.toggle("dark", prefersDark);
    }
}

function setIcon(theme) {
    const toggle = document.getElementsByTagName("themetoggler")[0];
    toggle.innerHTML = `<i data-lucide="${icons[theme]}" class="w-4 h-4"></i>`;

    for (const cls of [...toggle.classList]) {
        if (cls.startsWith("bg")) {
            toggle.classList.remove(cls);
        }
    }

    const effectiveTheme = theme === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : theme;

    toggle.classList.add(bg[effectiveTheme]);
    lucide.createIcons();
}

// get current state, default to system
let currentTheme = localStorage.theme || "system";
applyTheme(currentTheme);
setIcon(currentTheme);

const toggle = document.getElementsByTagName("themetoggler")[0];

toggle.addEventListener("click", () => {
    const nextIndex = (states.indexOf(currentTheme) + 1) % states.length;
    currentTheme = states[nextIndex];

    if (currentTheme === "system") {
        delete localStorage.theme; // so system preference takes over
    } else {
        localStorage.theme = currentTheme;
    }

    applyTheme(currentTheme);
    setIcon(currentTheme);
});