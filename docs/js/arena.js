'use strict';

const BACKGROUND_SIZE = 9558,
  WEAPON_AND_KNIGHT_GAP = 70,
  SWORDS_TRIO_DURATION = 18000,
  SWORDS_HAIL_DURATION = 2600,
  MONSTERS_ATTACK_SPEED = 1000,
  INDICATORS_RECHARGE_TIME = 1000,
  IMG_PATH = './img/';

  const gamePage = document.querySelector('.screen-game'),
  userInfo = gamePage.querySelector('.game-panel-user'),
  pauseModal = gamePage.querySelector('.pause'),
  skillsWrapper = gamePage.querySelector('.game-panel-skills'),
  scoreWrapper = gamePage.querySelector('.game-panel-scores');

let usingHero = JSON.parse(localStorage.getItem('choosingChar'));
let usingArena = JSON.parse(localStorage.getItem('selectedArena'));
let accumulatedExp = 0;
let accumulatedGold = 0;
let choosingCharacter = {};

const currentFlag = FlagName[usingHero.choosingCharacter.flag];
const currentParam = Flag[currentFlag];
let START_MONSTERS_COUNT = currentParam.startEnemyCount;
let killedEnemyOnLevel = 0;
let maxEnemyOnLevel = 0;

if (usingArena == 5) {
  START_MONSTERS_COUNT = 1;
}

let imageType = '.png';

if (usingHero.choosingCharacter.class == 'mage') {
  imageType = '.gif'
}

const settings = {
  username: 'user',
  isStarted: false,
  isOver: false,
  startTime: '',
  pauseTime: '',
  backgroundPosition: BACKGROUND_SIZE,
  speed: 1.5,
}

let Monster = {};
let arenaEnemyCount = 0;
let newEnemy = null;

arenaList.forEach(item => {
    if(usingArena == item.levelNumber) {
      arenaEnemyCount = Math.round((item.enemyCount * currentParam.enemyCountFactor) - START_MONSTERS_COUNT + 1);
      maxEnemyOnLevel = Math.round(item.enemyCount * currentParam.enemyCountFactor);
      item.enemyList.forEach(enemy => {
        newEnemy = {
          [enemy.name]: {
            className: 'monster-' + enemy.name,
            damage: enemy.attack * currentParam.enemyAttackFactor,
            defeance: enemy.defeance * currentParam.enemyDefeanceFactor,
            healthLevel: enemy.hp * currentParam.enemyHpFactor,
            manaLevel: enemy.mp * currentParam.enemyMpFactor,
            expGain: enemy.expGain,
            goldGain: enemy.goldGain,
            runGif: enemy.name + '-run.gif',
            speed: enemy.speed,
            width: 64,
            height: 72,
          }
        }
        Object.assign(Monster, newEnemy);
      }); 
    }
});

const WeaponWarriorDefault = {
  sword: {
    key: '1',
    rechargeTime: usingHero.choosingCharacter.skills[0].colddown,
    magicLevelConsumption: usingHero.choosingCharacter.skills[0].mpPrice,
    damage: Number(localStorage.getItem('heroAttack')),
    iconURL: usingHero.choosingCharacter.skills[0].name + imageType
  },
  block: {
    key: '2',
    rechargeTime: usingHero.choosingCharacter.skills[1].colddown,
    magicLevelConsumption: usingHero.choosingCharacter.skills[1].mpPrice,
    damage: 0,
    iconURL: usingHero.choosingCharacter.skills[1].name + imageType
  },
};

const WeaponArcherAndMageDefault = {    
  skillOne: {
    key: '1',
    rechargeTime: usingHero.choosingCharacter.skills[0].colddown,
    magicLevelConsumption: usingHero.choosingCharacter.skills[0].mpPrice,
    damage: Number(localStorage.getItem('heroAttack')),
    iconURL: usingHero.choosingCharacter.skills[0].name + imageType
  },
  skillTwo: {
    key: '2',
    rechargeTime: usingHero.choosingCharacter.skills[1].colddown,
    magicLevelConsumption: usingHero.choosingCharacter.skills[1].mpPrice,
    damage: Number(localStorage.getItem('heroAttack')) * 2,
    iconURL: usingHero.choosingCharacter.skills[1].name + imageType
  },
};

const WeaponDefault = {  
  swordsTrio: {
    key: '3',
    rechargeTime: usingHero.choosingCharacter.skills[2].colddown,
    magicLevelConsumption: usingHero.choosingCharacter.skills[2].mpPrice,
    damage: Number(localStorage.getItem('heroAttack')) * 3,
    iconURL: usingHero.choosingCharacter.skills[2].name + imageType   
  },
  swordsHail: {
    key: '4',
    rechargeTime: usingHero.choosingCharacter.skills[3].colddown,
    magicLevelConsumption: usingHero.choosingCharacter.skills[3].mpPrice,
    damage: Number(localStorage.getItem('heroAttack')) * 4,
    iconURL: usingHero.choosingCharacter.skills[3].name + imageType,    
  },
}

