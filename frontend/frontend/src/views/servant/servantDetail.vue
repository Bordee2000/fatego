<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered">
      <figure class="image is-64x64">
      <img src="https://static.wikia.nocookie.net/fategrandorder/images/a/ab/Class-Shielder-Gold.png" alt="">
      </figure>
    </div>
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">{{data.Name}}</h1>
    </div>
    <!-- step image -->
    <div class="columns is-centered">
      <div class="is-multiline is-half has-text-centered" style="width: 25vw">
        <button v-for="stage in image_stage" :key="stage.name" class="button is-rounded p-2 m-1" :class="stage.name==select_stage ?'is-dark':'is-black is-inverted'" @click="select_stage=stage.name, getImage(stage.name)">{{stage.name}}</button>
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
            <p><strong>Japanese Name:</strong> {{data.JName}}</p>
            <p><strong>AKA:</strong> {{data.AKA}}</p>
            <p><strong>ID:</strong> {{data.ID}}</p>
            <p><strong>Cost:</strong> {{data.Cost}}</p>
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
            <p><strong>ATK:</strong> {{data.ATK}}</p>
            <p class="has-text-danger"><strong class="has-text-danger">4★ATK:</strong> {{data.ATK4}}</p>
            <p class="has-text-warning-dark"><strong class="has-text-warning-dark">Grail ARK:</strong> {{data.Grail_ATK}}</p>
            </div>

            <div class="column">
            <p><strong>HP:</strong> {{data.HP}}</p>
            <p class="has-text-danger"><strong class="has-text-danger">4★HP:</strong> {{data.HP4}}</p>
            <p class="has-text-warning-dark"><strong class="has-text-warning-dark">Grail HP:</strong> {{data.Grail_HP}}</p>
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
            <p><strong>Gender:</strong> {{ data.Gender }}</p>
            <p><strong>Traits:</strong> {{ data.Traits }}</p>
            <p><strong>Alignments:</strong> {{ data.Alignments }}</p>
          </div>
        </div>

        <div class="columns is-centered is-multiline mt-5" style="width: 100%">
          <figure
            class="image m-2"
            style="width: 28%;box-shadow: 0px 0px 10px;"
          >
            <img src="https://static.wikia.nocookie.net/fategrandorder/images/8/84/Quick.png" alt="">
          </figure>
          <figure
            class="image m-2"
            style="width: 28%;box-shadow: 0px 0px 10px;"
          >
            <img src="https://static.wikia.nocookie.net/fategrandorder/images/9/95/Arts.png" alt="">
          </figure>
          <figure
            class="image m-2"
            style="width: 28%;box-shadow: 0px 0px 10px;"
          >
            <img src="https://static.wikia.nocookie.net/fategrandorder/images/9/95/Arts.png" alt="">
          </figure>
          <figure
            class="image m-2"
            style="width: 28%;box-shadow: 0px 0px 10px;"
          >
            <img src="https://static.wikia.nocookie.net/fategrandorder/images/6/6e/Buster.png" alt="">
          </figure>
          <figure
            class="image m-2"
            style="width: 28%;box-shadow: 0px 0px 10px;"
          >
            <img src="https://static.wikia.nocookie.net/fategrandorder/images/6/6e/Buster.png" alt="">
          </figure>
        </div>
      </div>

      <!-- center image -->
      <div class="column p-0 is-4 mx-6">
        <figure class="image">
          <img :src="select_image" alt="">
        </figure>
      </div>

      <!-- right -->
      <div class="column is-3">
        <div class="columns">
          <div
            class="p-2 textarea" rows="4"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p><strong>Voice Actor:</strong> {{ data.Voice }}</p>
            <p><strong>Attribute:</strong> {{ data.Attribute }}</p>
            <p><strong>Illustrator:</strong> {{ data.Illustrator }}</p>
            <p><strong>Growth Curve:</strong> {{ data.Growth_Curve }}</p>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea" rows="5"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p><strong>Star Absorption:</strong> {{ data.Star_Absorption }}</p>
            <p><strong>Star Genteration:</strong> {{ data.Star_Genteration }}</p>
            <p><strong>NP Change ATK:</strong> {{ data.NP_Change_ATK }}</p>
            <p><strong>NP Change DEF:</strong> {{ data.NP_Change_ATK }}</p>
            <p><strong>Death Rate:</strong> {{ data.Death_Rate }}</p>
          </div>
        </div>

        <div class="columns is-centered is-multiline has-text-centered mt-5">
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#active_skill"
            @click="select_button = 'active_skill'"
          >Active Skill</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#passive_skill"
            @click="select_button = 'passive_skill'"
          >Passive Skills</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#noble_phantasm"
            @click="select_button = 'noble_phantasm'"
          >Noble Phantasm</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#ascension"
            @click="select_button = 'ascension'"
          >Ascension</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#skill_upgrade"
            @click="select_button = 'skill_upgrade'"
          >Skill Upgrade</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#state"
            @click="select_button = 'state'"
          >State</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Bond_Level"
            @click="select_button = 'Bond_Level'"
          >Bond Level</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Biography"
            @click="select_button = 'Biography'"
          >Biography</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Trivia"
            @click="select_button = 'Trivia'"
          >Trivia</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
            data-target="#Images"
            @click="select_button = 'Images'"
          >Images</button>
        </div>

      </div>
    </div>
    
    <div class="modal" :class="select_button=='active_skill'?'is-active':''" id="active_skill">
      <div class="modal-background" @click="select_button=''"></div>
      <div class="modal-card">
    <!-- Any other Bulma elements you want -->
    <header class="modal-card-head">
      <p class="modal-card-title">Active Skill</p>
      <button class="delete" @click="select_button=''" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
      <h1>Test</h1>
    </section>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select_button: "",
      select_image: "",
      select_stage: "Stage 1",
      image_stage: [
        {name: "Stage 1",image: "https://grandorder.wiki/images/7/71/Portrait_Servant_001_1.png"},
        {name: "Stage 2",image: "https://grandorder.wiki/images/d/dc/Portrait_Servant_001_2.png"},
        {name: "Stage 3",image: "https://grandorder.wiki/images/3/3d/Portrait_Servant_001_3.png"},
        {name: "Stage 4",image: "https://grandorder.wiki/images/e/ed/Portrait_Servant_001_4.png"},
      ],
      items: [],
      data: {
        Name: 'Mashu Kyrielight',
        JName: ' マシュ・キリエライト',
        AKA: 'Mashu Kirielite, Mash (Official Translation)',
        ID: '1',
        Cost: '0',
        ATK: '1,261/6,791',
        ATK4: '1,455/8,730',
        Grail_ATK: '10,575',
        HP: '1,854/10,302',
        HP4: '1,854/10,302',
      	Grail_HP: '15,619',
        Gender: 'Female',
        Traits: 'Costume-Owning, Demi-servant, Female, Humanoid, Living Human, Riding, Servant, Weak to Enuma Elish',
        Alignments: 'Lawful・Good',
        Voice: 'Takahashi Rie',
        Attribute: 'Earth',
        Illustrator: 'Takeuchi Takashi',
        Growth_Curve: 'Linear',
        Star_Absorption: '99',
        Star_Genteration: ' 9.9%',
        NP_Change_ATK: '0.84%',
        NP_Change_DEF: '3%',
        Death_Rate: '24.5%',
      },
      
    };
  },
  methods: {
    getImage(stage) {
      const img =  this.image_stage.filter((e) => e.name === stage)[0].image
      this.select_image = img
    }
  },
  mounted() {
    this.getImage(this.select_stage)
  }
};
</script>
