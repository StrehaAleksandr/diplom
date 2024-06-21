const FlagName = {
    normal: 'NORMAL',
    hard: 'HARD',
    very_hard: 'VERY_HARD',
    easy: 'EASY',
    very_easy: 'VERY_EASY',
};

const SKILLS_COOLDOWN_PRICE = {
    warrior: {
        skill1: {
            cooldown: 0,
            price: 0,
        },
        skill2: {
            cooldown: 0,
            price: 10,
        },
        skill3: {
            cooldown: 3000,
            price: 15,
        },
        skill4: {
            cooldown: 15000,
            price: 40,
        },
    },
    archer: {
        skill1: {
            cooldown: 0,
            price: 0,
        },
        skill2: {
            cooldown: 1000,
            price: 10,
        },
        skill3: {
            cooldown: 3000,
            price: 15,
        },
        skill4: {
            cooldown: 15000,
            price: 40,
        },
    },
    mage: {
        skill1: {
            cooldown: 0,
            price: 5,
        },
        skill2: {
            cooldown: 1000,
            price: 10,
        },
        skill3: {
            cooldown: 3000,
            price: 15,
        },
        skill4: {
            cooldown: 15000,
            price: 40,
        },
    },
}
 
const Flag = {
    NORMAL: {
        cirtCount: 0,
        enemyCountFactor: 1,
        enemyAttackFactor: 1,
        enemyDefeanceFactor: 1,
        enemyHpFactor: 1,
        enemyMpFactor: 1,
        startEnemyCount: 3,
    },
    HARD: {
        cirtCount: 200,
        enemyCountFactor: 1,
        enemyAttackFactor: 2,
        enemyDefeanceFactor: 2,
        enemyHpFactor: 2,
        enemyMpFactor: 2,
        startEnemyCount: 3,
    },
    VERY_HARD: {
        cirtCount: 300,
        enemyCountFactor: 2,
        enemyAttackFactor: 5,
        enemyDefeanceFactor: 5,
        enemyHpFactor: 5,
        enemyMpFactor: 5,
        startEnemyCount: 3,
    },
    EASY: {
        cirtCount: 10,
        enemyCountFactor: 1,
        enemyAttackFactor: 0.5,
        enemyDefeanceFactor: 0.5,
        enemyHpFactor: 0.5,
        enemyMpFactor: 0.5,
        startEnemyCount: 2,
    },
    VERY_EASY: {
        cirtCount: 20,
        enemyCountFactor: 0.5,
        enemyAttackFactor: 0.2,
        enemyDefeanceFactor: 0.2,
        enemyHpFactor: 0.2,
        enemyMpFactor: 0.2,
        startEnemyCount: 1,
    },
};

const usersList = [
    {
        login: "admin",
        password: "1111",
        characterList: [
            {
                name: "war",
                class: "warrior",
                level: 20,
                strenght: 60,
                agillity: 20,
                intelligence: 10,
                vitality: 30,
                gold: 5000,
                exp: 2000,
                freeCharPoints: 0,
                killStrick: 100,
                deathCount: 5,
                flag: "very_hard",
                usingArtifacts: [
                    {
                        name: "sword-5",
                        dopAttack: 10,
                        dopDefeance: 0,
                        dopHp: 0,
                        dopMp: 0,
                        price: 500,
                        type: 'weapon'
                    },
                    {
                        name: "body-5",
                        dopAttack: 0,
                        dopDefeance: 10,
                        dopHp: 50,
                        dopMp: 0,
                        price: 500,
                        type: 'body'
                    },
                    {
                        name: "helm-5",
                        dopAttack: 0,
                        dopDefeance: 5,
                        dopHp: 0,
                        dopMp: 50,
                        price: 500,
                        type: 'helm'
                    },
                    {
                        name: "boots-5",
                        dopAttack: 0,
                        dopDefeance: 5,
                        dopHp: 25,
                        dopMp: 25,
                        price: 500,
                        type: 'boots'
                    },
                    {
                        name: "shield-5",
                        dopAttack: 0,
                        dopDefeance: 10,
                        dopHp: 0,
                        dopMp: 0,
                        price: 500,
                        type: 'shield'
                    },
                    {
                        name: "ring-5",
                        dopAttack: 10,
                        dopDefeance: 0,
                        dopHp: 50,
                        dopMp: 0,
                        price: 500,
                        type: 'first-ring'
                    },
                    {
                        name: "ring-5",
                        dopAttack: 10,
                        dopDefeance: 0,
                        dopHp: 0,
                        dopMp: 50,
                        price: 500,
                        type: 'second-ring'
                    },
                    {
                        name: "amulet-5",
                        dopAttack: 5,
                        dopDefeance: 5,
                        dopHp: 25,
                        dopMp: 25,
                        price: 500,
                        type: 'amulet'
                    },
                ],
                inventoryArtifacts: [ 

                ],
                skills: [
                    {
                        name: "warrior-skill-1",
                        colddown: SKILLS_COOLDOWN_PRICE.warrior.skill1.cooldown,
                        mpPrice: SKILLS_COOLDOWN_PRICE.warrior.skill1.price,
                    },
                    {
                        name: "warrior-skill-2",
                        colddown: SKILLS_COOLDOWN_PRICE.warrior.skill2.cooldown,
                        mpPrice: SKILLS_COOLDOWN_PRICE.warrior.skill2.price,
                    },
                    {
                        name: "warrior-skill-3",
                        colddown: SKILLS_COOLDOWN_PRICE.warrior.skill3.cooldown,
                        mpPrice: SKILLS_COOLDOWN_PRICE.warrior.skill3.price,
                    },
                    {
                        name: "warrior-skill-4",
                        colddown: SKILLS_COOLDOWN_PRICE.warrior.skill4.cooldown,
                        mpPrice: SKILLS_COOLDOWN_PRICE.warrior.skill4.price,
                    },
                ], 
            },
        ],
    },
    {
        login: "gamer",
        password: "1111",
        characterList: [],
    },
];

