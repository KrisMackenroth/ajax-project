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

var currentCharacter;

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
  if (newCharacter.class === 'Paladin') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/6/636336417477714942.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/6/636336417477714942.jpeg';
  } else if (newCharacter.class === 'Druid') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/3/636336417152216156.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/3/636336417152216156.jpeg';
  } else if (newCharacter.class === 'Barbarian') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/0/636336416778392507.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/0/636336416778392507.jpeg';
  } else if (newCharacter.class === 'Bard') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/1/636336416923635770.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/1/636336416923635770.jpeg';
  } else if (newCharacter.class === 'Cleric') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/2/636336417054144618.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/2/636336417054144618.jpeg';
  } else if (newCharacter.class === 'Fighter') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/4/636336417268495752.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/4/636336417268495752.jpeg';
  } else if (newCharacter.class === 'Monk') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/5/636336417372349522.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/5/636336417372349522.jpeg';
  } else if (newCharacter.class === 'Ranger') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/7/636336417569697438.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/7/636336417569697438.jpeg';
  } else if (newCharacter.class === 'Rogue') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/8/636336417681318097.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/8/636336417681318097.jpeg';
  } else if (newCharacter.class === 'Sorcerer') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/9/636336417773983369.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/9/636336417773983369.jpeg';
  } else if (newCharacter.class === 'Warlock') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/12/636336422983071263.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/12/636336422983071263.jpeg';
  } else if (newCharacter.class === 'Wizard') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/11/636336418370446635.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/11/636336418370446635.jpeg';
  }
  newCharacter.size = newCharacter.size.slice(12);
  newCharacter.languages = newCharacter.languages.slice(17);
  currentCharacter = newCharacter;
  characterEntry(newCharacter);
  viewSwap('character-sheet');
  featureForm.reset();
  return currentCharacter;
});

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

function viewSwap(event) {
  for (var i = 0; i < 3; i++) {
    if (view[i].getAttribute('data-view') === event) {
      view[i].classList.remove('hidden');
      view[i].classList.add('active');
    } else view[i].classList.add('hidden');
    view[i].classList.remove('active');
  }
  featureForm.reset();
}

create.addEventListener('click', function () {
  viewSwap('feature-form');
  info.innerHTML = '';
  description.innerHTML = '';
  entries.innerHTML = '';
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
  if (newCharacter.class === 'Paladin') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/6/636336417477714942.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/6/636336417477714942.jpeg';
  } else if (newCharacter.class === 'Druid') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/3/636336417152216156.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/3/636336417152216156.jpeg';
  } else if (newCharacter.class === 'Barbarian') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/0/636336416778392507.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/0/636336416778392507.jpeg';
  } else if (newCharacter.class === 'Bard') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/1/636336416923635770.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/1/636336416923635770.jpeg';
  } else if (newCharacter.class === 'Cleric') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/2/636336417054144618.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/2/636336417054144618.jpeg';
  } else if (newCharacter.class === 'Fighter') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/4/636336417268495752.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/4/636336417268495752.jpeg';
  } else if (newCharacter.class === 'Monk') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/5/636336417372349522.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/5/636336417372349522.jpeg';
  } else if (newCharacter.class === 'Ranger') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/7/636336417569697438.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/7/636336417569697438.jpeg';
  } else if (newCharacter.class === 'Rogue') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/8/636336417681318097.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/8/636336417681318097.jpeg';
  } else if (newCharacter.class === 'Sorcerer') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/9/636336417773983369.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/9/636336417773983369.jpeg';
  } else if (newCharacter.class === 'Warlock') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/12/636336422983071263.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/12/636336422983071263.jpeg';
  } else if (newCharacter.class === 'Wizard') {
    image.setAttribute('src', 'https://www.dndbeyond.com/avatars/10/11/636336418370446635.jpeg');
    newCharacter.image = 'https://www.dndbeyond.com/avatars/10/11/636336418370446635.jpeg';
  }
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

var entries = document.querySelector('.entries');
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
  var aView = document.createElement('a');
  aView.classList.add('view-char');
  aView.setAttribute('href', '#');
  aView.textContent = 'View';
  aView.setAttribute('id', character.id);
  divRow.appendChild(divBlock);
  divBlock.appendChild(classImage);
  divBlock.appendChild(pName);
  divBlock.appendChild(pRace);
  divBlock.appendChild(pClass);
  aRow.appendChild(aView);
  entries.appendChild(divRow);
  entries.appendChild(aRow);
}

var savedEntries = document.querySelector('.saved');

savedEntries.addEventListener('click', function (character) {
  info.innerHTML = '';
  description.innerHTML = '';
  create.classList.remove('hidden');
  savedEntries.classList.add('hidden');
  viewSwap('character-entries');
  for (var i = 0; i < data.characters.length; i++) {
    characterView(data.characters[i]);
  }
});

var regen = document.querySelector('.regen');

entries.addEventListener('click', function (temp) {
  var oldNum = temp.target.getAttribute('id');
  var newNum = parseInt(oldNum);
  for (var i = 0; i < data.characters.length; i++) {
    if (newNum === data.characters[i].id) {
      entries.innerHTML = '';
      regen.classList.add('hidden');
      save.classList.add('hidden');
      savedEntries.classList.remove('hidden');
      characterEntry(data.characters[i]);
      image.setAttribute('src', data.characters[i].image);
      viewSwap('character-sheet');
    }
  }
});
