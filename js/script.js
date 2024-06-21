// import { userList, arenaList, shopArtifacts } from "./mokData";

let userCharacters = [];

const autorizationPage = document.querySelector('.autorization-section');
if (autorizationPage) {
    const autorizationLogin = autorizationPage.querySelector('#login');
    const autorizationPassword = autorizationPage.querySelector('#password');
    const autorizationLoginBtn = autorizationPage.querySelector('.autorization-section__login-btn');

    let userList = JSON.parse(localStorage.getItem('users'));
    // let userList= null;

    if (!userList) {
        localStorage.setItem('users', JSON.stringify({ usersList }));
        userList = JSON.parse(localStorage.getItem('users'));
    }

    function autorization() {
        userList.usersList.forEach(item => {
            if (autorizationLogin.value == item.login && autorizationPassword.value == item.password) {
                userCharacters = item.characterList;
                localStorage.setItem('userChars', JSON.stringify({ userCharacters }));
                window.location.href = 'character-list.html';
            }
        });
    };

    autorizationLoginBtn.addEventListener('click', autorization);
}

const registrationPage = document.querySelector('.registration-section');
if (registrationPage) {
    const registaritionLogin = registrationPage.querySelector('#login');
    const registaritionPassword = registrationPage.querySelector('#password');
    const registaritionBtn = registrationPage.querySelector('.registration-section__signup-btn');
    let userList = JSON.parse(localStorage.getItem('users'));

    function registration() {
        const newUser = {
            login: registaritionLogin.value,
            password: registaritionPassword.value,
            characterList: [],
        };

        const usersList = userList.usersList;
        usersList.push(newUser);

        localStorage.setItem('users', JSON.stringify({ usersList }));
        window.location.href = 'index.html';
    }

    registaritionBtn.addEventListener('click', registration);
}

const characterListPage = document.querySelector('.character-list-section');
if (characterListPage) {
    const userCharacterListContainer = document.querySelector('.character-list-section__list');
    const userCharacterItemtemplate = `
                    <li class="character-list-section__item">
                        <div class="character-list-section__char-info">
                            <img class="char-info__img" src="" alt="" width="20" height="20">
                            <ul class="char-info__list">
                                <li class="char-info__item char-name"></li>
                                <li class="char-info__item char-lvl"></li>
                            </ul>
                            <button class="character-list-section__choose-char" type="button" data-char-index="">Выбрать</button>
                        </div>
                    </li>
    `;


    function showUserCharacterList() {
        const userInfo = JSON.parse(localStorage.getItem('userChars'));
        const userChars = userInfo.userCharacters;

        for (let i = 0; i < userChars.length; i++) {
            userCharacterListContainer.insertAdjacentHTML('beforeend', userCharacterItemtemplate);
        }
        const userCharacterList = characterListPage.querySelectorAll('.character-list-section__item');

        for (let i = 0; i < userChars.length; i++) {
            userCharacterList[i].querySelector('.char-name').textContent = userChars[i].name;
            userCharacterList[i].querySelector('.char-lvl').textContent = userChars[i].level;
            userCharacterList[i].querySelector('.character-list-section__choose-char').setAttribute('data-char-index', i);
            if (userChars[i].class == 'warrior') {
                userCharacterList[i].querySelector('.char-info__img').src = './img/idle.gif';
            }
            if (userChars[i].class == 'archer') {
                userCharacterList[i].querySelector('.char-info__img').src = './img/archer-idle-unfon.gif';
            }
            if (userChars[i].class == 'mage') {
                userCharacterList[i].querySelector('.char-info__img').src = './img/wizard.gif';
            }
        }
    };

    showUserCharacterList();

    const chooseBtns = characterListPage.querySelectorAll('.character-list-section__choose-char');

    chooseBtns.forEach(item => {
        item.addEventListener('click', chooseHero);
    });

    function chooseHero() {
        const index = event.target.getAttribute('data-char-index');
        const userInfo = JSON.parse(localStorage.getItem('userChars'));
        const userChars = userInfo.userCharacters;
        choosingCharacter = userChars[index];

        localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));

        window.location.href = 'inventory.html';
    };
}