let Weapon = {};

if (usingHero.choosingCharacter.class == 'warrior') {
  Weapon = Object.assign(WeaponWarriorDefault, WeaponDefault);
}
else {
  Weapon = Object.assign(WeaponArcherAndMageDefault, WeaponDefault);
}

let skillFourTemaplate = ``;
let skillTreeUrl = '';
let skillOneTempalte = `<div class="skill-display swords-trio"><img src="img/${usingHero.choosingCharacter.skills[0].name}${imageType}"></img></div>`;
let skillTwoTemplate = `<div class="skill-display swords-trio"><img src="img/${usingHero.choosingCharacter.skills[1].name}${imageType}"></img></div>`;

skillFourTemaplate = `<img class="skill-display swords-hail" src="img/${usingHero.choosingCharacter.skills[3].name}${imageType}"></img>`
skillTreeUrl = usingHero.choosingCharacter.skills[2].name + imageType;

if (usingHero.choosingCharacter.class == 'warrior') {
  skillFourTemaplate = `<img class="skill-display swords-hail" src="img/${usingHero.choosingCharacter.skills[3].name}-cast.gif"></img>`
  skillTreeUrl = usingHero.choosingCharacter.skills[2].name + '-cast' + imageType;
}

let skillDisplaysDefaultDataOneAndTwo = {};

if (usingHero.choosingCharacter.class != 'warrior') {
  skillDisplaysDefaultDataOneAndTwo = {
    skillOne: {
      width: 90,
      template: skillOneTempalte,
      speed: 1.7
    },
    skillTwo: {
      width: 90,
      template: skillTwoTemplate,
      speed: 1.7
    },
  };
}

const skillDisplaysDefaultDataTreeAndFour = {
  swordsTrio: {
    width: 90,
    template: `<div class="skill-display swords-trio"><img src="img/${skillTreeUrl}"></img></div>`,
    speed: 1.7
  },
  swordsHail: {
    width: 191,
    template: skillFourTemaplate,
    speed: 0
  }
}

const skillDisplaysDefaultData = Object.assign(skillDisplaysDefaultDataOneAndTwo, skillDisplaysDefaultDataTreeAndFour);

const indicatorsDefaultData = {
  xp: {
    type: 'xp',
    color: '#9f000a',
    level: Number(localStorage.getItem('heroHitPoints')),
    rechargePerSecond: 2
  },
  mp: {
    type: 'mp',
    color: '#004bb8',
    level: Number(localStorage.getItem('heroMana')),
    rechargePerSecond: 5
  },
  exp: {
    type: 'exp',
    color: '#b88d00',
    level: Number(localStorage.getItem('heroCurrentExp')),
  }
}

const scoreDefaultData = {
  timer: {
    type: 'timer',
    description: 'Time',
    value: '00:00'
  },
  kills: {
    type: 'kills',
    description: 'Killed',
    value: 0
  }
}

const heroDefaultData = {
    warrior: {
        className: 'warrior',
        gifs: {
            idleGif: 'idle.gif',
            attackGif: 'attack.gif',
            runGif: 'run.gif',
            blockGif: 'block.gif'
        },
    },
    archer: {
        className: 'archer',
        gifs: {
            idleGif: 'archer-idle-unfon.gif',
            attackGif: 'archer-attack-unfon.gif',
            runGif: 'archer-walk-unfon.gif',
            blockGif: 'archer-attack-unfon.gif'
        },
    },
    mage: {
        className: 'mage',
        gifs: {
            idleGif: 'wizard.gif',
            attackGif: 'wizard.gif',
            runGif: 'wizard.gif',
            blockGif: 'wizard.gif'
        },  
    },
    isBack: false,
    startPos: 10,
    width: 72,
    height: 85,
    speed: 1.5,
    healthLevel: Number(localStorage.getItem('heroHitPoints')),
    manaLevel: Number(localStorage.getItem('heroMana')),
}; 

// КЛАССЫ

class Knight {
  constructor(props) {
    this._element = null;
    this._isBack = props.isBack;
    this._position = props.position;
    this._className = props.className; 
    this._runGif = props.runGif;
    this._idleGif = props.idleGif;
    this._attackGif = props.attackGif;
    this._blockGif = props.blockGif;
    this._deathGif = props.deathGif;
    
    this._onRun = null;
    this._onStop = null;

    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }

  _changeDirection() {
    if (typeof this._isBack === 'boolean') {
      if (this._isBack) {
        this._element.style.transform = 'scale(-1, 1)';
      } else {
        this._element.style.transform = 'none';
      }
    }    
  }
  
  _onKeyDown(evt) {
    if (typeof this._onRun === 'function') {
      this._onRun(evt);
    }
  } 

