import os
import glob
	
def replace_string(prev,src):
	with open("gulpfile.js") as g:
		newText=g.read().replace(prev,src)
	with open("gulpfile.js","w") as g:
		g.write(newText)
	print("Replaced")

def cut_paste(filepath):
	x="../guvi/"+filepath
	y="../after_gulp/"+filepath.rsplit('/', 1)[0]+"/"
	return x,y
	
def fun(filename):
	with open(filename,"r") as f:
		myfiles=f.readline()
		prev="path_src"
		d="path_des"
		while myfiles:
			myfiles = myfiles.rstrip('\n')
			if(".html" in myfiles):
				print("It is a html file")
				src,des=cut_paste(myfiles)
				print("Source: "+src)
				print("Destination: "+des)
				replace_string(prev,src)
				replace_string(d,des)
				d=des
				os.system('gulp html')
			elif(".css" in myfiles):
				print("It is a css file")
				src,des=cut_paste(myfiles)
				print("Source: "+src)
				print("Destination: "+des)
				replace_string(prev,src)
				replace_string(d,des)
				d=des
				os.system('gulp css')
			elif(".js" in myfiles):
				print("It is a js file")
				src,des=cut_paste(myfiles)
				print("Source: "+src)
				print("Destination: "+des)
				replace_string(prev,src)
				replace_string(d,des)
				d=des
				os.system('gulp js')
			else:
				print("The program accepts only [HTML/CSS/JS] files")
			prev=src
			myfiles=f.readline()
	replace_string(prev,"path_src")
	replace_string(d,"path_des")
	f.close()
	if (os.stat("errorlogfile.txt").st_size != 0):
		print('--------The List Of Files which got error---------\n')
		os.system('cat errorlogfile.txt')
		print('\n')
	
	
#listfile=glob.glob("list_of_files.txt") #this file should be present in the current directory 
#for item in listfile:
#	fun(item)
listfile=glob.glob("/var/www/html/node_modules/list_of_files.txt")
fun(listfile)
