import requests
import json
import time
import pandas as pd

def get_limit():
	req = ("https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=true&isGame=false&sort=[{%22property%22:%22points%22,%22direction%22:%22DESC%22},{%22property%22:%22goals%22,%22direction%22:%22DESC%22},{%22property%22:%22assists%22,%22direction%22:%22DESC%22},{%22property%22:%22playerId%22,%22direction%22:%22ASC%22}]&start=0&limit=100&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20252026%20and%20seasonId%3E=19171918")
	resp = requests.get(req)

	try:
		print("successful response")
		playerStats = json.loads(resp.text)
	except:
		print(f"ERROR 1")
		quit()
	return playerStats["total"]

def populate_stats(startIndex):    
	#req = f"https://api-web.nhle.com/v1/player/{pID}/landing"
	req = ("https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=true&isGame=false&sort=[{%22property%22:%22points%22,%22direction%22:%22DESC%22},{%22property%22:%22goals%22,%22direction%22:%22DESC%22},{%22property%22:%22assists%22,%22direction%22:%22DESC%22},{%22property%22:%22playerId%22,%22direction%22:%22ASC%22}]&start="
			+ str(startIndex) + "&limit=100&cayenneExp=gameTypeId=2%20and%20seasonId%3C=20252026%20and%20seasonId%3E=19171918")
	resp = requests.get(req)

	try:
		print("successful response")
		playerStats = json.loads(resp.text)
	except:
		print(f"ERROR ON {startIndex}")
		print(resp.text)
		return []
	return playerStats["data"]#["firstName"]["default"] + " " + playerStats["lastName"]["default"]

'''
limit = get_limit()

print(limit)
masterStats = []

for i in range(0, limit, 100):
	tempData = populate_stats(i)
	print(i)
	masterStats += tempData[:]
	time.sleep(1) #rate limited if going too fast

print(len(masterStats))

fp = open(f"all_time_skater_stats.json", "w+")
json.dump(masterStats, fp, skipkeys=False, ensure_ascii=True, check_circular=True, allow_nan=True, cls=None, indent=3, separators=None)
fp.close()
'''

df = pd.read_json('all_time_skater_stats.json')
for col in df:
	if(col in ['faceoffWinPct','pointsPerGame','shootingPct','timeOnIcePerGame']):
		df[col] = df[col].round(5)
	else:
		try:
			df[col] = df[col].astype('Int64')
		except:
			print(type(df[col]))

print(df["faceoffWinPct"])

#df.to_csv('all_time_skater_stats.csv', float_format='%.9f', index=False)
df.to_csv('all_time_skater_stats.csv', na_rep=-1, index=False)