// Apply a saved preference before the stylesheets paint the page.
(() => {
  let theme = "light";
  try {
    const savedTheme = localStorage.getItem("will-dibo-theme");
    if (savedTheme === "light" || savedTheme === "dark") theme = savedTheme;
  } catch {
    // The site still works if the browser blocks local storage.
  }
  document.documentElement.setAttribute("data-bs-theme", theme);
})();
