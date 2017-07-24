#!/usr/bin/env python
import sys
import os
commande = sys.argv[1]
os.system('sudo espeak "{0}"'.format(commande))
print "python"
