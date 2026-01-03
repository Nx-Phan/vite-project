from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    settings = db.relationship("UserSettings", backref="user", uselist=False)
    videos = db.relationship("Video", backref="user", lazy=True)
    averages = db.relationship("UserAverages", backref="user", uselist=False)

class UserSettings(db.Model):
    __tablename__ = "user_settings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    hair = db.Column(db.Integer)
    eye = db.Column(db.Integer)
    mouth = db.Column(db.Integer)

class Video(db.Model):
    __tablename__ = "videos"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    filename = db.Column(db.String(255), nullable=False)
    upload_date = db.Column(db.DateTime, server_default=db.func.now())

    stats = db.relationship("VideoStats", backref="video", uselist=False)

class VideoStats(db.Model):
    __tablename__ = "video_stats"
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)

    attack = db.Column(db.Float, nullable=False)
    defense = db.Column(db.Float, nullable=False)
    setting = db.Column(db.Float, nullable=False)
    serve = db.Column(db.Float, nullable=False)
    block = db.Column(db.Float, nullable=False)

class UserAverages(db.Model):
    __tablename__ = "user_averages"
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

    avg_attack = db.Column(db.Float, nullable=False)
    avg_defense = db.Column(db.Float, nullable=False)
    avg_setting = db.Column(db.Float, nullable=False)
    avg_serve = db.Column(db.Float, nullable=False)
    avg_block = db.Column(db.Float, nullable=False)
