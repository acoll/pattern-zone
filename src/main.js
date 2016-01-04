import Vue from 'vue'
import App from './App'
import Router from 'vue-router'

import PatternsList from './components/PatternsList'
import EditPatternView from './components/EditPatternView'
import PatternView from './components/PatternView'
import Create from './components/Create'

Vue.config.debug = true
Vue.use(Router)

var router = new Router()

router.map({
  'patterns': { component: PatternsList },
  'patterns/:id': { component: PatternView },
  'edit/:id': { component: EditPatternView },
  'create': { component: Create }
})

router.redirect({
  '*': '/patterns'
})

router.start(App, '#app')
