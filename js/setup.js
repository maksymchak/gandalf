'use strict';

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

var NUMBER_OF_WIZARDS = 4;

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');
var wizardTemplate = document.querySelector('#similar-wizard-template').content;

var getRandomItem = function (list) {
  if (!list || !list.length) {
    return null;
  }
  return list[Math.round(Math.random() * (list.length - 1))];
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