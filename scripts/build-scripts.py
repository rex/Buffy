#!/usr/bin/env python

import json
import os
from fabric.colors import red, green, blue, cyan, magenta

data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../data'))

print "DATA DIR: {0}".format(data_dir)

def readJSONFile(path):
  print blue(" > Reading JSON File: {0}".format(path))
  with open(path) as data_file:
    return json.load(data_file)

def writeScriptFile(path, content):
  print green(" > Writing Compiled Script: {0}".format(path))
  with open(path, 'w+') as data_file:
    data_file.write(content)

def compileDirectory(dir_name, outfile_name):
  data_to_write = {}
  for file in os.listdir('{0}/{1}'.format(data_dir, dir_name)):
    if file.endswith('.json'):
      id = file.replace('.json', '')
      data = readJSONFile('{0}/{1}/{2}.json'.format(data_dir, dir_name, id))
      data_to_write[id] = data
      # continue
    else:
      continue

  js_template = 'window.BuffyTracker_{0} = {1}'.format(outfile_name, json.dumps(data_to_write, sort_keys=True, indent=2))

  writeScriptFile('{0}/js/{1}.js'.format(data_dir, outfile_name), js_template)

for dir_name in ['episodes', 'people', 'seasons', 'shows']:
  compileDirectory(dir_name, dir_name.title())
