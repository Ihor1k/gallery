import { galleryItems } from "./gallery-items.js"

const instance = basicLightbox.create(`
    <div class="modal"></div>
`)

const refs = {
  galleryList: document.querySelector('.gallery')
}

const galleryMarkup = galleryItems.map(({preview, original, description}) =>
  `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"  
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`).join('')

refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup)
refs.galleryList.addEventListener('click', onGalleryClick)

function onGalleryClick(e) {
  e.preventDefault()

  if (e.target.nodeName !== 'IMG') {
    return
  }

  const imgMarkup = `<img src="${e.target.dataset.source}" width="900" alt="${e.target.alt}"/>`

  instance.show()
  
  refs.modal = document.querySelector('.modal')
  refs.modal.innerHTML = imgMarkup

  document.addEventListener('keydown', onClickEscape)
}

function onClickEscape(e) {
  if (e.code === 'Escape') {
    instance.close()
    document.removeEventListener('keydown', onClickEscape)
  }
}