// List of retrieved API's.
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

var strength = document.querySelector('.strength');
var dexterity = document.querySelector('.dexterity');
var wisdom = document.querySelector('.wisdom');
var constitution = document.querySelector('.constitution');
var intelligence = document.querySelector('.intelligence');
var charisma = document.querySelector('.charisma');
var featureForm = document.querySelector('.feature-form');
var alignment = document.querySelector('.alignment');
var role = document.querySelector('.role');
var race = document.querySelector('.race');
var info = document.querySelector('.info');
var description = document.querySelector('.description');
var image = document.querySelector('.class-image');
var view = document.querySelectorAll('.view');
var save = document.querySelector('.save');
var yesButton = document.querySelector('.yes-button');
var regen = document.querySelector('.regen');
var noChar = document.querySelector('.no-chars');
var currentCharacter;
var weapon = document.querySelector('.weapon');
var armor = document.querySelector('.armor');
var potion = document.querySelector('.potion');
var characterConfirm = document.querySelector('.character-confirm');
var confirmRow = document.querySelector('.purchase-row-confirm');
var characterSheet = document.querySelector('.character-info');
var characterSelect = document.querySelector('.character-select');
var header = document.querySelector('header');
var characterEntries = document.querySelector('.character-entries');
var itemSelection = document.querySelector('.item-selection');
var pop = document.querySelector('.pop');
var background = document.querySelector('.background');
var sideImages = document.querySelector('.side-images');

if (data.characters.length === 0) {
  noChar.classList.remove('hidden');
}

// This function sets the image of a character based on if the class name matches the index of an image.
function imageSet(newCharacter) {
  image.setAttribute('src', '/images/' + newCharacter.class + '.jpeg');
  newCharacter.image = '/images/' + newCharacter.class + '.jpeg';
}

// These three functions sort saved entries alphabetically based on class, race, or name.
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

// Populates the inventory with weapons, armor, and potions from the pulled API.
function inventory() {
  weapons.addEventListener('load', function () {
    for (var i = 0; i < weapons.response.equipment.length; i++) {
      var options = document.createElement('option');
      var textOptions = document.createTextNode(weapons.response.equipment[i].name);
      options.appendChild(textOptions);
      weapon.appendChild(options);
    }
  });
  armors.addEventListener('load', function () {
    for (var j = 0; j < armors.response.equipment.length; j++) {
      var armorOptions = document.createElement('option');
      var armorTextOptions = document.createTextNode(armors.response.equipment[j].name);
      armorOptions.appendChild(armorTextOptions);
      armor.appendChild(armorOptions);
    }
  });
  potions.addEventListener('load', function () {
    for (var k = 0; k < potions.response.equipment.length; k++) {
      var potionOptions = document.createElement('option');
      var potionTextOptions = document.createTextNode(potions.response.equipment[k].name);
      potionOptions.appendChild(potionTextOptions);
      potion.appendChild(potionOptions);
    }
  });
}

// Creates a character sheet when a character is generated or a saved character is viewed.
function characterEntry(entry) {
  var h2Name = document.createElement('h2');
  var h2Class = document.createElement('h2');
  var h2Alignment = document.createElement('h2');
  var h2Race = document.createElement('h2');
  var h2HitDie = document.createElement('h2');
  var h2Size = document.createElement('h2');
  var h2Languages = document.createElement('h2');
  var h2Armor = document.createElement('h2');
  var h2Stats = document.createElement('h2');
  var armorText = document.createTextNode('Armor Proficiency: ' + entry.armorProf);
  var sizeText = document.createTextNode('Size: ' + entry.size);
  var languagesText = document.createTextNode('Languages: ' + entry.languages);
  var nameText = document.createTextNode('Name: ' + entry.name);
  var hitDieText = document.createTextNode('Hit Dice: ' + entry.hitDie);
  var classText = document.createTextNode('Class: ' + entry.class);
  var alignmentText = document.createTextNode('Alignment: ' + entry.alignment);
  var raceText = document.createTextNode('Race: ' + entry.race);
  var statsText = document.createTextNode('Str: ' + entry.strength + ' ' + 'Dex: ' + entry.dexterity + ' ' + 'Con: ' + entry.constitution + ' ' + 'Int: ' + entry.intelligence + ' ' + 'Wis: ' + entry.wisdom + ' ' + 'Cha: ' + entry.charisma);
  h2Stats.appendChild(statsText);
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
  description.appendChild(h2Stats);
  description.appendChild(h2Size);
  description.appendChild(h2Languages);
  names.open('GET', 'https://randomuser.me/api/');
  names.send();
}

// Generates all characters that have been saved to local storage.
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
  var pClass = document.createElement('p');
  var nameText = document.createTextNode(firstName[0]);
  var classText = document.createTextNode(character.class);
  pName.appendChild(nameText);
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
  divBlock.appendChild(pClass);
  aRow.appendChild(viewFullColumn);
  characterSelect.appendChild(divRow);
  characterSelect.appendChild(aRow);
}

