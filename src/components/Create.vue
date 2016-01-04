<template lang="jade">
  div
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
      .ui.button(v-on:click='createPattern') Create
    h4 Preview
    .ui.items.segment
      .item
        .content
          .header(style='text-transform: uppercase')
            a(href='#/patterns/{{ $key }}') {{ title }}
          .meta {{ author }}
          .description {{ description }}
        .content(style='text-align: right')
          template(v-if='rows > 0')
            svg(width='{{columns * 4}}' height='{{rows * 4}}' style='border: 1px solid black')
</template>

<script>

import Store from '../store'

export default {
  name: 'Create',
  data: function () {
    return { 
      title: '',
      description: '',
      instructions: '',
      rows: 50,
      columns: 60
    }
  },
  methods: {
    createPattern: function () {
      if (!Store.getAuth()) {
        alert('You need to login. Top Right Menu Item')
        return
      }
      Store.patterns.push({
        creator_uid: Store.getAuth().uid,
        title: this.title,
        description: this.description,
        instructions: this.instructions,
        rows: +this.rows,
        columns: +this.columns,
        currentColor: 'black',
        colorPallette: ['black'],
        nodes: { '0,0': {color: 'black'} }
      }, (err) => {
        if (err) {
          alert('Uh Oh')
        }
        console.log('Done')
      })
    }
  }
}
</script>