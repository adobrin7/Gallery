"use strict";

/**
 * @property {Object} settings Gallery settings object.
 * @property {string} settings.previewSelector Wrapper selector for gallery thumbnails.
 * @property {string} settings.openedImageWrapperClass Class for wrapping an opened image.
 * @property {string} settings.openedImageClass Opened picture class.
 * @property {string} settings.openedImageScreenClass Class for the screen of an open picture.
 * @property {string} settings.openedImageCloseBtnClass Class for the picture of the button close.
 * @property {string} settings.openedImageCloseBtnSrc Path to button picture open.
 * @property {string} settings.openedImageNextBtnSrc Path to picture with right arrow.
 * @property {string} settings.openedImageNextBtnClass Right Arrow Image Class.
 * @property {string} settings.openedImageBackBtnSrc Path to picture with left arrow.
 * @property {string} settings.openedImageBackBtnClass Left Arrow Clip Art Class.
 * @property {string} settings.imageNotFoundSrc Path to standard placeholder picture.
 */
const gallery = {
  openedImageEl: null,

  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    openedImageNextBtnSrc: 'images/gallery/next.png',
    openedImageNextBtnClass: 'galleryWrapper__next',
    openedImageBackBtnSrc: 'images/gallery/back.png',
    openedImageBackBtnClass: 'galleryWrapper__back',
    imageNotFoundSrc: 'images/gallery/duck.gif',
  },

  /**
   * Initializes the gallery, adds an event handler.
   * @param {Object} settings Settings object for the gallery.
   */
  init(settings) {
    this.settings = Object.assign(this.settings, settings);

    document
      .querySelector(this.settings.previewSelector)
      .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Click event handler for opening a picture.
   * @param {MouseEvent} event Mouse click event.
   * @param {HTMLElement} event.target Mouse click event.
   */
  containerClickHandler(event) {
    if (event.target.tagName !== 'IMG') {
      return;
    }

    this.openedImageEl = event.target;
    this.openImage(event.target.dataset.full_image_url);
  },

  /**
   * Opens a picture.
   * @param {string} src Link to the picture to open.
   */
  openImage(src) {
    const openedImageEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
    const img = new Image();
    img.onload = () => openedImageEl.src = src;
    img.onerror = () => openedImageEl.src = this.settings.imageNotFoundSrc;
    img.src = src;
  },

  /**
   * Returns a container for an open image, or creates such a container if it does not already exist.
   * @returns {Element}
   */
  getScreenContainer() {
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    console.log(galleryWrapperElement);
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    return this.createScreenContainer();
  },

  /**
   * Creates a container for an open image.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    const backBtn = new Image();
    backBtn.classList.add(this.settings.openedImageBackBtnClass);
    backBtn.src = this.settings.openedImageBackBtnSrc;
    galleryWrapperElement.appendChild(backBtn);

    backBtn.addEventListener('click', () => {
      this.openedImageEl = this.getPrevImage();
      this.openImage(this.openedImageEl.dataset.full_image_url);
    });

    const nextBtn = new Image();
    nextBtn.classList.add(this.settings.openedImageNextBtnClass);
    nextBtn.src = this.settings.openedImageNextBtnSrc;
    galleryWrapperElement.appendChild(nextBtn);

    nextBtn.addEventListener('click', () => {
      this.openedImageEl = this.getNextImage();
      this.openImage(this.openedImageEl.dataset.full_image_url);
    });

    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    document.body.appendChild(galleryWrapperElement);
    return galleryWrapperElement;
  },

  /**
   * Returns the next item (picture) from the opened one or the first picture in the container,
   * if the currently open picture is the last one.
   * @returns {Element} The next picture from the currently open.
   */
  getNextImage() {
    const nextSibling = this.openedImageEl.nextElementSibling;
    return nextSibling ? nextSibling : this.openedImageEl.parentElement.firstElementChild;
  },

  /**
   * Returns the previous item (picture) from the opened one or the last picture in the container,
   * if the current open picture is the first.
   * @returns {Element} Previous picture from currently open.
   */
  getPrevImage() {
    const prevSibling = this.openedImageEl.previousElementSibling;
    return prevSibling ? prevSibling : this.openedImageEl.parentElement.lastElementChild;
  },

  /**
   * Closes (removes) the container for an open image.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

window.onload = () => gallery.init({ previewSelector: '.galleryPreviewsContainer' });