// Swaps to the correct view depenending on the data-view of the event that is clicked.
function viewSwap(event) {
  for (var i = 0; i < 4; i++) {
    if (view[i].getAttribute('data-view') === event) {
      view[i].classList.remove('hidden');
      view[i].classList.add('active');
      data.view = view[i].getAttribute('data-view');
    } else view[i].classList.add('hidden');
    view[i].classList.remove('active');
    if (data.view === 'character-sheet') {
      sideImages.classList.add('hidden');
    } else { sideImages.classList.remove('hidden'); }
  }
  featureForm.reset();
}
// If the page is reloaded, character entries are created, as well as allowing the page to switch
// to the view that the user was on prior to the reload.
window.addEventListener('DOMContentLoaded', function (e) {
  inventory();
  var currentView = data.view;
  if (currentView === 'feature-form') {
    data.viewing = null;
  }
  if (currentView === 'character-sheet') {
    sideImages.classList.add('hidden');
  } else { sideImages.classList.remove('hidden'); }
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
  for (var n = 0; n < data.characters.length; n++) {
    if (data.viewing === data.characters[n].id) {
      characterEntry(data.characters[n]);
      image.setAttribute('src', data.characters[n].image);
    }
  }
  viewSwap(currentView);
});

function randomStat(stat) {
  if (stat.value === 'Random') {
    var randomNum = Math.floor(Math.random() * 20);
    stat.value = randomNum;
    return stat;
  } else return stat;
}

// Handles character generation and character storage to local storage.
featureForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var newCharacter = {};
  newCharacter.raceValue = race.value;
  newCharacter.roleValue = role.value;
  newCharacter.alignmentValue = alignment.value;
  var statInitial = {};
  statInitial.strength = strength.value;
  statInitial.dexterity = dexterity.value;
  statInitial.constitution = constitution.value;
  statInitial.wisdom = wisdom.value;
  statInitial.intelligence = intelligence.value;
  statInitial.charisma = charisma.value;
  randomStat(strength);
  randomStat(dexterity);
  randomStat(constitution);
  randomStat(wisdom);
  randomStat(intelligence);
  randomStat(charisma);
  newCharacter.strength = strength.value;
  newCharacter.dexterity = dexterity.value;
  newCharacter.constitution = constitution.value;
  newCharacter.wisdom = wisdom.value;
  newCharacter.intelligence = intelligence.value;
  newCharacter.charisma = charisma.value;
  newCharacter.statInitial = statInitial;
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

  if (featureForm.name.value === '') {
    newCharacter.name = names.response.results[0].name.first + ' ' + names.response.results[0].name.last;
    newCharacter.nameValue = 'Random';
  } else {
    newCharacter.name = featureForm.name.value;
    newCharacter.nameValue = 'Input';
  }

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
  save.classList.remove('hidden');
  viewSwap('character-sheet');
  featureForm.reset();
  return currentCharacter;
});

// Handles clicks for the create, saved, and equipment header buttons.
header.addEventListener('click', function (event) {
  if (event.target.classList.contains('create')) {
    viewSwap('feature-form');
    if (data.characters.length > 0) {
      info.innerHTML = '';
      description.innerHTML = '';
      noChar.classList.add('hidden');
    }
    regen.classList.remove('hidden');
    names.open('GET', 'https://randomuser.me/api/');
    names.send();
  } else if (event.target.classList.contains('saved')) {
    info.innerHTML = '';
    description.innerHTML = '';
    if (data.characters.length === 0) {
      noChar.classList.remove('hidden');
    } else if (data.characters.length > 0) {
      noChar.classList.add('hidden');
    }
    viewSwap('character-entries');
  } else if (event.target.classList.contains('equipment')) {
    info.innerHTML = '';
    description.innerHTML = '';
    itemSelection.reset();
    viewSwap('item-selection');
  }
});

