// List of retrieved API's.

function apiRequest(url) {
  const api = new XMLHttpRequest();
  api.open('GET', url);
  api.responseType = 'json';
  api.send();
  return api;
}

const classes = apiRequest('https://api.open5e.com/classes');
const names = apiRequest('https://randomuser.me/api/');
const races = apiRequest('https://api.open5e.com/races');
const alignmentApi = apiRequest('https://www.dnd5eapi.co/api/alignments');
const armors = apiRequest('https://www.dnd5eapi.co/api/equipment-categories/armor');
const weapons = apiRequest('https://www.dnd5eapi.co/api/equipment-categories/weapon');
const potions = apiRequest('https://www.dnd5eapi.co/api/equipment-categories/potion');
const featureForm = document.querySelector('.feature-form');
const alignment = document.querySelector('.alignment');
const role = document.querySelector('.role');
const race = document.querySelector('.race');
const info = document.querySelector('.info');
const description = document.querySelector('.description');
const image = document.querySelector('.class-image');
const view = document.querySelectorAll('.view');
const save = document.querySelector('.save');
const yesButton = document.querySelector('.yes-button');
const regen = document.querySelector('.regen');
const noChar = document.querySelector('.no-chars');
let currentCharacter;
const weapon = document.querySelector('.weapon');
const armor = document.querySelector('.armor');
const potion = document.querySelector('.potion');
const characterConfirm = document.querySelector('.character-confirm');
const confirmRow = document.querySelector('.purchase-row-confirm');
const characterSheet = document.querySelector('.character-info');
const characterSelect = document.querySelector('.character-select');
const header = document.querySelector('header');
const characterEntries = document.querySelector('.character-entries');
const itemSelection = document.querySelector('.item-selection');
const pop = document.querySelector('.pop');
const background = document.querySelector('.background');
const sideImages = document.querySelector('.side-images');

if (data.characters.length === 0) {
  noChar.classList.remove('hidden');
}

function setStat(newCharacter, stat, currentCharacter) {
  if (currentCharacter.statInitial[stat] === 'Random') {
    const randomNum = Math.floor(Math.random() * 20);
    newCharacter[stat] = randomNum;
    newCharacter.statInitial[stat] = currentCharacter.statInitial[stat];
  } else {
    newCharacter.statInitial[stat] = currentCharacter.statInitial[stat];
    newCharacter[stat] = currentCharacter[stat];
  }
}

function setInfo(currentCharacter, newCharacter, infoValue, value, stringValue) {
  if (currentCharacter[infoValue] === 'Random') {
    const randomIndex = Math.floor(Math.random() * value.response.results.length);
    newCharacter[stringValue] = value.response.results[randomIndex].name;
    newCharacter[infoValue] = 'Random';
  } else {
    newCharacter[stringValue] = currentCharacter[infoValue];
    newCharacter[infoValue] = currentCharacter[infoValue];
  }
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
  const optionNone = document.createElement('option');
  const noneText = document.createTextNode('None');
  optionNone.appendChild(noneText);
  weapon.appendChild(optionNone);
  const noneArmor = document.createElement('option');
  const noneArmorText = document.createTextNode('None');
  noneArmor.appendChild(noneArmorText);
  armor.appendChild(noneArmor);
  const nonePotion = document.createElement('option');
  const nonePotionText = document.createTextNode('None');
  nonePotion.appendChild(nonePotionText);
  potion.appendChild(nonePotion);
  weapons.addEventListener('load', function () {
    for (let i = 0; i < weapons.response.equipment.length; i++) {
      const options = document.createElement('option');
      const textOptions = document.createTextNode(weapons.response.equipment[i].name);
      options.appendChild(textOptions);
      weapon.appendChild(options);
    }
  });
  armors.addEventListener('load', function () {
    for (let j = 0; j < armors.response.equipment.length; j++) {
      const armorOptions = document.createElement('option');
      const armorTextOptions = document.createTextNode(armors.response.equipment[j].name);
      armorOptions.appendChild(armorTextOptions);
      armor.appendChild(armorOptions);
    }
  });
  potions.addEventListener('load', function () {
    for (let k = 0; k < potions.response.equipment.length; k++) {
      const potionOptions = document.createElement('option');
      const potionTextOptions = document.createTextNode(potions.response.equipment[k].name);
      potionOptions.appendChild(potionTextOptions);
      potion.appendChild(potionOptions);
    }
  });
}

