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
        <div class="card column is-2 mx-4 my-2 pb-0" v-for="servant in listServant" :key="servant.id">
          <div class="card-image">
            <!-- send id -->
            <router-link :to="`/servantDetail/${servant.servant_id}`">
              <figure class="image">
                <img :src="servant.saint_graphs" alt />
              </figure>
            </router-link>
          </div>
          <div class="card-header-title is-justify-content-center p-0">
            <p style="text-align: center;">{{ servant.name }} {{servant.stats}}★</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       servants: [
//         {
//           name: "Mashu Kyrielight 3★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/b/b2/Shieldercardborder1.png"
//         },
//         {
//           name: "Jeanne d'Arc 5★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/1/16/Rulercardborder1.png"
//         },
//         {
//           name: "Artoria Pendragon (Lancer Alter) 4★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/2/28/Lancercardborder10.png"
//         },

//         {
//           name: "Okita Sōji 5★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/8/8b/Sabercardborder10.png"
//         },
//         {
//           name: "Artoria Pendragon (Alter) 4★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/0/09/Sabercardborder2.png"
//         },
//         {
//           name: "Siegfried 4★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/d/de/Sabercardborder5.png"
//         },

//         {
//           name: "EMIYA 4★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/8/8c/Archercardborder1.png"
//         },
//         {
//           name: "Gilgamesh 5★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/b/bf/Archercardborder2.png"
//         },
//         {
//           name: "Asagami Fujino 4★",
//           image:
//             "https://static.wikia.nocookie.net/fategrandorder/images/5/5c/Archercardborder25.png"
//         },

//         {
//           name: "Katsushika Hokusai 5★",
//           image: 'https://static.wikia.nocookie.net/fategrandorder/images/7/76/Foreignercardborder2.png'
//         }
//       ]
//     };
//   }
// };

import axios from 'axios';

export default {
  created() {
    axios.get("http://localhost:3000/")
        .then((response) => {
          this.listServant = response.data; // เอา response ที่เป็น data เท่านั้น
          // console.log(this.listServant)
          
          this.listServant.forEach(element => {
            let str = element.saint_graphs
            let [part1, part2] = str.split("/revision");
            element.saint_graphs = part1
            // console.log(element.saint_graphs)
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

  data() {
    return {
      listServant : [],
    }
  }
}
</script>