  _onKeyUp(evt) {
    if (typeof this._onStop === 'function') {
      this._onStop(evt);
    }
  }

  set onRun(f) {
    this._onRun = f;
  }

  set onStop(f) {
    this._onStop = f;
  }

  set isBack(value) {
    this._isBack = value;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `<div class="${this._className}"></div>`;
  }

  render() {
    return this._element = createElement(this.template);
  }

  unrender() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }    
  }

  move(newPos) {
    if (this._element) {
      this._position = newPos;
      this._element.style.left = `${this._position}px`;
      this._element.style.backgroundImage = `url(${IMG_PATH}${this._runGif})`;
      this._changeDirection();
    }     
  }

  attack() {
    if (this._element) {
      this._element.style.backgroundImage = `url(${IMG_PATH}${this._attackGif})`;
    }
  }

  block() {
    if (this._element) {
      this._element.style.backgroundImage = `url(${IMG_PATH}${this._blockGif})`;
    }
  }

  die() {
    if (this._element) {
      this._element.style.backgroundImage = `url(${IMG_PATH}${this._deathGif})`;
      this._element.style.backgroundSize = `100%`;
    }    

    document.removeEventListener('keydown', this._onKeyDown);
    document.removeEventListener('keyup', this._onKeyUp);
  }

  stop() {
    this._element.style.backgroundImage = `url(${IMG_PATH}${this._idleGif})`;
  }

  bind() {
    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
  }
}

class Enemy {
  constructor(props) {
    this._element = null;
    this._isAttack = false;
    this._isBack = false;
    this._position = props.position;
    this._width = props.width;
    this._height = props.height;
    this._className = props.className;
    this._expGain = props.expGain;
    this._goldGain = props.goldGain;
  }

  _changeDirection() {
    if (typeof this._isBack === 'boolean') {
      if (this._isBack) {
        this._element.style.transform = 'scale(-1, 1)';
      } else {
        this._element.style.transform = 'none';
      }
    }
  }

  set isBack(value) {
    this._isBack = value;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `<div class="${this._className} monster" style="left: ${this._position}px"></div>`;
  }

  render() {
    return this._element = createElement(this.template);
  }

  unrender() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }    
  }

  move(newPos) {
    if (this._element) {
      this._position = newPos;
      this._element.style.left = `${this._position}px`;
      this._changeDirection();
    }    
  }
}

class Skill {
  constructor(props) {
    this._key = props.key;
    this._name = props.name;
    this._iconURL = props.iconURL;
    this._element = null;

    this._onActivate = null;

    this._onActivateKeydown = this._onActivateKeydown.bind(this);
  }

  _onActivateKeydown(evt) {
    if (typeof this._onActivate === `function`) {
      if (evt.key === this._key.toString()) {
        this._onActivate(evt);
      }
    }
  }

  set onActivate(f) {
    this._onActivate = f;
  }

  get template() {
    return `<img src="${IMG_PATH}${this._iconURL}" alt="skill">`;
  }

  render() {
    return this._element = createElement(this.template);
  }

  unrender() {
    this._element.remove();
    this._element = null;
  }

  recharge() {
    this._element.style.filter = 'grayscale(0)';
  }

  activate() {
    this._element.style.filter = 'grayscale(1)';
  }

  bind() {
    document.addEventListener(`keydown`, this._onActivateKeydown);
  }

  unbind() {
    document.removeEventListener(`keydown`, this._onActivateKeydown);
  }
}

class SkillDisplay {
  constructor(props) {
    this._element = null;
    this._position = props.position;
    this._template = props.template;
    this._isBack = props.isBack;
  }

  get template() {
    return this._template;
  }

  render() {
    this._element = createElement(this.template);
    this._element.style.left = `${this._position}px`;
    this._element.style.transform = this._isBack ? 'scale(-1, 1)' : 'none';
    
    return this._element;
  }

  unrender() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }    
  }

  move(newPos) {
    if (this._element) {
      this._position = newPos;
      this._element.style.left = `${this._position}px`;
    }    
  }
}

class Indicator {
  constructor(props) {
    this._element = null;
    this._color = props.color;
    this._level = props.level;
    this._type = props.type;
  }

  get template() {
    return (
      `<div class="panel-${this._type}">
        <div class="score-value">
          <span>${this._level}</span>
        </div>
      </div>`
    );
  }

  render() {
    return this._element = createElement(this.template);
  }

  unrender() {
    this._element.remove();
    this._element = null;
  }

  change(value) {
    this._level = value;

    if (value < 0) {
      this._level = 0;
    }

    this._element.querySelector('.score-value').style.background = `linear-gradient(90deg, ${this._color} ${this._level}%, rgba(0,0,0,1) ${this._level}%)`;
    this._element.querySelector('span').textContent = this._level;   
  }
}

