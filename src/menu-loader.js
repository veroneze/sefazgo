(() => {
  const script = document.currentScript;
  const menuPath = script?.dataset.menu || "menu.html";
  const base = script?.dataset.base || "";
  const homeBase = script?.dataset.homeBase || "";
  const container = document.querySelector("[data-menu-slot], #menu-slot");

  if (!container) {
    console.warn("Menu container not found.");
    return;
  }

  fetch(menuPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Menu fetch failed: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      container
        .querySelectorAll("[data-page]")
        .forEach((link) => {
          const page = link.getAttribute("data-page");
          if (page) {
            link.setAttribute("href", `${base}${page}`);
          }
        });
      container
        .querySelectorAll("[data-home]")
        .forEach((link) => {
          const page = link.getAttribute("data-home");
          if (page) {
            link.setAttribute("href", `${homeBase}${page}`);
          }
        });
    })
    .catch((error) => {
      console.error("Erro ao carregar menu:", error);
    });
})();
