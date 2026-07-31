function surname(skaterFullName) {
	return (skaterFullName.split(' ')[1])
}

$(document).ready(function () {
	console.log("~ready")
});

$('.search_field').on("focus", function () {
	console.log("~focus")
	$(".dropdown_menu").css("visibility", "visible")
});

//if focus not on dropdown element???
$('.search_field').on("blur", function () {
	console.log("~unfocus")
	$(".dropdown_menu").css("visibility", "hidden")
});

//counts as clicking go if the user presses enter on the search bar
$('.search_field').on('keydown', function (event) {
	if (event.key === 'Enter') {
		document.getElementById("search_button").click();
	}
});

$('.dropdown_item').on('mousedown', function (event) {
	console.log(`.${$(this).attr('class')} ${$(this).text()}`)
});

//update dropdown when search field is clicked or input is entered
$('.search_field').on('input', function (event) {
	console.log(get_players(pascalify($(this).val())))
});
$('.search_field').on('focus', function (event) {
	console.log(get_players(pascalify($(this).val())))
});

//main game logic when user enters their search
$('#search_button').on('click', function () {
	console.log("clicked")

	let playerName = pascalify($('.search_field').val())

	console.log(`Input: ${playerName}`)

	//get array of players matched by last name
	const STAT = "goals"

	foundPlayers = get_players(playerName)

	console.log(`players found: ${foundPlayers.length}`)
	if (foundPlayers.length == 1) {
		console.log("found players:")
		console.log(foundPlayers)
		player = foundPlayers[0]

		const v = player[STAT]

		const newPoints = subtract_points(v)

		let oob = false

		if (newPoints < 0) {
			//set flag to add bad line if new score is over the limit
			oob = true
			console.log("OOB")
		}
		else {
			update_score(newPoints)
		}

		add_table_row(surname(player.skaterFullName), v, oob)

		$('.search_field').val('')
	}
	else if (foundPlayers.length > 1) {
		//TODO: add selector for multiples
		//alert("SO MANY")
	}
	else if (foundPlayers.length == 0) {
		//TODO: shake the search bar and show error
		//alert("NOT FOUND")
	}

	$(".search_field").blur()
	//accessAll("G")
});