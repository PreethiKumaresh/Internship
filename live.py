import os
import glob

def live(filename):
	with open(filename,"r") as f:
		myfiles=f.readline()
		while myfiles:
			myfiles = myfiles.rstrip('\n')
			os.system('git add '+myfiles)
			myfiles = f.readline()
	f.close()
	message = raw_input("Enter some message--------->\n")
	os.system('git commit -m "'+message+'"')
	os.system('git push')
	print("-------Complete-------")

#os.system('cd ../after_gulp/')
print ("hello")
listfile=glob.glob("/var/www/html/node_modules/list_of_files.txt")
live(listfile)
	

