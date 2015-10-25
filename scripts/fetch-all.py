#!/usr/bin/env python

import requests
import json
import os
from fabric.colors import red, green, blue, cyan, magenta
from time import sleep

api_key = 'be25c8a17fdcd031f54dd3417ee4d083'
api_base_url = 'http://api.themoviedb.org/3'

def pretty(data):
  print ""
  print json.dumps(data, sort_keys=True, indent=2)
  print ""

def keyval(key, val):
  print(cyan(key + ': ') + green(val))

def pretty_keys(source, keys):
  for key in keys:
    keyval(key, source.get(key))

def pretty_flat_keys(source, keys):
  ret = ""

  for key in keys:
    ret = ret + ""

def getJSON(endpoint):
  sleep(0.25)
  return requests.get(api_base_url + endpoint + '?api_key=' + api_key).json()

def header(text):
  print ""
  print blue(text.upper().center(140, '='))

def subheader(text):
  print ""
  print magenta(text.upper().center(140, '-'))

def accent(text):
  print red(text.upper().center(40))

# Util Methods
def readJSONFile(path):
  print blue(" > Reading JSON File: {0}".format(path))
  with open(path) as data_file:
    return json.load(data_file)

def writeJSONFile(path, data):
  print blue(" > Writing JSON File: {0}".format(path))
  with open(path, 'w+') as outfile:
    json.dump(data, outfile, sort_keys=True, indent=2)

# Cached API Methods
def getObjectByID(type, id, endpoint):
  type_map = {
    'episode': 'episodes',
    'person': 'people',
    'season': 'seasons',
    'show': 'shows'
  }

  cache_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data/{0}/{1}.json'.format(type_map.get(type), str(id))))

  # print "OBJECT FILE PATH: {0}".format(cache_path)

  if os.path.exists(cache_path):
    return readJSONFile(cache_path)
  else:
    object_data = getJSON(endpoint)
    writeJSONFile(cache_path, object_data)
    return object_data

def getShow(id):
  return getObjectByID('show', id, '/tv/{0}'.format(id))

def getSeason(show_id, season_number):
  return getObjectByID('season', '{0}-{1}'.format(show_id, season_number), '/tv/{0}/season/{1}'.format(show_id, season_number))

def getEpisode(show_id, season_number, episode_number):
  return getObjectByID('episode', '{0}-{1}-{2}'.format(show_id, season_number, episode_number), '/tv/{0}/season/{1}/episode/{2}'.format(show_id, season_number, episode_number))

def getPerson(id):
  return getObjectByID('person', id, '/person/{0}'.format(id))


# show = getJSON('/tv/95')
# show = getObjectByID('show', 95)

# CURRENT_SHOW_ID = 95 # BUFFY
CURRENT_SHOW_ID = 2426 # ANGEL

show = getShow(CURRENT_SHOW_ID)

pretty_keys(show, ['name', 'first_air_date', 'number_of_seasons', 'number_of_episodes', 'overview'])

seasons = show.get('seasons', {})

for season in seasons:
  season_id = season.get('id')
  season_number = season.get('season_number')

  header('season ' + str(season_number))

  season_data = getSeason(CURRENT_SHOW_ID, season_number)

  episodes = season_data.get('episodes', [])

  keyval('Episode Count', len(episodes))

  for episode in episodes:
    subheader('episode ' + str(episode.get('episode_number')))
    pretty_keys(episode, ['id', 'name'])

    episode_number = episode.get('episode_number')
    episode_data = getEpisode(CURRENT_SHOW_ID, season_number, episode_number)

    for person in episode.get('crew', []):
      getPerson(person.get('id'))

    for person in episode.get('guest_stars', []):
      getPerson(person.get('id'))
    # crew = episode.get('crew', [])
    # cast = episode.get('guest_stars', [])

    # accent('crew')
    # for crew_member in crew:
    #   keyval(crew_member.get('job'), crew_member.get('name'))

    # accent('cast')
    # for cast_member in cast:
    #   pretty_keys(cast_member, ['name'])

  # pretty(season_data)

  # break

# pretty(raw)
