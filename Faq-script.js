document.addEventListener("DOMContentLoaded", () => {
  const faqModal = document.getElementById("faqModal");
  const faqContent = document.getElementById("faqModalContent");
  const openFaqBtn = document.getElementById("openFaqBtn");
  const closeFaqBtn = document.getElementById("closeFaqBtn");

  openFaqBtn.addEventListener("click", () => {
    faqModal.classList.remove("hidden");
    faqModal.classList.add("flex");

    setTimeout(() => {
      faqContent.classList.remove("scale-95", "opacity-0");
      faqContent.classList.add("scale-100", "opacity-100");
    }, 10);
  });

  function closeFaqModal() {
    faqContent.classList.remove("scale-100", "opacity-100");
    faqContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      faqModal.classList.remove("flex");
      faqModal.classList.add("hidden");
    }, 300);
  }

  closeFaqBtn.addEventListener("click", closeFaqModal);
  faqModal.addEventListener("click", (e) => {
    if (e.target === faqModal) closeFaqModal();
  });
});
