function zScore(statName) {

}

function get_players(input) {
  console.log(input)
  len = input.length
  console.log(len)
  const playersByLastName = PLAYERS.filter(p => p.lastName.slice(0, len) === input)
  const playersByFullName = PLAYERS.filter(p => p.skaterFullName.slice(0, len) === input)
  let combinedPlayers = playersByLastName.concat(playersByFullName)

  //PLAYERS is already sorted by total points so no need to sort from here
  console.log(combinedPlayers)

  return combinedPlayers
}

//birth year included in case two players have same name (e.g. Elias Pettersson)
function get_player(playerID) {
  const playerByID = PLAYERS.find(p => p.playerId === playerID)
  console.log(playerByID)
  return playerByID
}

function pascalify(str) {
  s = str.replace(/(\w)(\w*)/g, function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
  return s
}

function get_player_stat(playerID, stat) {
  p = get_player(playerID)

  return p[stat]
}

function add_table_row(name, score, oob = false) {
  console.log(`adding table row ${name} | ${score}`)

  const tableRow = document.createElement('tr')
  const nameCell = document.createElement('td')
  const scoreCell = document.createElement('td')
  const totalCell = document.createElement('td')

  tableRow.id = "table_row_" + name
  tableRow.appendChild(nameCell)
  tableRow.appendChild(scoreCell)
  tableRow.appendChild(totalCell)

  if (oob) {
    tableRow.classList.add("bad_row")
  }
  else {
    tableRow.classList.add("board_row")
  }

  nameCell.textContent = name
  scoreCell.textContent = score
  totalCell.textContent = get_curr_points()

  const container = document.getElementById('board');
  container.appendChild(tableRow);

}

function get_curr_points() {
  return Number($('#point_total').text())
}

function subtract_points(score) {
  console.log("rid")
  let currentPoints = get_curr_points()
  console.log(currentPoints)

  console.log(score)

  const newPoints = currentPoints - score
  console.log(newPoints)

  if (newPoints < 0) {
    return -1
  }
  else {
    return newPoints
  }
}

function update_score(newPoints) {
  $('#point_total').text(newPoints)
}

//get the sum of a stat for getting the z score
function accessAll(statName) {
  let sum = 0
  let count = 0
  for (const p of PLAYERS) {
    let temp = p[statName]

    //if they have any amount of the thing
    if (temp) {
      console.log(p[statName])

      sum += temp
      count++
    }
  }
  console.log(sum)
  console.log(count)
}

const STAT_CATEGORIES = [
  { "name": "goals", weight: 10, target: 0 }
]
