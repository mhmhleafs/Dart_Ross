class Player 
{
	constructor (playerObject) 
	{
		for (const property in playerObject)
		{
			this[property] = playerObject[property]
		}
	}

	//can just use object["stat"] so do I need this f'n?
	get_stat(statName)
	{
		return this[statName]
	}
}