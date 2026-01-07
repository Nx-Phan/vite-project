from flask import Flask, jsonify
from database import db
from database import User, UserSettings, Video, VideoStats, UserAverages

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:password@localhost/vb_app"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Connect SQLAlchemy to Flask
db.init_app(app)

@app.route("/")
def hello_world():
    return "Hello World"

@app.route("/test-user")
def test_user():
    user = User(username="testuser", email="test@test.com")
    db.session.add(user)
    db.session.commit()
    return "User added"

@app.route("/api/test")
def test():
    return {"message": "Flask connected to React"}

@app.route("/api/home/<int:user_id>", methods=["GET"])
def home(user_id):
    avg = UserAverages.query.filter_by(user_id=user_id).first()

    if not avg:
        return jsonify({"error": "No averages found"}), 404

    return jsonify([
        {"attack": avg.avg_attack, 
         "defense": avg.avg_defense, 
         "setting": avg.avg_setting, 
         "serve": avg.avg_serve, 
         "block": avg.avg_block}
    ])
        

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
