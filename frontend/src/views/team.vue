<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Team Recommend</h1>
    </div>
    <!-- step image -->
    <div class="columns is-centered">
      <div class="is-half has-text-centered">
        <button class="button is-black p-5 m-5" disabled>Buster</button>
        <button class="button is-black is-inverted p-5 m-5">Arks</button>
        <button class="button is-black is-inverted p-5 m-5">Quick</button>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="card mr-1" v-for="item in length" :key="item">
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

    <div class="columns is-centered my-5">
      <div class="is-max-desktop mx-6 p-5" style="border: 1px solid black;width: 80vw;">
        <div class="columns is-centered">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th class="has-text-centered">Team Number</th>
                <th class="is-vcentered has-text-centered">Active Party</th>
                <th class="is-vcentered has-text-centered">Reserve Party</th>
                <th class="is-vcentered has-text-centered">Possible Support Characters</th>
              </tr>
            </thead>

            <tbody>
              <tr class="mb-4" v-for="(item, index) in items" :key="item">
                <th class="is-vcentered has-text-centered">Team {{index}}</th>
                <td>
                  <div class="is-flex">
                    <div class="card" v-for="list in item.a" :key="list">
                      <div class="card-image">
                        <figure class="image">
                          <img
                            src="https://bulma.io/images/placeholders/1280x960.png"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div class="card-header-title is-justify-content-center">
                        <p style="font-size: 9px; text-align: center;">Servant Name</p>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="is-flex">
                    <div class="card" v-for="list in item.b" :key="list">
                      <div class="card-image">
                        <figure class="image">
                          <img
                            src="https://bulma.io/images/placeholders/1280x960.png"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div class="card-header-title is-justify-content-center">
                        <p style="font-size: 9px; text-align: center;">Servant Name</p>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="is-flex">
                    <div class="card" v-for="list in item.c" :key="list">
                      <div class="card-image">
                        <figure class="image">
                          <img
                            src="https://bulma.io/images/placeholders/1280x960.png"
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div class="card-header-title is-justify-content-center">
                        <p style="font-size: 9px; text-align: center;">Servant Name</p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {
        1: { a: [1, 2, 3], b: [3, 4, 5], c: [5, 6, 7] },
        2: { a: [1, 2], b: [3, 4], c: [5, 6] },
        3: { a: [1], b: [3], c: [5] }
      },
      length: [1,2,3,4,5,6,7],
    };
  }
};
</script>

<style>
.table tbody th {
  border: none !important;
}
.table tbody td {
  border: none !important;
}
.is-flex .card{
  width: 7vw !important;
}
</style>
