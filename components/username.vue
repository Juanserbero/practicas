<template>
  <div></div>
</template>

<script>
  import { mapState } from 'vuex'

export default {
    computed: {
      username() {
        return this.$auth.$storage.getUniversal('user').username
      },
      ...mapState('auth', ['loggedIn']),

    },
}
</script>
