# coding: utf-8
from sqlalchemy import BigInteger, Column, DateTime, ForeignKey, Integer, String, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class TFile(Base):
    __tablename__ = 't_file'

    file_seq = Column(BigInteger, primary_key=True)
    file_original_name = Column(String(45), nullable=False, unique=True)
    file_saved_name = Column(String(45), nullable=False, unique=True)
    file_saved_path = Column(String(100), nullable=False)
    woff_saved_path = Column(String(100), nullable=False)


class TUser(Base):
    __tablename__ = 't_user'

    user_seq = Column(BigInteger, primary_key=True)
    user_email = Column(String(50), nullable=False, unique=True)
    user_nickname = Column(String(15), nullable=False, unique=True)
    user_name = Column(String(15), nullable=False)
    user_location = Column(String(10), nullable=False)


class TWaitCreate(Base):
    __tablename__ = 't_wait_create'

    wait_create_seq = Column(BigInteger, primary_key=True)
    wait_create_name = Column(String(45), nullable=False)
    wait_create_state = Column(Integer, nullable=False)
    wait_create_user = Column(BigInteger, nullable=False)


class TFont(Base):
    __tablename__ = 't_font'

    font_seq = Column(BigInteger, primary_key=True)
    font_name = Column(String(45), nullable=False, unique=True)
    font_description = Column(String(45))
    font_fav_count = Column(BigInteger, nullable=False, server_default=text("'0'"))
    font_download_file = Column(ForeignKey('t_file.file_seq'), index=True)
    font_creater = Column(ForeignKey('t_user.user_seq'), nullable=False, index=True)
    font_download_count = Column(BigInteger, nullable=False, server_default=text("'0'"))
    font_reg_date = Column(DateTime, nullable=False)

    t_user = relationship('TUser')
    t_file = relationship('TFile')


class TFontDownloadHistory(Base):
    __tablename__ = 't_font_download_history'

    font_download_history_seq = Column(BigInteger, primary_key=True)
    font_seq = Column(ForeignKey('t_font.font_seq'), nullable=False, index=True)
    user_seq = Column(ForeignKey('t_user.user_seq'), nullable=False, index=True)

    t_font = relationship('TFont')
    t_user = relationship('TUser')


class TPadletContent(Base):
    __tablename__ = 't_padlet_contents'

    padlet_contents_seq = Column(BigInteger, primary_key=True)
    padlet_contents_comments = Column(String(500), nullable=False)
    padlet_contents_font_seq = Column(ForeignKey('t_font.font_seq'), nullable=False, index=True)
    padlet_contents_writer = Column(ForeignKey('t_user.user_seq'), nullable=False, index=True)
    padlet_contents_location = Column(String(10), nullable=False)
    padlet_contents_title = Column(String(50))
    padlet_contents_color = Column(String(45))

    t_font = relationship('TFont')
    t_user = relationship('TUser')


class TUserFont(Base):
    __tablename__ = 't_user_font'

    user_font_seq = Column(BigInteger, primary_key=True)
    user_seq = Column(ForeignKey('t_user.user_seq'), nullable=False, index=True)
    font_seq = Column(ForeignKey('t_font.font_seq'), nullable=False, index=True)

    t_font = relationship('TFont')
    t_user = relationship('TUser')
