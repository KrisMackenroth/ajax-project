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
var image = document.querySelector('.class-image');
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
function imageSet(characterClass) {
  image.setAttribute('src', './images/' + characterClass + '.jpeg');
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
  var optionNone = document.createElement('option');
  var noneText = document.createTextNode('None');
  optionNone.appendChild(noneText);
  weapon.appendChild(optionNone);
  var noneArmor = document.createElement('option');
  var noneArmorText = document.createTextNode('None');
  noneArmor.appendChild(noneArmorText);
  armor.appendChild(noneArmor);
  var nonePotion = document.createElement('option');
  var nonePotionText = document.createTextNode('None');
  nonePotion.appendChild(nonePotionText);
  potion.appendChild(nonePotion);
}

// Creates a character sheet when a character is generated or a saved character is viewed.
function characterEntry(entry) {
  const $sheetName = document.getElementById('sheet-name');
  const $sheetRace = document.getElementById('sheet-race');
  const $sheetClass = document.getElementById('sheet-class');
  const $sheetAlignment = document.getElementById('sheet-alignment');
  const $sheetStats = document.getElementById('sheet-stats');
  const $sheetHitDie = document.getElementById('sheet-hitdie');
  const $sheetSize = document.getElementById('sheet-size');
  const $sheetArmor = document.getElementById('sheet-armor');
  const $sheetLanguages = document.getElementById('sheet-languages');

  $sheetArmor.textContent = 'Armor Proficiency: ' + 20;
  $sheetSize.textContent = 'Size: ' + entry.size;

  $sheetName.textContent = 'Name: ' + entry.name;
  $sheetHitDie.textContent = 'Hit Dice: ' + entry.hitDie;
  $sheetClass.textContent = 'Class: ' + entry.class;
  $sheetAlignment.textContent = 'Alignment: ' + entry.alignment;
  $sheetRace.textContent = 'Race: ' + entry.race;
  $sheetStats.textContent = 'Str: ' + entry.strength + ' ' + 'Dex: ' + entry.dexterity + ' ' + 'Con: ' + entry.constitution + ' ' + 'Int: ' + entry.intelligence + ' ' + 'Wis: ' + entry.wisdom + ' ' + 'Cha: ' + entry.charisma;

  apiRequest('/races/' + entry.race, function () {
    $sheetLanguages.textContent = 'Languages: ' + this.response.language_desc;
    $sheetSize.textContent = "Size: " + this.response.size;
  });

  apiRequest('/classes/' + entry.class, function () {
    $sheetHitDie.textContent = "Hit Die: " + this.response.hit_die;
  });
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
  pClass.classList.add('class-name-entry');
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
  var viewDiv = document.createElement('div');
  viewDiv.classList.add('column-half');
  viewDiv.classList.add('center');
  var deleteDiv = document.createElement('div');
  deleteDiv.classList.add('column-half');
  deleteDiv.classList.add('center');
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
  viewDiv.appendChild(aView);
  deleteDiv.appendChild(aDelete);
  viewFullColumn.appendChild(viewDiv);
  viewFullColumn.appendChild(deleteDiv);
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
  var view = document.querySelectorAll('.view');
  for (var i = 0; i < view.length; i++) {
    if (view[i].getAttribute('data-view') === event) {
      view[i].classList.remove('hidden');
      view[i].classList.add('active');
      data.view = view[i].getAttribute('data-view');
    } else {
      view[i].classList.add('hidden');
      view[i].classList.remove('active');
    }
  }
  featureForm.reset();
}
// If the page is reloaded, character entries are created, as well as allowing the page to switch
// to the view that the user was on prior to the reload.
window.addEventListener('DOMContentLoaded', function (e) {
  inventory();
  viewSwap(data.view);
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
  for (var n = 0; n < data.characters.length; n++) {
    if (data.viewing === data.characters[n].id) {
      characterEntry(data.characters[n]);
      image.setAttribute('src', data.characters[n].image);
    }
  }

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
  newCharacter.race = race.value;
  newCharacter.role = role.value;
  newCharacter.alignment = alignment.value;
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

  if (role.value === 'random') {
    role.value = 'wizard';
  }

  if (race.value === 'random') {
    role.value = 'human';
  }

  if (alignment.value === 'random') {
    role.value = 'Neutral';
  }

  newCharacter.class = role.value;
  newCharacter.race = race.value;
  newCharacter.alignment = alignment.value;

  if (featureForm.name.value === '') {
    newCharacter.name = 'test';
    newCharacter.nameValue = 'Random';
  } else {
    newCharacter.name = featureForm.name.value;
    newCharacter.nameValue = 'Input';
  }
  imageSet(newCharacter.class);
  currentCharacter = newCharacter;
  characterEntry(newCharacter);
  save.classList.remove('hidden');
  viewSwap('character-sheet');
  featureForm.reset();
});

// Handles clicks for the create, saved, and equipment header buttons.
header.addEventListener('click', function (event) {
  if (event.target.classList.contains('create')) {
    viewSwap('feature-form');
    if (data.characters.length > 0) {
      noChar.classList.add('hidden');
    }
    regen.classList.remove('hidden');
  } else if (event.target.classList.contains('saved')) {
    if (data.characters.length === 0) {
      noChar.classList.remove('hidden');
    } else if (data.characters.length > 0) {
      noChar.classList.add('hidden');
    }
    viewSwap('character-entries');
  } else if (event.target.classList.contains('equipment')) {
    itemSelection.reset();
    viewSwap('item-selection');
  }
});

// Handles clicks on the characters entries page.
characterEntries.addEventListener('click', function (event) {
  var oldNum = event.target.getAttribute('id');
  var newNum = parseInt(oldNum);
  if (event.target.classList.contains('class-sort')) {
    characterSelect.textContent = '';
    data.characters.sort(compareClass);
    for (var i = 0; i < data.characters.length; i++) {
      characterView(data.characters[i]);
    }
  } else if (event.target.classList.contains('race-sort')) {
    characterSelect.textContent = '';
    data.characters.sort(compareRaces);
    for (var k = 0; k < data.characters.length; k++) {
      characterView(data.characters[k]);
    }
  } else if (event.target.classList.contains('name-sort')) {
    characterSelect.textContent = '';
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
    if (weapon.value !== 'None') {
      inventory.weapon = weapon.value;
    } else { inventory.weapon = 'No Weapon equipped'; }
    if (armor.value !== 'None') {
      inventory.armor = armor.value;
    } else { inventory.armor = 'No Armor equipped'; }
    if (potion.value !== 'None') {
      inventory.potion = potion.value;
    } else { inventory.potion = 'No Potion acquired'; }
    for (var j = 0; j < data.characters.length; j++) {
      if (temp.value === data.characters[j].name) {
        data.characters[j].inventory = inventory;
      }
    }
    itemSelection.reset();
    confirmRow.textContent = '';
    characterConfirm.textContent = '';
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
      newCharacter.name = 'test';
      newCharacter.nameValue = 'Random';
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
    console.log(currentCharacter);
    currentCharacter.id = data.nextEntryId;
    data.characters.unshift(currentCharacter);
    viewSwap('feature-form');
    data.nextEntryId++;
    location.reload();
  }
});

function apiRequest(url, callback) {
  const a = new XMLHttpRequest();
  a.open('GET', 'https://www.dnd5eapi.co/api' + url);
  a.responseType = 'json';
  a.addEventListener('load', callback);
  a.send();

  return a;
}
