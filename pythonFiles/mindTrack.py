import argparse
import math
import json

from pythonosc import dispatcher
from pythonosc import osc_server


import os
import sys


count = 0

def eeg_handler(unused_addr, args, ch1, ch2, ch3, ch4):
     print("EEG (uV) per channel: ", ch1, ch2, ch3, ch4)

def con_handler(f1,f2,f3):
     print(len(readings))
     # print(type(f3))
     if(f3 == 1 or f3 == 0):
       print("CALIBRATING")
     else:
       readings.append(f3)
     if(len(readings)==25):
       # print("FULL ARRAY, should send average")
       with open('data.json','w') as outfile:
         json.dump(sum(readings)/len(readings),outfile)
       del readings[:]

# def mellow_handler(f1,f2,f3):
#       print(f1,f2,f3)



if __name__ == "__main__":

 readings = []
 parser = argparse.ArgumentParser()
 parser.add_argument("--ip",
     default="127.0.0.1", help="The ip to listen on")
 parser.add_argument("--port",
     type=int, default=5000, help="The port to listen on")
 args = parser.parse_args()

 dispatcher = dispatcher.Dispatcher()
 dispatcher.map("/debug", print)
 dispatcher.map("/muse/elements/experimental/concentration", con_handler,"CONCENTRATED")

 # dispatcher.map("/muse/elements/experimental/mellow", mellow_handler,"MELLOW")

 # dispatcher.map("/muse/eeg", eeg_handler, "EEG")

 server = osc_server.ThreadingOSCUDPServer(
     (args.ip, args.port), dispatcher)
 print("Serving on {}".format(server.server_address))
 server.serve_forever()