class Score {
  constructor(props) {
    this._type = props.type;
    this._value = props.value;
    this._description = props.description;
  }

  get template() {
    return `<div class="${this._type}">${this._description}: <span class="${this._type}-value">${this._value}</span></div>`;
  }

  render() {
    return this._element = createElement(this.template);
  }

  unrender() {
    this._element.remove();
    this._element = null;
  }

  change(value) {
    this._value = value;
    this._element.querySelector(`.${this._type}-value`).textContent = value;
  }
}


let gameWidth = document.documentElement.clientWidth;

const monsterTypesArr = Object.keys(Monster);
const weaponTypesArr = Object.keys(Weapon);
const indicatorTypesArr = Object.keys(indicatorsDefaultData);
const scoreTypesArr = Object.keys(scoreDefaultData);

let skillsData = {};
let monstersData = [];
let skillDisplaysData = [];
let indicatorsData = {};
let scoreData = {};
let knightData = {};

initGame();

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    pauseModal.classList.toggle('hidden');
    settings.isStarted = !settings.isStarted;

    settings.pauseTime = settings.pauseTime ? settings.pauseTime : Date.now();
  }
}

function onPlayAgainButtonClick() {
  initGame();
} 

// ИГРОВЫЕ ФУНКЦИИ

function initGame() {
  if (!settings.isStarted) {
    settings.isOver = false;
    settings.isStarted = true;

    settings.backgroundPosition = BACKGROUND_SIZE;
    gamePage.style.backgroundPosition = `${settings.backgroundPosition}px 0`;
    
    clearAllData();   
    clearAllObjects();
    createStartData();
    renderAllObjects();
    
    settings.startTime = Date.now();

    document.addEventListener('keydown', onEscKeyDown);
  }  
}

function createStartData() {
  createKnightData();
  createMonstersData(START_MONSTERS_COUNT);
  createSkillsData();
  createIndicatorsData();
  createScoreData();
}

function renderAllObjects() {
  renderKnight();  
  renderAllMonsters();
  renderSkills();
  renderUserInfo();
  renderScore();
}

function overGame() {
  settings.isStarted = false;
  settings.isOver = true;
  choosingCharacter = usingHero.choosingCharacter;  
  choosingCharacter.gold = choosingCharacter.gold + accumulatedGold;
  choosingCharacter.exp = choosingCharacter.exp + accumulatedExp;
  choosingCharacter.killStrick = choosingCharacter.killStrick + killedEnemyOnLevel;
  localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));
  if (arenaEnemyCount <= 0 && killedEnemyOnLevel == maxEnemyOnLevel) {
    alert("ПОБЕДА!!!");
    window.location.href = 'inventory.html';
  }
  else {
    alert("ВЫ УМЕРЛИ!!!");
    window.location.href = 'inventory.html';
  }
}

function clearAllData() {
  skillsData = {};
  monstersData = [];
  skillDisplaysData = [];
  indicatorsData = {};
  scoreData = {};
  knightData = {};

  settings.startTime = '';
  settings.pauseTime = '';
  settings.backgroundPosition = BACKGROUND_SIZE;
}

function clearAllObjects() {
  [...document.querySelectorAll('.monster')].forEach(monster => { monster.remove(); });
  [...document.querySelectorAll('.skill-display')].forEach(skillDisplay => { skillDisplay.remove(); });
}

function createKnightData() {
  knightData = {
    className: heroDefaultData[usingHero.choosingCharacter.class].className,
    healthLevel: heroDefaultData.healthLevel,
    speed: heroDefaultData.speed,
    width: heroDefaultData.width,
    height: heroDefaultData.height,
    position: heroDefaultData.startPos,
    runGif: heroDefaultData[usingHero.choosingCharacter.class].gifs.runGif,
    idleGif: heroDefaultData[usingHero.choosingCharacter.class].gifs.idleGif,
    blockGif: heroDefaultData[usingHero.choosingCharacter.class].gifs.blockGif,
    attackGif: heroDefaultData[usingHero.choosingCharacter.class].gifs.attackGif,
    deathGif: heroDefaultData[usingHero.choosingCharacter.class].gifs.deathGif,
    isMoving: false,
    isDamaged: false
  }
}

