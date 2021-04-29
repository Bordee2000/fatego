<template>
  <div class="container is-fluid mt-6">
    <div class="columns is-centered is-size-6">
      <i class="far fa-star fa-2x"></i>
    </div>
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Servant Name</h1>
    </div>
    <!-- step image -->
    <div class="columns is-centered">
      <div class="is-multiline is-half has-text-centered" style="width: 25vw">
        <button class="button is-black is-inverted is-rounded p-2 m-1" disabled>step 1</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 2</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 3</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 4</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 5</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 6</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 7</button>
        <button class="button is-black is-inverted is-rounded p-2 m-1">step 8</button>
      </div>
    </div>

    <!-- detail -->
    <div class="columns mx-2 mb-6">
      <!-- left -->
      <div class="column is-3">
        <div class="columns">
          <div
            class="p-2 textarea"
            rows="4"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>Name:</p>
            <p>AKA:</p>
            <p>ID:</p>
            <p>Cost:</p>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea"
            rows="3"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>
              ATK:
              <span style="padding-right: 42%;"></span> HP:
            </p>
            <p>
              4★ATK:
              <span style="padding-right: 27%;"></span>4★HP:
            </p>
            <p>
              Grail ARK:
              <span style="padding-right: 23%;"></span> Grail HP:
            </p>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea"
            rows="3"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>Gender:</p>
            <p>Traits:</p>
            <p>Alignments:</p>
          </div>
        </div>

        <div class="columns is-centered is-multiline has-text-centered mt-5">
          <div
            class="card m-2 py-5 is-size-4 has-text-weight-bold"
            style="width: 30%;box-shadow: 0px 0px 10px;"
          >QUICK</div>
          <div
            class="card m-2 py-5 is-size-4 has-text-weight-bold"
            style="width: 30%;box-shadow: 0px 0px 10px;"
          >ARTS</div>
          <div
            class="card m-2 py-5 is-size-4 has-text-weight-bold"
            style="width: 30%;box-shadow: 0px 0px 10px;"
          >ARTS</div>
          <div
            class="card m-2 py-5 is-size-4 has-text-weight-bold"
            style="width: 30%;box-shadow: 0px 0px 10px;"
          >BUSTER</div>
          <div
            class="card m-2 py-5 is-size-4 has-text-weight-bold"
            style="width: 30%;box-shadow: 0px 0px 10px;"
          >BUSTER</div>
        </div>
      </div>

      <!-- center image -->
      <div class="column card is-5 mx-6"></div>

      <!-- right -->
      <div class="column is-3">
        <div class="columns">
          <div
            class="p-2 textarea" rows="4"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>Voice Actor:</p>
            <p>Attribute:</p>
            <p>Illustrator:</p>
            <p>Growth Curve::</p>
          </div>
        </div>

        <div class="columns mt-2">
          <div
            class="p-2 textarea" rows="5"
            style="border: 1px solid black;width: 20vw;box-shadow: 0px 0px 10px;"
          >
            <p>Star Absorption:</p>
            <p>Star Genteration:</p>
            <p>NP Change ATK:</p>
            <p>NP Change DEF:</p>
            <p>Death Rate:</p>
          </div>
        </div>

        <div class="columns is-centered is-multiline has-text-centered mt-5">
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Active Skill</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Passive Skills</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Noble Phantasm</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Ascension</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Skill Upgrade</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >State</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Bond Level</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Biography</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Trivia</button>
          <Button
            class="card button m-3 py-2 is-size-6 has-text-weight-bold"
            style="width: 42%;box-shadow: 0px 0px 10px;"
          >Images</button>
        </div>

      </div>
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
