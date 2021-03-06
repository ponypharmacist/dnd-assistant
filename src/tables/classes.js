// Classes
// ToDo: leveling system, spells, feats and iterations for every level
export default {
  barbarian: {
    title: 'Barbarian',
    hitDie: 12,
    feats: [
      [],
      ['rage', 'unarmoredDefence'],
      ['recklessAttack', 'dangerSense'],
      ['primalPath'],
      ['asImprovement'],
      ['extraAttackBarbarian', 'fastMovement'],
      [],
      ['feralInstinct'],
      ['asImprovement'],
      ['brutalCritical'],
      [],
      ['relentlessRage'],
      ['asImprovement'],
      [],
      [],
      ['persistentRage'],
      ['asImprovement'],
      [],
      ['indomitableMight'],
      ['asImprovement'],
      ['primalChampion'],
    ],
    profCombat: ['light armor', 'medium armor', 'shields', 'simple weapons', 'martial weapons'],
    tools: [],
    skills: ['strength', 'constitution'],
    skillsChoice: ['animalHandling', 'athletics', 'intimidation', 'nature', 'perception', 'survival'],
    skillsAllowed: 2,
    equipment: ['(any martial melee weapon)', '(two handaxes) or (any simple weapon)', 'an explorer’s pack', '4 javelins'],
    wealth: 0,
  },
  bard: {
    title: 'Bard',
    hitDie: 8,
    feats: [
      [],
      ['spellcasting', 'bardicInspiration'],
      ['jackOfAllTrades', 'songOfRest'],
      ['bardCollege', 'expertiseBard'],
      ['asImprovement'],
      ['fontOfInspiration'],
      ['countercharm'],
      [],
      ['asImprovement'],
      [],
      ['magicalSecrets'],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      ['asImprovement'],
      ['superiorInspiration'],
    ],
    profCombat: ['light armor', 'simple weapons', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
    skills: ['dexterity', 'charisma'],
    tools: ['Three musical instruments of your choice'],
    skillsAllowed: 3,
    equipment: ['(a rapier), (longsword), or (any simple weapon)', '(a diplomat’s pack) or (an entertainer’s pack)', '(a lute) or (any other musical instrument)', 'leather armor', 'a dagger'],
    wealth: 0,
    cantripsKnown: [0, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    spellsKnown: [0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
    spellslots: [
      [0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0], // 12
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 2, 1, 1],
    ],
  },
  cleric: {
    title: 'Cleric',
    hitDie: 8,
    feats: [
      [],
      ['spellcasting', 'divineDomain'],
      ['channelDivinity'],
      [],
      ['asImprovement'],
      ['destroyUndead'],
      [],
      [],
      ['asImprovement'],
      [],
      ['divineIntervention'],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      ['asImprovement'],
      ['divineInterventionImprovement'],
    ],
    profCombat: ['light armor', 'medium armor', 'shields', 'simple weapons'],
    tools: [],
    skills: ['wisdom', 'charisma'],
    skillsChoice: ['history', 'insight', 'medicine', 'persuasion', 'religion'],
    skillsAllowed: 2,
    equipment: ['(a mace) or (a warhammer (if proficient))', '(scale mail), (leather armor), or (chain mail (if proficient))', '(a light crossbow and 20 bolts) or (any simple weapon)', '(a priest’s pack) or (an explorer’s pack)', 'a shield', 'a holy symbol'],
    wealth: 0,
    spellslots: [
      [0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0], // 12
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 2, 1, 1],
    ],
  },
  druid: {
    title: 'Druid',
    hitDie: 8,
    feats: [
      [],
      ['spellcasting', 'druidic'],
      ['wildShape', 'druidCircle'],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      ['timelessBody', 'beastSpells'],
      ['asImprovement'],
      ['archdruid'],
    ],
    profCombat: ['light armor', 'medium armor', 'shields', 'clubs', 'daggers', 'darts', 'javelins', 'maces', 'quarterstaffs', 'scimitars', 'sickles', 'slings', 'spears'],
    tools: ['Herbalism kit'],
    skills: ['intelligence', 'wisdom'],
    skillsChoice: ['arcana', 'animalHandling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'],
    skillsAllowed: 2,
    equipment: ['(a wooden shield) or (any simple weapon)', '(a scimitar) or (any simple melee weapon)', 'an explorer’s pack', 'a druidic focus', '(druids will not wear armor or use shields made of metal)'],
    wealth: 0,
    spellslots: [
      [0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0], // 12
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 2, 1, 1],
    ],
  },
  fighter: {
    title: 'Fighter',
    hitDie: 10,
    feats: [
      [],
      ['fightingStyle', 'secondWind'],
      ['actionSurge'], //  (one use) lvl 2, (2 uses) lvl 17
      ['martialArchetype'], // features at lvl 7, lv 10, lv 15, lv 18
      ['asImprovement'],
      ['extraAttackFighter'], // lv 5, lv 11, lv 20
      ['asImprovement'],
      [],
      ['asImprovement'],
      ['indomitableFighter'], // lvl 9 (one use), lvl 13, lvl 17
      [],
      [],
      ['asImprovement'],
      [],
      ['asImprovement'],
      [],
      ['asImprovement'],
      [],
      [],
      ['asImprovement'],
      [],
    ],
    profCombat: ['light armor', 'medium armor', 'heavy armor', 'shields', 'martial weapons'],
    tools: [],
    skills: ['strength', 'constitution'],
    skillsChoice: ['acrobatics', 'animalHandling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'],
    skillsAllowed: 2,
    equipment: ['(a martial weapon and a shield) or (two martial weapons)', '(a light crossbow and 20 bolts) or (two handaxes)', '(chain mail) or (leather armor, longbow, and 20 arrows)', '(a dungeoneer’s pack) or (an explorer’s pack)'],
    wealth: 0,
  },
  monk: {
    title: 'Monk',
    hitDie: 8,
    feats: [
      [],
      ['unarmoredDefence', 'martialArts'],
      ['ki', 'unarmoredMovement'],
      ['monasticTradition', 'deflectMissiles'],
      ['asImprovement', 'slowFall'],
      ['extraAttack', 'stunningStrike'],
      ['kiEmpoweredStrikes'],
      ['evasion', 'stillnessOfMind'],
      ['asImprovement'],
      [],
      ['purityOfBody'],
      [],
      ['asImprovement'],
      ['tongueSunMoon'],
      ['diamondSoul'],
      ['timelessBody'],
      ['asImprovement'],
      [],
      ['emptyBody'],
      ['asImprovement'],
      ['perfectSelf'],
    ],
    profCombat: ['simple weapons', 'shortswords'],
    tools: ['one type of artisan’s tools or one musical instrument'],
    skills: ['strength', 'dexterity'],
    skillsChoice: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'],
    skillsAllowed: 2,
    equipment: ['(a shortsword) or (any simple weapon)', '(a dungeoneer’s pack) or (an explorer’s pack)', '10 darts'],
    wealth: 0,
  },
  paladin: {
    title: 'Paladin',
    hitDie: 10,
    feats: [
      [],
      ['divineSense', 'layOnHands'],
      ['fightingStyle', 'spellcasting', 'divineSmite'],
      ['divineHealth', 'sacredOath'],
      ['asImprovement'],
      ['extraAttackPaladin'],
      ['auraOfProtection'],
      [],
      ['asImprovement'],
      [],
      ['auraOfCourage'],
      ['improvedDivineSmite'],
      ['asImprovement'],
      [],
      ['cleansingTouch'],
      [],
      ['asImprovement'],
      [],
      [],
      ['asImprovement'],
      [],
    ],
    profCombat: ['light armor', 'medium armor', 'heavy armor', 'shields', 'martial weapons'],
    tools: [],
    skills: ['wisdom', 'charisma'],
    skillsChoice: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'],
    skillsAllowed: 2,
    equipment: ['(a martial weapon and a shield) or (two martial weapons)', '(5 javelins) or (any simple melee weapon)', '(a priest’s pack) or (an explorer’s pack)', 'chain mail', 'a holy symbol'],
    wealth: 0,
    spellslots: [
      [0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 12
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
    ],
  },
  ranger: {
    title: 'Ranger',
    hitDie: 10,
    feats: [
      [],
      ['favoredEnemy', 'naturalExplorer'],
      ['fightingStyle', 'spellcasting'],
      ['rangerArchetype', 'primevalAwareness'],
      ['asImprovement'],
      ['extraAttack'],
      [],
      [],
      ['asImprovement', 'landsStride'],
      [],
      ['hideInPlainSight'],
      [],
      ['asImprovement'],
      [],
      ['vanish'],
      [],
      ['asImprovement'],
      [],
      ['feralSenses'],
      ['asImprovement'],
      ['foeSlayer'],
    ],
    profCombat: ['light armor', 'medium armor', 'shields', 'martial weapons'],
    tools: [],
    skills: ['strength', 'dexterity'],
    skillsChoice: ['animalHandling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'],
    skillsAllowed: 3,
    equipment: ['(two shortswords) or (two simple melee weapons)', '(scale mail) or (leather armor)', '(a dungeoneer’s pack) or (an explorer’s pack)', 'a longbow', 'a quiver of 20 arrows'],
    wealth: 0,
    spellslots: [
      [0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 12
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
    ],
  },
  rogue: {
    title: 'Rogue',
    hitDie: 8,
    feats: [
      [],
      ['expertiseRogue', 'sneakAttack', 'thievesCant'],
      ['cunningAction'],
      ['roguishArchetype'],
      ['asImprovement'],
      ['uncannyDodge'],
      [],
      ['evasion'],
      ['asImprovement'],
      [],
      ['asImprovement'],
      ['reliableTalent'],
      ['asImprovement'],
      [],
      ['blindsense'],
      ['slipperyMind'],
      ['asImprovement'],
      [],
      ['elusive'],
      ['asImprovement'],
      ['strokeOfLuck'],
    ],
    profCombat: ['light armor', 'simple weapons', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
    tools: ['Thieves’ tools'],
    skills: ['dexterity', 'intelligence'],
    skillsChoice: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleightOfHand', 'stealth'],
    skillsAllowed: 4,
    equipment: ['(a rapier) or (a shortsword)', '(a shortbow and quiver of 20 arrows) or (a shortsword)', '(a burglar’s pack), (a dungeoneer’s pack), or (an explorer’s pack)', 'leather armor', 'two daggers', 'thieves’ tools'],
    wealth: 0,
  },
  sorcerer: {
    title: 'Sorcerer',
    hitDie: 6,
    feats: [
      [],
      ['spellcasting', 'sorcerousOrigin'],
      ['fontOfMagic'],
      ['metamagic'],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      ['asImprovement'],
      ['sorcerousRestoration'],
    ],
    profCombat: ['daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
    tools: [],
    skills: ['constitution', 'charisma'],
    skillsChoice: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'],
    skillsAllowed: 2,
    equipment: ['(a light crossbow and 20 bolts) or (any simple weapon)', '(a dungeoneer’s pack) or (an explorer’s pack)', '2 daggers'],
    wealth: 0,
    spellslots: [
      [0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0], // 12
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 2, 1, 1],
    ],
  },
  warlock: {
    title: 'Warlock',
    hitDie: 8,
    feats: [
      [],
      ['otherworldlyPatron', 'pactMagic'],
      ['eldritchInvocations'],
      ['pactBoon'],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      ['mysticArcanum'],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      ['asImprovement'],
      ['eldritchMaster'],
    ],
    profCombat: ['light armor', 'simple weapons'],
    tools: [],
    skills: ['wisdom', 'charisma'],
    skillsChoice: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'],
    skillsAllowed: 2,
    equipment: ['(a light crossbow and 20 bolts) or (any simple weapon)', '(a scholar’s pack) or (a dungeoneer’s pack)', 'leather armor', 'any simple weapon', '2 daggers'],
    wealth: 0,
  },
  wizard: {
    title: 'Wizard',
    hitDie: 6,
    feats: [
      [],
      ['spellcasting', 'arcaneRecovery'],
      ['arcaneTradition'],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      [],
      [],
      ['asImprovement'],
      [],
      ['spellMastery'],
      ['asImprovement'],
      ['signatureSpells'],
    ],
    profCombat: ['daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
    tools: [],
    skills: ['intelligence', 'wisdom'],
    skillsChoice: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'],
    skillsAllowed: 2,
    equipment: ['(a quarterstaff) or (a dagger)', 'spellbook', '(a scholar’s pack) or (an explorer’s pack)'],
    wealth: 0,
    spellslots: [
      [0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0], // 1
      [0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 0, 0, 0, 0, 0, 0], // 6
      [0, 4, 3, 3, 1, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 2, 0, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 1, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 0, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 0, 0, 0], // 12
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 0, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 0],
      [0, 4, 3, 3, 3, 2, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 1, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 1, 1, 1],
      [0, 4, 3, 3, 3, 3, 2, 2, 1, 1],
    ],
  },
};