function renderKnight() {
  const knight = new Knight(knightData);
  gamePage.append(knight.render());

  knight.onRun = (evt) => {
    switch (evt.code) {
      case 'KeyA':
        knightData.isBack = true;        
        knightData.isMoving = true;
        break;
      case 'KeyD':
        knightData.isBack = false;        
        knightData.isMoving = true;
        break;
    }
  }

  knight.onStop = (evt) => {
    if (evt.code === 'KeyA' || evt.code === 'KeyD') {
      knight.stop();
      knightData.isMoving = false;
    }
  }

  knight.bind();

  requestAnimationFrame(moveKnight);

  function moveKnight() {
    if (settings.isStarted) {
      if (knightData.isMoving) {
        changeKnightPosition();
  
        if (isKnightInTheMiddle()) {
          moveBackground();
          knightData.speed = 0;
        }
  
        if (settings.backgroundPosition === 0 || settings.backgroundPosition === BACKGROUND_SIZE) {
          knightData.speed = heroDefaultData.speed;
        }
        
        knightData.isMoving = true;
        knight.isBack = knightData.isBack;
        knight.move(knightData.position);
      }
  
      checkKnightForDamage();
      checkKnightForAliveness();
      checkKnightForBlock();
      checkKnightForAttack();
      checkKnightForVictory();
    }    

    if (!settings.isOver) {
      requestAnimationFrame(moveKnight);
    }
  }

  function checkKnightForVictory() {
    if (arenaEnemyCount <= 0 && killedEnemyOnLevel == maxEnemyOnLevel) {
      knight.unrender();
      overGame();
    } 
  }

  function checkKnightForBlock() {
    if (usingHero.choosingCharacter.class == 'warrior') { 
      if (skillsData.block.isActive) {
        knight.block();
      }
    }
  }

  function checkKnightForAttack() {
    if (usingHero.choosingCharacter.class == 'warrior') {      
      if (skillsData.sword.isActive) {
        knight.attack();
      }
    }
    else {
      if (skillsData.skillOne.isActive) {
        knight.attack();
      }
    }
  }

  function checkKnightForDamage() {
    monstersData.forEach(monsterData => {
      if (isKnightDamaged(monsterData) && !monsterData.isAttack) {
        damageKnight(monsterData.damage);
        changeMonsterAttackStatus(monsterData); 
      }
    });
  }

  function checkKnightForAliveness() {
    if (knightData.healthLevel <= 0) {
      knight.die();
      knight.unrender();

      overGame();
    }
  }

  function damageKnight(damage) {
    knightData.isDamaged = true;
    if (damage < Math.round((Number(localStorage.getItem('heroDefeance')) / 5))) {
      damage = 0;
    }
    else {
      damage -= Math.round((Number(localStorage.getItem('heroDefeance')) / 5)); 
    }
    knightData.healthLevel -= damage; 

    indicatorsData.xp.level = knightData.healthLevel;
  }

  function changeKnightPosition() {
    if (knightData.isBack) {
      knightData.position -= knightData.speed;
    } else {
      knightData.position += knightData.speed;
    }

    if (knightData.position < 0) {
      knightData.position = 0;
    }
  }
}

function isKnightDamaged(monster) {
  if (usingHero.choosingCharacter.class == 'warrior') {    
    if (monster.isAlive && !skillsData.block.isActive) {
      return knightData.position <= monster.position + monster.width && knightData.position + knightData.width >= monster.position;
    }
  }
  else {
    return knightData.position <= monster.position + monster.width && knightData.position + knightData.width >= monster.position;
  }
}

function isKnightInTheMiddle() {
  return knightData.position === gameWidth / 2 - knightData.width;
}

function moveBackground() {
  if (settings.backgroundPosition > 0 && settings.backgroundPosition <= BACKGROUND_SIZE) {
    settings.backgroundPosition += knightData.isBack ? settings.speed : -settings.speed;
  }
  
  gamePage.style.backgroundPosition = `${settings.backgroundPosition}px 0`;
}

function createMonstersData(count, startPos = getMonsterStartPosition()) {
  for (let i = 0; i < count; i++) {
    const type = getRandomMonsterType();
    const monsterDefaultData = Monster[type];
    startPos = getMonsterStartPosition();
    monstersData.push({
      id: i,
      type: type,
      className: monsterDefaultData.className,
      damage: monsterDefaultData.damage,
      healthLevel: monsterDefaultData.healthLevel,
      speed: monsterDefaultData.speed,
      width: monsterDefaultData.width,
      height: monsterDefaultData.height,
      runGif: monsterDefaultData.runGif,
      position: startPos,
      isBack: false,
      isMoving: true,
      isDamaged: false,
      isAttack: false,
      isAlive: true,
      expGain: monsterDefaultData.expGain,
      goldGain: monsterDefaultData.goldGain
    });
  }  
}

function renderAllMonsters() {
  monstersData.forEach(renderMonster);
}

