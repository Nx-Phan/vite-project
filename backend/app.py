from flask import Flask
from database import db
from database import User, UserSettings, Video, VideoStats, UserAverages

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/volleyball_app'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
