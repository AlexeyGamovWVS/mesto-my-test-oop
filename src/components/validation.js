const removeErrorSpan = (popup) => {
    const errorSpan = Array.from(popup.querySelectorAll('.popup__item-error'));
    errorSpan.forEach(span => {
      span.textContent = '';
    });
  }

const pickValidityMessage = (inputElement, config) => {
    if (((inputElement.type !== 'url')&&(!inputElement.validity.valueMissing))||(inputElement.validity.valid)) {
      return;
    } else if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(config.customMessages.missedInput);
    } else {
      inputElement.setCustomValidity(config.customMessages.urlMismatch);
    }
  }
  
  //сделаем функции добавления и удаления сообщений об ошибках
  const showError = (errorElement, inputElement, config) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  const hideError = (errorElement, inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
  //сделаем функцию проверки валидности полей формы
  const checkInputValidity = (inputElement, formElement, config) => {
    inputElement.setCustomValidity('');
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    pickValidityMessage (inputElement, config);
    if(!isInputValid) {
      showError(errorElement, inputElement, config);
    } else {
      hideError(errorElement, inputElement, config);
    }
  }
  
  const toggleButton = (button, isActive = false, config) => {
    if(isActive) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = 'disabled';
    }
  }
  
  //сделаем слушатель на каждую форму и вызовем там проверку полей
  const setEventListener = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, formElement, config);
        toggleButton(submitButton, formElement.checkValidity(), config);
      })
    });
    formElement.addEventListener('submit',(evt)=> {
        evt.preventDefault();
        toggleButton(submitButton, false, config);
      });
  }
  
  
  //Проверка отправки форм
  const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
      setEventListener(form, config);
      })
  }
  
export { removeErrorSpan, pickValidityMessage, showError, hideError, checkInputValidity, toggleButton, setEventListener, enableValidation};   