function renderMonster(monsterData) {
  let monster = new Enemy(monsterData);
  gamePage.append(monster.render());

  requestAnimationFrame(moveMonster);

  function moveMonster() {
    if (settings.isStarted) {
      changeMonsterDirection();
      changeMonsterPosition();
      changeMonsterSpeed();
      checkMonsterForDamage();
      checkMonsterForAliveness();
      checkForGameOver();

      if (monster) {
        monster.move(monsterData.position);
      }        
    }

    if (monster && !settings.isOver) {
      requestAnimationFrame(moveMonster);
    }
  }

  function checkForGameOver() {
    if (settings.isOver) {
      monster.unrender();
    }
  }

  function changeMonsterDirection() {
    if (monsterData.position < knightData.position) {
      monsterData.isBack = true;
    } else if (monsterData.position > knightData.position) {
      monsterData.isBack = false;
    }

    if (monster) {
      monster.isBack = monsterData.isBack;
    }
  }

  function changeMonsterPosition() {
    if (monsterData.isMoving) {
      if (monsterData.isBack) {
        monsterData.position += monsterData.speed;
      } else {
        monsterData.position -= monsterData.speed;
      }
    }      
  }
  
  function changeMonsterSpeed() {
    if (isKnightInTheMiddle() && knightData.isMoving) {
      if (knightData.isBack) {
        const difference = monsterData.position >= knightData.position ? -knightDefaultData.speed : knightDefaultData.speed;
        monsterData.speed = Monster[monsterData.type].speed + difference;
      } else {
        const difference = monsterData.position <= knightData.position ? -knightDefaultData.speed : knightDefaultData.speed;
        monsterData.speed = Monster[monsterData.type].speed + difference;
      }
    } else {
      monsterData.speed = Monster[monsterData.type].speed;
    }
  }

  function checkMonsterForAliveness() {
    if (monsterData.healthLevel <= 0 || monsterData.position + monsterData.width <= 0) {
      removeMonster();
    }
  }

  function removeMonster() {
    if (monster) {
      monster.unrender();
      scoreData.kills.value++;
      accumulatedExp = accumulatedExp + monster._expGain; 
      accumulatedGold = accumulatedGold + monster._goldGain; 
      killedEnemyOnLevel +=1;     
      arenaEnemyCount -= 1;
    }

    monster = null;
    monsterData.position = 9000;
    monsterData.isAlive = false;  

    if (arenaEnemyCount > 0) {
      addNewMonster();
    }
  }

  function addNewMonster() {
    createMonstersData(1, (Math.random() * gameWidth));
    renderMonster(monstersData[monstersData.length - 1]);
  }

  function checkMonsterForDamage() {
    skillDisplaysData.forEach(skillDisplay => {
      if (isMonsterDamaged(skillDisplay) && !skillDisplay.damagedMonsters.includes(monster)) {
        damageMonster(skillDisplay.damage);
        skillDisplay.damagedMonsters.push(monster);
      }
    });

    if (usingHero.choosingCharacter.class == 'warrior') {
      if (isKnightDamaged(monsterData) && skillsData.sword.isActive && !skillsData.sword.damagedMonsters.includes(monster)) {
        damageMonster(skillsData.sword.damage);
  
        skillsData.sword.damagedMonsters.push(monster);
  
        setTimeout(() => {
          skillsData.sword.damagedMonsters = [];
        }, 1000);
      }
    }
  }

  function damageMonster(damage) {
    monsterData.isDamaged = true;
    monsterData.healthLevel -= damage;
  }

  function isMonsterDamaged(skill) {
    if (skill.isAvailable) {
      return monsterData.position <= skill.position + skill.width && monsterData.position + monsterData.width >= skill.position;
    }
  }
}

function changeMonsterAttackStatus(monsterData) {
  monsterData.isAttack = true;

  const attackTimeout = setTimeout(() => {
    monsterData.isAttack = false;

    if (isKnightDamaged(monsterData)) {
      clearTimeout(attackTimeout);
    }
  }, MONSTERS_ATTACK_SPEED);
}

function getRandomMonsterType() {  
  return monsterTypesArr[Math.floor(Math.random() * monsterTypesArr.length)];
}

function getMonsterStartPosition() {
  return (Math.random() * gameWidth);
}

function createSkillsData() {
  for (let key in Weapon) {
    skillsData[key] = Object.assign({}, Weapon[key]);
    skillsData[key].isActive = false;
    skillsData[key].isAvailable = true;
    skillsData[key].damagedMonsters = [];
    skillsData[key].name = key;
  }
}

function setSkillAvailability(skill, isAvailable) {
  skillsData[skill].isAvailable = isAvailable;
}

