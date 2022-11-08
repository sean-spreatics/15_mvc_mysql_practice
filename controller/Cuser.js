const User = require('../model/User');

exports.index = (req, res) => {
  res.render('index');
};

exports.signup = (req, res) => {
  res.render('signup');
};

exports.post_signup = (req, res) => {
  User.post_signup(req.body, () => {
    res.send(true);
  });
};

exports.signin = (req, res) => {
  res.render('signin');
};

exports.post_signin = (req, res) => {
  console.log(req.body);
  User.post_signin(req.body, (result) => {
    console.log('Controller post_sign: ', result); // [ RowDataPacket { id: 'sean', name: 'sean', pw: '1234' } ]

    if (result.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};

exports.post_profile = (req, res) => {
  console.log(req.body);
  User.post_profile(req.body.userid, (result) => {
    if (result.length > 0) {
      // 로그인 성공; views/profile.ejs 렌더링
      res.render('profile', { data: result[0] });
    } else {
      // 로그인 실패; /user/signin 현재 주소 다시 접속
      res.redirect('/user/signin');
    }
  });
};

exports.edit_profile = (req, res) => {
  console.log(req.body);
  User.edit_profile(req.body, () => {
    res.send('회원정보 수정 성공!');
  });
};

exports.delete_profile = (req, res) => {
  console.log(req.body);
  User.delete_profile(req.body.id, () => {
    // res.redirect(주소): 리다이렉트할 주소와 함께 응답 보내기!!
    res.redirect('/user/signin');
  });
};
