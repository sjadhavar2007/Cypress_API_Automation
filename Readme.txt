	1) Search -install git on windows
	2) Goto- https://git-scm.com/downloads
	3) Click on Windows- once click then download automatically
	4) install proper with default instruction
	5) Installation done
	6) Create one Folder like : gitRep{ProjectName}APIautomation

	First make changes in the local folder or project setup:

	// Above step are common:
	Open git bash: 

	7) goto inside the folder and type cmd, open new commond window
	8) In commond line type below commond: 
		git init  ---------Click on Enter Button
	9) Same commond line type below commond: { below commond is available on gitRepository}
		git remote add origin https://github.com/simbiotiktech/dms_qa_backend.git

	//	OR
	Open git bash: 

	7) goto inside the folder and click on right button on mouse then goto:- Git Bash Here -open new cmd window
	8)In new opened window type below commond
		git init  ---------Click on Enter Button
	9) Same commond line type below commond: { below commond is available on gitRepository}
		git remote add origin https://github.com/simbiotiktech/dms_qa_backend.git

	// Below step are common:

	10) Same commond line type below commond: 
		i) git status {check modified file name should appear properly}
		ii) git add "file name with .extension"
		iii) git commit -m "Enter proper message about the Code"
		iv) git push origin master {after success message check the GIT UI to confirm all changes are reflected into the git repository}
		v) git status

	11) In case if you want to delete any perticular file
		i) git rm "file name with .extension"