document.addEventListener('DOMContentLoaded', () => {
  const figures = Array.from(document.querySelectorAll('.project-gallery figure'));

  if (!figures.length) {
    return;
  }

  const lightbox = ensureLightbox();
  const imageEl = lightbox.querySelector('[data-lightbox-image]');
  const captionEl = lightbox.querySelector('[data-lightbox-caption]');
  const closeButton = lightbox.querySelector('[data-lightbox-close]');
  const backdrop = lightbox.querySelector('[data-lightbox-backdrop]');

  let previouslyFocusedElement = null;

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    imageEl.removeAttribute('src');
    captionEl.textContent = '';

    if (previouslyFocusedElement instanceof HTMLElement) {
      previouslyFocusedElement.focus();
    }
  };

  const openLightbox = (figure) => {
    const img = figure.querySelector('img');
    if (!img) {
      return;
    }

    const caption = figure.querySelector('figcaption');

    imageEl.src = img.currentSrc || img.src;
    imageEl.alt = img.alt || '';
    captionEl.textContent = caption ? caption.textContent : '';

    previouslyFocusedElement = document.activeElement;

    lightbox.classList.add('is-open');
    document.body.classList.add('no-scroll');

    closeButton.focus();
  };

  closeButton.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  figures.forEach((figure) => {
    figure.setAttribute('tabindex', '0');
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', 'Visa bilden i fullskärm');

    figure.addEventListener('click', () => openLightbox(figure));
    figure.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(figure);
      }
    });
  });

  function ensureLightbox() {
    const existing = document.querySelector('.lightbox');

    if (existing) {
      return existing;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'lightbox';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-modal', 'true');
    wrapper.setAttribute('aria-label', 'Image preview');
    wrapper.innerHTML = `
      <button class="lightbox__backdrop" type="button" data-lightbox-backdrop></button>
      <figure class="lightbox__figure">
        <img class="lightbox__image" data-lightbox-image alt="" />
        <figcaption class="lightbox__caption" data-lightbox-caption></figcaption>
        <button class="lightbox__close" type="button" aria-label="Stäng" data-lightbox-close>&times;</button>
      </figure>
    `;

    document.body.appendChild(wrapper);

    return wrapper;
  }
});
