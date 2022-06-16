var potions = new XMLHttpRequest();

potions.open('GET', 'https://www.dnd5eapi.co/api/equipment-categories/potion');

potions.responseType = 'json';

potions.send();

var weapons = new XMLHttpRequest();

weapons.open('GET', 'https://www.dnd5eapi.co/api/equipment-categories/weapon');

weapons.responseType = 'json';

weapons.send();

var armors = new XMLHttpRequest();

armors.open('GET', 'https://www.dnd5eapi.co/api/equipment-categories/armor');

armors.responseType = 'json';

armors.send();

var alignmentApi = new XMLHttpRequest();

alignmentApi.open('GET', 'https://www.dnd5eapi.co/api/alignments');

alignmentApi.responseType = 'json';

alignmentApi.send();

var races = new XMLHttpRequest();

races.open('GET', 'https://api.open5e.com/races');

races.responseType = 'json';

races.send();

var names = new XMLHttpRequest();

names.open('GET', 'https://randomuser.me/api/');

names.responseType = 'json';

names.send();

var classes = new XMLHttpRequest();

classes.open('GET', 'https://api.open5e.com/classes');

classes.responseType = 'json';

classes.send();

var itemForm = document.querySelector('.items');
var featureForm = document.querySelector('.feature-form');
var regenerate = document.querySelector('.regen');
var alignment = document.querySelector('.alignment');
var role = document.querySelector('.role');
var race = document.querySelector('.race');
var info = document.querySelector('.info');
var description = document.querySelector('.description');
var image = document.querySelector('img');
var view = document.querySelectorAll('.view');
var create = document.querySelector('.create');
var save = document.querySelector('.save');
var yesButton = document.querySelector('.yes-button');
var hiddenTwo = document.querySelector('.hidden-two');
var coldButton = document.querySelector('.cold-button');
var hiddenBackground = document.querySelector('.hidden-background');
var regen = document.querySelector('.regen');
var noChar = document.querySelector('.no-chars');
var currentCharacter;
var savedEntries = document.querySelector('.saved');
var entries = document.querySelector('.entries');
var weapon = document.querySelector('.weapon');
var equipment = document.querySelector('.equipment');
var armor = document.querySelector('.armor');
var potion = document.querySelector('.potion');
var characterConfirm = document.querySelector('.character-confirm');
var confirmRow = document.querySelector('.purchase-row-confirm');

if (data.characters.length === 0) {
  noChar.classList.remove('hidden');
}

function imageSet(newCharacter) {
  image.setAttribute('src', '/images/' + newCharacter.class + '.jpeg');
  newCharacter.image = '/images/' + newCharacter.class + '.jpeg';
}

function inventory() {
  for (var i = 0; i < weapons.response.equipment.length; i++) {
    var options = document.createElement('option');
    var textOptions = document.createTextNode(weapons.response.equipment[i].name);
    options.appendChild(textOptions);
    weapon.appendChild(options);
  }
  for (var j = 0; j < armors.response.equipment.length; j++) {
    var armorOptions = document.createElement('option');
    var armorTextOptions = document.createTextNode(armors.response.equipment[j].name);
    armorOptions.appendChild(armorTextOptions);
    armor.appendChild(armorOptions);
  }
  for (var k = 0; k < potions.response.equipment.length; k++) {
    var potionOptions = document.createElement('option');
    var potionTextOptions = document.createTextNode(potions.response.equipment[k].name);
    potionOptions.appendChild(potionTextOptions);
    potion.appendChild(potionOptions);
  }
}

function characterEntry(entry) {
  var h2Name = document.createElement('h2');
  var h2Class = document.createElement('h2');
  var h2Alignment = document.createElement('h2');
  var h2Race = document.createElement('h2');
  var h2HitDie = document.createElement('h2');
  var h2Size = document.createElement('h2');
  var h2Languages = document.createElement('h2');
  var h2Armor = document.createElement('h2');
  var armorText = document.createTextNode('Armor Proficiency: ' + entry.armorProf);
  var sizeText = document.createTextNode('Size: ' + entry.size);
  var languagesText = document.createTextNode('Languages: ' + entry.languages);
  var nameText = document.createTextNode('Name: ' + entry.name);
  var hitDieText = document.createTextNode('Hit Dice: ' + entry.hitDie);
  var classText = document.createTextNode('Class: ' + entry.class);
  var alignmentText = document.createTextNode('Alignment: ' + entry.alignment);
  var raceText = document.createTextNode('Race: ' + entry.race);
  h2Armor.appendChild(armorText);
  h2Size.appendChild(sizeText);
  h2Languages.appendChild(languagesText);
  h2Name.appendChild(nameText);
  h2HitDie.appendChild(hitDieText);
  h2Class.appendChild(classText);
  h2Alignment.appendChild(alignmentText);
  h2Race.appendChild(raceText);
  info.appendChild(h2Name);
  info.appendChild(h2Class);
  info.appendChild(h2Race);
  info.appendChild(h2Alignment);
  info.appendChild(h2HitDie);
  info.appendChild(h2Armor);
  description.appendChild(h2Size);
  description.appendChild(h2Languages);
  names.open('GET', 'https://randomuser.me/api/');
  names.send();
}

