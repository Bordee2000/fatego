<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered">
      <figure class="image is-64x64">
        <img
          :src="classLogo[sclass]"
          alt
        />
      </figure>
    </div>
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">{{data.Name}}</h1>
    </div>
    <!-- step image -->
    <div class="columns is-centered">
      <div class="is-multiline is-half has-text-centered" style="width: 25vw">
        <button
          v-for="stage in image_stage"
          :key="stage.stage"
          class="button is-rounded p-2 m-1"
          :class="stage.stage==select_stage ?'is-dark':'is-black is-inverted'"
          @click="select_stage=stage.stage, getImage(stage.stage)"
        >Stage {{stage.stage}}</button>
      </div>
    </div>

    <!-- detail -->
    <div class="columns is-centered mx-2 mb-6 mt-3">
      <!-- left -->
      <div class="column is-3">
        <div class="columns">
          <div
            class="p-2 textarea"
            rows="4"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>
              <strong>Name:</strong>
              {{data.name}}
            </p>
            <p>
              <strong>ID:</strong>
              {{data.id}}
            </p>
            <p>
              <strong>Star:</strong>
              {{data.stats}}★
            </p>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea"
            rows="3"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <div class="columns">
              <div class="column">
                <p>
                  <strong>ATK:</strong>
                  {{data.atk}}
                </p>
                <p class="has-text-danger">
                  <strong class="has-text-danger">4★ATK:</strong>
                  {{data.ATK4}}
                </p>
                <p class="has-text-warning-dark">
                  <strong class="has-text-warning-dark">Grail ARK:</strong>
                  {{data.Grail_ATK}}
                </p>
              </div>

              <div class="column">
                <p>
                  <strong>HP:</strong>
                  {{data.hp}}
                </p>
                <p class="has-text-danger">
                  <strong class="has-text-danger">4★HP:</strong>
                  {{data.HP4}}
                </p>
                <p class="has-text-warning-dark">
                  <strong class="has-text-warning-dark">Grail HP:</strong>
                  {{data.Grail_HP}}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea"
            rows="3"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>
              <strong>Gender:</strong>
              {{ data.gender }}
            </p>
            <p>
              <strong>Traits:</strong>
              {{ data.traits }}
            </p>
            <p>
              <strong>Alignments:</strong>
              {{ data.alignments }}
            </p>
          </div>
        </div>

        <div class="columns is-centered is-multiline mt-5" style="width: 100%">
          <figure
            v-for="(card, index) in data.deck_card"
            :key="card+index"
            class="image m-2"
            style="width: 28%;box-shadow: 0px 0px 10px;"
          >
            <img :src="deck_card[card]" alt />
          </figure>
        </div>
      </div>

      <!-- center image -->
      <div class="column p-0 is-4 mx-6">
        <figure class="image">
          <img :src="select_image" alt />
        </figure>
      </div>

      <!-- right -->
      <div class="column is-3">
        <div class="columns">
          <div
            class="p-2 textarea"
            rows="4"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>
              <strong>Voice Actor:</strong>
              {{ data.voice }}
            </p>
            <p>
              <strong>Attribute:</strong>
              {{ data.attribute }}
            </p>
            <p>
              <strong>Growth Curve:</strong>
              {{ data.growth_curve }}
            </p>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea"
            rows="5"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>
              <strong>Star Absorption:</strong>
              {{ data.star_absorption }}%
            </p>
            <p>
              <strong>Star Genteration:</strong>
              {{ data.star_generation }}%
            </p>
            <p>
              <strong>NP Change ATK:</strong>
              {{ data.np_charge_atk }}%
            </p>
            <p>
              <strong>NP Change DEF:</strong>
              {{ data.np_charge_def }}%
            </p>
            <p>
              <strong>Death Rate:</strong>
              {{ data.death_rate }}%
            </p>
          </div>
        </div>

        <div class="columns is-centered is-multiline has-text-centered mt-5">
          <button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Biography"
            @click="select_button = 'Biography';getBio()"
          >Biography</button>
          <button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Dialog"
            @click="select_button = 'Dialog';getDialog()"
          >Dialog</button>
          <button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Image"
            @click="select_button = 'Images';getImages()"
          >Image</button>
          <button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Ascension"
            @click="select_button = 'Ascension';getAns()"
          >Ascension</button>
        </div>
      </div>
    </div>

    <!--modal Biography-->
    <div class="modal py-6" :class="select_button=='Biography'?'is-active':''" id="Biography">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Biography</p>
          <button class="delete" @click="select_button=''" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <div class="columns">
            <div class="column">
              <div class="table">
                <div v-for="(bio, index) in bios" :key="bio+index">
                  <thead>
                    <tr>
                      <th class="has-text-weight-bold is-size-5">{{ bio.unlock_condition }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{bio.description}}</td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!--modal Dialog -->
    <div class="modal py-6" :class="select_button=='Dialog'?'is-active':''" id="Dialog">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Dialog</p>
          <button class="delete" @click="select_button=''" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content -->
          <div class="columns">
            <div class="column">
              <div class="table">
                <div v-for="(dialog, index) in dialogs" :key="dialog+index">
                  <thead>
                    <tr>
                      <th class="has-text-weight-bold is-size-5">{{ dialog.occasion }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ dialog.dialogue }}</td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!--modal Image -->
    <div class="modal py-6" :class="select_button=='Images'?'is-active':''" id="Images">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Images</p>
          <button class="delete" @click="select_button=''" aria-label="close"></button>
        </header>
        <section class="modal-card-body pt-0 pb-6">
          <!-- Content -->
          <div class="columns">
            <div class="column">
              <div class="table">
                <div
                  class="is-flex is-flex-direction-column is-align-items-center"
                  v-for="(image, index) in images"
                  :key="image+index"
                >
                  <thead>
                    <tr class="has-text-center">
                      <th class="has-text-weight-bold is-size-5">Stage {{ image.stage }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img style="width: 20vw;" :src="image.saint_graphs" alt />
                      </td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!--modal Ascension -->
    <div class="modal py-6" :class="select_button=='Ascension'?'is-active':''" id="Ascension">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Ascension</p>
          <button class="delete" @click="select_button=''" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content -->
          <div class="columns">
            <div class="column">
              <div class="table">
                <div v-for="(item, index) in ascension" :key="item+index">
                  <thead>
                    <tr>
                      <th class="has-text-weight-bold is-size-5">{{ item.item }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Quantum Piece: {{ item.qp }}</td>
                      <td>Quantity: {{ item.qty }}</td>
                      <td>Rank: {{ item.rank }}</td>
                    </tr>
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      select_button: "",
      select_image: "",
      select_stage: "1",
      image_stage: [],
      items: [],
      data: {},
      classLogo: {
        Shielder:
          "https://static.wikia.nocookie.net/fategrandorder/images/a/ab/Class-Shielder-Gold.png",
        Saber:
          "https://static.wikia.nocookie.net/fategrandorder/images/b/b4/Class-Saber-Gold.png",
        Archer:
          "https://static.wikia.nocookie.net/fategrandorder/images/9/90/Class-Archer-Gold.png",
        Lancer:
          "https://static.wikia.nocookie.net/fategrandorder/images/7/79/Class-Lancer-Gold.png",
        Rider:
          "https://static.wikia.nocookie.net/fategrandorder/images/0/04/Class-Rider-Gold.png",
        Caster:
          "https://static.wikia.nocookie.net/fategrandorder/images/8/89/Class-Caster-Gold.png",
        Assasin:
          "https://static.wikia.nocookie.net/fategrandorder/images/7/7b/Class-Assassin-Gold.png",
        Berserker:
          "https://static.wikia.nocookie.net/fategrandorder/images/5/59/Class-Berserker-Gold.png",
        Ruler:
          "https://static.wikia.nocookie.net/fategrandorder/images/b/ba/Class-Ruler-Gold.png",
        Avenger:
          "https://static.wikia.nocookie.net/fategrandorder/images/1/13/Class-Avenger-Gold.png",
        "Moon Cancer":
          "https://static.wikia.nocookie.net/fategrandorder/images/3/3b/Class-MoonCancer-Gold.png",
        "Alter Ego":
          "https://static.wikia.nocookie.net/fategrandorder/images/9/99/Class-Alterego-Gold.png",
        Foreigner:
          "https://static.wikia.nocookie.net/fategrandorder/images/7/70/Class-Foreigner-Gold.png"
      },
      deck_card: {
        Q:
          "https://static.wikia.nocookie.net/fategrandorder/images/8/84/Quick.png",
        A:
          "https://static.wikia.nocookie.net/fategrandorder/images/9/95/Arts.png",
        B:
          "https://static.wikia.nocookie.net/fategrandorder/images/6/6e/Buster.png"
      },
      bios: [],
      dialogs: [],
      images: [],
      ascension: [],
      sclass: "",
    };
  },
  methods: {
    getImage(stage) {
      let img = this.image_stage.filter(e => e.stage == stage)[0].saint_graphs;
      img = img.split("/revision")[0];
      this.select_image = img;
    },
    async getClass() {
      axios
        .get(`/detailServant/class/${this.$route.params.id}`)
        .then(res => {
          this.sclass = res.data[0].class_name;
          console.log(this.class);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async loadData() {
      await axios
        .get(`/detailServant/${this.$route.params.id}`)
        .then(res => {
          this.data = res.data.servant[0];
          this.image_stage = res.data.image;
          let traits = "";
          if (res.data.trait.length > 0) {
            res.data.trait.forEach((e, index) => {
              if (index != res.data.trait.length - 1) {
                traits += `${e.traits}, `;
              } else {
                traits += `${e.traits}`;
              }
            });
          }
          this.data.traits = traits;
          this.data.voice = res.data.voice.name;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getBio() {
      await axios
        .get(`/detailServant/biography/${this.$route.params.id}`)
        .then(res => {
          this.bios = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getDialog() {
      await axios
        .get(`/detailServant/dialog/${this.$route.params.id}`)
        .then(res => {
          this.dialogs = res.data;
          console.log(this.dialogs);
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getImages() {
      await axios
        .get(`/detailServant/image/${this.$route.params.id}`)
        .then(res => {
          this.images = res.data;
          for (let i = 0; i < this.images.length; i++) {
            const image = this.images[i].saint_graphs.split("/revision")[0];
            this.images[i].saint_graphs = image;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async getAns() {
      await axios
        .get(`/detailServant/ascension/${this.$route.params.id}`)
        .then(res => {
          this.ascension = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    
  },
  async created() {
    await this.getClass();
    await this.loadData();
    await this.getImage(this.select_stage);
  }
};
</script>
