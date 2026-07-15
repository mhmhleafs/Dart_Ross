import csv
import json

csv_file_path = 'ALL_PLAYERS.csv'
json_file_path = 'ALL_PLAYERS.json'

data = []

# Open the CSV with 'utf-8-sig' to handle BOM and preserve accents
with open(csv_file_path, mode='r', encoding='utf-8-sig', newline='') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Open the JSON file and dump data with ensure_ascii=False
with open(json_file_path, mode='w', encoding='utf-8-sig') as json_file:
    json.dump(data, json_file, indent=4, ensure_ascii=False)

print(f"Successfully converted {csv_file_path} to {json_file_path}!")