function characterView(character) {
  var firstName = character.name.split(' ');
  var divRow = document.createElement('div');
  divRow.classList.add('row');
  var divBlock = document.createElement('div');
  divBlock.classList.add('block');
  var classImage = document.createElement('img');
  classImage.classList.add('sm-img');
  classImage.setAttribute('src', character.image);
  var pName = document.createElement('p');
  var pRace = document.createElement('p');
  var pClass = document.createElement('p');
  var nameText = document.createTextNode(firstName[0]);
  var raceText = document.createTextNode(character.race);
  var classText = document.createTextNode(character.class);
  pName.appendChild(nameText);
  pRace.appendChild(raceText);
  pClass.appendChild(classText);
  var aRow = document.createElement('div');
  aRow.classList.add('new-row');
  var viewFullColumn = document.createElement('div');
  viewFullColumn.classList.add('column-full');
  viewFullColumn.classList.add('flex');
  var aView = document.createElement('a');
  var aDelete = document.createElement('a');
  aDelete.classList.add('view-char');
  aDelete.classList.add('column-half');
  aDelete.setAttribute('href', '#');
  aDelete.setAttribute('id', character.id);
  aDelete.setAttribute('type', 'delete');
  aDelete.textContent = 'Delete';
  aView.classList.add('view-char');
  aView.classList.add('column-half');
  aView.setAttribute('href', '#');
  aView.setAttribute('type', 'view');
  aView.textContent = 'View';
  aView.setAttribute('id', character.id);
  viewFullColumn.appendChild(aView);
  viewFullColumn.appendChild(aDelete);
  divRow.appendChild(divBlock);
  divBlock.appendChild(classImage);
  divBlock.appendChild(pName);
  divBlock.appendChild(pRace);
  divBlock.appendChild(pClass);
  aRow.appendChild(viewFullColumn);
  entries.appendChild(divRow);
  entries.appendChild(aRow);
}

function viewSwap(event) {
  for (var i = 0; i < 4; i++) {
    if (view[i].getAttribute('data-view') === event) {
      view[i].classList.remove('hidden');
      view[i].classList.add('active');
      data.view = view[i].getAttribute('data-view');
    } else view[i].classList.add('hidden');
    view[i].classList.remove('active');
  }
  featureForm.reset();
}

featureForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var newCharacter = {};
  newCharacter.raceValue = race.value;
  newCharacter.roleValue = role.value;
  newCharacter.alignmentValue = alignment.value;
  if (race.value === 'Random') {
    var randomIndex = Math.floor(Math.random() * races.response.results.length);
    newCharacter.race = races.response.results[randomIndex].name;
  } else { newCharacter.race = race.value; }
  if (role.value === 'Random') {
    var classesIndex = Math.floor(Math.random() * classes.response.results.length);
    newCharacter.class = classes.response.results[classesIndex].name;
  } else { newCharacter.class = role.value; }
  if (alignment.value === 'Random') {
    var alignmentIndex = Math.floor(Math.random() * alignmentApi.response.results.length);
    newCharacter.alignment = alignmentApi.response.results[alignmentIndex].name;
  } else { newCharacter.alignment = alignment.value; }
  newCharacter.name = names.response.results[0].name.first + ' ' + names.response.results[0].name.last;
  for (var i = 0; i < classes.response.results.length; i++) {
    if (newCharacter.class === classes.response.results[i].name) {
      newCharacter.hitDie = classes.response.results[i].hit_dice;
      newCharacter.armorProf = classes.response.results[i].prof_armor;
    }
  }
  for (var j = 0; j < races.response.results.length; j++) {
    if (newCharacter.race === races.response.results[j].name) {
      newCharacter.size = races.response.results[j].size;
      newCharacter.languages = races.response.results[j].languages;
    }
  }
  imageSet(newCharacter);
  newCharacter.size = newCharacter.size.slice(12);
  newCharacter.languages = newCharacter.languages.slice(17);
  currentCharacter = newCharacter;
  characterEntry(newCharacter);
  viewSwap('character-sheet');
  featureForm.reset();
  return currentCharacter;
});

