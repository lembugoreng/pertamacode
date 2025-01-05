Blog App Setup (Backend & Frontend)

This guide will help you set up the Blog App, including the Laravel backend and React frontend.
Prerequisites

Make sure the following PHP extensions are enabled in your php.ini file:

    extension=fileinfo
    extension=openssl
    extension=pdo_mysql
    extension_dir = "ext"
    extension=mbstring

Backend Setup (Laravel)

    Clone the repository

    Navigate to the backend directory:

    cd pertamacode/pertamablog

    Install dependencies:

    Update the dependencies by running: composer update

    Configure environment variables:

    Update the .env file with your local MySQL configuration. Example:

    DB_CONNECTION=mysql DB_HOST=127.0.0.1 DB_PORT=3306 DB_DATABASE=pertama DB_USERNAME=root DB_PASSWORD=

    Generate application key:

    php artisan key:generate

    Run database migrations:

    php artisan migrate:fresh --seed

    Start the Laravel server:

    php artisan serve

Frontend Setup (React)

    Navigate to the frontend directory:

    cd pertamacode/pertamafrontend

    Install dependencies:

    npm install

    Start the React development server:

    npm start

Now you're all set! The backend will be running on `http://127.0.0.1:8000` and the frontend on `http://localhost:3000`.