const inventoryPage = document.querySelector('.inventory-section');
if (inventoryPage) {
    let usingHero = JSON.parse(localStorage.getItem('choosingChar'));
    let choosingCharacter = usingHero.choosingCharacter;
    const heroFreeChar = inventoryPage.querySelector('#free-char');
    const heroStr = inventoryPage.querySelector('#srt');
    const heroAgi = inventoryPage.querySelector('#agi');
    const heroInt = inventoryPage.querySelector('#int');
    const heroVit = inventoryPage.querySelector('#vit');
    const heroAtk = inventoryPage.querySelector('#atk');
    const heroDef = inventoryPage.querySelector('#def');
    const heroHp = inventoryPage.querySelector('#hp');
    const heroMp = inventoryPage.querySelector('#mp');

    const heroName = inventoryPage.querySelector('.inventory-section__char-name');
    const heroClass = inventoryPage.querySelector('.inventory-section__char-class');
    const heroLvl = inventoryPage.querySelector('.inventory-section__char-lvl--value');
    const heroExp = inventoryPage.querySelector('.inventory-section__char-exp--value');
    const heroNeedExp = inventoryPage.querySelector('.inventory-section__char-need-exp--value');
    const heroGold = inventoryPage.querySelector('.inventory-section__char-gold--value');
    const heroImage = inventoryPage.querySelector('.inventory-section__char-img');

    const heroInventoryArtifactsContainer = inventoryPage.querySelector('.char-inventory__artifact-list');
    const heroUsingArtifactsList = inventoryPage.querySelector('.using-artifacts__list');

    const heroAddStatsBtns = inventoryPage.querySelectorAll('.char-stats__add-btn');
    const heroRemoveStatsBtns = inventoryPage.querySelectorAll('.char-stats__remove-btn');

    let usingArtifactsAddAtkSum = 0;
    let usingArtifactsAddDefSum = 0;
    let usingArtifactsAddHpSum = 0;
    let usingArtifactsAddMpSum = 0;

    heroAddStatsBtns.forEach(item => {
        item.addEventListener('click', heroAddStatsBtnsClick);
    });

    heroRemoveStatsBtns.forEach(item => {
        item.addEventListener('click', heroRemoveStatsBtnsClick);
    });

    function heroAddStatsBtnsClick() {
        if (event.target.classList.contains('str__add-btn') && heroFreeChar.value > 0) {
            heroFreeChar.value = Number(heroFreeChar.value) - 1;
            heroStr.value = Number(heroStr.value) + 1;
            heroAtk.value = Number(heroAtk.value) + 1;
            localStorage.setItem('heroAttack', heroAtk.value);
        }
        if (event.target.classList.contains('agi__add-btn') && heroFreeChar.value > 0) {
            heroFreeChar.value = Number(heroFreeChar.value) - 1;
            heroAgi.value = Number(heroAgi.value) + 1;
            heroDef.value = Number(heroDef.value) + 1;
            localStorage.setItem('heroDefeance', heroDef.value);
        }
        if (event.target.classList.contains('int__add-btn') && heroFreeChar.value > 0) {
            heroFreeChar.value = Number(heroFreeChar.value) - 1;
            heroInt.value = Number(heroInt.value) + 1;
            heroMp.value = Number(heroMp.value) + 10;
            localStorage.setItem('heroMana', heroMp.value);
        }
        if (event.target.classList.contains('vit__add-btn') && heroFreeChar.value > 0) {
            heroFreeChar.value = Number(heroFreeChar.value) - 1;
            heroVit.value = Number(heroVit.value) + 1;
            heroHp.value = Number(heroHp.value) + 10;
            localStorage.setItem('heroHitPoints', heroHp.value);
        }
        choosingCharacter.strenght = Number(heroStr.value);
        choosingCharacter.agillity = Number(heroAgi.value);
        choosingCharacter.vitality = Number(heroVit.value);
        choosingCharacter.intelligence = Number(heroInt.value);
        choosingCharacter.freeCharPoints = Number(heroFreeChar.value);
        localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));
    }

    function heroRemoveStatsBtnsClick() {
        if (event.target.classList.contains('str__remove-btn') && Number(heroStr.value) > 10) {
            heroFreeChar.value = Number(heroFreeChar.value) + 1;
            heroStr.value = Number(heroStr.value) - 1;
            heroAtk.value = Number(heroAtk.value) - 1;
            localStorage.setItem('heroAttack', heroAtk.value);
        }
        if (event.target.classList.contains('agi__remove-btn') && Number(heroAgi.value) > 10) {
            heroFreeChar.value = Number(heroFreeChar.value) + 1;
            heroAgi.value = Number(heroAgi.value) - 1;
            heroDef.value = Number(heroDef.value) - 1;
            localStorage.setItem('heroDefeance', heroDef.value);
        }
        if (event.target.classList.contains('int__remove-btn') && Number(heroInt.value) > 10) {
            heroFreeChar.value = Number(heroFreeChar.value) + 1;
            heroInt.value = Number(heroInt.value) - 1;
            heroMp.value = Number(heroMp.value) - 10;
            localStorage.setItem('heroMana', heroMp.value);
        }
        if (event.target.classList.contains('vit__remove-btn') && Number(heroVit.value) > 10) {
            heroFreeChar.value = Number(heroFreeChar.value) + 1;
            heroVit.value = Number(heroVit.value) - 1;
            heroHp.value = Number(heroHp.value) - 10;
            localStorage.setItem('heroHitPoints', heroHp.value);
        }
        choosingCharacter.strenght = Number(heroStr.value);
        choosingCharacter.agillity = Number(heroAgi.value);
        choosingCharacter.vitality = Number(heroVit.value);
        choosingCharacter.intelligence = Number(heroInt.value);
        choosingCharacter.freeCharPoints = Number(heroFreeChar.value);
        localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));
    }

    function renderCoreInfo() {
        heroStr.value = usingHero.choosingCharacter.strenght;
        heroAgi.value = usingHero.choosingCharacter.agillity;
        heroInt.value = usingHero.choosingCharacter.intelligence;
        heroVit.value = usingHero.choosingCharacter.vitality;

        heroName.textContent = usingHero.choosingCharacter.name;
        heroClass.textContent = usingHero.choosingCharacter.class;

        if (usingHero.choosingCharacter.class == 'warrior') {
            heroImage.src = './img/idle.gif';
        }
        if (usingHero.choosingCharacter.class == 'archer') {
            heroImage.src = './img/archer-idle-unfon.gif';
        }
        if (usingHero.choosingCharacter.class == 'mage') {
            heroImage.src = './img/wizard.gif';
        }

        if (usingHero.choosingCharacter.exp >= usingHero.choosingCharacter.level * 1000) {
            const oldLevel = usingHero.choosingCharacter.level;
            usingHero.choosingCharacter.level = Math.floor(usingHero.choosingCharacter.exp / 1000) + 1;
            usingHero.choosingCharacter.freeCharPoints = usingHero.choosingCharacter.freeCharPoints + ((usingHero.choosingCharacter.level - oldLevel) * 4);
            choosingCharacter.level = usingHero.choosingCharacter.level;
            choosingCharacter.freeCharPoints = usingHero.choosingCharacter.freeCharPoints;
            localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));
        }
        heroLvl.textContent = usingHero.choosingCharacter.level;
        heroExp.textContent = usingHero.choosingCharacter.exp;
        heroNeedExp.textContent = usingHero.choosingCharacter.level * 1000;
        heroGold.textContent = usingHero.choosingCharacter.gold;
        heroFreeChar.value = usingHero.choosingCharacter.freeCharPoints;
    }

    const gridTemp = {
        'helm': {
            active: false
        },
        'weapon': {
            active: false
        },
        'body': {
            active: false
        },
        'shield': {
            active: false
        },
        'boots': {
            active: false
        },
        'first-ring': {
            active: false
        },
        'second-ring': {
            active: false
        },
        'amulet': {
            active: false
        }
    };

    function setArtGridData(artefacts) {
        Object.entries(gridTemp).forEach(function([key, value]) {
            value.active = false;
            value.data = {};
        });

        artefacts.forEach((obj) => {
            gridTemp[obj.type].data = obj;
            gridTemp[obj.type].active = true;
        });
    }

    function renderUseArtifacrts() {
        heroUsingArtifactsList.innerHTML = '';
        usingHero = JSON.parse(localStorage.getItem('choosingChar'));
        const artefacts = usingHero.choosingCharacter.usingArtifacts;


        setArtGridData(artefacts);

        Object.entries(gridTemp).forEach(([key, value]) => {
            const item = value.data;
            
            const heroUsingArtifactsTemplate = value.active
                ? `<li class="using-artifacts__item using-artifact__${item.type}">
                    <img src="img/${item.name}.png" alt="" width="20" height="20" data-art-type=${item.type} data-artname=${item.name} draggable="true">
                </li>`
                : `<li class="using-artifacts__item using-artifact__${key}"></li>`;
            heroUsingArtifactsList.insertAdjacentHTML('beforeend', heroUsingArtifactsTemplate);
        });
    }

    function renderInventoryArtifacrts() {
        heroInventoryArtifactsContainer.innerHTML = '';
        usingHero = JSON.parse(localStorage.getItem('choosingChar'));
        usingHero.choosingCharacter.inventoryArtifacts.forEach(item => {
            const heroInventoryArtifactsTemplate = `
            <li class="char-inventory__artifact-item">
                <img src="./img/${item.name}.png" alt="" width="20" height="20" data-art-type=${item.type} data-artname=${item.name} draggable="true">
            </li>`;
            heroInventoryArtifactsContainer.insertAdjacentHTML('beforeend', heroInventoryArtifactsTemplate);
        });
    }

    function renderSecondaryStats() {
            usingArtifactsAddAtkSum = 0;
            usingArtifactsAddDefSum = 0;
            usingArtifactsAddHpSum = 0;
            usingArtifactsAddMpSum = 0;
        usingHero.choosingCharacter.usingArtifacts.forEach(item => {
            usingArtifactsAddAtkSum += item.dopAttack;
            usingArtifactsAddDefSum += item.dopDefeance;
            usingArtifactsAddHpSum += item.dopHp;
            usingArtifactsAddMpSum += item.dopMp;
        });
        heroAtk.value = usingHero.choosingCharacter.strenght + usingArtifactsAddAtkSum;
        heroDef.value = usingHero.choosingCharacter.agillity + usingArtifactsAddDefSum;
        heroHp.value = usingHero.choosingCharacter.vitality * 10 + usingArtifactsAddHpSum;
        heroMp.value = usingHero.choosingCharacter.intelligence * 10 + usingArtifactsAddMpSum;
        localStorage.setItem('heroAttack', heroAtk.value);
        localStorage.setItem('heroDefeance', heroDef.value);
        localStorage.setItem('heroHitPoints', heroHp.value);
        localStorage.setItem('heroMana', heroMp.value);
        localStorage.setItem('heroCurrentExp', heroExp.textContent);
        localStorage.setItem('heroNeedExp', heroNeedExp.textContent);
    }

    renderCoreInfo();
    renderSecondaryStats();
    renderInventoryArtifacrts();
    renderUseArtifacrts();

    let dragget = null;
    let replacment = null;
    let targetZone = null;
    let target = null;

    let startPos = null;
    let endPos = null;
    let startArr = [];
    let endArr = [];

    function onTargetDragOver(evt) {
        evt.preventDefault();
    }

    function getArtData(arr, artName) {
        const itemData = arr.find(item => item.name == artName);
        return itemData;
    }

    function saveDataInLocalStorage(startArr, endArr) {
        choosingCharacter.usingArtifacts = startArr;
        choosingCharacter.inventoryArtifacts = endArr;

        if (startPos == 'backpack') {
            choosingCharacter.usingArtifacts = endArr;
            choosingCharacter.inventoryArtifacts = startArr;
        }

        localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));
    }

    function moveArtData(startArr, endArr, dragget, target, flag) {
        if (startPos == endPos) {
            return;
        }

        const startItemData = getArtData(startArr, dragget);
        startArr.splice(startArr.indexOf(startItemData), 1);

        endArr.push(startItemData);

        if (endPos == 'hero') {
            endArr.forEach((item) => {
                if (item.type == startItemData.type && item != startItemData) {
                    flag = true;
                    target = item.name;
                }
            });
        }

        if (flag) {
            const endItemData = getArtData(endArr, target);
            endArr.splice(endArr.indexOf(endItemData), 1);

            startArr.push(endItemData);
        }

        saveDataInLocalStorage(startArr, endArr);

        renderSecondaryStats();
        renderInventoryArtifacrts();
        renderUseArtifacrts();
    }

    function onTargetDrop(evt) {
        target = evt.target;
        startArr = usingHero.choosingCharacter.usingArtifacts;
        endArr = usingHero.choosingCharacter.inventoryArtifacts;

        if(target == heroUsingArtifactsList || target.parentElement == heroUsingArtifactsList || target.parentElement.parentElement == heroUsingArtifactsList) {
            endPos = 'hero';
        }
        else {
            endPos = 'backpack';
        }

        if (startPos == 'backpack') {
            startArr = usingHero.choosingCharacter.inventoryArtifacts;
            endArr = usingHero.choosingCharacter.usingArtifacts;
        }

        const flag = !!evt.target.src;
        moveArtData(startArr, endArr, dragget.dataset.artname, target.dataset.artname, flag);


    }

    function setDragListener(targetZone) {
        targetZone.addEventListener('dragover', onTargetDragOver);
        targetZone.addEventListener('drop', onTargetDrop);
    }

    function onBackpackDragstart(evt) {
        startPos = 'backpack';
        dragget = evt.target;

        targetZone = heroUsingArtifactsList;

        setDragListener(targetZone);
    }


    function onHeroDragstart(evt) {
        startPos = 'hero';
        dragget = evt.target;

        targetZone = heroInventoryArtifactsContainer;

        setDragListener(targetZone);
    }

    heroInventoryArtifactsContainer.addEventListener('dragstart', onBackpackDragstart);

    heroUsingArtifactsList.addEventListener('dragstart', onHeroDragstart);
}

