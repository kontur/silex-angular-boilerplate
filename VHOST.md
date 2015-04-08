# Example configuration for Apache vhost

    <VirtualHost *:80>
        ServerName somesite.dev
        DocumentRoot "/Users/username/somesite.com/website/www"
        <Directory "/Users/username/somesite.com/website/www">
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
            RewriteEngine On
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteRule ^ index.php [QSA,L]
        </Directory>
    </VirtualHost>
