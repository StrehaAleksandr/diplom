// import { userList, arenaList, shopArtifacts } from "./mokData";

let userCharacters = [];

const autorizationPage = document.querySelector('.autorization-section');
if (autorizationPage) {
    const autorizationLogin = autorizationPage.querySelector('#login');
    const autorizationPassword = autorizationPage.querySelector('#password');
    const autorizationLoginBtn = autorizationPage.querySelector('.autorization-section__login-btn');

    
    function autorization() {
        userList.forEach(item => {
            if(autorizationLogin.value == item.login && autorizationPassword.value == item.password) {
                userCharacters = item;
                localStorage.setItem('userChars', JSON.stringify({userCharacters}));
                window.location.href = 'character-list.html';
            }
        });
    };

    autorizationLoginBtn.addEventListener('click', autorization);
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
        const userChars = userInfo.userCharacters.characterList;

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
        const userChars = userInfo.userCharacters.characterList;
        choosingCharacter = userChars[index];

        localStorage.setItem('choosingChar', JSON.stringify({choosingCharacter}));

        window.location.href = 'inventory.html';
    };
}

const inventoryPage = document.querySelector('.inventory-section');
if (inventoryPage) {
    let usingHero = JSON.parse(localStorage.getItem('choosingChar'));
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

    heroFreeChar.value = usingHero.choosingCharacter.freeCharPoints;
    heroStr.value = usingHero.choosingCharacter.strenght;
    heroAgi.value = usingHero.choosingCharacter.agillity;
    heroInt.value = usingHero.choosingCharacter.intelligence;
    heroVit.value = usingHero.choosingCharacter.vitality;

    heroName.textContent = usingHero.choosingCharacter.name;
    heroClass.textContent = usingHero.choosingCharacter.class;
    heroLvl.textContent = usingHero.choosingCharacter.level;
    heroExp.textContent = usingHero.choosingCharacter.exp;
    heroNeedExp.textContent = usingHero.choosingCharacter.level * 1000;
    heroGold.textContent = usingHero.choosingCharacter.gold;
    if (usingHero.choosingCharacter.class == 'warrior') {
        heroImage.src = './img/idle.gif';
    }
    if (usingHero.choosingCharacter.class == 'archer') {
        heroImage.src = './img/archer-idle-unfon.gif';
    }
    if (usingHero.choosingCharacter.class == 'mage') {
        heroImage.src = './img/wizard.gif';
    } 

    const heroInventoryArtifactsContainer = inventoryPage.querySelector('.char-inventory__artifact-list');
    const heroInventoryArtifactsTemplate = `<li class="char-inventory__artifact-item"><img src="./img/" alt="" width="20" height="20" draggable="true"></li>`;

    for (let i = 0; i < usingHero.choosingCharacter.inventoryArtifacts.length; i++) {
        heroInventoryArtifactsContainer.insertAdjacentHTML('beforeend', heroInventoryArtifactsTemplate);
    }    

    const heroInventoryArtifacts = inventoryPage.querySelectorAll('.char-inventory__artifact-item');

    for (let i = 0; i < usingHero.choosingCharacter.inventoryArtifacts.length; i++) {
        heroInventoryArtifacts[i].querySelector('img').src = heroInventoryArtifacts[i].querySelector('img').src + usingHero.choosingCharacter.inventoryArtifacts[i].name + '.png';
    }  

    const heroUsingHelm = inventoryPage.querySelector('.using-artifact__helm');
    const heroUsingBody = inventoryPage.querySelector('.using-artifact__body');
    const heroUsingSword = inventoryPage.querySelector('.using-artifact__weapon');
    const heroUsingShield = inventoryPage.querySelector('.using-artifact__shield');
    const heroUsingBoots = inventoryPage.querySelector('.using-artifact__boots');
    const heroUsingAmulet = inventoryPage.querySelector('.using-artifact__amulet');
    const heroUsingFirstRing = inventoryPage.querySelector('.using-artifact__ring-1');
    const heroUsingSecondRing = inventoryPage.querySelector('.using-artifact__ring-2');

    let usingArtifactsAddAtkSum = 0;
    let usingArtifactsAddDefSum = 0;
    let usingArtifactsAddHpSum = 0;
    let usingArtifactsAddMpSum = 0;

    for (let i = 0; i < usingHero.choosingCharacter.usingArtifacts.length; i++) {
        usingArtifactsAddAtkSum += usingHero.choosingCharacter.usingArtifacts[i].dopAttack;
        usingArtifactsAddDefSum += usingHero.choosingCharacter.usingArtifacts[i].dopDefeance;
        usingArtifactsAddHpSum += usingHero.choosingCharacter.usingArtifacts[i].dopHp;
        usingArtifactsAddMpSum += usingHero.choosingCharacter.usingArtifacts[i].dopMp;

        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'helm') {
            heroUsingHelm.querySelector('img').src = heroUsingHelm.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
        }
        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'body') {
            heroUsingBody.querySelector('img').src = heroUsingBody.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
        }
        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'sword' || usingHero.choosingCharacter.usingArtifacts[0].name.split('-')[0] == 'bow' || usingHero.choosingCharacter.usingArtifacts[0].name.split('-')[0] == 'staf') {
            heroUsingSword.querySelector('img').src = heroUsingSword.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
        }
        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'shield') {
            heroUsingShield.querySelector('img').src = heroUsingShield.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
        }
        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'boots') {
            heroUsingBoots.querySelector('img').src = heroUsingBoots.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
        } 
        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'amulet') {
            heroUsingAmulet.querySelector('img').src = heroUsingAmulet.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
        }
        if (usingHero.choosingCharacter.usingArtifacts[i].name.split('-')[0] == 'ring') {
            if (heroUsingFirstRing.querySelector('img').getAttribute('src') == 'img/') {
                heroUsingFirstRing.querySelector('img').src = heroUsingFirstRing.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
            }
            else {
                heroUsingSecondRing.querySelector('img').src = heroUsingSecondRing.querySelector('img').src + usingHero.choosingCharacter.usingArtifacts[i].name + '.png';
            }
        }
    }

    heroAtk.value = usingHero.choosingCharacter.strenght + usingArtifactsAddAtkSum;
    heroDef.value = usingHero.choosingCharacter.agillity + usingArtifactsAddDefSum;
    heroHp.value = usingHero.choosingCharacter.vitality * 10 + usingArtifactsAddHpSum;
    heroMp.value = usingHero.choosingCharacter.intelligence * 10 + usingArtifactsAddMpSum;

    localStorage.setItem('heroAttack', heroAtk.value);
    localStorage.setItem('heroDefeance', heroDef.value);
    localStorage.setItem('heroHitPoints', heroHp.value);
    localStorage.setItem('heroMana', heroMp.value);

    const heroAddStatsBtns = inventoryPage.querySelectorAll('.char-stats__add-btn');
    const heroRemoveStatsBtns = inventoryPage.querySelectorAll('.char-stats__remove-btn');

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
    }

    const heroUsingArtifactsList = inventoryPage.querySelector('.using-artifacts__list');
    const heroUsingArtifacts = heroUsingArtifactsList.querySelectorAll('.using-artifacts__item');
    heroInventoryArtifactsContainer;

    let dragged = null;
    let replacement = null;

    heroUsingArtifacts.forEach(item => {
        item.querySelector('img').addEventListener("dragstart", (evt) => {
            dragged = evt.target
        });
    });

    heroInventoryArtifacts.forEach(item => {
        item.querySelector('img').addEventListener("dragstart", (evt) => {
            dragged = evt.target
        });
    });

    heroUsingArtifactsList.addEventListener("dragover", (e) => e.preventDefault());
    heroInventoryArtifactsContainer.addEventListener("dragover", (e) => e.preventDefault());

    heroUsingArtifactsList.addEventListener("drop", (e) => { 
        // нужно обновлять  heroInventoryArtifactsContainer
        heroInventoryArtifactsContainer.insertAdjacentHTML('beforeend', heroInventoryArtifactsTemplate);
        heroInventoryArtifactsContainer.lastChild.querySelector('img').src = e.target.src;
        for (const artifact of heroUsingArtifactsList.children) {
            if (e.target == artifact.querySelector('img')) { 
                replacement = e.target;               
                replacement.src = dragged.src;
                heroInventoryArtifactsContainer.removeChild(dragged.parentElement);
            }
        }
    });
    
    heroInventoryArtifactsContainer.addEventListener("drop", (e) => {
        // нужно обновлять  heroInventoryArtifactsContainer
        heroInventoryArtifactsContainer.insertAdjacentHTML('beforeend', heroInventoryArtifactsTemplate);
        heroInventoryArtifactsContainer.lastChild.querySelector('img').src = dragged.src;
        for (const artifact of heroInventoryArtifactsContainer.children) {
            if (e.target == artifact.querySelector('img')) { 
                replacement = e.target;               
                dragged.src = replacement.src;
                heroInventoryArtifactsContainer.removeChild(e.target.parentElement);
            }
        }
    });
} 