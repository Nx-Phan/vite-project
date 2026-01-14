from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
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

@app.route("/api/home", methods=["GET"])
@jwt_required()
def home():
    user_id = get_jwt_identity()
    return jsonify({"user_id": user_id})

@app.route("/api/createAccount", methods=["POST"])
def createAccount():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
    
    if User.query.filter(
        (User.username == username) | (User.email == email)
    ).first():
        return jsonify({"error": "User already exists"}), 409
    
    password_hash = generate_password_hash(password)

    new_user = User(
        username = username,
        email = email,
        pass_hash = password_hash
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Account created successfully",
        "user_id": new_user.id
    }), 201

@app.route("/api/Login", methods=["POST"])
def Login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": token,
        "user_id": user.id
    }), 200

@app.route("/api/videos/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No video provided"}), 400

    video = request.files["video"]
    user_id = request.form.get("user_id")
    title = request.form.get("title", "")

    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    filename = secure_filename(video.filename)
    save_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    video.save(save_path)

    new_video = Video(
        user_id=user_id,
        title=title,
        file_path=save_path
    )

    db.session.add(new_video)
    db.session.commit()

    return jsonify({
        "message": "Video uploaded",
        "video_id": new_video.id
    }), 201

@app.route("/api/stats/<int:user_id>", methods=["GET"])
def getStats(user_id):
    avg = UserAverages.query.filter_by(user_id=user_id).first()

    if not avg:
        return jsonify({"error": "No averages found"}), 404

    return jsonify([
        {"attack": avg.attack_efficiency, 
         "defense": avg.defense_efficiency, 
         "setting": avg.setting_efficiency, 
         "serve": avg.serve_efficiency, 
         "block": avg.block_efficiency}
    ])

@app.route("/api/avatar/<int:user_id>", methods=["GET"])
def getAvatar(user_id):
    avatar = UserSettings.query.filter_by(user_id=user_id).first()

    if not avatar:
        return jsonify({"error": "No avatar found"}), 404
    
    return jsonify([
        {"face": avatar.face,
         "hair": avatar.hair,
         "eye": avatar.eye,
         "mouth": avatar.mouth
        }
    ])
 
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