const createCharPage = document.querySelector('.create-character-section');
if (createCharPage) {
    const createCharAddStatsBtns = createCharPage.querySelectorAll('.start-char__add-btn');
    const createCharRemoveStatsBtns = createCharPage.querySelectorAll('.start-char__remove-btn');

    const startFreeChar = createCharPage.querySelector('#start-free-char');
    const startStr = createCharPage.querySelector('#start-str');
    const startAgi = createCharPage.querySelector('#start-agi');
    const startInt = createCharPage.querySelector('#start-int');
    const startVit = createCharPage.querySelector('#start-vit');

    const startAtk = createCharPage.querySelector('#start-atk');
    const startDef = createCharPage.querySelector('#start-def');
    const startHp = createCharPage.querySelector('#start-hp');
    const startMp = createCharPage.querySelector('#start-mp');

    startAtk.value = startStr.value;
    startDef.value = startAgi.value;
    startMp.value = startInt.value * 10;
    startHp.value = startVit.value * 10;

    createCharAddStatsBtns.forEach(item => {
        item.addEventListener('click', createCharAddStatsBtnsClick);
    });

    createCharRemoveStatsBtns.forEach(item => {
        item.addEventListener('click', createCharRemoveStatsBtnsClick);
    });

    function createCharAddStatsBtnsClick() {
        if (event.target.classList.contains('start-str__add-btn') && Number(startFreeChar.value) > 0) {
            startFreeChar.value = Number(startFreeChar.value) - 1;
            startStr.value = Number(startStr.value) + 1;
            startAtk.value = Number(startAtk.value) + 1;
        }
        if (event.target.classList.contains('start-agi__add-btn') && Number(startFreeChar.value) > 0) {
            startFreeChar.value = Number(startFreeChar.value) - 1;
            startAgi.value = Number(startAgi.value) + 1;
            startDef.value = Number(startDef.value) + 1;
        }
        if (event.target.classList.contains('start-int__add-btn') && Number(startFreeChar.value) > 0) {
            startFreeChar.value = Number(startFreeChar.value) - 1;
            startInt.value = Number(startInt.value) + 1;
            startMp.value = Number(startMp.value) + 10;
        }
        if (event.target.classList.contains('start-vit__add-btn') && Number(startFreeChar.value) > 0) {
            startFreeChar.value = Number(startFreeChar.value) - 1;
            startVit.value = Number(startVit.value) + 1;
            startHp.value = Number(startHp.value) + 10;
        }
    }

    function createCharRemoveStatsBtnsClick() {
        if (event.target.classList.contains('start-str__remove-btn') && Number(startStr.value) > 10) {
            startFreeChar.value = Number(startFreeChar.value) + 1;
            startStr.value = Number(startStr.value) - 1;
            startAtk.value = Number(startAtk.value) - 1;
        }
        if (event.target.classList.contains('start-agi__remove-btn') && Number(startAgi.value) > 10) {
            startFreeChar.value = Number(startFreeChar.value) + 1;
            startAgi.value = Number(startAgi.value) - 1;
            startDef.value = Number(startDef.value) - 1;
        }
        if (event.target.classList.contains('start-int__remove-btn') && Number(startInt.value) > 10) {
            startFreeChar.value = Number(startFreeChar.value) + 1;
            startInt.value = Number(startInt.value) - 1;
            startMp.value = Number(startMp.value) - 10;
        }
        if (event.target.classList.contains('start-vit__remove-btn') && Number(startVit.value) > 10) {
            startFreeChar.value = Number(startFreeChar.value) + 1;
            startVit.value = Number(startVit.value) - 1;
            startHp.value = Number(startHp.value) - 10;
        }
    }

    const createCharHeroName = createCharPage.querySelector('#char-name');
    const createCharHeroClass = createCharPage.querySelectorAll('.class-choose__input');
    const createCharBtn = createCharPage.querySelector('.create-character-section__create-new-char-btn');


    function createNewChar() {
        let createCharChoosingHeroClass = null;
        let newHeroName = null;

        const userInfo = JSON.parse(localStorage.getItem('userChars'));

        if (createCharHeroName.value) {
            newHeroName = createCharHeroName.value;
        }
        else {
            alert('Введите имя персонажа');
            return false;
        }

        createCharHeroClass.forEach(item => {
            if (item.checked) {
                createCharChoosingHeroClass = item.value;
            }
        });

        const newChar = {
            name: newHeroName,
            class: createCharChoosingHeroClass,
            level: 1,
            strenght: Number(startStr.value),
            agillity: Number(startAgi.value),
            intelligence: Number(startInt.value),
            vitality: Number(startVit.value),
            gold: 100,
            exp: 0,
            freeCharPoints: Number(startFreeChar.value),
            killStrick: 0,
            flag: "normal",
            usingArtifacts: [

            ],
            inventoryArtifacts: [

            ],
            skills: [
                {
                    name: createCharChoosingHeroClass + "-skill-1",
                    colddown: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill1.cooldown,
                    mpPrice: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill1.price,
                },
                {
                    name: createCharChoosingHeroClass + "-skill-2",
                    colddown: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill2.cooldown,
                    mpPrice: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill2.price,
                },
                {
                    name: createCharChoosingHeroClass + "-skill-3",
                    colddown: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill3.cooldown,
                    mpPrice: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill3.price,
                },
                {
                    name: createCharChoosingHeroClass + "-skill-4",
                    colddown: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill4.cooldown,
                    mpPrice: SKILLS_COOLDOWN_PRICE[createCharChoosingHeroClass].skill4.price,
                },
            ],
        };

        userCharacters = userInfo.userCharacters;

        userCharacters.push(newChar);

        localStorage.setItem('userChars', JSON.stringify({ userCharacters }));

        window.location.href = 'character-list.html';
    }

    createCharBtn.addEventListener('click', createNewChar);
}