function renderSkills() {
  skillsWrapper.innerHTML = '';
  const skillsFragment = document.createDocumentFragment();

  weaponTypesArr.forEach(type => {
    const skill = new Skill(skillsData[type]);
    skillsFragment.append(skill.render());

    skill.bind(); 

    skill.onActivate = (evt) => {
      if (evt.key === skillsData[type].key && settings.isStarted) {
        if (usingHero.choosingCharacter.class != 'warrior') {
          if (skillsData[type].key === skillsData.skillOne.key) {
            useSkillOne(knightData.isBack);
            
            setTimeout(() => {
              skillsData[type].isAvailable = true;
              skillsData[type].isActive = false;
              skill.recharge();
            }, skillsData[type].rechargeTime);
          }
  
          if (skillsData[type].key === skillsData.skillTwo.key) {
            useSkillTwo(knightData.isBack);
            
            setTimeout(() => {
              skillsData[type].isAvailable = true;
              skillsData[type].isActive = false;
              skill.recharge();
            }, skillsData[type].rechargeTime);
          }
        }

        if (skillsData[type].key === skillsData.swordsHail.key) {
          useSwordsHail(knightData.isBack);
          
          setTimeout(() => {
            skillsData[type].isAvailable = true;
            skillsData[type].isActive = false;
            skill.recharge();
          }, skillsData[type].rechargeTime);
        }

        if (skillsData[type].key === skillsData.swordsTrio.key) {
          useSwordsTrio(knightData.isBack);  

          setTimeout(() => {
            skillsData[type].isAvailable = true;
            skillsData[type].isActive = false;
            skill.recharge();
          }, skillsData[type].rechargeTime);
        }

        if (usingHero.choosingCharacter.class == 'warrior') {
          if (skillsData[type].key === skillsData.block.key || skillsData[type].key === skillsData.sword.key) {
            document.addEventListener('keyup', onSkillKeyUp);
          }
        }

        if (skillsData[type].isAvailable) {
          indicatorsData.mp.level -= skillsData[type].magicLevelConsumption;
        }

        skill.activate();
        skillsData[type].isAvailable = false;
        skillsData[type].isActive = true;
      }

      function onSkillKeyUp() {
        skillsData[type].isAvailable = true;
        skillsData[type].isActive = false;
        skill.recharge();
      }
    }

    skillsWrapper.append(skillsFragment);

    requestAnimationFrame(checkForGameOver);

    function checkForGameOver() {
      if (settings.isOver) {
        skill.unbind();
      }

      if (settings.isStarted && !settings.isOver) {
        requestAnimationFrame(checkForGameOver);
      }
    }
  });
}

function useSwordsTrio(isBack) {
  if (skillsData.swordsTrio.isAvailable) {
    const data = createSkillDisplayData("swordsTrio", isBack);
    const skillDisplay = new SkillDisplay(data);

    gamePage.append(skillDisplay.render(data.position));
  
    requestAnimationFrame(moveSwordsTrio);

    function moveSwordsTrio() {
      if (skillDisplay && settings.isStarted) {
        if (data.position > gameWidth) {
          data.position = 9000;
          skillDisplay.unrender();
        }
        else {
          if (isBack) {
            data.position -= data.speed;
          } else {
            data.position += data.speed;
          }
          skillDisplay.move(data.position);
        }
      }

      if (!settings.isOver) {
        requestAnimationFrame(moveSwordsTrio);
      }      
    }
  }  
}

function useSkillOne(isBack) {
  if (skillsData.swordsTrio.isAvailable) {
    const data = createSkillDisplayData("skillOne", isBack);
    const skillDisplay = new SkillDisplay(data);

    gamePage.append(skillDisplay.render(data.position));
  
    requestAnimationFrame(moveSwordsTrio);

    function moveSwordsTrio() {
      if (skillDisplay && settings.isStarted) {
        if (data.position > gameWidth) {
          skillDisplay.unrender()
        }
        else {
          if (isBack) {
            data.position -= data.speed;
          } else {
            data.position += data.speed;
          }
          
          skillDisplay.move(data.position);
        }
      }

      if (!settings.isOver) {
        requestAnimationFrame(moveSwordsTrio);
      }      
    }
  }  
}

function useSkillTwo(isBack) {
  if (skillsData.swordsTrio.isAvailable) {
    const data = createSkillDisplayData("skillTwo", isBack);
    const skillDisplay = new SkillDisplay(data);

    gamePage.append(skillDisplay.render(data.position));
  
    requestAnimationFrame(moveSwordsTrio);

    function moveSwordsTrio() {
      if (skillDisplay && settings.isStarted) {
        if (data.position > gameWidth) {
          skillDisplay.unrender()
        }
        else {
          if (isBack) {
            data.position -= data.speed;
          } else {
            data.position += data.speed;
          }
          
          skillDisplay.move(data.position);
        }
      }

      if (!settings.isOver) {
        requestAnimationFrame(moveSwordsTrio);
      }      
    }
  }  
}

function useSwordsHail(isBack) {
  if (skillsData.swordsHail.isAvailable) {
    const data = createSkillDisplayData("swordsHail", isBack);
    const skillDisplay = new SkillDisplay(data);
  
    gamePage.append(skillDisplay.render(data.position));

    setTimeout(() => {
      skillDisplay.unrender();
      data.isActive = false;
      data.isAvailable = false;
    }, SWORDS_HAIL_DURATION);
  }  
}

