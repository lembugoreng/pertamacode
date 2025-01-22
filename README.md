# **Blog App Setup (Backend & Frontend)**

This guide will help you set up the Blog App, including the **Laravel backend** and **React frontend**, with AI-powered blog generation, sentiment analysis, GitHub OAuth login, and email notifications.

---

## **Prerequisites**

Before running the project, ensure you have the following installed:

- **PHP 8.x** and [Composer](https://getcomposer.org/)
- **Node.js** and npm (for frontend dependencies)
- **MySQL** (or other supported databases)
- **Python 3.11+** with `pip` installed
- **A Python virtual environment**
- **GitHub OAuth App** (for social login)
- **Mailtrap.io** (for email testing)


## **Blog V1 Changelog**

1. **AI-Powered Blog Post Generation:**  
   - Uses GPT4All to generate blog posts based on given topics.

2. **Sentiment Analysis for Comments:**  
   - Automatically analyzes comment sentiment (positive, negative, neutral) using `TextBlob` and `NLTK`.

3. **Mailing Functionality (Email Notifications):**  
   - Sends email notifications to users when a new blog post is published using Mailtrap.

4. **GitHub OAuth Login:**  
   - Allows users to log in using GitHub credentials and assigns them a default `reader` role.

5. **Light/Dark Mode Toggle:**  
   - Users can switch between light and dark themes across the application.

6. **UI Changes**  
   - Fixed the overall look and feel of the UI to be more user friendly and give better clarity.

7. **Comment Count Display:**  
   - Shows the number of comments per post dynamically.

---

## **AI-Powered Features Setup**

### **1. Python Virtual Environment Setup**

1. **Create a virtual environment:**

   ```bash
   python -m venv gpt4all_env
   ```

2. **Activate the virtual environment:**

   - **Windows:**

     ```bash
     gpt4all_env\Scripts\activate
     ```

   - **Linux/macOS:**

     ```bash
     source gpt4all_env/bin/activate
     ```

3. **Install required Python packages:**

   ```bash
   pip install -r requirements.txt
   ```

   Ensure `requirements.txt` contains:

   ```plaintext
   gpt4all
   textblob
   nltk
   ```

4. **Download NLTK dependencies:**

   ```python
   import nltk
   nltk.download('punkt')
   nltk.download('averaged_perceptron_tagger')
   nltk.download('wordnet')
   nltk.download('vader_lexicon')
   ```

5. **Update environment variables:**

   Add the following paths to the `.env` file to help with Python execution:

   ```plaintext
   PYTHON_PATH=C:\Users\User\gpt4all_env\Scripts\python.exe
   GPT4ALL_MODEL_PATH=C:\Users\User\AppData\Local\nomic.ai\GPT4All
   NLTK_DATA=C:\Users\User\AppData\Roaming\nltk_data
   ```

---


## **Troubleshooting**

If you encounter issues:

- Clear Laravel cache:

  ```bash
  php artisan config:clear
  php artisan cache:clear
  ```

- Ensure correct Python installation inside virtual environment.
- Check Laravel logs for error messages:

  ```bash
  tail -f storage/logs/laravel.log
  ```

---


**First Time Setup**
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