// Creates a character sheet when a character is generated or a saved character is viewed.
function characterEntry(entry) {
  const h2Name = document.createElement('h2');
  const h2Class = document.createElement('h2');
  const h2Alignment = document.createElement('h2');
  const h2Race = document.createElement('h2');
  const h2HitDie = document.createElement('h2');
  const h2Size = document.createElement('h2');
  const h2Languages = document.createElement('h2');
  const h2Armor = document.createElement('h2');
  const h2Stats = document.createElement('h2');
  const armorText = document.createTextNode('Armor Proficiency: ' + entry.armorProf);
  const sizeText = document.createTextNode('Size: ' + entry.size);
  const languagesText = document.createTextNode('Languages: ' + entry.languages);
  const nameText = document.createTextNode('Name: ' + entry.name);
  const hitDieText = document.createTextNode('Hit Dice: ' + entry.hitDie);
  const classText = document.createTextNode('Class: ' + entry.class);
  const alignmentText = document.createTextNode('Alignment: ' + entry.alignment);
  const raceText = document.createTextNode('Race: ' + entry.race);
  const statsText = document.createTextNode('Str: ' + entry.strength + ' ' + 'Dex: ' + entry.dexterity + ' ' + 'Con: ' + entry.constitution + ' ' + 'Int: ' + entry.intelligence + ' ' + 'Wis: ' + entry.wisdom + ' ' + 'Cha: ' + entry.charisma);
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
  const firstName = character.name.split(' ');
  const divRow = document.createElement('div');
  divRow.classList.add('row');
  const divBlock = document.createElement('div');
  divBlock.classList.add('block');
  const classImage = document.createElement('img');
  classImage.classList.add('sm-img');
  classImage.setAttribute('src', character.image);
  const pName = document.createElement('p');
  const pClass = document.createElement('p');
  pClass.classList.add('class-name-entry');
  const nameText = document.createTextNode(firstName[0]);
  const classText = document.createTextNode(character.class);
  pName.appendChild(nameText);
  pClass.appendChild(classText);
  const aRow = document.createElement('div');
  aRow.classList.add('new-row');
  const viewFullColumn = document.createElement('div');
  viewFullColumn.classList.add('column-full');
  viewFullColumn.classList.add('flex');
  const aView = document.createElement('a');
  const viewDiv = document.createElement('div');
  viewDiv.classList.add('column-half');
  viewDiv.classList.add('center');
  const deleteDiv = document.createElement('div');
  deleteDiv.classList.add('column-half');
  deleteDiv.classList.add('center');
  const aDelete = document.createElement('a');
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
  for (let i = 0; i < 4; i++) {
    if (view[i].getAttribute('data-view') === event) {
      view[i].classList.remove('hidden');
      view[i].classList.add('active');
      data.view = view[i].getAttribute('data-view');
    } else view[i].classList.add('hidden');
    view[i].classList.remove('active');
    if (data.view === 'character-sheet') {
      url.classList.add('hidden');
      urlInput.classList.add('hidden');
      sideImages.classList.add('hidden');
    } else { sideImages.classList.remove('hidden'); }
  }
  featureForm.reset();
}
// If the page is reloaded, character entries are created, as well as allowing the page to switch
// to the view that the user was on prior to the reload.
window.addEventListener('DOMContentLoaded', function (e) {
  inventory();
  let currentView = data.view;
  if (currentView === 'character-sheet' && data.viewing === null) {
    currentView = 'feature-form';
  }
  if (currentView === 'feature-form' || currentView === 'character-entries') {
    data.viewing = null;
  }
  if (currentView === 'character-sheet') {
    sideImages.classList.add('hidden');
  } else { sideImages.classList.remove('hidden'); }
  for (let i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
  for (let n = 0; n < data.characters.length; n++) {
    if (data.viewing === data.characters[n].id) {
      characterEntry(data.characters[n]);
      image.setAttribute('src', data.characters[n].image);
    }
  }
  viewSwap(currentView);
});

function randomStat(stat) {
  if (stat.value === 'Random') {
    const randomNum = Math.floor(Math.random() * 20);
    stat.value = randomNum;
    return stat;
  } else return stat;
}

function setRandom(type, newCharacter, api, typeString) {
  if (type.value === 'Random') {
    const randomIndex = Math.floor(Math.random() * api.response.results.length);
    newCharacter[typeString] = api.response.results[randomIndex].name;
  } else { newCharacter[typeString] = type.value; }
}

// Handles character generation and character storage to local storage.
featureForm.addEventListener('submit', function (e) {
  const strength = document.querySelector('.strength');
  const dexterity = document.querySelector('.dexterity');
  const wisdom = document.querySelector('.wisdom');
  const constitution = document.querySelector('.constitution');
  const intelligence = document.querySelector('.intelligence');
  const charisma = document.querySelector('.charisma');
  e.preventDefault();
  const newCharacter = {};
  newCharacter.raceValue = race.value;
  newCharacter.roleValue = role.value;
  newCharacter.alignmentValue = alignment.value;
  const statInitial = {};
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
  setRandom(race, newCharacter, races, 'race');
  setRandom(role, newCharacter, classes, 'class');
  setRandom(alignment, newCharacter, alignmentApi, 'alignment');
  if (featureForm.name.value === '') {
    newCharacter.name = names.response.results[0].name.first + ' ' + names.response.results[0].name.last;
    newCharacter.nameValue = 'Random';
  } else {
    newCharacter.name = featureForm.name.value;
    newCharacter.nameValue = 'Input';
  }

  for (let i = 0; i < classes.response.results.length; i++) {
    if (newCharacter.class === classes.response.results[i].name) {
      newCharacter.hitDie = classes.response.results[i].hit_dice;
      newCharacter.armorProf = classes.response.results[i].prof_armor;
    }
  }
  for (let j = 0; j < races.response.results.length; j++) {
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
  url.classList.remove('hidden');
  urlInput.classList.remove('hidden');
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
  const oldNum = event.target.getAttribute('id');
  const newNum = parseInt(oldNum);
  if (event.target.classList.contains('class-sort')) {
    characterSelect.innerHTML = '';
    data.characters.sort(compareClass);
    for (let i = 0; i < data.characters.length; i++) {
      characterView(data.characters[i]);
    }
  } else if (event.target.classList.contains('race-sort')) {
    characterSelect.innerHTML = '';
    data.characters.sort(compareRaces);
    for (let k = 0; k < data.characters.length; k++) {
      characterView(data.characters[k]);
    }
  } else if (event.target.classList.contains('name-sort')) {
    characterSelect.innerHTML = '';
    data.characters.sort(compareName);
    for (let l = 0; l < data.characters.length; l++) {
      characterView(data.characters[l]);
    }
  }
  for (let m = 0; m < data.characters.length; m++) {
    if (newNum === data.characters[m].id) {
      if (event.target.getAttribute('type') === 'view') {
        regen.classList.add('hidden');
        save.classList.add('hidden');
        data.viewing = data.characters[m].id;
        characterEntry(data.characters[m]);
        if (Object.prototype.hasOwnProperty.call(data.characters[m], 'inventory')) {
          const inventoryh2 = document.createElement('h2');
          const inventoryText = document.createTextNode('Inventory: ' + data.characters[m].inventory.weapon + ', ' + data.characters[m].inventory.armor + ', ' + data.characters[m].inventory.potion);
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
    const temp = yesButton.getAttribute('id');
    const idCheck = parseInt(temp);
    for (let n = 0; n < data.characters.length; n++) {
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

      const label = document.createElement('label');
      label.textContent = 'Select which Character';
      const select = document.createElement('select');
      select.setAttribute('name', 'character');
      select.classList.add('itemCharacter');
      const confirm = document.createElement('a');
      confirm.setAttribute('href', '#');
      confirm.classList.add('confirm-character');
      confirm.textContent = 'Confirm';
      for (let i = 0; i < data.characters.length; i++) {
        const options = document.createElement('option');
        const textOptions = document.createTextNode(data.characters[i].name);
        options.appendChild(textOptions);
        select.appendChild(options);
      }
      label.appendChild(select);
      characterConfirm.appendChild(label);
      confirmRow.appendChild(confirm);
    }
  }

  const temp = document.querySelector('.itemCharacter');
  if (event.target.classList.contains('confirm-character')) {
    const inventory = {};
    if (weapon.value !== 'None') {
      inventory.weapon = weapon.value;
    } else { inventory.weapon = 'No Weapon equipped'; }
    if (armor.value !== 'None') {
      inventory.armor = armor.value;
    } else { inventory.armor = 'No Armor equipped'; }
    if (potion.value !== 'None') {
      inventory.potion = potion.value;
    } else { inventory.potion = 'No Potion acquired'; }
    for (let j = 0; j < data.characters.length; j++) {
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
    const newCharacter = {};
    newCharacter.statInitial = currentCharacter.statInitial;
    setStat(newCharacter, 'strength', currentCharacter);
    setStat(newCharacter, 'dexterity', currentCharacter);
    setStat(newCharacter, 'charisma', currentCharacter);
    setStat(newCharacter, 'wisdom', currentCharacter);
    setStat(newCharacter, 'intelligence', currentCharacter);
    setStat(newCharacter, 'constitution', currentCharacter);
    setInfo(currentCharacter, newCharacter, 'raceValue', races, 'race');
    setInfo(currentCharacter, newCharacter, 'roleValue', classes, 'class');
    setInfo(currentCharacter, newCharacter, 'alignmentValue', alignmentApi, 'alignment');
    if (currentCharacter.nameValue === 'Random') {
      newCharacter.name = names.response.results[0].name.first + ' ' + names.response.results[0].name.last;
      newCharacter.nameValue = 'Random';
    } else {
      newCharacter.name = currentCharacter.name;
      newCharacter.nameValue = currentCharacter.nameValue;
    }
    for (let i = 0; i < classes.response.results.length; i++) {
      if (newCharacter.class === classes.response.results[i].name) {
        newCharacter.hitDie = classes.response.results[i].hit_dice;
        newCharacter.armorProf = classes.response.results[i].prof_armor;
      }
    }
    for (let j = 0; j < races.response.results.length; j++) {
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
    imageSet(currentCharacter);
    currentCharacter.id = data.nextEntryId;
    data.characters.unshift(currentCharacter);
    viewSwap('feature-form');
    data.nextEntryId++;
    location.reload();
  }
});

const url = document.querySelector('.url');
const urlInput = document.querySelector('.user-url');

urlInput.addEventListener('input', function (event) {
  const test = event.target.value;
  image.setAttribute('src', test);
});

// This function sets the image of a character based on if the class name matches the index of an image.
function imageSet(newCharacter) {
  if (urlInput.value === '') {
    image.setAttribute('src', './images/' + newCharacter.class + '.jpeg');
    newCharacter.image = './images/' + newCharacter.class + '.jpeg';
  } else {
    image.setAttribute('src', urlInput.value);
    newCharacter.image = urlInput.value;
  }
}
