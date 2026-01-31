import os
import json

#Configuration
folder_path = '/Users/tyauk/Downloads/Cold Steel Selects'
output_file = 'images.json'
web_path_prefix = 'https://thebarn.bluemountain.ca/wp-content/uploads/2026/01/'
allowed_extensions = ('.jpg')

def generate_image_json():
	image_list = []

	#Check if directory exists
	if not os.path.exists(folder_path):
		print(f"Error: Directory {folder_path} not found.")
		return


	#Loop through files
	for filename in os.listdir(folder_path):
		if filename.lower().endswith(allowed_extensions):
			#Create a dictionary for each image
			if not filename.startswith("._"):
				image_data = {
					"name": os.path.splitext(filename)[0].replace('_', ' ').title(),
					"url": web_path_prefix + filename,
					"filename": filename,
					"type": "image"
				}
				image_list.append(image_data)

	#Write JSON file
	with open(output_file, 'w') as f:
		json.dump(image_list, f, indent=4)

	print(f"Successfully generated {output_file} with {len(image_list)} images.")

if __name__ == "__main__":
	generate_image_json()
