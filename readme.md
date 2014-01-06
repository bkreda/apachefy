# What?
An utility to create quickly an Apache2 virtual host for the current directory. It is like the [server alias from Paul Irish](https://gist.github.com/JeffreyWay/1525217)

# Why this module?

Because I need to be able to launch a server quickly in the current directory. Often, during debug session, I find myself downloading my customer static files and access them through a browser.

# Why apache mod proxy?

Because, I'm often working on mobile application. So I need to access these apps from smartphones without entering the ":" and the port number, which is boring. 

Moreover, it is more convenient when making a demo with non-dev persons.

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

# How to install

The module is currently under development and is not yet published into nmp. Go to the directory containting the module you downloaded and run:

		sudo npm link --unsafe-perm

# How to run?

		sudo apachefy

