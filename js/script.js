/* Shared interactions: theme, JSON project rendering, category/search filters,
   and Bootstrap project detail modals. No project cards are hard-coded in HTML. */
(() => {
  "use strict";

  const themeToggle = document.querySelector("#theme-toggle");

  function updateThemeButton() {
    const isDark = document.documentElement.getAttribute("data-bs-theme") === "dark";
    if (!themeToggle) return;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
    themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
  }

  if (themeToggle) {
    updateThemeButton();
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.getAttribute("data-bs-theme") === "dark"
        ? "light" : "dark";
      document.documentElement.setAttribute("data-bs-theme", nextTheme);
      try { localStorage.setItem("will-dibo-theme", nextTheme); } catch { /* Optional persistence. */ }
      updateThemeButton();
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const projectGrid = document.querySelector("#project-grid");
  if (!projectGrid) return; // Other pages only need the shared interactions above.

  const projectStatus = document.querySelector("#project-status");
  const filterButtons = [...document.querySelectorAll("[data-category]")];
  const searchInput = document.querySelector("#project-search");
  const resetButton = document.querySelector("#reset-projects");
  const emptyState = document.querySelector("#empty-state");
  const errorState = document.querySelector("#project-error");
  const retryButton = document.querySelector("#retry-projects");
  const modalElement = document.querySelector("#project-modal");
  const isFeatured = projectGrid.hasAttribute("data-project-limit");

  let projects = [];
  let activeCategory = "All";
  let loadState = "loading";
  let lastTrigger = null;

  // Use textContent for JSON strings so content stays text rather than executable markup.
  function makeElement(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function arrowIcon() {
    const span = makeElement("span", "", "↗");
    span.setAttribute("aria-hidden", "true");
    return span;
  }

  function technologyList(technologies) {
    const list = makeElement("ul", "technology-list");
    list.setAttribute("aria-label", "Technologies used");
    technologies.forEach(technology => {
      const item = makeElement("li");
      item.append(makeElement("span", "badge tech-badge", technology));
      list.append(item);
    });
    return list;
  }

  function makeProjectCard(project, index) {
    const column = makeElement("div", "col-12 col-md-6 col-lg-4");
    const card = makeElement("article", "card project-card");
    const artwork = makeElement("div", "project-art");
    artwork.dataset.tone = project.tone;
    artwork.setAttribute("aria-hidden", "true");
    artwork.append(
      makeElement("span", "project-art-symbol", project.symbol),
      makeElement("span", "project-art-label", project.visualLabel),
      makeElement("span", "project-art-number", String(index + 1).padStart(2, "0"))
    );

    const body = makeElement("div", "card-body");
    const meta = makeElement("div", "project-meta");
    meta.append(makeElement("span", "", project.category), makeElement("span", "", project.context));
    const title = makeElement("h3", "card-title", project.title);
    const description = makeElement("p", "card-text", project.description);
    const action = makeElement(isFeatured ? "a" : "button", "btn-text project-action", "Explore project ");
    action.append(arrowIcon());
    action.setAttribute("aria-label", `Explore ${project.title}`);

    if (isFeatured) {
      action.href = `projects.html?project=${encodeURIComponent(project.id)}`;
    } else {
      action.type = "button";
      action.addEventListener("click", () => openProject(project, action));
    }

    body.append(meta, title, description, technologyList(project.technologies), action);
    card.append(artwork, body);
    column.append(card);
    return column;
  }

  function setControlsDisabled(disabled) {
    filterButtons.forEach(button => { button.disabled = disabled; });
    if (searchInput) searchInput.disabled = disabled;
  }

  function renderProjects() {
    if (loadState !== "ready") return;
    const term = searchInput ? searchInput.value.trim().toLocaleLowerCase() : "";
    const matches = projects.filter(project => {
      const categoryMatches = activeCategory === "All" || project.category === activeCategory;
      const searchableText = [project.title, project.description, project.category, ...project.technologies]
        .join(" ").toLocaleLowerCase();
      return categoryMatches && searchableText.includes(term);
    });
    const shownProjects = isFeatured
      ? matches.slice(0, Number(projectGrid.dataset.projectLimit)) : matches;

    const fragment = document.createDocumentFragment();
    shownProjects.forEach(project => fragment.append(makeProjectCard(project, projects.indexOf(project))));
    projectGrid.replaceChildren(fragment);
    projectGrid.setAttribute("aria-busy", "false");
    if (emptyState) emptyState.hidden = shownProjects.length > 0;

    if (projectStatus) {
      const categoryText = activeCategory === "All" ? "all categories" : activeCategory;
      projectStatus.textContent = isFeatured
        ? `${shownProjects.length} selected projects`
        : `${matches.length} of ${projects.length} projects · ${categoryText}${term ? " · search applied" : ""}`;
    }
    if (resetButton) resetButton.hidden = activeCategory === "All" && term === "";

    filterButtons.forEach(button => {
      const selected = button.dataset.category === activeCategory;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function resetProjects() {
    activeCategory = "All";
    if (searchInput) searchInput.value = "";
    renderProjects();
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      renderProjects();
    });
  });
  if (searchInput) searchInput.addEventListener("input", renderProjects);
  if (resetButton) resetButton.addEventListener("click", resetProjects);
  const emptyReset = document.querySelector("#empty-reset");
  if (emptyReset) emptyReset.addEventListener("click", () => {
    resetProjects();
    if (searchInput) searchInput.focus();
  });

  function fillProjectDetails(project) {
    document.querySelector("#modal-title").textContent = project.title;
    document.querySelector("#modal-category").textContent = `${project.category} / ${project.context}`;
    document.querySelector("#modal-description").textContent = project.description;
    document.querySelector("#modal-learning").textContent = project.learning;
    const highlights = document.querySelector("#modal-highlights");
    highlights.replaceChildren(...project.highlights.map(highlight => makeElement("li", "", highlight)));
    document.querySelector("#modal-technologies").replaceChildren(technologyList(project.technologies));
    document.querySelector("#modal-context").textContent = project.course;
    const sourceLink = document.querySelector("#modal-source");
    // Restrict download links to bundled files; never construct a URL from a project title.
    const hasLocalSource = typeof project.source === "string" && /^downloads\/[a-z0-9-]+\.zip$/.test(project.source);
    sourceLink.hidden = !hasLocalSource;
    if (hasLocalSource) sourceLink.setAttribute("href", project.source);
    else sourceLink.removeAttribute("href");
  }

  function openProject(project, trigger) {
    if (!modalElement) return;
    lastTrigger = trigger;
    fillProjectDetails(project);
    if (window.bootstrap && window.bootstrap.Modal) {
      window.bootstrap.Modal.getOrCreateInstance(modalElement).show();
    } else {
      // A useful fallback if an external Bootstrap script cannot be reached.
      // The native dialog includes browser focus trapping and Escape support.
      const dialog = document.querySelector("#project-fallback");
      const content = document.querySelector("#fallback-content");
      content.replaceChildren(
        makeElement("p", "eyebrow", `${project.category} / ${project.context}`),
        makeElement("h2", "modal-title", project.title),
        makeElement("p", "muted mt-3", project.description),
        makeElement("p", "muted", project.learning),
        technologyList(project.technologies)
      );
      dialog.showModal();
    }
  }

  if (modalElement) {
    modalElement.addEventListener("hidden.bs.modal", () => { if (lastTrigger) lastTrigger.focus(); });
  }
  const fallbackDialog = document.querySelector("#project-fallback");
  const fallbackClose = document.querySelector("#fallback-close");
  if (fallbackClose) fallbackClose.addEventListener("click", () => fallbackDialog.close());
  if (fallbackDialog) fallbackDialog.addEventListener("close", () => { if (lastTrigger) lastTrigger.focus(); });

  function validateProjects(data) {
    if (!Array.isArray(data) || data.length < 5) throw new Error("Expected at least five projects.");
    const ids = new Set();
    data.forEach(project => {
      const textFields = ["id", "title", "category", "description", "context", "course", "learning", "tone", "symbol", "visualLabel"];
      if (!project || textFields.some(field => typeof project[field] !== "string" || !project[field].trim())
        || !Array.isArray(project.technologies) || project.technologies.length === 0
        || project.technologies.some(technology => typeof technology !== "string" || !technology.trim())
        || !Array.isArray(project.highlights) || project.highlights.length === 0
        || project.highlights.some(highlight => typeof highlight !== "string" || !highlight.trim())
        || ids.has(project.id)) {
        throw new Error("A project has missing or invalid data.");
      }
      ids.add(project.id);
    });
    return data;
  }

  async function loadProjects() {
    loadState = "loading";
    setControlsDisabled(true);
    projectGrid.setAttribute("aria-busy", "true");
    projectGrid.replaceChildren(makeElement("p", "load-message", "Loading projects…"));
    if (errorState) errorState.hidden = true;
    if (emptyState) emptyState.hidden = true;
    if (projectStatus) projectStatus.textContent = "Loading project collection…";
    try {
      // The relative URL also works when this repository lives in a GitHub Pages subfolder.
      const response = await fetch("data/projects.json");
      if (!response.ok) throw new Error(`Could not load projects (HTTP ${response.status}).`);
      // response.json() converts the JSON response into an array of JavaScript objects.
      projects = validateProjects(await response.json());
      loadState = "ready";
      setControlsDisabled(false);
      renderProjects();

      // Featured links on Home open the matching project on this page.
      if (!isFeatured && modalElement) {
        const requestedId = new URLSearchParams(window.location.search).get("project");
        const requestedProject = projects.find(project => project.id === requestedId);
        if (requestedProject) {
          const position = projects.indexOf(requestedProject);
          const trigger = projectGrid.children[position].querySelector(".project-action");
          openProject(requestedProject, trigger);
        }
      }
    } catch (error) {
      loadState = "error";
      projectGrid.replaceChildren();
      projectGrid.setAttribute("aria-busy", "false");
      if (projectStatus) projectStatus.textContent = "Projects could not be loaded.";
      if (errorState) errorState.hidden = false;
      else {
        const notice = makeElement("p", "load-message", "The project collection is temporarily unavailable. ");
        const link = makeElement("a", "", "Open the Projects page to retry.");
        link.href = "projects.html";
        notice.append(link);
        projectGrid.append(notice);
      }
      console.error("Portfolio project loading:", error);
    }
  }

  if (retryButton) retryButton.addEventListener("click", loadProjects);
  loadProjects();
})();
