<template>
  <div id="app">
    <!-- nav bar -->
    <nav
      class="navbar px-5"
      role="navigation"
      aria-label="main navigation"
      style="border-bottom: 1px solid black"
    >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-5 has-text-weight-bold">ServantList</router-link>
        <router-link to="/cal" class="navbar-item is-size-5 has-text-weight-bold">Calculation</router-link>
        <router-link to="/team" class="navbar-item is-size-5 has-text-weight-bold">Team Recommend</router-link>
      </div>
      <div class="navbar-brand" style="margin: auto auto">
        <router-link to="/" class="is-size-3 has-text-weight-bold">FateGOBase</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/login" class="button is-primary">
              <strong>Log in</strong>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <router-view :key="$route.fullPath" />
  </div>
</template>
