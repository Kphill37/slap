window.onload = function () {
  document.getElementById("my_audio").play();
}
// Beginning of Players and Items-----------------------------------------------------------------
var boss = {
  name: 'Bowser',
  health: 100,
  hits: 0,
  items: [],
  defence: 0,
  attack: 0,
}

var player = {
  name: 'Mario',
  health: 100,
  hits: 0,
  items: [],
  attackPower: 0,
}

var items = {
  fireFlower: { name: "Fire Flower", modifier: 7, description: "A wild flower commonly found throughout the Mushroom Kingdom.  Launches a fast fiery blaze.  +7 attack" },
  koopaShell: { name: "Koopa Shell", modifier: 5, description: "The shell straight off the back of a Koopa.  You're just borrowing it.  +5 attack" },
  Hammer: { name: "Hammer", modifier: 15, description: "A legendary hammer that was first used by Mario to take down the likes of Donkey Kong.  A favored weapon of many! +15 attack" },
  starRod: { name: "Star Rod", attackModifier: 8, defenseModifier: 5, description: "The Star Rod is a magical rod that can make all wishes come true.  Gives Bowser massive additional Attack and Defense!" },
  toughGuy: { name: "Tough Guy", attackModifier: 16, defenseModifier: 5, description: "Allows Bowser to fight back" },
  gigaBowser: { name: "Giga Bowser", attackModifier: 0, defenseModifier: 0, description: "Gives Bowser an additional 50 health." }
}
// ----------------------------------------------------------------------------------------------








//Beginning of Player Items----------------------------------------------------------------------

function giveFireFlower() {
  player.items.push(items.fireFlower)
  addPlayerMods()
  totalItems()
}

function giveKoopaShell() {
  player.items.push(items.koopaShell)
  addPlayerMods()
  totalItems()
}

function giveHammer() {
  player.items.push(items.Hammer)
  addPlayerMods()
  totalItems()
}

// --------------------------------------------------------------------------------------------


//Beginning of Boss Equipment-------------------------------------------------------------------

function giveStarRod() {
  boss.items.push(items.starRod)
  console.log(boss.items[0])
  boss.defence = items.starRod.defenseModifier
  addBossDefenses()
  console.log(boss.defence)
  boss.attack = items.starRod.attackModifier
  addBossAttack()
  console.log(boss.attack)

  totalBossItems()
}



var toughGuyIndicator = false;
function toughGuy() {
  toughGuyIndicator = true;
  boss.items.push(items.toughGuy)
  totalBossItems()
}


function gigaBowser() {
  boss.health += 50;
  boss.items.push(items.gigaBowser)
  document.getElementById("bossHealth").innerText = boss.health
  totalBossItems()
}

// ------------------------------------------------------------------------

// Beginning of Player Equipment--------------------------------------------
player.attackPower = 0
function addPlayerMods() {
  player.attackPower = 0
  for (let i = 0; i < player.items.length; i++) {
    let item = player.items[i]
    player.attackPower += item.modifier
  }

  drawBonusDamage()
  return player.attackPower
}
// --------------------------------------------------------------------------

// Beginning of Boss Items and Attack Calculations----------------------------------------------



boss.defence = 0
function addBossDefenses() {
  for (let i = 0; i < boss.items.length; i++) {
    let item = boss.items[i]
    console.log(item.defenseModifier)
    boss.defence += item.defenseModifier
  }
  drawBossDefenses()
  return boss.defence
}



function drawBossDefenses() {
  var myJSON = JSON.stringify(boss.defence)
  if (boss.defence < 0) {
    document.getElementById("bossDefense").innerText = 0
  }
  else {
    document.getElementById("bossDefense").innerText = boss.defence
  }
}



boss.attack = 0
function addBossAttack() {
  for (let i = 0; i < boss.items.length; i++) {
    let item = boss.items[i]
    console.log(item.attackModifier)
    boss.attack += item.attackModifier
    console.log(boss.attack)
  }
  drawBossAttack()
  return boss.attack
}




