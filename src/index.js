import './pages/index.css';

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