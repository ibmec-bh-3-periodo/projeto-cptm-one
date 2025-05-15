function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!track || !prevBtn || !nextBtn) {
    throw new Error('Elementos do DOM não encontrados.');
  }

  let currentIndex = 0;

  function updateCarousel() {
    const ticketWidth = document.querySelector('.ticket').clientWidth;
    track.style.transform = `translateX(-${currentIndex * ticketWidth}px)`;

    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex === document.querySelectorAll('.ticket').length - 1 ? 'hidden' : 'visible';
  }

  nextBtn.addEventListener('click', () => {
    const ticketCount = document.querySelectorAll('.ticket').length;
    if (currentIndex < ticketCount - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  updateCarousel();

  return {
    updateCarousel,
    getCurrentIndex: () => currentIndex,
  };
}

module.exports = { initCarousel };