function createSkillDisplayData(type, isBack) {
  const data = {
    type: type,
    width: skillDisplaysDefaultData[type].width,
    position: setSkillDisplayPosition(isBack),
    template: skillDisplaysDefaultData[type].template,
    damage: Weapon[type].damage,
    isBack: isBack,
    isAvailable: true,
    speed: skillDisplaysDefaultData[type].speed,
    damagedMonsters: []
  };

  skillDisplaysData.push(data);

  return skillDisplaysData[skillDisplaysData.length - 1];
}

function setSkillDisplayPosition(isBack) {
  let x = knightData.position;
  if (isBack) {
    x -= WEAPON_AND_KNIGHT_GAP * 2;
  } else {
    x += WEAPON_AND_KNIGHT_GAP;
  }

  return x;
}

function createIndicatorsData() {
  resetIndicatorDefaultValues();
  indicatorsData = Object.assign({}, indicatorsDefaultData);
}

function resetIndicatorDefaultValues() {
  indicatorTypesArr.forEach(type => {
    if(type == 'xp') {
        indicatorsDefaultData[type].level = heroDefaultData.healthLevel;
    }
    if(type == 'mp') {
        indicatorsDefaultData[type].level = heroDefaultData.manaLevel;
    }
    
  });
}

function renderUserInfo() {
  userInfo.innerHTML = '';

  renderUserName();
  renderIndicators();
}

function renderUserName() {
  const userName = createElement('<div class="user-info"></div>');
  userName.textContent = settings.username;
  userInfo.append(userName);
}

function renderIndicators() {
  indicatorTypesArr.forEach(type => {
    const indicatorData = indicatorsData[type];
    const indicator = new Indicator(indicatorData);
    userInfo.append(indicator.render());

    const rechargeInterval = setInterval(rechargeIndicator, INDICATORS_RECHARGE_TIME);

    requestAnimationFrame(changeIndicatorLevel);

    function changeIndicatorLevel() {
      indicator.change(indicatorData.level);

      if (!settings.isOver) {
        requestAnimationFrame(changeIndicatorLevel);
      }      
    }

    function rechargeIndicator() {
      if (isNeedToRecharge()) {
        indicatorData.level += indicatorData.rechargePerSecond;
        if (type == 'xp' & indicatorData.level > Number(localStorage.getItem('heroHitPoints'))){
                indicatorData.level =  Number(localStorage.getItem('heroHitPoints'));
        }
        if (type == 'mp' & indicatorData.level > Number(localStorage.getItem('heroMana'))) {
            indicatorData.level =  Number(localStorage.getItem('heroMana'));
        }

        if (type == 'exp') {
            indicatorData.level = Number(localStorage.getItem('heroCurrentExp')) + accumulatedExp;
        }
      }      
    }

    function isNeedToRecharge() {
      if (!settings.isStarted) {
        return false;
      }

      if (settings.isOver) {
        clearInterval(rechargeInterval);
      }

      if (type === 'xp') {
        return true;
      }

      return !weaponTypesArr.some(type => skillsData[type].isActive);
    }
  });
}

function createScoreData() {
  scoreDefaultData.kills.value = usingHero.choosingCharacter.killStrick;
  scoreData = Object.assign({}, scoreDefaultData);
}

function renderScore() {
  scoreWrapper.innerHTML = '';
  
  scoreTypesArr.forEach(type => {
    const data = scoreData[type];    
    const score = new Score(data);
    scoreWrapper.append(score.render());

    if (type === 'timer') {
      requestAnimationFrame(changeCurrentTime);
    }

    if (type === 'kills') {
      requestAnimationFrame(changeCurrentKillsCount);
    }

    function changeCurrentTime() {
      if (settings.isStarted) {
        if (settings.pauseTime) {
          settings.startTime += (Date.now() - settings.pauseTime);
          settings.pauseTime = '';
        }

        let timeStr = '';
    
        const currentTime = Math.floor((Date.now() - settings.startTime) / 1000);
        const currentTimeInMin = Math.floor(currentTime / 60);
        const currentTimeInSec = currentTime < 60 ? currentTime : currentTime - (60 * currentTimeInMin);
    
        timeStr += currentTimeInMin <= 9 ? `0${currentTimeInMin}:` : `${currentTimeInMin}:`;
        timeStr += currentTimeInSec <= 9 ? `0${currentTimeInSec}` : currentTimeInSec;
    
        data.value = timeStr;
        score.change(timeStr);
      }

      if (!settings.isOver) {
        requestAnimationFrame(changeCurrentTime);
      }   
      
    }

    function changeCurrentKillsCount() {
      if (settings.isStarted) {
        score.change(scoreData.kills.value);
      }

      if (!settings.isOver) {
        requestAnimationFrame(changeCurrentKillsCount);
      }      
    }
  });
}

function createElement(template) {
  const wrapper = document.createElement('table');
  wrapper.innerHTML = template;  
  
  return wrapper.firstChild;
}

