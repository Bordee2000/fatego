<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Servant List</h1>
    </div>

    <div class="is-max-desktop mx-6 px-6 py-3 pb-6" style="border: 1px solid black">
      <nav class="level" >
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
            <a
              class="button has-text-weight-bold px-5"
              data-target="#filter"
              @click="select_button= 'filter'"
            >Filter By</a>
          </div>
          <div
            class="px-2 level-item"
            style="right: 0px"
            data-target="#sort"
            @click="select_button=='sort'?select_button='':select_button='sort'"
          > 
            <!-- dropdown sort -->
            <div class="dropdown is-right " :class="select_button=='sort'?'is-active':''">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="has-text-weight-bold">Sort By</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu pt-0" style="min-width: 1vw;" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a class="dropdown-item has-text-weight-bold" @click="sortType='HP'" :class="sortType=='HP'?'is-active':''">HP</a>
                  <a class="dropdown-item has-text-weight-bold" @click="sortType='ATK'" :class="sortType=='ATK'?'is-active':''">ATK</a>
                  <a class="dropdown-item has-text-weight-bold" @click="sortType='NAME'" :class="sortType=='NAME'?'is-active':''">NAME</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section class="columns is-multiline" >
        <div
          class="card column is-2 mx-4 my-2 pb-0"
          v-for="(servant, index) in servants"
          :key="servant+index"
        >
          <div class="card-image">
            <!-- send id -->
            <router-link to="/servantDetail/1">
              <figure class="image">
                <img :src="servant.image" alt />
              </figure>
            </router-link>
          </div>
          <div class="card-header-title is-justify-content-center p-0">
            <p style="text-align: center;">{{ servant.name }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- modal filter -->
    <div class="modal" :class="select_button=='filter'?'is-active':''" id="filter">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
        <!-- Any other Bulma elements you want -->
        <header class="modal-card-head">
          <p class="modal-card-title has-text-weight-bold">Filter</p>
          <button class="delete" @click="select_button=''" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <!-- filter class -->
          <div class="columns">
            <div class="column">
              <div class="table">
                <thead>
                  <tr>
                    <th class="has-text-weight-bold is-size-5">Class</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="is-flex is-flex-wrap-wrap">
                    <td
                      class="is-vcentered"
                      v-for="e_class in Object.keys(all_class)"
                      :key="e_class"
                    >
                      <label class="checkbox is-flex is-align-items-baseline">
                        <input type="checkbox" :value="e_class" v-model="all_class[e_class]" />
                        <p style="margin-left: 2px">{{e_class}}</p>
                      </label>
                    </td>
                  </tr>
                </tbody>
              </div>
            </div>
          </div>
        </section>
        <div class="modal-card-foot">
          <button class="button is-success" @click="select_button='';addClassFilter();">Save changes</button>
          <button class="button" @click="select_button=''">Cancel</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      select_filter: [],
      all_class: {
        Shielder: false,
        Saber: false,
        Archer: false,
        Lancer: false,
        Rider: false,
        Caster: false,
        Assassin: false,
        Berserke: false,
        Ruler: false,
        Avenger: false,
        "Moon Cancer": false,
        "Alter Ego": false,
        Foreigner: false
      },
      servants: [
        {
          name: "Mashu Kyrielight 3★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/b/b2/Shieldercardborder1.png"
        },
        {
          name: "Jeanne d'Arc 5★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/1/16/Rulercardborder1.png"
        },
        {
          name: "Artoria Pendragon (Lancer Alter) 4★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/2/28/Lancercardborder10.png"
        },

        {
          name: "Okita Sōji 5★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/8/8b/Sabercardborder10.png"
        },
        {
          name: "Artoria Pendragon (Alter) 4★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/0/09/Sabercardborder2.png"
        },
        {
          name: "Siegfried 4★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/d/de/Sabercardborder5.png"
        },

        {
          name: "EMIYA 4★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/8/8c/Archercardborder1.png"
        },
        {
          name: "Gilgamesh 5★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/b/bf/Archercardborder2.png"
        },
        {
          name: "Asagami Fujino 4★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/5/5c/Archercardborder25.png"
        },

        {
          name: "Katsushika Hokusai 5★",
          image:
            "https://static.wikia.nocookie.net/fategrandorder/images/7/76/Foreignercardborder2.png"
        }
      ],
      select_button: "",
      sortType: "",
    };
  },
  methods: {
    addClassFilter() {
      for (const [key, value] of Object.entries(this.all_class)) {
        if (value && !this.select_filter.includes(key)) {
          this.select_filter.push(key);
        }
        if (!value && this.select_filter.includes(key)) {
          const classIndex = this.select_filter.findIndex(e => e == key);
          console.log(classIndex);
          this.select_filter.splice(classIndex, 1);
        }
      }
      console.log(this.select_filter);
    }
  }
};
</script>


