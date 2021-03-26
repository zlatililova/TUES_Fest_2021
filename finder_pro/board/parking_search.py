import googlemaps
import pprint
import time
import math

def locations(lat1, lng1, maxRadius = 1000):
    #API_KEY = get_my_key()
    locations_dict = list()
    API_KEY = 'AIzaSyBfJv0kVR2g4urnqqZ5HoJEu4SMLtsVCPo'
    gmaps = googlemaps.Client(key = API_KEY)
    places_result = gmaps.places_nearby(location = (lat1, lng1 ), radius = maxRadius, open_now = False, type = 'parking')

    for place in places_result['results']:
        name = None
        lat = None
        lng = None
        rating = None

        for key in place:
            if key == 'rating':
                rating = place[key]

        name = place['name']
        lat = place['geometry']['location']['lat']
        lng = place['geometry']['location']['lng']
        locations_dict.append([name, lat, lng, rating])
    return locations_dict


def dist_between_two(coord1, coord2):
    R = 6372800  # Earth radius in meters
    lat1, lng1 = coord1
    lat2, lng2 = coord2
    
    phi1, phi2 = math.radians(lat1), math.radians(lat2) 
    dphi       = math.radians(lat2 - lat1)
    dlambda    = math.radians(lng2 - lng1)
    
    a = math.sin(dphi/2)**2 + \
        math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    
    return 2*R*math.atan2(math.sqrt(a), math.sqrt(1 - a))

def nearest(lat1,lng1):
    places = locations(lat1,lng1)

    minDist = 999999999999.0
    minLat = 0
    minLng = 0
    minName = ""
    found = False
    rating1 = None

    for name, lat2, lng2, rating in places:
        dist = abs(dist_between_two((lat1,lng1),(lat2,lng2)))
        if dist < minDist:
            minDist = dist
            minLat = lat2
            minLng = lng2
            minName = name
            rating1 = rating
            found = True

    return(found, minName, minLat, minLng, rating1)
