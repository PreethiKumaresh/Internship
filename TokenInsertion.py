import glob
import os 
import shutil

def string_check(myfile):
	datafile= open(myfile,"r") 
	for line in datafile:
		if "$_POST['myData']" in line or '$_POST["myData"]' in line:
			return True
	return False 
			

def myfile(filename):
	count=True
	with open(filename,"r") as f:  
		#contents variable contains the file data
		contents=f.readlines()     
		#setting the cursor to start position
		f.seek(0)				   
		line=f.readline()		   
		lineno=1
		while line:				   
			if "header.php" in line: 
				found=string_check(filename)
				if found == True:
					line=f.readline()
					#incrementing the line count for same occurence
					while "require" in line or "include" in line or line == '\n' or "define" in line:  
						line=f.readline()															   
						lineno=lineno+1	
					#including the string MyFunction() with content	
					contents.insert(lineno,"include('token/rediscache.php');\n\n$user_token = new Token;\n$user_token->validateToken(json_decode($_POST['myData']));\n\n")  
					f.close()
					f = open(filename, "w")
					contents = "".join(contents) 
					#writing the final result
					f.write(contents) 
					f.close()
					#contains the list of modifiedFileList
					with open("ModifiedFileList.txt","a") as f1: 
						path = 'Modified_File_List'	
						src = filename
						f1.write(filename+"\n")
						os.system("mv "+src+" "+path)
						f1.close()
					break					
				else:
					#contains the list of files in which the string is not found
					with open("NonModifiedFileList.txt","a") as f1: 
						path = 'Non_Modified_File_List'	
						src = filename
						f1.write(filename+"\n")
						os.system("mv "+src+" "+path)
						f1.close()
					count=False
					break
			else:					
				line=f.readline()
				lineno=lineno+1
				if lineno >= 10:
					with open("NonModifiedFileList.txt","a") as f1: 
						path = 'Non_Modified_File_List'	
						src = filename
						f1.write(filename+"\n")
						os.system("mv "+src+" "+path)
						f1.close()
					count=False
					break
				else:
					print("line no out of bound")
					with open("NonModifiedFileList.txt","a") as f1: 
						path = 'Non_Modified_File_List'	
						src = filename
						f1.write(filename+"\n")
						os.system("mv "+src+" "+path)
						f1.close()
					count=False
					break
		f.close()          
	return count 

def main_program():	
	#List all the php Files in the current directory		
	mylist=glob.glob("*.php")  
	count_mod=0
	count_nonmod=0
	total_count=0
	for item in mylist:
		total_count+=1
		count=myfile(item)
		if count == True:
			count_mod+=1
		else:
			count_nonmod+=1		
	print("\n        Count of Files\n")
	print("-------------------------------\n")
	print("Total Files: "+str(total_count)+"\n\nModified File List: "+str(count_mod)+"\n\nNon Modified File List: "+str(count_nonmod))

	
#---------Start Of the Program-----------	
#creating the directory
os.system("mkdir Modified_File_List Non_Modified_File_List")
main_program()
