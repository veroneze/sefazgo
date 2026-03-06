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
      const currentPath = window.location.pathname.split("/").pop();
      const topbar = container.querySelector(".mui-topbar");
      const toggle = container.querySelector(".mui-topbar__toggle");
      container
        .querySelectorAll("[data-page]")
        .forEach((link) => {
          const page = link.getAttribute("data-page");
          if (page) {
            link.setAttribute("href", `${base}${page}`);
            if (currentPath && page === currentPath) {
              link.setAttribute("aria-current", "page");
            }
          }
        });
      container
        .querySelectorAll("[data-home]")
        .forEach((link) => {
          const page = link.getAttribute("data-home");
          if (page) {
            link.setAttribute("href", `${homeBase}${page}`);
            if (currentPath && page === currentPath) {
              link.setAttribute("aria-current", "page");
            }
          }
        });

      if (topbar && toggle) {
        toggle.addEventListener("click", () => {
          const isOpen = topbar.classList.toggle("mui-topbar--open");
          toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        container.querySelectorAll(".mui-topbar__links a").forEach((link) => {
          link.addEventListener("click", () => {
            topbar.classList.remove("mui-topbar--open");
            toggle.setAttribute("aria-expanded", "false");
          });
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar menu:", error);
    });
})();