function drawBossAttack() {
  var myJSON = JSON.stringify(boss.attack);
  console.log(myJSON);
  document.getElementById("bossAttack").innerText = myJSON;
}

// ---------------------------------------------------------------------------------------


// Max item Calculations-----------------------------------------------------------------
var maxItems = 0
function totalItems() {
  maxItems++
  if (maxItems == 1) {
    var myJSON = JSON.stringify(player.items[0].name + ":  " + player.items[0].description);
    document.getElementById("item1").innerText = myJSON;
  }
  else if (maxItems == 2) {
    var myJSON = JSON.stringify(player.items[1].name + ":  " + player.items[1].description);
    document.getElementById("item2").innerText = myJSON;
  }
  else if (maxItems >= 3) {
    var myJSON = JSON.stringify(player.items[2].name + ":  " + player.items[2].description);
    document.getElementById("item3").innerText = myJSON;
    document.getElementById("fireFlower").disabled = true;
    document.getElementById("koopaShell").disabled = true;
    document.getElementById("Hammer").disabled = true;
  }
  else {
  }
}

var maxBossItems = 0
function totalBossItems() {
  maxBossItems++
  if (maxBossItems == 1) {
    var myJSON = JSON.stringify(boss.items[0].name + ":  " + boss.items[0].description);
    document.getElementById("bossItem1").innerText = myJSON;
  }
  else if (maxBossItems == 2) {
    var myJSON = JSON.stringify(boss.items[1].name + ":  " + boss.items[1].description);
    document.getElementById("bossItem2").innerText = myJSON;
  }
  else if (maxBossItems >= 3) {
    var myJSON = JSON.stringify(boss.items[2].name + ":  " + boss.items[2].description);
    document.getElementById("bossItem3").innerText = myJSON;
    document.getElementById("starRod").disabled = true;
    document.getElementById("toughGuy").disabled = true;
    document.getElementById("gigaTransformation").disabled = true;
  }
  else {
  }
}


function resetItemList() {
  document.getElementById("item1").innerText = ""
  document.getElementById("item2").innerText = ""
  document.getElementById("item3").innerText = ""
}
// --------------------------------------------------------------------------------------

// Draw Functions------------------------------------------------------------------------
function drawBoss() {
  document.getElementById("bossName").innerText = boss.name
  document.getElementById("bossHealth").innerText = boss.health
  document.getElementById("bossHits").innerText = boss.hits
  document.getElementById("bossDefense").innerText = boss.defence
  document.getElementById("bossAttack").innerText = boss.hits
}
drawBoss()

function drawPlayer() {
  document.getElementById("playerName").innerText = player.name
  document.getElementById("playerHealth").innerText = player.health
  document.getElementById("playerhits").innerText = player.hits
}
drawPlayer()

function drawBonusDamage() {
  document.getElementById("bonusDamage").innerText = player.attackPower
}
var toughGuyDamage = 0
function getRandomInt(max) {
  toughGuyDamage = Math.floor(Math.random() * Math.floor(max));
}

function toughGuyStatus() {
  if (toughGuyIndicator == true) {
    getRandomInt(15)
    player.hits++
    player.health -= toughGuyDamage + boss.attack
    updatePlayer()
  }
  else if (toughGuyIndicator == false) {
    return
  }
}

// ------------------------------------------------------------------------------------


