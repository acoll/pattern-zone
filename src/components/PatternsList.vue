<template lang="jade">
  .ui.items
    template(v-for="p in patterns")
      .item
        .content
          .header(style='text-transform: uppercase')
            a(href='#/patterns/{{ $key }}') {{ p.title }}
          .description {{ p.description }}
        .content(style='text-align: right')
          svg(width='{{p.columns * 4}}' height='{{p.rows * 4}}' style='border: 1px solid black')
            template(v-for="n in p.nodes")
              rect(width=4 height=4 ':x'="$key.split(',')[1] * 4" ':y'="$key.split(',')[0] * 4" ':fill'='n.color')
</template>

<script>

import Store from '../store'

export default {
  name: 'PatternsList',
  data: function () {
    return { patterns: {} }
  },
  route: {
    data: function ({ to }) {
      return new Promise((resolve, reject) => {
        Store.patterns.once('value', snap => {
          resolve({ patterns: snap.val() })
        })
      })
    }
  },
  methods: {}
}
</script>