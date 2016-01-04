import Firebase from 'firebase'

var Store = module.exports = {}

var ref = Store.ref = new Firebase('https://patternator.firebaseio.com/')

Store.login = function (fn) {
  ref.authWithOAuthPopup('facebook', function (error, authData) {
    fn(error, authData)
  })
}

Store.getAuth = function () {
  return ref.getAuth()
}

Store.patterns = ref.child('patterns')