//Attack Calculations------------------------------------------------------------------
let outcome = 0
function slap() {
  toughGuyStatus()
  outcome -= 1 + player.attackPower
  console.log(outcome)
  console.log(boss.defence)

  if (boss.defence > 0) {
    console.log(boss.defence)
    boss.defence += outcome
    console.log(boss.health)
    drawBossDefenses()
  }
  else if (boss.defence <= 0) {
    console.log(boss.defence)
    boss.health -= player.attackPower + 1
    console.log(boss.health)
    updateBoss()
  }

}
function kick() {
  let outcome = 0
  toughGuyStatus()
  outcome -= 10 + player.attackPower
  console.log(outcome)
  console.log(boss.defence)

  if (boss.defence > 0) {
    console.log(boss.defence)
    boss.defence += outcome
    console.log(boss.health)
    drawBossDefenses()
  }
  else if (boss.defence <= 0) {
    console.log(boss.defence)
    boss.health -= player.attackPower + 10
    console.log(boss.health)
    updateBoss()
  }
}
function punch() {
  let outcome = 0
  toughGuyStatus()
  outcome -= player.attackPower + 5
  console.log(outcome)
  console.log(boss.defence)

  if (boss.defence > 0) {
    console.log(boss.defence)
    boss.defence = outcome
    console.log(boss.health)
    drawBossDefenses()
  }
  else if (boss.defence <= 0) {
    console.log(boss.defence)
    boss.health += outcome
    console.log(boss.health)
    updateBoss()
  }

}
// ---------------------------------------------------------------------------------



// Button Behaviors------------------------------------------------------------------
function buttonBehavior() {
  if (boss.health <= 0 || player.health <= 0) {
    document.getElementById("slapAttack").disabled = true;
    document.getElementById("punchAttack").disabled = true;
    document.getElementById("kickAttack").disabled = true;
  }
  else {
    document.getElementById("slapAttack").disabled = false;
    document.getElementById("punchAttack").disabled = false;
    document.getElementById("kickAttack").disabled = false;
    document.getElementById("starRod").disabled = false;
    document.getElementById("toughGuy").disabled = false;
    document.getElementById("gigaTransformation").disabled = false;
  }
}

// -----------------------------------------------------------------------------------



// Hit updates------------------------------------------------------------------------
function updateBoss() {
  boss.hits++
  document.getElementById("bossHits").innerText = boss.hits

  if (boss.health < 0) {
    document.getElementById("bossHealth").innerText = 0
  }
  else {
    document.getElementById("bossHealth").innerText = boss.health
  }
  buttonBehavior()
  checkForKo()
}
function updatePlayer() {
  debugger
  document.getElementById("playerhits").innerText = player.hits

  if (player.health < 0) {
    document.getElementById("playerHealth").innerText = 0
  }
  else {
    document.getElementById("playerHealth").innerText = player.health
  }
  buttonBehavior()
  checkForKo()
}
// --------------------------------------------------------------------------------------













function rematch() {
  resetBoss()
  resetPlayer()
  document.getElementById("fireFlower").disabled = false;
  document.getElementById("koopaShell").disabled = false;
  document.getElementById("Hammer").disabled = false;
}
function resetBoss() {
  toughGuyIndicator = false
  boss.attack = 0
  boss.defence = 0
  boss.health = 100
  boss.hits = 0
  boss.items = []
  maxBossItems = 0
  document.getElementById("bossAttack").innerText = ''
  document.getElementById("bossDefense").innerText = ''
  document.getElementById("starRod").disabled = false;
  document.getElementById("toughGuy").disabled = false;
  document.getElementById("gigaTransformation").disabled = false;
  drawBoss()
  resetItems()
}
function resetPlayer() {
  document.getElementById("slapAttack").disabled = false;
  document.getElementById("punchAttack").disabled = false;
  document.getElementById("kickAttack").disabled = false;
  document.getElementById("bonusDamage").innerText = ''
  player.attackPower = 0;
  player.items = []
  player.health = 100
  player.hits = 0
  maxItems = 0
  drawPlayer()
  resetItems()
}
function resetItems() {
  document.getElementById("item1").innerText = " "
  document.getElementById("item2").innerText = " "
  document.getElementById("item3").innerText = " "
  document.getElementById("bossItem1").innerText = " "
  document.getElementById("bossItem2").innerText = " "
  document.getElementById("bossItem3").innerText = " "
}
function checkForKo() {
  if (player.health <= 0 && boss.health > 0) {
    alert("Bowser Wins!")
  }
  else if (boss.health <= 0 && player.health > 0) {
    alert("Mario Wins!")
  }
  else if (boss.health <= 0 && player.health <= 0) {
    alert("It's a draw!")
  }
}