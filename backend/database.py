from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    pass_hash = db.Column(db.String(255), nullable=False)

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
    face = db.Column(db.Integer)

class Video(db.Model):
    __tablename__ = "video"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(100))
    file_path = db.Column(db.String(255), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.now())

class VideoStats(db.Model):
    __tablename__ = "video_stats"

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey("videos.id"), nullable=False)

    attack_attempts = db.Column(db.Integer, default=0)
    attack_kills = db.Column(db.Integer, default=0)
    attack_errors = db.Column(db.Integer, default=0)

    digs = db.Column(db.Integer, default=0)
    reception_errors = db.Column(db.Integer, default=0)

    set_attempts = db.Column(db.Integer, default=0)
    assists = db.Column(db.Integer, default=0)
    bad_sets = db.Column(db.Integer, default=0)

    serve_attempts = db.Column(db.Integer, default=0)
    aces = db.Column(db.Integer, default=0)
    serve_errors = db.Column(db.Integer, default=0)

    block_attempts = db.Column(db.Integer, default=0)
    solo_blocks = db.Column(db.Integer, default=0)
    block_errors = db.Column(db.Integer, default=0)


class UserAverages(db.Model):
    __tablename__ = "user_averages"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    )

    attack_efficiency = db.Column(db.Float)
    attack_volume_score = db.Column(db.Float)
    attack_final_score = db.Column(db.Float)

    defense_efficiency = db.Column(db.Float)
    defense_volume_score = db.Column(db.Float)
    defense_final_score = db.Column(db.Float)

    setting_efficiency = db.Column(db.Float)
    setting_volume_score = db.Column(db.Float)
    setting_final_score = db.Column(db.Float)

    serve_efficiency = db.Column(db.Float)
    serve_volume_score = db.Column(db.Float)
    serve_final_score = db.Column(db.Float)

    block_efficiency = db.Column(db.Float)
    block_volume_score = db.Column(db.Float)
    block_final_score = db.Column(db.Float)

    last_updated = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now()
    )

