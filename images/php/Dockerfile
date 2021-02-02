FROM php:fpm
RUN apt-get update && apt-get install -y libmcrypt-dev

# lumen packages
RUN apt-get install -y git php5-memcached \
    && docker-php-ext-install mcrypt mbstring tokenizer mysqli pdo_mysql \
    && apt-get install -y libz-dev libmemcached-dev \
    && pecl install memcached \
    && echo extension=memcached.so >> /usr/local/etc/php/conf.d/memcached.ini

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/bin
RUN php -r "unlink('composer-setup.php');"
RUN mv /bin/composer.phar /bin/composer
