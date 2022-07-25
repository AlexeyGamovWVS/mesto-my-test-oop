import {
  mestoContainer,
  popupZoom,
  popupEdit,
  popupAdd,
  profileName,
  profileDescription,
  updateName,
  updateDescription,
  enableValidationConfig,
  editAvatar,
  profileAvatar,
  spinners,
  cardTemplateSelector,
  zoomPic,
  zoomName,
} from "./components/utils.js";

import "./pages/index.css";
import Api from "./components/Api.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import { removeErrorSpan, FormValidator } from './components/validation.js';  

let adminId;

//Создание экземпляров
const api = new Api({
  url: "https://mesto.nomoreparties.co/plus-cohort-13",
  urlLikes: "https://nomoreparties.co/v1/plus-cohort-13/cards/likes",
  headers: {
    "Content-Type": "application/json",
    Authorization: "5f5f6516-2c69-4593-ad66-9a5c627fc536",
  },
});
const user = new UserInfo({ profileName, profileDescription, profileAvatar });
const imagePopup = new PopupWithImage(popupZoom, zoomPic, zoomName);

const serverCards = new Section(
  {
    renderer: (item) => {
      serverCards.addItem(createCard(item, adminId));
    },
  },
  mestoContainer
);

const editAvatarForm = new PopupWithForm({
  popup: editAvatar,
  submitCallback: (arrayOfInputsValues, form) => {
    const userData = {
      avatar: arrayOfInputsValues[0],
    };
    api
      .editProfilePic(userData)
      .then((data) => {
        user.setUserAvavtar(data);
        form.reset();
        editAvatarForm.close();
      })
      .catch((err) => console.error(err));
  },
});

const popupProfileForm = new PopupWithForm({
  popup: popupEdit,
  submitCallback: (arrayOfInputsValues, form) => {
    const userData = {
      name: arrayOfInputsValues[0],
      about: arrayOfInputsValues[1],
    };
    api
      .editProfileInfo(userData)
      .then((data) => {
        user.setUserInfo(data);
        form.reset();
        popupProfileForm.close();
      })
      .catch((err) => console.log(err));
  },
});

const popupPostAddForm = new PopupWithForm({
  popup: popupAdd,
  submitCallback: (arrayOfInputsValues, form) => {
    const post = {
      name: arrayOfInputsValues[0],
      link: arrayOfInputsValues[1],
    };
    api
      .addCardToServer(post)
      .then((cardData) => {
        serverCards.addItem(createCard(cardData, adminId));
        form.reset();
        popupPostAddForm.close();
      })
      .catch((err) => console.error(err));
  },
});

//создание карточки
function createCard(data, adminId) {
  const card = new Card(
    {
      cardInfo: data,
      handleCardClick: (place, link) => {
        imagePopup.open(link, place);
      },
    },
    api,
    cardTemplateSelector,
    adminId
  );
  return card.getCard();
}

//запуск приложения
Promise.all([api.getProfile(), api.getAllCards()])
  .then(([profile, cards]) => {
    user.setUserInfo(profile);
    user.setUserAvavtar(profile);
    adminId = profile._id;
    serverCards.renderItems(cards);
  })
  .catch((err) => console.log(err));


//установка слушателей

imagePopup.setEventListeners();
popupProfileForm.setEventListeners();
popupPostAddForm.setEventListeners();
editAvatarForm.setEventListeners();

const profileFormValidation = new FormValidator(enableValidationConfig, popupProfileForm.getForm());
const profileAvatarValidation = new FormValidator(enableValidationConfig, editAvatarForm.getForm());
const postFormValidation = new FormValidator(enableValidationConfig, popupPostAddForm.getForm());

profileFormValidation.enableValidation();
profileAvatarValidation.enableValidation();
postFormValidation.enableValidation();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    updateName.value = profileName.textContent;
    updateDescription.value = profileDescription.textContent;
    popupProfileForm.open();
    removeErrorSpan(popupEdit);
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupPostAddForm.open();
  removeErrorSpan(popupAdd);
});

document
  .querySelector(".profile__avatar-button")
  .addEventListener("click", () => {
    editAvatarForm.open();
    removeErrorSpan(editAvatar);
  });