// Handles clicks on the characters entries page.
characterEntries.addEventListener('click', function (event) {
  var oldNum = event.target.getAttribute('id');
  var newNum = parseInt(oldNum);
  if (event.target.classList.contains('class-sort')) {
    characterSelect.innerHTML = '';
    data.characters.sort(compareClass);
    for (var i = 0; i < data.characters.length; i++) {
      characterView(data.characters[i]);
    }
  } else if (event.target.classList.contains('race-sort')) {
    characterSelect.innerHTML = '';
    data.characters.sort(compareRaces);
    for (var k = 0; k < data.characters.length; k++) {
      characterView(data.characters[k]);
    }
  } else if (event.target.classList.contains('name-sort')) {
    characterSelect.innerHTML = '';
    data.characters.sort(compareName);
    for (var l = 0; l < data.characters.length; l++) {
      characterView(data.characters[l]);
    }
  }
  for (var m = 0; m < data.characters.length; m++) {
    if (newNum === data.characters[m].id) {
      if (event.target.getAttribute('type') === 'view') {
        regen.classList.add('hidden');
        save.classList.add('hidden');
        data.viewing = data.characters[m].id;
        characterEntry(data.characters[m]);
        if (Object.prototype.hasOwnProperty.call(data.characters[m], 'inventory')) {
          var inventoryh2 = document.createElement('h2');
          var inventoryText = document.createTextNode('Inventory: ' + data.characters[m].inventory.weapon + ', ' + data.characters[m].inventory.armor + ', ' + data.characters[m].inventory.potion);
          inventoryh2.appendChild(inventoryText);
          description.appendChild(inventoryh2);
        }
        image.setAttribute('src', data.characters[m].image);
        viewSwap('character-sheet');
      } else if (event.target.getAttribute('type') === 'delete') {
        pop.classList.remove('hidden');
        background.classList.remove('hidden');
        yesButton.setAttribute('id', newNum);
      }
    }
  }
  if (event.target.classList.contains('cold-button')) {
    pop.classList.add('hidden');
    background.classList.add('hidden');
  } else if (event.target.classList.contains('yes-button')) {
    var temp = yesButton.getAttribute('id');
    var idCheck = parseInt(temp);
    for (var n = 0; n < data.characters.length; n++) {
      if (idCheck === data.characters[n].id) {
        data.characters.splice(n, 1);
        location.reload();
        viewSwap('character-entries');
      }
    }
  }
});

// Handles clicks on the item selection page.
itemSelection.addEventListener('click', function (event) {
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
    itemSelection.reset();
    confirmRow.innerHTML = '';
    characterConfirm.innerHTML = '';
  }
});

// Handles clicks on the character sheet page.
characterSheet.addEventListener('click', function (event) {
  if (event.target.classList.contains('regen')) {
    info.innerHTML = '';
    description.innerHTML = '';
    var newCharacter = {};
    newCharacter.statInitial = currentCharacter.statInitial;
    if (currentCharacter.statInitial.strength === 'Random') {
      var randomNum = Math.floor(Math.random() * 20);
      newCharacter.strength = randomNum;
      newCharacter.statInitial.strength = currentCharacter.statInitial.strength;
    } else {
      newCharacter.statInitial.strength = currentCharacter.statInitial.strength;
      newCharacter.strength = currentCharacter.strength;
    }
    if (currentCharacter.statInitial.dexterity === 'Random') {
      var randomNumTwo = Math.floor(Math.random() * 20);
      newCharacter.dexterity = randomNumTwo;
      newCharacter.statInitial.dexterity = currentCharacter.statInitial.dexterity;
    } else {
      newCharacter.statInitial.dexterity = currentCharacter.statInitial.dexterity;
      newCharacter.dexterity = currentCharacter.dexterity;
    }
    if (currentCharacter.statInitial.charisma === 'Random') {
      var randomNumThree = Math.floor(Math.random() * 20);
      newCharacter.charisma = randomNumThree;
      newCharacter.statInitial.charisma = currentCharacter.statInitial.charisma;
    } else {
      newCharacter.statInitial.charisma = currentCharacter.statInitial.charisma;
      newCharacter.charisma = currentCharacter.charisma;
    }
    if (currentCharacter.statInitial.wisdom === 'Random') {
      var randomNumFour = Math.floor(Math.random() * 20);
      newCharacter.wisdom = randomNumFour;
      newCharacter.statInitial.wisdom = currentCharacter.statInitial.wisdom;
    } else {
      newCharacter.statInitial.wisdom = currentCharacter.statInitial.wisdom;
      newCharacter.wisdom = currentCharacter.wisdom;
    }
    if (currentCharacter.statInitial.intelligence === 'Random') {
      var randomNumFive = Math.floor(Math.random() * 20);
      newCharacter.intelligence = randomNumFive;
      newCharacter.statInitial.intelligence = currentCharacter.statInitial.intelligence;
    } else {
      newCharacter.statInitial.intelligence = currentCharacter.statInitial.intelligence;
      newCharacter.intelligence = currentCharacter.intelligence;
    }
    if (currentCharacter.statInitial.constitution === 'Random') {
      var randomNumSix = Math.floor(Math.random() * 20);
      newCharacter.constitution = randomNumSix;
      newCharacter.statInitial.constitution = currentCharacter.statInitial.constitution;
    } else {
      newCharacter.statInitial.constitution = currentCharacter.statInitial.constitution;
      newCharacter.constitution = currentCharacter.constitution;
    }
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
    if (currentCharacter.nameValue === 'Random') {
      newCharacter.name = names.response.results[0].name.first + ' ' + names.response.results[0].name.last;
    } else {
      newCharacter.name = currentCharacter.name;
      newCharacter.nameValue = currentCharacter.nameValue;
    }
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
  } else if (event.target.classList.contains('save')) {
    currentCharacter.id = data.nextEntryId;
    data.characters.unshift(currentCharacter);
    viewSwap('feature-form');
    data.nextEntryId++;
    location.reload();
  }
});
