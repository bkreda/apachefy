# What?
An utility to create quickly an Apache2 virtual host for the current directory. It is like the [server alias from Paul Irish](https://gist.github.com/JeffreyWay/1525217)

# Why this module?

Because I was debugging a web page from a mobile site where I haven't access to source files, 
I was repeatedly downloading the page and its resources (with firefox) to a local folder 
and pointing my apache2 virtual host to this folder to debug localy. 
After investigation I ask the developer in charge of the site to make few changes to that page and then I needed to download it again 
to an other folder and create again a new virtual host. BTW the issue was an android 2.3 browser :(

# How does it work?


- There are two virtual hosts: The public one [apachefy.wope.us](apachefy.wope.us) and the private one [files.apachefy.wope.us](files.apachefy.wope.us).

- The first one [apachefy.wope.us](apachefy.wope.us) is a reverse proxy to [files.apachefy.wope.us](files.apachefy.wope.us).

		/etc/apache2/sites-enabled/apachefy.conf

		<VirtualHost *:80>
		    ServerName apachefy.wope.us
		    ProxyPass         /  http://files.apachefy.wope.us/ retry=0
		    ProxyPassReverse  /  http://files.apachefy.wope.us/
		</VirtualHost>


- The second one [files.apachefy.wope.us](files.apachefy.wope.us) is a virtual host that is pointing to the directory from which you are running the **apachefy** command.

		/etc/apache2/sites-enabled/files.apachefy.conf

		<VirtualHost *:80>
		    DocumentRoot /home/reda/tmp/bug123
		    ServerName files.apachefy.wope.us
		</VirtualHost>


- Each time you run **apachefy** command, the **DocumentRoot** directive is set to the current directory and apache2 is reloaded.

