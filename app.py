from flask import Flask, render_template, request, redirect, url_for, session
import mysql.connector

app = Flask(__name__)
app.secret_key = '94da927230e54e5ca7800dfc16bd2190'

# Database connection
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Ganesh@21',
    database='my_news_app'
)

# -------------------- Routes -------------------- #

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/news')
def news():
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM news")
    news_items = cursor.fetchall()
    cursor.close()
    return render_template('news.html', news_items=news_items)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        data = request.form
        cursor = connection.cursor()
        
        # Check if user already exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
        existing_user = cursor.fetchone()
        if existing_user:
            return "User with this email already exists."

        # Insert new user
        cursor.execute(
            "INSERT INTO users (name, phone, email, state, city, password) VALUES (%s, %s, %s, %s, %s, %s)",
            (data['name'], data['phone'], data['email'], data['state'], data['city'], data['password'])
        )
        connection.commit()
        cursor.close()
        return redirect(url_for('signin'))
    return render_template('signup.html')

@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()
        cursor.close()
        if user:
            session['email'] = email
            session['user_name'] = user[1]  # Assuming second column is user's name
            return redirect(url_for('news'))
        else:
            return render_template('signin.html', error="Invalid credentials")
    return render_template('signin.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

# -------------------- Main -------------------- #

if __name__ == '__main__':
    app.run(debug=True)
