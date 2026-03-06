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
      const backdrop = container.querySelector(".mui-topbar__backdrop");
      const closeBtn = container.querySelector(".mui-topbar__close");

      container.querySelectorAll("[data-page]").forEach((link) => {
        const page = link.getAttribute("data-page");
        if (page) {
          link.setAttribute("href", `${base}${page}`);
          const decodedPage = decodeURIComponent(page);
          if (currentPath && (page === currentPath || decodedPage === currentPath)) {
            link.setAttribute("aria-current", "page");
          }
        }
      });

      container.querySelectorAll("[data-home]").forEach((link) => {
        const page = link.getAttribute("data-home");
        if (page) {
          link.setAttribute("href", `${homeBase}${page}`);
          if (currentPath && page === currentPath) {
            link.setAttribute("aria-current", "page");
          }
        }
      });

      function openMenu() {
        topbar.classList.add("mui-topbar--open");
        toggle.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
      }

      function closeMenu() {
        topbar.classList.remove("mui-topbar--open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }

      if (topbar && toggle) {
        toggle.addEventListener("click", openMenu);

        if (closeBtn) {
          closeBtn.addEventListener("click", closeMenu);
        }

        if (backdrop) {
          backdrop.addEventListener("click", closeMenu);
        }

        container.querySelectorAll(".mui-topbar__drawer nav a").forEach((link) => {
          link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && topbar.classList.contains("mui-topbar--open")) {
            closeMenu();
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar menu:", error);
    });
})();