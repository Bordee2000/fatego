<template>
  <div class="container is-fluid mt-5">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Servant List</h1>
    </div>

    <div class="is-max-desktop mx-6 px-6 py-3 pb-6" style="border: 1px solid black">
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
                  v-model="search_name"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
              <div v-if="user.role=='admin'" class="level-item">
                <div class="px-2">
                  <a
                    class="button is-rounded has-text-weight-bold is-danger"
                    data-target="#addS"
                    @click="select_button= 'addS'"
                  >Add Servant</a>
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
            <div class="dropdown is-right" :class="select_button=='sort'?'is-active':''">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span class="has-text-weight-bold">Sort By</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div
                class="dropdown-menu pt-0"
                style="min-width: 1vw;"
                id="dropdown-menu"
                role="menu"
              >
                <div class="dropdown-content">
                  <a
                    class="dropdown-item has-text-weight-bold"
                    @click="sortType='HP';sort('HP')"
                    :class="sortType=='HP'?'is-active':''"
                  >HP</a>
                  <a
                    class="dropdown-item has-text-weight-bold"
                    @click="sortType='ATK';sort('ATK')"
                    :class="sortType=='ATK'?'is-active':''"
                  >ATK</a>
                  <a
                    class="dropdown-item has-text-weight-bold"
                    @click="sortType='NAME';sort('NAME')"
                    :class="sortType=='NAME'?'is-active':''"
                  >NAME</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- servant list -->
      <section class="columns is-multiline px-2">
        <router-link
          class="card column is-2 mx-4 my-2 pb-0"
          v-for="(servant, index) in servants"
          :key="servant+index"
          :to="'/servantDetail/'+servant.id"
        >
          <div class="card-image">
            <!-- send id -->
              <figure class="image">
                <img :src="servant.saint_graphs" alt />
              </figure>
          </div>
          <div class="card-header-title is-justify-content-center p-0">
            <p style="text-align: center;">{{ servant.name }} {{ servant.stats }}★</p>
          </div>
        </router-link>
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
          <button class="button" @click="select_button='';resetClass();">Cancel</button>
        </div>
      </div>
    </div>

    <!-- modal add servant -->
    <div class="modal" :class="select_button=='addS'?'is-active':''" id="addS">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
        <!-- Any other Bulma elements you want -->
        <header class="modal-card-head">
          <p class="modal-card-title has-text-weight-bold">Add Servant</p>
          <button class="delete" @click="select_button=''" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="field">
            <div class="columns">
              <div class="column">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    v-model="data.name"
                    class="input"
                    type="text"
                    placeholder="Servant Name"
                  />
                </div>
              </div>

              <div class="column">
                <label class="label">Class</label>
                <div class="select" style="min-width: 100%;">
                  <select v-model="data.class_name" style="min-width: 100%;">
                    <option selected value disabled>Choose..</option>
                    <option
                      v-for="a_class in Object.keys(all_class)"
                      :value="a_class"
                      :key="a_class"
                    >{{a_class}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">Attack</label>
                <div class="control">
                  <input v-model="data.atk" class="input" type="number" placeholder="9999 " />
                </div>
              </div>
              <div class="column">
                <label class="label">HP</label>
                <div class="control">
                  <input v-model="data.hp" class="input" type="number" placeholder="9999 " />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">attributeibute</label>
                <div class="control">
                  <input
                    v-model="data.attribute"
                    class="input"
                    type="text"
                    placeholder="Sky,Earth,Man,Star,etc."
                  />
                </div>
              </div>
              <div class="column">
                <label class="label">growth_curve</label>
                <div class="control">
                  <input
                    v-model="data.growth_curve"
                    class="input"
                    type="text"
                    placeholder="Semi Reverse S"
                  />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">star_absorption</label>
                <div class="control">
                  <input
                    v-model="data.star_absorption"
                    class="input"
                    type="number"
                    placeholder="9.99%"
                  />
                </div>
              </div>
              <div class="column">
                <label class="label">star_generation</label>
                <div class="control">
                  <input
                    v-model="data.star_generation"
                    class="input"
                    type="number"
                    placeholder="9.99%"
                  />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">np_charge_atk</label>
                <div class="control">
                  <input
                    v-model="data.np_charge_atk"
                    class="input"
                    type="number"
                    placeholder="9.99%"
                  />
                </div>
              </div>
              <div class="column">
                <label class="label">np_charge_def</label>
                <div class="control">
                  <input
                    v-model="data.np_charge_def"
                    class="input"
                    type="number"
                    placeholder="9.99%"
                  />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">death_rate_rate</label>
                <div class="control">
                  <input
                    v-model="data.death_rate"
                    class="input"
                    type="number"
                    placeholder="31.500%"
                  />
                </div>
              </div>
              <div class="column">
                <label class="label">alignments</label>
                <div class="control">
                  <input
                    v-model="data.alignments"
                    class="input"
                    type="text"
                    placeholder="Lawful・Neutral"
                  />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">gender</label>
                <div class="control">
                  <input
                    v-model="data.gender"
                    class="input"
                    type="text"
                    placeholder="Male,Female,etc."
                  />
                </div>
              </div>
              <div class="column">
                <label class="label">stats</label>
                <div class="control">
                  <input v-model="data.stats" class="input" type="number" placeholder="5" />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">bond_level_level</label>
                <div class="control">
                  <input
                    v-model="data.bond_level"
                    class="input"
                    type="number"
                    placeholder="1695000"
                  />
                </div>
              </div>
              <div class="column">
                <label class="label">deck_card_card(Quick, Art, Burst)</label>
                <div class="control">
                  <input v-model="data.deck_card" class="input" type="text" placeholder="QAAAB" />
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label">Image (URL)</label>
                <div class="control">
                  <div v-for="i in 4" :key="i">
                    <label class="label">stage {{ i }}</label>
                    <input
                      v-model="data.image[i-1]"
                      class="input mb-1"
                      type="text"
                      placeholder="https://static.wikia.nocookie.net/fategrandorder/images/a/a3/S001_Stage1.webp/revision/latest?cb=20210131082034"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="modal-card-foot">
          <button class="button is-success" @click="saveServant()">Add Servant</button>
          <button class="button" @click="select_button='';resetData()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  alphaNum,
  maxValue
} from "vuelidate/lib/validators";
import axios from "@/plugins/axios";
export default {
  props: ["user"],
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
      servants: [],
      all_Servant: [],
      select_button: "",
      sortType: "",
      search_name: "",
      data: {
        name: "",
        class_name: "",
        atk: "",
        hp: "",
        attribute: "",
        growth_curve: "",
        star_absorption: "",
        star_generation: "",
        np_charge_atk: "",
        np_charge_def: "",
        death_rate: "",
        alignments: "",
        gender: "",
        stats: "",
        bond_level: "",
        deck_card: "",
        image: []
      }
    };
  },
  methods: {
    resetClass() {
      (this.all_class.Shielder = false),
        (this.all_class.Saber = false),
        (this.all_class.Archer = false),
        (this.all_class.Lancer = false),
        (this.all_class.Rider = false),
        (this.all_class.Caster = false),
        (this.all_class.Assassin = false),
        (this.all_class.Berserke = false),
        (this.all_class.Ruler = false),
        (this.all_class.Avenger = false),
        (this.all_class["Moon Cancer"] = false),
        (this.all_class["Alter Ego"] = false),
        (this.all_class.Foreigner = false);
    },
    resetData() {
      (this.data.name = ""),
        (this.data.class_name = ""),
        (this.data.atk = ""),
        (this.data.hp = ""),
        (this.data.attribute = ""),
        (this.data.growth_curve = ""),
        (this.data.star_absorption = ""),
        (this.data.star_generation = ""),
        (this.data.np_charge_atk = ""),
        (this.data.np_charge_def = ""),
        (this.data.death_rate = ""),
        (this.data.alignments = ""),
        (this.data.gender = ""),
        (this.data.stats = ""),
        (this.data.bond_level = ""),
        (this.data.deck_card = ""),
        (this.data.image = []);
    },
    addClassFilter() {
      for (const [key, value] of Object.entries(this.all_class)) {
        if (value && !this.select_filter.includes(key)) {
          this.select_filter.push(key);
        }
        if (!value && this.select_filter.includes(key)) {
          const classIndex = this.select_filter.findIndex(e => e == key);
          this.select_filter.splice(classIndex, 1);
        }
      }
      this.filter();
    },
    addServants() {
      console.log(this.$v);
      axios
        .get("/")
        .then(res => {
          this.all_Servant = res.data;
          for (let i = 0; i < this.all_Servant.length; i++) {
            const image = this.all_Servant[i].saint_graphs.split(
              "/revision"
            )[0];
            this.all_Servant[i].saint_graphs = image;
          }
          this.servants = this.all_Servant;
        })
        .catch(err => {
          console.log(err);
        });
    },
    filter() {
      this.servants = [];
      if (this.select_filter.length > 0) {
        for (let i = 0; i < this.select_filter.length; i++) {
          this.servants = this.servants.concat(
            this.all_Servant.filter(e => e.class_name == this.select_filter[i])
          );
        }
      } else {
        this.servants = this.all_Servant;
      }
    },
    sort(sort) {
      if (sort == "HP") {
        this.servants.sort((a, b) => {
          if (a.hp > b.hp) return -1;
          if (a.hp < b.hp) return 1;
          return 0;
        });
      } else if (sort == "ATK") {
        this.servants.sort((a, b) => {
          if (a.atk > b.atk) return -1;
          if (a.atk < b.atk) return 1;
          return 0;
        });
      } else if (sort == "NAME") {
        this.servants.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      }
    },
    search() {
      if (this.search_name.length > 0) {
        this.filter();
        this.servants = this.servants.filter(e =>
          e.name.includes(this.search_name)
        );
      } else {
        this.filter();
      }
    },
    saveServant() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = {
          name: this.data.name,
          class_name: this.data.class_name,
          atk: this.data.atk,
          hp: this.data.hp,
          attribute: this.data.attribute,
          growth_curve: this.data.growth_curve,
          star_absorption: this.data.star_absorption,
          star_generation: this.data.star_generation,
          np_charge_atk: this.data.np_charge_atk,
          np_charge_def: this.data.np_charge_def,
          death_rate: this.data.death_rate,
          alignments: this.data.alignments,
          gender: this.data.gender,
          stats: this.data.stats,
          bond_level: this.data.bond_level,
          deck_card: this.data.deck_card,
          image: this.data.image
        };

        axios
          .post("/detailServant/add", data)
          .then(res => {
            alert(res.data);
            location.reload();
          })
          .catch(err => {
            console.log(err);
          });
        this.select_button = "";
        this.resetData();
      } else {
        console.log(this.$v);
      }
    }
  },
  validations: {
    data: {
      name: {
        required
      },
      class_name: {
        required
      },
      atk: {
        required,
        maxValue: maxValue(10000000)
      },
      hp: {
        required,
        maxValue: maxValue(10000000)
      },
      attribute: {
        required
      },
      growth_curve: {
        required
      },
      star_absorption: {
        required,
        maxValue: maxValue(100.0)
      },
      star_generation: {
        required,
        maxValue: maxValue(100.0)
      },
      np_charge_atk: {
        required,
        maxValue: maxValue(100.0)
      },
      np_charge_def: {
        required,
        maxValue: maxValue(100.0)
      },
      death_rate: {
        required,
        maxValue: maxValue(100.0)
      },
      alignments: {
        required
      },
      gender: {
        required
      },
      stats: {
        required
      },
      bond_level: {
        required,
        maxValue: maxValue(10000000)
      },
      deck_card: {
        required
      },
      image: {
        required
      }
    }
  },
  watch: {
    search_name: function(val) {
      this.search();
    }
  },
  mounted() {
    this.addServants();
  }
};
</script>