//старый код
//   Promise.all([getProfile(), getAllCards()])
//   .then((data) => {
//     profileName.textContent = data[0].name;
//     profileDescription.textContent = data[0].about;
//     profileAvatar.src = data[0].avatar;
//     profileID = data[0]._id;
//     const serverCards = data[1];
//     serverCards.forEach ((serverCards) => {
//       renderCard (mestoContainer, createCard(serverCards))
//     })
//   })
//   .catch(err => console.log(`Что-то пошло не так: ${err}`))
//   .finally(() => renderLoadingMainContent(false))
/*

about: "Пилот-полярник"
avatar: "https://www.film.ru/sites/default/files/styles/thumb_600x400/public/articles/41336050-1061826.jpg"
cohort: "plus-cohort-13"
name: "Ар Джей Макриди"
_id: "aff48aa652d182768eb1925e"


// Импортируем данные
import { mestoContainer, popupZoom,
   popupEdit, popupAdd, editForm, profileName, profileDescription, updateName, updateDescription,
    addForm, anyPopup, enableValidationConfig, editAvatar, profileAvatar, spinners } from './components/utils.js';
  
  // Импортируем валидацию
  import { removeErrorSpan, enableValidation} from './components/validation.js';  
  
  //Импортируем создание карточек
  import { createCard, addMesto, renderCard, } from './components/card.js';

 // функции для открытия и закрытия попапов
  import { openPopup, closePopup, editProfile, editProfileAvatar, renderLoading } from './components/modal.js';

  import { getProfile, getAllCards } from './components/api.js';

  let profileID = null;

function renderLoadingMainContent (isLoading) {
  if(isLoading) {
    spinners.forEach((spinner) => {
      spinner.classList.add('spinner_visible');
    })
  } else {
    spinners.forEach((spinner) => {
      spinner.classList.remove('spinner_visible');
    })
  }
}

//получаем данные профиля и картинки с сервера
renderLoadingMainContent(true);
  Promise.all([getProfile(), getAllCards()])
  .then((data) => {
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    profileID = data[0]._id;
    const serverCards = data[1];
    serverCards.forEach ((serverCards) => {
      renderCard (mestoContainer, createCard(serverCards))
    })
  })
  .catch(err => console.log(`Что-то пошло не так: ${err}`))
  .finally(() => renderLoadingMainContent(false))
  
  //запускаем валидацию
  enableValidation(enableValidationConfig);

  //слушатель для открытия попапа редактирования профиля
  document.querySelector('.profile__edit-button').addEventListener('click', () => {
    openPopup (popupEdit);
    removeErrorSpan(popupEdit);
    updateName.value = profileName.textContent;
    updateDescription.value = profileDescription.textContent;
  });
  
 
  // слушатель для открытия попапа добавления Места
  document.querySelector('.profile__add-button').addEventListener('click', () => {
    openPopup (popupAdd);
  })
  
  // слушатель для редактирования профиля
  editForm.addEventListener('submit', function (evt) {
    const profileUpdateButton = editForm.querySelector('.popup__button_status_save');
    evt.preventDefault();
    renderLoading(profileUpdateButton, true, '');
    editProfile();
  });
  
  // слушатель для добавления новой картинки с Местом
  addForm.addEventListener('submit', function (evt) {
    const addButton = addForm.querySelector('.popup__button_status_create');
    evt.preventDefault();
    renderLoading(addButton, true, '');
    addMesto (); 
  });

   
  //слушатель для каждого попапа для закрытия по клику на оверлей или на кнопку

  anyPopup.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button_status_close')) {
          closePopup(popup)
        }
    })
  })

  
  //слушатель  для закрытия попапа редактирования аватара
  document.querySelector('.profile__avatar-button').addEventListener('click', () => {
    openPopup (editAvatar);
  });

  // слушатель для кнопки редактирования аватара
  editAvatar.querySelector('.popup_avatar_add').addEventListener('submit', evt => {
    const avatarButton = editAvatar.querySelector('.popup__button_status_save');
    evt.preventDefault();
    renderLoading(avatarButton, true, '');
    editProfileAvatar();
  })

  export { profileID }
  */
