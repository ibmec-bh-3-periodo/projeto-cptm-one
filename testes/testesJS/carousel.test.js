

const { initCarousel } = require('../copiasJS/carousel');

describe('Carousel behavior', () => {
  let carousel;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="carousel-track" style="transform: translateX(0px);"></div>
      <button id="prevBtn"></button>
      <button id="nextBtn"></button>
      <div class="ticket" style="width: 200px;"></div>
      <div class="ticket" style="width: 200px;"></div>
      <div class="ticket" style="width: 200px;"></div>
    `;

    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      value: 200,
    });

    carousel = initCarousel(); // Executa o código principal após DOM estar pronto
  });

  test('initial state: prevBtn hidden, nextBtn visible', () => {
    expect(document.getElementById('prevBtn').style.visibility).toBe('hidden');
    expect(document.getElementById('nextBtn').style.visibility).toBe('visible');
  });

  test('clicking next moves carousel and shows prevBtn', () => {
    document.getElementById('nextBtn').click();
    expect(carousel.getCurrentIndex()).toBe(1);
    expect(document.querySelector('.carousel-track').style.transform).toBe('translateX(-200px)');
    expect(document.getElementById('prevBtn').style.visibility).toBe('visible');
  });
});
