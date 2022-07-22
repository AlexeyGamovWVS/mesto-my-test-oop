const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];
    
    // массив разворачивается для отображения согласно макету
  
  const initialCardsInRigthOrder = initialCards.reverse();
  
  const mestoContainer = document.querySelector('.elements');
  const popupZoom = document.querySelector('.popup_zoom-picture');
  const zoomPic = document.querySelector('.popup__zoom-pic');
  const zoomName = document.querySelector('.popup__zoom-title');
  const popupEdit = document.querySelector('.popup_form_edit-profile');
  const popupAdd = document.querySelector('.popup_form_new-place');
  const editForm = document.querySelector('.popup_profile-edit');
  const profileAvatar = document.querySelector('.profile__photo');
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.profile__description');
  const updateName = document.querySelector('#name');
  const updateDescription = document.querySelector('#description');
  const addForm = document.querySelector('.popup_place-add');
  const addPopup = document.querySelector('.popup_form_new-place');
  const page = document.querySelector('.page');
  const anyPopup = Array.from(document.querySelectorAll('.popup'));
  const editAvatar = document.querySelector('.popup_edit_avatar');
  const updateAvatarPic = document.querySelector('#avatar-url');
  const placeName = document.querySelector('.popup__item_el_place-name');
  const placeUrl = document.querySelector('.popup__item_el_place-url');
  const mestoCards = document.querySelector('#new-mesto').content;
  const spinners = Array.from(document.querySelectorAll('.spinner'));
  
  const enableValidationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_state_inactive',
    inputErrorClass: 'popup__item_state_invalid',
    customMessages: {
      urlMismatch: 'Введите адрес сайта',
      missedInput: 'Вы пропустили это поле',
    },
  }; 

export { initialCardsInRigthOrder,  mestoContainer, popupZoom, zoomPic, 
    zoomName, popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm,  addPopup, page, anyPopup, editAvatar, enableValidationConfig, placeName, placeUrl, profileAvatar, updateAvatarPic, mestoCards, spinners };