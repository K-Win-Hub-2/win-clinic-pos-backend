'use strict';

const auth = require('../controllers/authController');
const verifyToken = require('../lib/verifyToken');
const { catchError } = require('../lib/errorHandler');
const { verifyDoctor } = require("../controllers/verifyDoctorController");
const treatmentVoucher = require("../controllers/treatmentVoucherController");
const { checkSubscription } = require('../middleware/checkSubscription');

module.exports = app => {
       
      //verify doctor
      app.route('/api/login/doctor/verify')
       .post( verifyToken, verifyDoctor, catchError( treatmentVoucher.getAppointByDoctorId))

       //please open comment if subscription function is required
       app.route('/api/auth/login').post( auth.login);

       // to get refresh token
       app.route('/api/auth/token/refresh').post(auth.refreshToken);
       

       app.route('/api/auth/logout').get(verifyToken, catchError(auth.logout));
};
