(()=>{"use strict";function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var e=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=new Object(t.headers)}var n,r;return n=e,(r=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"_get",value:function(t){return fetch(this._baseUrl+t,{headers:this._headers}).then(this._checkResponse)}},{key:"_patch",value:function(t,e){return fetch(this._baseUrl+t,{method:"PATCH",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"_post",value:function(t,e){return fetch(this._baseUrl+t,{method:"POST",headers:this._headers,body:JSON.stringify(e)}).then(this._checkResponse)}},{key:"_delete",value:function(t,e,n){return fetch(this._baseUrl+t+e+n,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"_put",value:function(t,e,n){return fetch(this._baseUrl+t+e+n,{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"getUserInfo",value:function(){return this._get("/users/me")}},{key:"getInitialCards",value:function(){return this._get("/cards")}},{key:"changeUserInfo",value:function(t){var e={name:t.name,about:t.about};return this._patch("/users/me",e)}},{key:"changeAvatar",value:function(t){var e={avatar:t.avatar};return this._patch("/users/me/avatar",e)}},{key:"addCard",value:function(t){var e={name:t.name,link:t.link};return this._post("/cards",e)}},{key:"deleteCard",value:function(t){return this._delete("/cards/",t,"")}},{key:"likeCard",value:function(t){return this._put("/cards/",t,"/likes")}},{key:"unlikeCard",value:function(t){return this._delete("/cards/",t,"/likes")}}])&&t(n.prototype,r),e}();function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var r=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=document.querySelector(e),this._job=document.querySelector(n),this._avatar=document.querySelector(".profile__avatar"),this._id}var e,r;return e=t,(r=[{key:"getUserInfo",value:function(){var t={};return t.name=this._name.textContent.trim(),t.job=this._job.textContent.trim(),t.avatar=this._avatar.src,t.id=this._id,t}},{key:"setUserInfo",value:function(t){t.name&&(this._name.textContent=t.name),t.about&&(this._job.textContent=t.about),t.avatar&&(this._avatar.src=t.avatar),t._id&&(this._id=t._id)}}])&&n(e.prototype,r),t}();function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=function(){function t(e,n){var r=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._items=r,this._renderer=o,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderItems",value:function(){var t=this;this._items.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(t){this._container.prepend(t)}}])&&o(e.prototype,n),t}();function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e,n,r,o,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._likes=e.likes,this._templateSelector=n,this._handleCardClick=r,this._handleDeleteButtonClick=o,this._handleLikeButtonClick=i,this._id=e._id,this._ownerId=e.owner._id}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.cloneNode(!0)}},{key:"_fillInCard",value:function(){this._imageElement.src=this._link,this._imageElement.alt=this._name,this._captionElement.textContent=this._name,this._likesCounter.textContent=this._likes.length}},{key:"_setEventListeners",value:function(){var t=this;this._likeButton.addEventListener("click",this._handleLikeButtonClick),this._deleteButton.addEventListener("click",this._handleDeleteButtonClick),this._imageElement.addEventListener("click",(function(){t._handleCardClick(t._name,t._link)}))}},{key:"_isLikedByUser",value:function(t){for(var e in this._likes)if(this._likes[e]._id===t)return!0;return!1}},{key:"_isCreatedByUser",value:function(t){return this._ownerId===t}},{key:"_generateCard",value:function(t,e){return this._cardItem=this._getTemplate(),this._imageElement=this._cardItem.querySelector(".photo-grid__img"),this._captionElement=this._cardItem.querySelector(".photo-grid__caption-text"),this._likeButton=this._cardItem.querySelector(".photo-grid__like-button"),this._deleteButton=this._cardItem.querySelector(".photo-grid__delete-button"),this._likesCounter=this._cardItem.querySelector(".photo-grid__likes-counter"),this._fillInCard(),this._setEventListeners(),t||(this._deleteButton.removeEventListener("click",this._handleDeleteButtonClick),this._deleteButton.remove()),e&&this._likeButton.classList.toggle("photo-grid__like-button_active"),this._cardItem}},{key:"createCardElement",value:function(t){var e=this._isCreatedByUser(t),n=this._isLikedByUser(t);return e?console.log("Подготовлена карточка (создана пользователем):",this):console.log("Подготовлена карточка:",this),this._generateCard(e,n)}},{key:"renderLikeButton",value:function(t){var e=t.likes.length;this._likesCounter.textContent=e,this._likeButton.classList.toggle("photo-grid__like-button_active")}},{key:"getId",value:function(){return this._id}}])&&a(e.prototype,n),t}();function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formElement=document.querySelector(n),this._inputList=Array.from(this._formElement.querySelectorAll(e.inputSelector)),this._buttonElement=this._formElement.querySelector(e.submitButtonSelector),this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass}var e,n;return e=t,(n=[{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_makeButtonInactive",value:function(){this._buttonElement.classList.add(this._inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"_makeButtonActive",value:function(){this._buttonElement.classList.remove(this._inactiveButtonClass),this._buttonElement.disabled=!1}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?this._makeButtonInactive(this._buttonElement):this._makeButtonActive(this._buttonElement)}},{key:"_showInputError",value:function(t,e){var n=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),n.textContent=e,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}},{key:"_isValid",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_setEventListenersForForm",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._isValid(e),t._toggleButtonState()}))}))}},{key:"hideAllInputErrors",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)})),this._toggleButtonState()}},{key:"enableValidation",value:function(){var t=this;this._makeButtonInactive(),this._formElement.addEventListener("submit",(function(e){e.preventDefault(),t._makeButtonInactive()})),this._setEventListenersForForm()}}])&&c(e.prototype,n),t}(),l=".form_type_profile",f={inputSelector:".form__input",submitButtonSelector:".form__submit-button",inactiveButtonClass:"form__submit-button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},h=document.querySelector(l),p=h.querySelector(".form__input_type_name"),_=h.querySelector(".form__input_type_description"),d=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__avatar-edit-button"),v=document.querySelector(".profile__add-button");function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var b=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){27===t.keyCode&&this.close()}},{key:"setEventListeners",value:function(){var t=this,e=this._popup.querySelector(".popup__close-button");this._popup.addEventListener("click",(function(n){n.target!==t._popup&&n.target!==e||t.close()}))}}])&&m(e.prototype,n),t}();function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=C(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},E.apply(this,arguments)}function C(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}function w(t,e){return w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},w(t,e)}function S(t,e){if(e&&("object"===g(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&w(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(r);if(o){var n=O(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return S(this,t)});function a(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,t))._image=e._popup.querySelector(".popup__image"),e._description=e._popup.querySelector(".popup__description"),e}return e=a,(n=[{key:"open",value:function(t,e){this._image.src=e,this._image.alt=t,this._description.textContent=t,E(O(a.prototype),"open",this).call(this)}}])&&k(e.prototype,n),a}(b);function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function L(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=P(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},j.apply(this,arguments)}function P(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=U(t)););return t}function R(t,e){return R=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},R(t,e)}function q(t,e){if(e&&("object"===B(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function U(t){return U=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},U(t)}var T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&R(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=U(r);if(o){var n=U(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return q(this,t)});function a(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleFormSubmit=e,n._form=n._popup.querySelector(".form"),n._inputList=n._form.querySelectorAll(".form__input"),n._submitButton=n._popup.querySelector(".form__submit-button"),n}return e=a,(n=[{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"setEventListeners",value:function(){var t=this;j(U(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){t._handleFormSubmit(e,t._getInputValues())}))}},{key:"close",value:function(){j(U(a.prototype),"close",this).call(this),this._form.reset()}},{key:"changeButtonCaption",value:function(t){this._submitButton.textContent=t}}])&&L(e.prototype,n),a}(b);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function D(){return D="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=V(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},D.apply(this,arguments)}function V(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=N(t)););return t}function M(t,e){return M=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},M(t,e)}function F(t,e){if(e&&("object"===x(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function N(t){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},N(t)}var J=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&M(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=N(r);if(o){var n=N(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return F(this,t)});function a(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,t))._handleConfirmation=e,n._confirmButton=n._popup.querySelector(".popup__submit-button"),n}return e=a,(n=[{key:"open",value:function(t,e){D(N(a.prototype),"open",this).call(this),this._element=t,this._DOMElement=e}},{key:"setEventListeners",value:function(){D(N(a.prototype),"setEventListeners",this).call(this),this._confirmButton.addEventListener("click",this._handleConfirmation)}},{key:"changeButtonCaption",value:function(t){this._confirmButton.textContent=t}},{key:"getElement",value:function(){return this._element}},{key:"getDOMElement",value:function(){return this._DOMElement}}])&&A(e.prototype,n),a}(b);function z(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var H=new e({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-35",headers:{authorization:"db30a410-2ab7-4138-8ef8-6a0a01ce5d6f","Content-Type":"application/json","Access-Control-Allow-Origin":"*"}}),$=new r(".profile__name",".profile__description"),G=new T(".popup_type_edit",(function(t,e){t.preventDefault();var n={name:e["profile-name"],about:e["profile-job"]};G.changeButtonCaption("Сохранение..."),H.changeUserInfo(n).then((function(){$.setUserInfo(n),console.log("Данные пользователя изменены:",$.getUserInfo()),G.close()})).catch((function(t){console.log(t)})).finally((function(){G.changeButtonCaption("Сохранить")}))})),K=new T(".popup_type_avatar",(function(t,e){t.preventDefault(),K.changeButtonCaption("Сохранение...");var n={avatar:e["avatar-link"]};H.changeAvatar(n).then((function(){$.setUserInfo(n),console.log("Данные пользователя изменены:",$.getUserInfo()),K.close()})).catch((function(t){console.log(t)})).finally((function(){K.changeButtonCaption("Сохранить")}))})),Q=new J(".popup_type_delete",(function(){var t=Q.getElement(),e=Q.getDOMElement();Q.changeButtonCaption("Удаление..."),H.deleteCard(t.getId()).then((function(){e.remove(),console.log("Карточка удалена."),Q.close()})).catch((function(t){console.log(t)})).finally((function(){Q.changeButtonCaption("Да")}))})),W=new I(".popup_type_show"),X=new s(f,l),Y=new s(f,".form_type_place"),Z=new s(f,".form_type_avatar");function tt(t){var e=new u(t,"#card",(function(){return W.open(t.name,t.link)}),(function(t){Q.open(e,t.target.closest(".photo-grid__item")),console.log("Карточка для удаления: ",e),console.log("Её DOM-элемент: ",t.target.closest(".photo-grid__item"))}),(function(t){t.target.classList.contains("photo-grid__like-button_active")?H.unlikeCard(e.getId()).then((function(t){e.renderLikeButton(t),console.log("Убран лайк у карточки:",e.getId())})).catch((function(t){console.log(t)})):H.likeCard(e.getId()).then((function(t){e.renderLikeButton(t),console.log("Поставлен лайк карточке:",e.getId())})).catch((function(t){console.log(t)}))}));return e}G.setEventListeners(),W.setEventListeners(),K.setEventListeners(),Q.setEventListeners(),X.enableValidation(),Y.enableValidation(),Z.enableValidation(),d.addEventListener("click",(function(){var t;t=$.getUserInfo(),p.value=t.name,_.value=t.job,X.hideAllInputErrors(),G.open()})),y.addEventListener("click",(function(){Z.hideAllInputErrors(),K.open()})),Promise.all([H.getUserInfo(),H.getInitialCards()]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){u=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return i}}(e,n)||function(t,e){if(t){if("string"==typeof t)return z(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?z(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],a=r[1];$.setUserInfo(o),console.log("Исходные данные о пользователе: ",o),console.log("Заполнена информация о пользователе: ",$.getUserInfo()),console.log("Начало заполнения секции исходными карточками...");var u=new i({items:a,renderer:function(t){var e=tt(t).createCardElement($.getUserInfo().id);u.addItem(e)}},".photo-grid");u.renderItems(),console.log("Конец заполнения секции исходными карточками.");var c=new T(".popup_type_add",(function(t,e){t.preventDefault();var n={name:e["place-name"],link:e["place-link"]};c.changeButtonCaption("Добавление..."),H.addCard(n).then((function(t){var e=tt(t).createCardElement($.getUserInfo().id);u.addItem(e),c.close()})).catch((function(t){console.log(t)})).finally((function(){c.changeButtonCaption("Создать")}))}));c.setEventListeners(),v.addEventListener("click",(function(){Y.hideAllInputErrors(),c.open()}))})).catch((function(t){console.log(t)}))})();