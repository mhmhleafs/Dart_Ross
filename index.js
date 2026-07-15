function toggle_search_dropdown()
{
	console.log($("#search_dropdown").css("visibility") === "visible")
	if($("#search_dropdown").css("visibility") === "visible")
	{
		console.log("make invis")
		$("#search_dropdown").css("visibility", "hidden")
	}
	else
	{
		console.log("make vis")
		$("#search_dropdown").css("visibility", "visible")
	}
}

function surname(skaterFullName)
{
	return(skaterFullName.split(' ')[1])
}

$(document).ready(function()
{
	console.log("ready")
});

$('.search_field').on("focus", function(){
   console.log("focus")
});

//if focus not on dropdown element???
$('.search_field').on("blur", function(){
   console.log("unfocus")
});

//counts as clicking go if the user presses enter on the search bar
$('.search_field').on('keydown', function(event) {
    if (event.key === 'Enter') 
	{
        document.getElementById("search_button").click();
    }
});

//counts as clicking go if the user presses enter on the search bar
$('.search_field').on('input', function(event) {
	get_players(pascalify($(this).val()))
});

//main game logic when user enters their search
$(document).on('click', '#search_button', function()
{
	console.log("clicked")

	let playerName = pascalify($('.search_field').val())

	console.log(`Input: ${playerName}`)

	//get array of players matched by last name
	const CAT = "goals"

	foundPlayers = get_players(playerName)

	console.log(`players found: ${foundPlayers.length}`)
	if(foundPlayers.length == 1)
	{
		console.log("found players:")
		console.log(foundPlayers)

		const v = get_player_stat(foundPlayers[0].playerId, CAT)

		const newPoints = subtract_points(v)

		let oob = false

		if(newPoints < 0)
		{
			//set flag to add bad line if new score is over the limit
			oob = true	
			console.log("OOB")
		}
		else
		{
			update_score(newPoints)
		}

		add_table_row(surname(foundPlayers[0].skaterFullName), v, oob)

		$('.search_field').val('')
	}
	else if(foundPlayers.length > 1)
	{
		//TODO: add selector for multiples
		alert("SO MANY")
	}
	else if(foundPlayers.length == 0)
	{
		//TODO: shake the search bar and show error
		alert("NOT FOUND")
	}

	toggle_search_dropdown()
	//accessAll("G")
});