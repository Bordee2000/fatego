<template>
  <div id="app">
    <!-- nav bar -->
    <nav
      class="navbar px-5"
      role="navigation"
      aria-label="main navigation"
      style="border-bottom: 1px solid black"
      v-if="$route.fullPath!='/login'"
    >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-5 has-text-weight-bold" :class="$route.fullPath=='/'?'has-text-danger':'is-dark'">ServantList</router-link>
        <router-link to="/calculator" class="navbar-item is-size-5 has-text-weight-bold" :class="$route.fullPath=='/calculator'?'has-text-danger':'is-dark'">Calculation</router-link>
        <router-link to="/team" class="navbar-item is-size-5 has-text-weight-bold" :class="$route.fullPath=='/team'?'has-text-danger':'is-dark'" >Team Recommend</router-link>
      </div>
      <div class="navbar-brand" style="margin: auto 43%;position: absolute;">
        <router-link to="/" class="is-size-3 has-text-weight-bold">FateGOBase</router-link>
      </div>

      <div class="navbar-end">
          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <figure class="image is-24x24 my-auto">
                <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
              </figure>
              <span class="pl-3">{{ user.username }}</span>
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" @click="logout()">Log out</a>
            </div>
          </div>


        <div v-if="!user" class="navbar-item">
          <div class="buttons">
            <router-link to="/login" class="button is-primary">
              <strong>Log in</strong>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <router-view :key="$route.fullPath" @auth-change="onAuthChange" :user="user"/>
  </div>
</template>

<script>
import axios from '@/plugins/axios'

export default {
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    this.onAuthChange();
  },
  methods: {
    onAuthChange() {
      const token = localStorage.getItem("token");
      if (token) {
        this.getUser();
      }
    },
    getUser() {
      const token = localStorage.getItem("token");
      axios
        .get("/user/me")
        .then(res => {
          this.user = res.data;
        });
    },
    logout(){
      localStorage.removeItem('token');
      location.reload();
    }
  }
};
</script>