const arenaList = [
    {
        levelNumber: 1,
        status: "normal",
        enemyCount: 5,
        enemyList: [
            {
                name: "dog",
                hp: 15,
                mp: 0,
                attack: 10,
                defeance: 10,
                count: 5,
                expGain: 10,
                goldGain: 10,
                speed: 0.7,
            },
        ],
    },
    {
        levelNumber: 2,
        status: "normal",
        enemyCount: 10,
        enemyList: [
            {
                name: "dog",
                hp: 15,
                mp: 0,
                attack: 10,
                defeance: 10,
                count: 5,
                expGain: 10,
                goldGain: 10,
                speed: 0.7,
            },
            {
                name: "elf",
                hp: 30,
                mp: 0,
                attack: 20,
                defeance: 10,
                count: 5,
                expGain: 20,
                goldGain: 20,
                speed: 0.5,
            },
        ],
    },
    {
        levelNumber: 3,
        status: "normal",
        enemyCount: 10,
        enemyList: [
            {
                name: "dog",
                hp: 15,
                mp: 0,
                attack: 10,
                defeance: 10,
                count: 5,
                expGain: 10,
                goldGain: 10,
                speed: 0.7,
            },
            {
                name: "elf",
                hp: 30,
                mp: 0,
                attack: 20,
                defeance: 10,
                count: 5,
                expGain: 20,
                goldGain: 20,
                speed: 0.5,
            },
            {
                name: "grinch",
                hp: 60,
                mp: 0,
                attack: 40,
                defeance: 10,
                count: 5,
                expGain: 30,
                goldGain: 30,
                speed: 0.2,
            },
        ],
    },
    {
        levelNumber: 4,
        status: "normal",
        enemyCount: 15,
        enemyList: [
            {
                name: "dog",
                hp: 15,
                mp: 0,
                attack: 10,
                defeance: 10,
                count: 5,
                expGain: 10,
                goldGain: 10,
                speed: 0.7,
            },
            {
                name: "elf",
                hp: 30,
                mp: 0,
                attack: 20,
                defeance: 10,
                count: 5,
                expGain: 20,
                goldGain: 20,
                speed: 0.5,
            },
            {
                name: "grinch",
                hp: 60,
                mp: 0,
                attack: 40,
                defeance: 10,
                count: 5,
                expGain: 30,
                goldGain: 30,
                speed: 0.2,
            },
        ],
    },
    {
        levelNumber: 5,
        status: "boss",
        enemyCount: 1,
        enemyList: [
            {
                name: "boss",
                hp: 100,
                mp: 0,
                attack: 100,
                defeance: 10,
                count: 1,
                expGain: 150,
                goldGain: 200,
                speed: 1,
            },
        ],
    },
];

