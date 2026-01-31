import imdb

#Create an instance of the cinemagoer class
ia = imdb.Cinemagoer()

movie_title = ""

while(movie_title != "exit"):

	movie_title = input("Search for Movie: ")
	print("")
	if(movie_title != "exit"):
		search_results = ia.search_movie(movie_title)

	if search_results:
		
		#Get ID of first instance
		movie_id = search_results[0].getID()

		#Fetch all details of that movie
		movie = ia.get_movie(movie_id)

		#Access and print specific data fields
		print(f"Title: {movie['title']}")
		print(f"Year: {movie['year']}")
		print(f"Rating: {movie['rating']}")
		print(f"Director: {movie['directors'][0]['name']}")
		print(f"Genres: {', '.join(movie['genres'][:2])}")
		print(f"Plot Summary: {movie['plot summary'][0]}")

		print("")

	else:
		if(movie_title != "exit"):
			print(f"No results found for '{movie_title}'")
