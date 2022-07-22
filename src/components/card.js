import { mestoContainer, popupZoom, zoomPic, zoomName, addPopup, placeName, placeUrl, addForm, mestoCards } from './utils.js';

import { openPopup, closePopup, renderLoading } from './modal.js';

import { addCardToServer, removeCardFromServer, changeLikeButton } from './api.js';

import { profileID } from '../index.js';

function countLikes (mestoElement, likesArray) {
  const likeButton = mestoElement.querySelector('.mesto__button');
  const likesCounter = mestoElement.querySelector('.mesto__likes');
  likesCounter.textContent = likesArray.length;
  if (isLiked(likesArray)) {
    likeButton.classList.add('mesto__button_active');
  } else {
    likeButton.classList.remove('mesto__button_active');
  }
}

function isLiked(likesArray) {
  return Boolean(likesArray.find((likeObj) => likeObj._id === profileID))
}

function likeStatusHandler (cardId, isLiked, mestoElement) {
  changeLikeButton(cardId, isLiked)
  .then((data) => countLikes(mestoElement, data.likes))
  .catch(err => console.log(`При установке лайка произошла ошибка: ${err}`))
}


function renderCard (container, card) {
  container.prepend(card);
}

function createCard (data) { 
    const mestoElement = mestoCards.querySelector('.mesto').cloneNode(true);
    const mestoImage = mestoElement.querySelector('.mesto__image');
    const likeButton = mestoElement.querySelector('.mesto__button');

    mestoElement.querySelector('.mesto__title').textContent = data.name;
    mestoImage.src = data.link;
    mestoImage.alt = data.name;
    countLikes(mestoElement, data.likes);

    //включение и закрытие попапа с увеличенной картинкой
    mestoImage.addEventListener('click', () => {
          openPopup(popupZoom);
          zoomPic.src = data.link;
          zoomName.textContent = data.name;
          zoomPic.alt = data.name;
        })

    //установка и снятие лайков
    likeButton.addEventListener('click', () => {
      likeStatusHandler (data._id, likeButton.classList.contains('mesto__button_active'), mestoElement);
          });
  //удаление карточки
  mestoDelete(data, mestoElement);

  return mestoElement;
  };


//функция удаления карточки
function mestoDelete (data, mestoElement) {
  const deleteButton = mestoElement.querySelector('.mesto__delete')
  if (!(data.owner._id === profileID)) {
    return deleteButton.remove();
  } else {
    mestoElement.querySelector('.mesto__delete').addEventListener('click', () => {
      const removeData = `"_id": "${data._id}"`
      removeCardFromServer (data._id, removeData)
      .then(() => mestoElement.remove())
      .catch(err => console.log(`При удалении карточки что-то пошло не так: ${err}`))
    })
  }
}

//Функция для создания новой карточки по кноке
function addMesto() {
  const addButton = addForm.querySelector('.popup__button_status_create');
    const data = {
      link: placeUrl.value,
      name: placeName.value,
      };
    addCardToServer(data)
    .then((data) => {
      renderCard (mestoContainer, createCard(data));
      closePopup (addPopup); 
    })
    .catch(err => console.log(`С добавлением карточки что-то не так: ${err}`))
    .finally(() => renderLoading(addButton, false, 'Создать'))
    placeUrl.value = '';
    placeName.value = ''; 
  }

  export { createCard, addMesto, renderCard, countLikes, mestoDelete };