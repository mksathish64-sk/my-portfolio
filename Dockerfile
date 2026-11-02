FROM ubuntu:24.04

RUN apt-get update && apt-get install -y apache2

COPY dist/ /var/www/html

EXPOSE 80

CMD ["apache2ctl" , "-D" , "FOREGROUND"]