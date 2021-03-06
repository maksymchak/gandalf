'use strict';

(function () { 
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var FIREBALL_COLOR = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var NUMBER_OF_WIZARDS = 4;

  var setupDialog = document.querySelector('.setup');
  var wizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardCoat = setupDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setupDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setupDialog.querySelector('.setup-fireball-wrap');

  var getRandomItem = function (list) {
    if (!list || !list.length) {
      return null;
    }
    return list[Math.floor(Math.random() * list.length)];
  };

  var generateWizard = function () {
    return {
      name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
      coatColor: getRandomItem(COAT_COLORS),
      eyesColor: getRandomItem(EYES_COLORS)
    };
  };

  var generateWizardsList = function (number) {
    var wizards = [];
    for (var i = 0; i < number; i++) {
      wizards.push(generateWizard());
    }
    return wizards;
  };

  var renderWizard = function (wizard) {
    var element = wizardTemplate.cloneNode(true);
    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return element;
  };

  var renderWizardsList = function (wizards) {
    var wizardList = setupDialog.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    wizardList.appendChild(fragment);
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  renderWizardsList(generateWizardsList(NUMBER_OF_WIZARDS));


  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(removeWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
    setupDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);




  wizardCoat.addEventListener('click', function() {
    isChangeColor(wizardCoat, COAT_COLORS);
  });

  wizardEyes.addEventListener('click', function() {
    isChangeColor(wizardEyes, EYES_COLORS);
  });

  wizardFireball.addEventListener('click', function() {
    fireballChangeColor(wizardFireball, FIREBALL_COLOR);
  });

  var isChangeColor = function (el, arr) {
    el.style.fill = arr[Math.floor(Math.random() * arr.length)];
  };

  var fireballChangeColor = function (el, arr) {
    el.style.background = arr[Math.floor(Math.random() * arr.length)];
  };
  
  var form = setupDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      setupDialog.classList.add('hidden');
    });
    evt.preventDefault();
  }); 
})();