const shopPage = document.querySelector('.shop-section');
if (shopPage) {
    const shopArtifactsContainer = shopPage.querySelector('.shop-artifacts__list');

    const shopArtifactsList = shopArtifacts.map((it) => `<li class="shop-artifacts__item shop-artifact">
        <img class="shop-artifact__img" src="img/${it.name}.png" alt="" width="40" height="40">
        <ul class="shop-artifact__stats">
            <li class="shop-artifact__add-attack">attak: +<span class="shop-artifact__add-attack--value">${it.dopAttack}</span></li>
            <li class="shop-artifact__add-defeance">defeance: +<span class="shop-artifact__add-defeance--value">${it.dopDefeance}</span></li>
            <li class="shop-artifact__add-hp">hp: +<span class="shop-artifact__add-hp--value">${it.dopHp}</span></li>
            <li class="shop-artifact__add-mp">mp: +<span class="shop-artifact__add-mp--value">${it.dopMp}</span></li>
        </ul>
        <p class="shop-artifact__price">Gold: <span class="shop-artifact__price--value">${it.price}</span></p>
        <button class="shop-artifact__buy-btn" type="button" data-buy-art-name = "${it.name}">Купить</button>
    </li>`);

    shopArtifactsList.forEach(it => {
        shopArtifactsContainer.insertAdjacentHTML('beforeend', it);
    });

    const heroGold = shopPage.querySelector('.shop-section__player-gold--value');
    let usingHero = JSON.parse(localStorage.getItem('choosingChar'));
    heroGold.textContent = usingHero.choosingCharacter.gold;

    const buyArtBtns = shopPage.querySelectorAll('.shop-artifact__buy-btn');

    function buyArtBtnsClick() {
        const usingHero = JSON.parse(localStorage.getItem('choosingChar'));
        const buyingArtBtn = event.target.getAttribute('data-buy-art-name');

        shopArtifacts.forEach(it => {
            if (it.name == buyingArtBtn) {
                const buyingArt = {
                    name: it.name,
                    dopAttack: it.dopAttack,
                    dopDefeance: it.dopDefeance,
                    dopHp: it.dopHp,
                    dopMp: it.dopMp,
                    price: it.price,
                    type: it.type,
                };

                if (usingHero.choosingCharacter.gold >= buyingArt.price) {
                    usingHero.choosingCharacter.inventoryArtifacts.push(buyingArt);
                    usingHero.choosingCharacter.gold -= buyingArt.price;
                    heroGold.textContent = usingHero.choosingCharacter.gold;
                    choosingCharacter = usingHero.choosingCharacter;

                    localStorage.setItem('choosingChar', JSON.stringify({ choosingCharacter }));
                }
                else {
                    alert('недостаточно золота');
                }
            }
        });
    }

    buyArtBtns.forEach(item => {
        item.addEventListener('click', buyArtBtnsClick);
    });
}

const levelListPage = document.querySelector('.level-list-section');
if (levelListPage) {
    const arenaLink = levelListPage.querySelectorAll('.level-list-section__level');

    let usingHero = JSON.parse(localStorage.getItem('choosingChar'));
    let choosingCharacter = usingHero.choosingCharacter;

    function chooseArena() {
        const selectedArena = event.target.getAttribute('data-level_id');
        localStorage.setItem('selectedArena', selectedArena);
    }

    arenaLink.forEach(item => {
        item.addEventListener('click', chooseArena);
    });
}