create.addEventListener('click', function () {
  viewSwap('feature-form');
  if (data.characters.length > 0) {
    info.innerHTML = '';
    description.innerHTML = '';
    entries.innerHTML = '';
    noChar.classList.add('hidden');
    sort.classList.add('hidden');
  }
  regen.classList.remove('hidden');
  save.classList.remove('hidden');
  create.classList.add('hidden');
  savedEntries.classList.remove('hidden');
  names.open('GET', 'https://randomuser.me/api/');
  names.send();
});

regenerate.addEventListener('click', function (e) {
  info.innerHTML = '';
  description.innerHTML = '';
  var newCharacter = {};
  if (currentCharacter.raceValue === 'Random') {
    var randomIndex = Math.floor(Math.random() * races.response.results.length);
    newCharacter.race = races.response.results[randomIndex].name;
    newCharacter.raceValue = 'Random';
  } else {
    newCharacter.race = currentCharacter.raceValue;
    newCharacter.raceValue = currentCharacter.raceValue;
  }
  if (currentCharacter.roleValue === 'Random') {
    var classesIndex = Math.floor(Math.random() * classes.response.results.length);
    newCharacter.class = classes.response.results[classesIndex].name;
    newCharacter.roleValue = 'Random';
  } else {
    newCharacter.class = currentCharacter.roleValue;
    newCharacter.roleValue = currentCharacter.roleValue;
  }
  if (currentCharacter.alignmentValue === 'Random') {
    var alignmentIndex = Math.floor(Math.random() * alignmentApi.response.results.length);
    newCharacter.alignment = alignmentApi.response.results[alignmentIndex].name;
    newCharacter.alignmentValue = 'Random';
  } else {
    newCharacter.alignment = currentCharacter.alignmentValue;
    newCharacter.alignmentValue = currentCharacter.alignmentValue;
  }
  newCharacter.name = names.response.results[0].name.first + ' ' + names.response.results[0].name.last;
  for (var i = 0; i < classes.response.results.length; i++) {
    if (newCharacter.class === classes.response.results[i].name) {
      newCharacter.hitDie = classes.response.results[i].hit_dice;
      newCharacter.armorProf = classes.response.results[i].prof_armor;
    }
  }
  for (var j = 0; j < races.response.results.length; j++) {
    if (newCharacter.race === races.response.results[j].name) {
      newCharacter.size = races.response.results[j].size;
      newCharacter.languages = races.response.results[j].languages;
    }
  }
  imageSet(newCharacter);
  newCharacter.size = newCharacter.size.slice(12);
  newCharacter.languages = newCharacter.languages.slice(17);
  currentCharacter = newCharacter;
  characterEntry(newCharacter);
  return currentCharacter;
});

save.addEventListener('click', function () {
  currentCharacter.id = data.nextEntryId;
  data.characters.unshift(currentCharacter);
  viewSwap('feature-form');
  data.nextEntryId++;
});

var sort = document.querySelector('.sort');

savedEntries.addEventListener('click', function (character) {
  info.innerHTML = '';
  description.innerHTML = '';
  sort.classList.remove('hidden');
  create.classList.remove('hidden');
  savedEntries.classList.add('hidden');
  if (data.characters.length === 0) {
    noChar.classList.remove('hidden');
  } else if (data.characters.length > 0) {
    noChar.classList.add('hidden');
  }
  viewSwap('character-entries');
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
});

