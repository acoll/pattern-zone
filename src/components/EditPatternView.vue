<template lang="jade">
div
  .ui.items.segment
    h3 {{ title }}
    .ui.grid
      .column.three.wide
        h4 Color Pallette
        p
          form.ui.form(v-on:submit.prevent="addColor")
            .field
              input(style="width: 100%; padding: 5px" type='text' v-model="newColor" placeholder='New Color Hex')
        p
          .ui.cards
            template(v-for="color in colorPallette")
              .card(v-on:click="setColor(color)")
                .content
                  .header 
                    span {{color}}
                    span(style="float:right")
                      a
                        i.paint.brush.icon.large(v-bind:style='{ color: color }')
                      a
                        i.trash.icon.large(v-on:click.prevent="removeColor($key)")
      .column.thirteen.wide
        table
          tr(v-for='row in grid')
            template(v-for='cell in row')
                td(v-on:click='toggle($index, $parent.$index)' v-bind:style='{ backgroundColor: cell.color }')
                  div
  .ui.items.segment
    form.ui.form
      .field
        label Title
        input(type='text' v-model='title' placeholder='Title')
      .field
        label Brief Description
        textarea(rows=3 v-model='description' placeholder='Description')
      .field
        label Instructions
        textarea(rows=6 v-model='instructions' placeholder='Your long instructions for the pattern go here.')
      .field
        .two.fields
          .field
            label Columns
            input(type='number' v-model='columns' placeholder='Columns')
          .field
            label Rows
            input(type='number' v-model='rows' placeholder='Rows')
      .ui.button(v-on:click='updatePattern') Save
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
      grid: [{}]
    }
  },
  route: {
    data: function ({ to }) {
      const id = to.params.id
      console.log('Fetching', id)

      this.patternRef = Store.patterns.child(id)

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