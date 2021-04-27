<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Servant List</h1>
    </div>

    <div class="is-max-desktop mx-6 px-6 py-2" style="border: 1px solid black">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control has-icons-left has-icons-right">
                <input
                  class="input"
                  type="text"
                  placeholder="Search"
                  style="border-radius: 25px;padding-right: 13vw"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
              <div class="level-item">
                <div class="px-2">
                  <a class="button is-rounded has-text-weight-bold is-danger">Add Servant</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <div class="px-2 level-item">
            <a class="button has-text-weight-bold px-5">Filter</a>
          </div>
          <div class="px-2 level-item" style="right: 0px">
            <a class="button has-text-weight-bold px-5">Sort</a>
          </div>
        </div>
      </nav>
      <section class="columns is-multiline">
        <div class="card column is-2 mx-4 my-2">
          <div class="card-image">
            <!-- send id --><router-link to="/servantDetail/1">
              <figure class="image is-1by1">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt />
              </figure>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  }
};
</script>
