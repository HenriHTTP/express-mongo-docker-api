//models
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const users = require('../models/user.schema');

//helpers  token
const createToken = require('../helpers/token/createToken');
const decodeToken = require('../helpers/token/decodeToken');
const getuserbyToken = require('../helpers/token/getuserbytoken');
const get_token = require('../helpers/token/get_token');

//helpers uploads
const writeFile = require('../helpers/uploads/writeFile');
const createFilePath = require('../helpers/uploads/createFilePath');
const getFileName = require('../helpers/uploads/getFileName');

//variables
const storage = 'public/upload';

class userController {
  // method register controller
  static async registerUser(req, res) {
    const { name, lastname, username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const cryptpassword = bcrypt.hashSync(password, salt);

    const newuser = new users({
      name,
      lastname,
      username,
      email,
      password: cryptpassword,
    });

    try {
      //save objeto in database
      await newuser.save();
      const user = await users.findOne({ email: email });
      const token = await createToken(user);
      res.status(200).json({
        Authentication: 200,
        token: `${token}`,
        id: user._id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //method login controller
  static async loginUser(req, res) {
    try {
      const { email } = req.body;
      const user = await users.findOne({ email: email });
      //create new token
      const token = await createToken(user);
      res.status(200).json({
        Authentication: 200,
        token: `${token}`,
        id: user._id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //method getuserbytolken
  static async checkuser(req, res) {
    try {
      const token = await get_token(req);
      const tokenDecode = await decodeToken(token);
      const user = await users.findOne(
        { _id: tokenDecode.id },
        { password: 0 },
      );

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  }

  // method get user by id
  static async GetUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await users.findOne({ _id: id });

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  }

  //method edit informations user
  static async editUser(req, res) {
    try {
      const token = await get_token(req);
      const tokenDecode = await decodeToken(token);
      const user = await getuserbyToken(tokenDecode);
      const { name, lastname, email, username, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const cryptpassword = bcrypt.hashSync(password, salt);
      const newDataUser = {
        name,
        lastname,
        email,
        username,
        password: cryptpassword,
      };
      errorUpdate;

      const updateUser = await users.findOneAndUpdate(
        { _id: user._id },
        { $set: newDataUser },
        { new: true },
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  }

  static async updateAvatarUser(req, res) {
    try {
      const buffer = req.file.buffer;
      const arquiveName = req.file.originalname;
      const uploadDirectory = await createFilePath(arquiveName, storage);
      const saveUpload = await writeFile(uploadDirectory, buffer);
      const fileName = await getFileName(uploadDirectory);

      await users.updateOne({ _id: req.params.id }, { avatar: fileName });

      if (saveUpload) {
        res.status(200).json({ MessageEvent: 'imagem salva' });
      }
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  }
}

module.exports = userController;
