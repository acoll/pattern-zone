<template lang="jade">
div
  h4 Preview
  .ui.items.segment
    .item
      .content
        .header(style='text-transform: uppercase') {{ title }}
        .meta
          a(v-if='auth.uid === creator_uid' href='#/edit/{{id}}') EDIT
        .meta {{ author }}
        .description {{ description }}
        .description {{ instructions }}
      .content(style='text-align: right')
        template(v-if='rows > 0')
          svg(width='{{columns * 4}}' height='{{rows * 4}}' style='border: 1px solid black')
</template>

<script>
import Vue from 'vue'
import Store from '../store'
var _ = require('underscore')

export default Vue.extend({
  name: 'Pattern-View',
  data: function () {
    return { 
      title: '',
      description: '',
      instructions: '',
      columns: '',
      rows: '',
      newColor: '',
      currentColor: 'black',
      colorPallette: [],
      nodes: {},
      grid: [{}],
      creator_uid: '',
      auth: Store.getAuth()
    }
  },
  route: {
    data: function ({ to }) {
      const id = to.params.id
      console.log('Fetching', id)

      this.patternRef = Store.patterns.child(id)
      this.id = id

      return new Promise((resolve, reject) => {
        this.patternRef
        .once('value', snap => {
          var data = snap.val()
          data.grid = [ ]

          for (var x = 0; x < data.rows; x++) {
            var row = []
            for (var y = 0; y < data.columns; y++) {
              if (!data.nodes) data.nodes = {}
              row.push(data.nodes[x + ',' + y] || { color: '' })
            }
            data.grid.push(row)
          }

          resolve(data)
        }, reject)

        this.patternRef.on('value', snap => {
          var data = snap.val()
          console.log('UPDATED!!', data)
          _.extend(this, data)
        })
      })
    }
  },
  methods: {
    toggle: function (x, y) {
      if (this.grid[y][x].color) {
        this.grid[y][x].color = undefined
      } else {
        this.grid[y][x].color = this.currentColor
      }

      this.persistNodes()
    },
    setColor: function (color) {
      this.patternRef.child('currentColor').set(color)
    },
    persistNodes: function () {
      var nodes = {}

      this.grid.forEach((row, x) => {
        row.forEach((cell, y) => {
          if (cell.color) {
            nodes[x + ',' + y] = _.pick(cell, 'color')
          }
        })
      })

      this.patternRef.child('nodes').set(nodes)
    },
    addColor: function () {
      this.patternRef.child('colorPallette').push(this.newColor)
      this.patternRef.child('currentColor').set(this.newColor)
      this.newColor = ''
    },
    removeColor: function (key) {
      console.log('Remove:', key)
      this.patternRef.child('colorPallette').child(key).remove()
    },
    updatePattern: function () {
      this.patternRef.set({
        title: this.title,
        description: this.description,
        instructions: this.instructions,
        rows: +this.rows,
        columns: +this.columns
      })
    }
  }
})
</script>