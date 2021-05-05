<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Team Recommend</h1>
    </div>

    <!-- team type -->
    <div class="columns is-centered">
      <div class="is-half has-text-centered">
        <button
          class="button p-5 m-5"
          @click="getTeams('B')"
          :class="team_type=='B'?'is-danger':'is-black is-inverted'"
        >Buster</button>
        <button
          class="button p-5 m-5"
          @click="getTeams('A')"
          :class="team_type=='A'?'is-info':'is-black is-inverted'"
        >Arts</button>
        <button
          class="button p-5 m-5"
          @click="getTeams('Q')"
          :class="team_type=='Q'?'is-success':'is-black is-inverted'"
        >Quick</button>
      </div>
    </div>

    <div class="is-justify-content-center mx-6">
      <div class="is-flex scroll-x p-0 m-0 mx-6">
        <div
          class="card mr-1"
          v-for="servant in all_servants"
          :key="servant.id"
          style="min-width: 10vw;"
        >
          <a>
            <div class="card-image">
              <figure class="image">
                <img :src="servant.icon" alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-header-title p-1 is-justify-content-center">
              <p style="text-align: center;font-size: 0.8em">{{ servant.name }}</p>
            </div>
          </a>
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
              <tr class="mb-4" v-for="(item, index) in items" :key="index">
                <th class="is-vcentered has-text-centered">Team {{index}}</th>
                <td>
                  <div class="is-flex">
                    <div class="card" v-for="list in item.a" :key="list.name">
                      <router-link to="/servantDetail/1">
                        <div class="card-image">
                          <figure class="image">
                            <img :src="list.image" alt="Placeholder image" />
                          </figure>
                        </div>
                      </router-link>
                      <div class="card-header-title is-justify-content-center p-1">
                        <p style="font-size: 10px; text-align: center;">{{ list.name }}</p>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="is-flex">
                    <div class="card" v-for="list in item.b" :key="list.name">
                      <router-link to="/servantDetail/1">
                        <div class="card-image">
                          <figure class="image">
                            <img :src="list.image" alt="Placeholder image" />
                          </figure>
                        </div>
                      </router-link>
                      <div class="card-header-title is-justify-content-center p-1">
                        <p style="font-size: 10px; text-align: center;">{{ list.name }}</p>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <div class="is-flex">
                    <div class="card" v-for="list in item.c" :key="list.name">
                      <router-link to="/servantDetail/1">
                        <div class="card-image">
                          <figure class="image">
                            <img :src="list.image" alt="Placeholder image" />
                          </figure>
                        </div>
                      </router-link>
                      <div class="card-header-title is-justify-content-center p-1">
                        <p style="font-size: 10px; text-align: center;">{{ list.name }}</p>
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
import axios from "axios";
export default {
  data() {
    return {
      team_type: "B",
      items: {
        1: {
          a: [
            {
              name: "Merlin (Prototype)",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/5/5e/MerlinPrototypeArcadeIcon.png"
            },
            {
              name: "Artoria Pendragon",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/e/ed/ArtoriaPendragonIcon.png"
            },
            {
              name: "Merlin",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/b/b0/MerlinStage2Icon.png"
            }
          ],
          b: [
            {
              name: "Sima Yi (Reines)",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/b/b6/S241Icon.png"
            },
            {
              name: "Arjuna (Alter)",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/c/c6/S247Icon.png"
            },
            {
              name: "Mashu Kyrielight",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/3/30/MashuIconSR.png"
            }
          ],
          c: [
            {
              name: "Taira no Kagekiyo",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/2/23/S303Icon.png"
            },
            {
              name: "B B",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/e/e8/BBicon.png"
            }
          ]
        },
        2: {
          a: [
            {
              name: "Sima Yi (Reines)",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/b/b6/S241Icon.png"
            },
            {
              name: "B B",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/e/e8/BBicon.png"
            },
            {
              name: "Merlin",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/b/b0/MerlinStage2Icon.png"
            }
          ],
          b: [
            {
              name: "Caren C Hortensia (Amor Caren)",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/7/72/S305Icon.png"
            },
            {
              name: "Merlin",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/b/b0/MerlinStage2Icon.png"
            },
            {
              name: "Taira no Kagekiyo",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/2/23/S303Icon.png"
            }
          ],
          c: [
            {
              name: "Mata Hari",
              image:
                "https://static.wikia.nocookie.net/fategrandorder/images/0/0d/MataHariGoldIcon.png"
            }
          ]
        }
      },
      all_servants: []
    };
  },
  methods: {
    getTeams(value) {
      this.team_type = value;
      axios
        .get("http://localhost:3000/team", {
          params: {
            type: this.team_type
          }
        })
        .then(response => {
          this.all_servants = response.data;

          this.all_servants.forEach(element => {
            let str = element.icon;
            let [part1, part2] = str.split("/revision");
            element.icon = part1;
            // console.log(element.saint_graphs)
          });
          console.log(this.all_servants);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getTeams('B')
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
.is-flex .card {
  width: 7vw !important;
}
.scroll-x {
  overflow-y: scroll;
}

.scroll-x::-webkit-scrollbar {
  height: 10px;
  margin: auto auto;
}
.scroll-x::-webkit-scrollbar-thumb {
  background-color: rgb(198, 195, 195);
  border-radius: 20px;
}
.scroll-x::-webkit-scrollbar-thumb:hover {
  background-color: rgb(121, 121, 121);
}
</style>
