echo "Copy assets/apachefy.conf to /etc/apache2/site-enabled"
echo "......................................................"
cp assets/apachefy.conf /etc/apache2/sites-enabled/

echo "Append: 127.0.0.1    apachefy.wope.us to /etc/hosts"
echo "......................................................"
echo "127.0.0.1   apachefy.wope.us" >> /etc/hosts

echo "Append: 127.0.0.1    files.apachefy.wope.us to /etc/hosts"
echo "......................................................"
echo "127.0.0.1   files.apachefy.wope.us" >> /etc/hosts