entries.addEventListener('click', function (temp) {
  var oldNum = temp.target.getAttribute('id');
  var newNum = parseInt(oldNum);
  for (var i = 0; i < data.characters.length; i++) {
    if (newNum === data.characters[i].id) {
      if (temp.target.getAttribute('type') === 'view') {
        entries.innerHTML = '';
        regen.classList.add('hidden');
        save.classList.add('hidden');
        savedEntries.classList.remove('hidden');
        characterEntry(data.characters[i]);
        if (Object.prototype.hasOwnProperty.call(data.characters[i], 'inventory')) {
          var inventoryh2 = document.createElement('h2');
          var inventoryText = document.createTextNode('Inventory: ' + data.characters[i].inventory.weapon + ', ' + data.characters[i].inventory.armor + ', ' + data.characters[i].inventory.potion);
          inventoryh2.appendChild(inventoryText);
          description.appendChild(inventoryh2);
        }
        image.setAttribute('src', data.characters[i].image);
        viewSwap('character-sheet');
      } else if (temp.target.getAttribute('type') === 'delete') {
        hiddenTwo.className = 'visible';
        hiddenBackground.className = 'background';
        yesButton.setAttribute('id', newNum);
      }
    }
  }
});

coldButton.addEventListener('click', function (event) {
  hiddenTwo.className = 'hidden';
  hiddenBackground.className = 'hidden-background';
});

yesButton.addEventListener('click', function (event) {
  var temp = yesButton.getAttribute('id');
  var idCheck = parseInt(temp);
  for (var i = 0; i < data.characters.length; i++) {
    if (idCheck === data.characters[i].id) {
      data.characters.splice(i, 1);
      location.reload();
      viewSwap('character-entries');
    }
  }
});

window.addEventListener('DOMContentLoaded', function (e) {
  var currentView = data.view;
  if (currentView === 'character-entries') {
    create.classList.remove('hidden');
    savedEntries.classList.add('hidden');
    for (var i = 0; i < data.characters.length; i++) {
      characterView(data.characters[i]);
    }
  }
  viewSwap(currentView);
});

equipment.addEventListener('click', function () {
  inventory();
  info.innerHTML = '';
  description.innerHTML = '';
  entries.innerHTML = '';
  create.classList.remove('hidden');
  savedEntries.classList.remove('hidden');
  sort.classList.add('hidden');
  itemForm.reset();
  viewSwap('item-selection');
});

itemForm.addEventListener('click', function (event) {
  if (event.target.classList.contains('purchase')) {
    if (data.characters.length > 0) {
      var label = document.createElement('label');
      label.textContent = 'Select which Character';
      var select = document.createElement('select');
      select.setAttribute('name', 'character');
      select.classList.add('itemCharacter');

      var confirm = document.createElement('a');
      confirm.setAttribute('href', '#');
      confirm.classList.add('confirm-character');
      confirm.textContent = 'Confirm';
      for (var i = 0; i < data.characters.length; i++) {
        var options = document.createElement('option');
        var textOptions = document.createTextNode(data.characters[i].name);
        options.appendChild(textOptions);
        select.appendChild(options);
      }
      label.appendChild(select);
      characterConfirm.appendChild(label);
      confirmRow.appendChild(confirm);
    }
  }
  var temp = document.querySelector('.itemCharacter');
  if (event.target.classList.contains('confirm-character')) {
    var inventory = {};
    inventory.weapon = weapon.value;
    inventory.armor = armor.value;
    inventory.potion = potion.value;
    for (var j = 0; j < data.characters.length; j++) {
      if (temp.value === data.characters[j].name) {
        data.characters[j].inventory = inventory;
      }
    }
    itemForm.reset();
    confirmRow.innerHTML = '';
    characterConfirm.innerHTML = '';
  }
});

var sortButton = document.querySelector('.sort-button');
var sortRace = document.querySelector('.race-sort');
var sortName = document.querySelector('.name-sort');

sortButton.addEventListener('click', function () {
  entries.innerHTML = '';
  data.characters.sort(compareClass);
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
});

sortRace.addEventListener('click', function () {
  entries.innerHTML = '';
  data.characters.sort(compareRaces);
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
});

sortName.addEventListener('click', function () {
  entries.innerHTML = '';
  data.characters.sort(compareName);
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
});

function compareClass(a, b) {
  if (a.class.toLowerCase() < b.class.toLowerCase()) {
    return -1;
  }
  if (a.class.toLowerCase() > b.class.toLowerCase()) {
    return 1;
  }
  return 0;
}

function compareRaces(a, b) {
  if (a.race.toLowerCase() < b.race.toLowerCase()) {
    return -1;
  }
  if (a.race.toLowerCase() > b.race.toLowerCase()) {
    return 1;
  }
  return 0;
}

function compareName(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  return 0;
}