const shopArtifacts = [
    {
        name: "sword-1",
        dopAttack: 2,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 100,
        type: 'weapon'
    },
    {
        name: "bow-1",
        dopAttack: 2,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 100,
        type: 'weapon'
    },
    {
        name: "staf-1",
        dopAttack: 2,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 100,
        type: 'weapon'
    },
    {
        name: "body-1",
        dopAttack: 0,
        dopDefeance: 2,
        dopHp: 10,
        dopMp: 0,
        price: 100,
        type: 'body'
    },
    {
        name: "helm-1",
        dopAttack: 0,
        dopDefeance: 1,
        dopHp: 0,
        dopMp: 10,
        price: 100,
        type: 'helm'
    },
    {
        name: "boots-1",
        dopAttack: 0,
        dopDefeance: 1,
        dopHp: 5,
        dopMp: 5,
        price: 100,
        type: 'boots'
    },
    {
        name: "shield-1",
        dopAttack: 0,
        dopDefeance: 2,
        dopHp: 0,
        dopMp: 0,
        price: 100,
        type: 'shield'
    },
    {
        name: "ring-1",
        dopAttack: 2,
        dopDefeance: 0,
        dopHp: 10,
        dopMp: 0,
        price: 100,
        type: 'first-ring'
    },
    {
        name: "ring-1-1",
        dopAttack: 2,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 10,
        price: 100,
        type: 'second-ring'
    },
    {
        name: "amulet-1",
        dopAttack: 1,
        dopDefeance: 1,
        dopHp: 5,
        dopMp: 5,
        price: 100,
        type: 'amulet'
    },
    {
        name: "sword-2",
        dopAttack: 4,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 200,
        type: 'weapon'
    },
    {
        name: "bow-2",
        dopAttack: 4,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 200,
        type: 'weapon'
    },
    {
        name: "staf-2",
        dopAttack: 4,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 200,
        type: 'weapon'
    },
    {
        name: "body-2",
        dopAttack: 0,
        dopDefeance: 4,
        dopHp: 20,
        dopMp: 0,
        price: 200,
        type: 'body'
    },
    {
        name: "helm-2",
        dopAttack: 0,
        dopDefeance: 2,
        dopHp: 0,
        dopMp: 20,
        price: 200,
        type: 'helm'
    },
    {
        name: "boots-2",
        dopAttack: 0,
        dopDefeance: 2,
        dopHp: 10,
        dopMp: 10,
        price: 200,
        type: 'boots'
    },
    {
        name: "shield-1",
        dopAttack: 0,
        dopDefeance: 4,
        dopHp: 0,
        dopMp: 0,
        price: 200,
        type: 'shield'
    },
    {
        name: "ring-1",
        dopAttack: 4,
        dopDefeance: 0,
        dopHp: 20,
        dopMp: 0,
        price: 200,
        type: 'first-ring'
    },
    {
        name: "ring-2",
        dopAttack: 4,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 20,
        price: 200,
        type: 'second-ring'
    },
    {
        name: "amulet-2",
        dopAttack: 2,
        dopDefeance: 2,
        dopHp: 10,
        dopMp: 10,
        price: 200,
        type: 'amulet'
    },
    {
        name: "sword-3",
        dopAttack: 6,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 300,
        type: 'weapon'
    },
    {
        name: "bow-3",
        dopAttack: 6,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 300,
        type: 'weapon'
    },
    {
        name: "staf-3",
        dopAttack: 6,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 300,
        type: 'weapon'
    },
    {
        name: "body-3",
        dopAttack: 0,
        dopDefeance: 6,
        dopHp: 30,
        dopMp: 0,
        price: 300,
        type: 'body'
    },
    {
        name: "helm-3",
        dopAttack: 0,
        dopDefeance: 3,
        dopHp: 0,
        dopMp: 30,
        price: 300,
        type: 'helm'
    },
    {
        name: "boots-3",
        dopAttack: 0,
        dopDefeance: 3,
        dopHp: 15,
        dopMp: 15,
        price: 300,
        type: 'boots'
    },
    {
        name: "shield-3",
        dopAttack: 0,
        dopDefeance: 6,
        dopHp: 0,
        dopMp: 0,
        price: 300,
        type: 'shield'
    },
    {
        name: "ring-3",
        dopAttack: 6,
        dopDefeance: 0,
        dopHp: 30,
        dopMp: 0,
        price: 300,
        type: 'first-ring'
    },
    {
        name: "ring-3",
        dopAttack: 6,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 30,
        price: 300,
        type: 'second-ring'
    },
    {
        name: "amulet-3",
        dopAttack: 3,
        dopDefeance: 3,
        dopHp: 15,
        dopMp: 15,
        price: 300,
        type: 'amulet'
    },
    {
        name: "sword-4",
        dopAttack: 8,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 400,
        type: 'weapon'
    },
    {
        name: "bow-4",
        dopAttack: 8,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 400,
        type: 'weapon'
    },
    {
        name: "staf-4",
        dopAttack: 8,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 400,
        type: 'weapon'
    },
    {
        name: "body-4",
        dopAttack: 0,
        dopDefeance: 8,
        dopHp: 40,
        dopMp: 0,
        price: 400,
        type: 'body'
    },
    {
        name: "helm-4",
        dopAttack: 0,
        dopDefeance: 4,
        dopHp: 0,
        dopMp: 40,
        price: 400,
        type: 'helm'
    },
    {
        name: "boots-4",
        dopAttack: 0,
        dopDefeance: 4,
        dopHp: 20,
        dopMp: 20,
        price: 400,
        type: 'boots'
    },
    {
        name: "shield-4",
        dopAttack: 0,
        dopDefeance: 8,
        dopHp: 0,
        dopMp: 0,
        price: 400,
        type: 'shield'
    },
    {
        name: "ring-4",
        dopAttack: 8,
        dopDefeance: 0,
        dopHp: 40,
        dopMp: 0,
        price: 400,
        type: 'first-ring'
    },
    {
        name: "ring-4",
        dopAttack: 8,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 40,
        price: 400,
        type: 'second-ring'
    },
    {
        name: "amulet-4",
        dopAttack: 4,
        dopDefeance: 4,
        dopHp: 20,
        dopMp: 20,
        price: 400,
        type: 'amulet'
    },
    {
        name: "sword-5",
        dopAttack: 10,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 500,
        type: 'weapon'
    },
    {
        name: "bow-5",
        dopAttack: 10,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 500,
        type: 'weapon'
    },
    {
        name: "staf-5",
        dopAttack: 10,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 0,
        price: 500,
        type: 'weapon'
    },
    {
        name: "body-5",
        dopAttack: 0,
        dopDefeance: 10,
        dopHp: 50,
        dopMp: 0,
        price: 500,
        type: 'body'
    },
    {
        name: "helm-5",
        dopAttack: 0,
        dopDefeance: 5,
        dopHp: 0,
        dopMp: 50,
        price: 500,
        type: 'helm'
    },
    {
        name: "boots-5",
        dopAttack: 0,
        dopDefeance: 5,
        dopHp: 25,
        dopMp: 25,
        price: 500,
        type: 'boots'
    },
    {
        name: "shield-5",
        dopAttack: 0,
        dopDefeance: 10,
        dopHp: 0,
        dopMp: 0,
        price: 500,
        type: 'shield'
    },
    {
        name: "ring-5",
        dopAttack: 10,
        dopDefeance: 0,
        dopHp: 50,
        dopMp: 0,
        price: 500,
        type: 'first-ring'
    },
    {
        name: "ring-5",
        dopAttack: 10,
        dopDefeance: 0,
        dopHp: 0,
        dopMp: 50,
        price: 500,
        type: 'second-ring'
    },
    {
        name: "amulet-5",
        dopAttack: 5,
        dopDefeance: 5,
        dopHp: 25,
        dopMp: 25,
        price: 500,
        type: 'amulet'
    },
];

// const flags = [
//     {
//         name: "normal",
//         cirtCount: 0,
//         enemyCountFactor: 1,
//         enemyAttackFactor: 1,
//         enemyDefeanceFactor: 1,
//         enemyHpFactor: 1,
//         enemyMpFactor: 1,
//     },
//     {
//         name: "middle",
//         cirtCount: 200,
//         enemyCountFactor: 2,
//         enemyAttackFactor: 2,
//         enemyDefeanceFactor: 2,
//         enemyHpFactor: 2,
//         enemyMpFactor: 2,
//     },
//     {
//         name: "hard",
//         cirtCount: 300,
//         enemyCountFactor: 3,
//         enemyAttackFactor: 3,
//         enemyDefeanceFactor: 3,
//         enemyHpFactor: 3,
//         enemyMpFactor: 3,
//     },
// ];


// export default {userList, shopArtifacts, arenaList};
