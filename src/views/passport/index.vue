<template>
  <div>
    <clients></clients>
    <!-- <authorized-clients></authorized-clients>
    <personal-access-tokens></personal-access-tokens> -->
  </div>
</template>
<script>
import Clients from '@/views/passport/Clients'
import AuthorizedClients from '@/views/passport/AuthorizedClients'
import PersonalAccessTokens from '@/views/passport/PersonalAccessTokens'

export default {
  components: { Clients, AuthorizedClients, PersonalAccessTokens },
  data() {
    return {
    }
  },
  created() {
    console.log(Clients)
  }
}
</script>