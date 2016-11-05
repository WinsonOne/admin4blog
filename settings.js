module.exports = {
  port : 3000,
  session : {
    secret : 'wblog',
    key : 'wblog',
    maxAge : 30 * 24 * 60 * 60 *  1000
  },
  mongodb : 'mongodb://winsonone:winson1@ds048719.mlab.com:48719/wblog'
}