const progressKey = "sommer-linux-guide-v1";
const stepRequirements = {
  preparar: ["backup", "hardware"],
  cachyos: ["os"],
  escritorio: ["desktop"],
  verificar: ["first-boot"],
};

const checkboxes = [...document.querySelectorAll("[data-check]")];
const sections = [...document.querySelectorAll("[data-step]")];
const stepLinks = [...document.querySelectorAll("[data-step-link]")];
const progressCount = document.querySelector("#progress-count");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector("#progress-track");
const progressMessage = document.querySelector("#progress-message");
const finishCard = document.querySelector("#finish-card");
const toast = document.querySelector("#toast");
let toastTimeout;

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch {
    return {};
  }
}

function saveProgress() {
  const progress = Object.fromEntries(
    checkboxes.map((checkbox) => [checkbox.dataset.check, checkbox.checked]),
  );
  try {
    localStorage.setItem(progressKey, JSON.stringify(progress));
  } catch {
    showToast("El progreso se conservará solo mientras esta página siga abierta.");
  }
}

function isStepComplete(stepId) {
  return stepRequirements[stepId].every((id) =>
    checkboxes.some((checkbox) => checkbox.dataset.check === id && checkbox.checked),
  );
}

function updateProgress() {
  const completed = Object.keys(stepRequirements).filter(isStepComplete).length;
  const total = Object.keys(stepRequirements).length;
  const percentage = (completed / total) * 100;

  progressCount.textContent = `${completed}/${total}`;
  progressFill.style.width = `${percentage}%`;
  progressTrack.setAttribute("aria-valuenow", String(completed));
  progressMessage.textContent = completed === total
    ? "¡Todo listo! Disfruta tu nuevo escritorio."
    : completed === 0
      ? "Un paso a la vez. Puedes volver cuando quieras."
      : `${total - completed} ${total - completed === 1 ? "paso pendiente" : "pasos pendientes"}. Tu avance está guardado.`;

  for (const [stepId] of Object.entries(stepRequirements)) {
    const complete = isStepComplete(stepId);
    const link = document.querySelector(`[data-step-link="${stepId}"]`);
    const button = document.querySelector(`[data-complete="${stepId}"]`);
    link.classList.toggle("is-complete", complete);
    button.classList.toggle("is-complete", complete);
    button.setAttribute("aria-pressed", String(complete));
  }

  finishCard.hidden = completed !== total;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

const savedProgress = readProgress();
for (const checkbox of checkboxes) {
  checkbox.checked = savedProgress[checkbox.dataset.check] === true;
  checkbox.addEventListener("change", () => {
    saveProgress();
    updateProgress();
  });
}
updateProgress();

document.querySelectorAll("[data-complete]").forEach((button) => {
  button.addEventListener("click", () => {
    const stepId = button.dataset.complete;
    const requiredIds = stepRequirements[stepId];
    const requiredCheckboxes = checkboxes.filter((checkbox) =>
      requiredIds.includes(checkbox.dataset.check),
    );
    const shouldComplete = !isStepComplete(stepId);

    for (const checkbox of requiredCheckboxes) {
      checkbox.checked = shouldComplete;
    }

    saveProgress();
    updateProgress();
    if (shouldComplete) {
      showToast("Paso marcado como completado.");
    }
  });
});

document.querySelector("#reset-progress").addEventListener("click", () => {
  for (const checkbox of checkboxes) {
    checkbox.checked = false;
  }
  saveProgress();
  updateProgress();
  showToast("Progreso reiniciado.");
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const code = document.querySelector(`#${button.dataset.copy}`).textContent;
    try {
      await navigator.clipboard.writeText(code);
      showToast("Comandos copiados al portapapeles.");
    } catch {
      window.prompt("Copia estos comandos:", code);
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visibleSections.length === 0) return;

      const activeId = visibleSections[0].target.dataset.step;
      stepLinks.forEach((link) => {
        const active = link.dataset.stepLink === activeId;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-18% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
  );

  sections.forEach((section) => observer.observe(section));
}
