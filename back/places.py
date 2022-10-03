#!/usr/bin/python3

from googleplaces import GooglePlaces, types, lang
import requests
from pprint import pprint

API_KEY = open('API_KEY.txt').read() #open and save the api keyinto a variable
google_places = GooglePlaces(API_KEY) #creates a google places instance

result = google_places.nearby_search(location='Montevideo Uruguay', keyword='Restaurants', radius=1000, types=[types.TYPE_RESTAURANT])
for place in result.places:
    print("--------------------------")
    print (place.__dict__)
    break