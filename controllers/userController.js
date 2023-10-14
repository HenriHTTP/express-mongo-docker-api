const users = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const createToken = require('../helpers/token/createToken');
const decodeToken = require('../helpers/token/decodeToken');
const getuserbyToken = require('../helpers/token/getuserbytoken');
const fs = require('fs');
const path = require('path');
const uploadStore = path.resolve(__dirname, '../upload');

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
      const token = await decodeToken(req);
      const user = await users.findOne({ _id: token.id }, { password: 0 });

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
      const user = await getuserbyToken(req);
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

  static async updatePhotoUser(req, res) {
    try {
      const buffer = req.file.buffer;
      const timeUploadArquive = new Date().getTime();
      const arquiveName = req.file.originalname;
      const filePath = path.join(
        uploadStore,
        `${timeUploadArquive}_${arquiveName}`,
      );
      fs.writeFileSync(filePath, buffer);
      res.status(200).json({ MessageEvent: 'imagem salva' });
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  }
}

module.exports = userController;
