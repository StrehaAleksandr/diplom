const FlagName = {
    normal: 'NORMAL',
    hard: 'HARD',
    middle: 'MIDDLE',
};
 
const Flag = {
    NORMAL: {
        cirtCount: 0,
        enemyCountFactor: 1,
        enemyAttackFactor: 1,
        enemyDefeanceFactor: 1,
        enemyHpFactor: 1,
        enemyMpFactor: 1,
    },
    MIDDLE: {
        cirtCount: 200,
        enemyCountFactor: 2,
        enemyAttackFactor: 2,
        enemyDefeanceFactor: 2,
        enemyHpFactor: 2,
        enemyMpFactor: 2,
    },
    HARD: {
        cirtCount: 300,
        enemyCountFactor: 3,
        enemyAttackFactor: 3,
        enemyDefeanceFactor: 3,
        enemyHpFactor: 3,
        enemyMpFactor: 3,
    },
};

// на потом
// const currentFlag = FlagName[userList[0].characterList.flag];
// const currentParam = Flag[currentFlag];

const userList = [
    {
        login: "admin",
        password: "1111",
        characterList: [
            {
                name: "war",
                class: "warrior",
                level: 3,
                strenght: 22,
                agillity: 10,
                intelligence: 10,
                vitality: 10,
                gold: 5000,
                exp: 2000,
                freeCharPoints: 0,
                killStrick: 100,
                flag: "normal",
                usingArtifacts: [
                    {
                        name: "sword-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "body-2",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "shield-3",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "boots-4",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "amulet-5",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "ring-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "ring-2",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "helm-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                ],
                inventoryArtifacts: [                    
                    {
                        name: "staf-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                ],
                skills: [
                    {
                        name: "skill-1",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-2",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-3",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-4",
                        colddown: 1,
                        mpPrice: 10
                    },
                ], 
            },
            {
                name: "ar",
                class: "archer",
                level: 4,
                strenght: 10,
                agillity: 22,
                intelligence: 10,
                vitality: 10,
                gold: 5000,
                exp: 3000,
                freeCharPoints: 4,
                killStrick: 100,
                flag: "normal",
                usingArtifacts: [
                    {
                        name: "sword-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "body-2",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "shield-3",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "boots-4",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "amulet-5",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "ring-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "ring-2",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "helm-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                ],
                inventoryArtifacts: [                    
                    {
                        name: "staf-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                ],
                skills: [
                    {
                        name: "skill-1",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-2",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-3",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-4",
                        colddown: 1,
                        mpPrice: 10
                    },
                ], 
            },
            {
                name: "mag",
                class: "mage",
                level: 3,
                strenght: 22,
                agillity: 10,
                intelligence: 10,
                vitality: 10,
                gold: 5000,
                exp: 2000,
                freeCharPoints: 0,
                killStrick: 100,
                flag: "normal",
                usingArtifacts: [
                    {
                        name: "sword-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "body-2",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "shield-3",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "boots-4",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "amulet-5",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "ring-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "ring-5",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                    {
                        name: "helm-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                ],
                inventoryArtifacts: [                    
                    {
                        name: "staf-1",
                        dopAttack: 10,
                        dopDefeance: 10,
                        dopHp: 10,
                        dopMp: 10,
                    },
                ],
                skills: [
                    {
                        name: "skill-1",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-2",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-3",
                        colddown: 1,
                        mpPrice: 10
                    },
                    {
                        name: "skill-4",
                        colddown: 1,
                        mpPrice: 10
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
                hp: 10,
                mp: 0,
                attack: 10,
                defeance: 10,
                skills: [],
                count: 5,
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
                hp: 10,
                mp: 0,
                attack: 10,
                defeance: 10,
                skills: [],
                count: 5,
            },
            {
                name: "elf",
                hp: 15,
                mp: 10,
                attack: 10,
                defeance: 10,
                skills: [
                    {
                        name: "enemySkill-1",
                        mpPrice: 5,
                    }
                ],
                count: 5,
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
                hp: 10,
                mp: 0,
                attack: 10,
                defeance: 10,
                skills: [],
                count: 5,
            },
            {
                name: "elf",
                hp: 15,
                mp: 10,
                attack: 10,
                defeance: 10,
                skills: [
                    {
                        name: "enemySkill-1",
                        mpPrice: 5,
                    }
                ],
                count: 5,
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
                hp: 10,
                mp: 0,
                attack: 10,
                defeance: 10,
                skills: [],
                count: 5,
            },
            {
                name: "elf",
                hp: 15,
                mp: 10,
                attack: 10,
                defeance: 10,
                skills: [
                    {
                        name: "enemySkill-1",
                        mpPrice: 5,
                    }
                ],
                count: 5,
            },
            {
                name: "grinch",
                hp: 30,
                mp: 20,
                attack: 10,
                defeance: 10,
                skills: [
                    {
                        name: "enemySkill-1",
                        mpPrice: 5,
                    }
                ],
                count: 5,
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
                mp: 100,
                attack: 20,
                defeance: 20,
                skills: [
                    {
                        name: "bossSkill1",
                        mpPrice: 5,
                    },{
                        name: "bossSkill2",
                        mpPrice: 5,
                    },
                ],
                count: 1,
            },
        ],
    },
];

const shopArtifacts = [
    {
        name: "sword-5",
        dopAttack: 10,
        dopDefeance: 10,
        dopHp: 10,
        dopMp: 10,
        price: 100,
    },
    {
        name: "body-5",
        dopAttack: 10,
        dopDefeance: 10,
        dopHp: 10,
        dopMp: 10,
        price: 100,
    },
    {
        name: "helm-5",
        dopAttack: 10,
        dopDefeance: 10,
        dopHp: 10,
        dopMp: 10,
        price: 100,
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
