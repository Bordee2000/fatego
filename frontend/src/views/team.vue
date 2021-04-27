<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Team Recommend</h1>
    </div>
    <!-- step image -->
    <div class="columns is-centered">
      <div class="is-multiline is-half has-text-centered">
        <button class="button is-black p-5 m-5" disabled>Buster</button>
        <button class="button is-black is-inverted p-5 m-5">Arks</button>
        <button class="button is-black is-inverted p-5 m-5">Quick</button>
      </div>
    </div>

    <div class="columns is-centered" >
      <div class="card mr-1" v-for="item in items" :key="item">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-header-title">
          <p>Servant Name</p>
        </div>
      </div>
    </div>

    <div class="columns is-centered mt-6">
        <div class="is-max-desktop mx-6 px-6 py-2" style="border: 1px solid black">
            <div class="column ">
                <h2>Team 1</h2>
                <h2>Team 2</h2>
                <h2>Team 3</h2>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1,2,3,4,5,6,7],
    };
  }
};
</script>
