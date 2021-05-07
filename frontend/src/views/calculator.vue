<template>
  <div class="container mt-5">
    <div class="columns is-centered">
      <h1 class="is-size-1 title px-6">Calculator</h1>
    </div>

    <div class="mx-6 px-6 py-3 pb-6">
      <div class="columns mx-6 is-centered">
        <div class="column mr-6 is-7">
          <h1 class="has-text-weight-bold is-size-4">Servant Info</h1>
          <div class="columns mt-2">
            <div class="column">
              <h4 for>Class</h4>
              <div class="select" style="min-width: 100%">
                <select required v-model="select_class" style="min-width: 100%">
                  <option selected value="" disabled>Choose...</option>
                  <option v-for="a_class in all_class" :key="a_class" :value="a_class">{{a_class}}</option>
                </select>
              </div>
              <template v-if="$v.select_class.$error">
                <p class="help is-danger" v-if="!$v.select_class.required">Class is Required</p>
              </template>
            </div>
            <div class="column">
              <h4 for>Servant</h4>
              <div class="select" style="min-width: 100%">
                <select v-model="select_servant" style="min-width: 100%">
                  <option value selected disabled>Select servant</option>
                  <option
                    v-for="servant in servants"
                    :key="servant.name"
                    :value="servant.name"
                  >{{servant.name}}</option>
                </select>
              </div>
              <template v-if="$v.select_servant.$error">
                <p class="help is-danger" v-if="!$v.select_servant.required">Servant is Required</p>
              </template>
            </div>
          </div>

          <div class="columns mb-0">
            <div class="column">
              <h4 for>Total ATK</h4>
              <input class="input" type="number" v-model.number="data.atk" />
            </div>
            <div class="column">
              <h4 for>NP Damage Multiplier</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" v-model="data.np" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="columns my-0">
            <div class="column">
              <label class="mr-5">
                <input type="checkbox" v-model="data.grailed" disabled />
                Max Grails
              </label>
              <label class="mr-5">
                <input
                  type="checkbox"
                  v-model="data.fou"
                  @click="data.goldFou?data.goldFou=fasle:''"
                />
                Fou
              </label>
              <label class="mr-5">
                <input type="checkbox" v-model="data.goldFou" :disabled="!data.fou" />
                Golden Fou
              </label>
              <label class="mr-5">
                <input type="checkbox" v-model="data.ocButton" disabled />
                Overcharge
              </label>
            </div>
          </div>

          <div class="columns">
            <div class="column py-0">
              <label class="mr-5">
                <input type="checkbox" v-model="data.npButton" disabled />
                NP Upgrade
              </label>
              <label class="mr-5">
                <input type="checkbox" v-model="data.secondNP" disabled />
                2nd NP Upgrade
              </label>
            </div>
          </div>

          <div class="columns"></div>

          <div class="columns">
            <div class="column">
              <h4 class="has-text-weight-bold">NP Type</h4>
              <div class="buttons has-addons">
                <button
                  class="button"
                  @click="NP_type='Buster'"
                  :class="NP_type=='Buster'?'is-danger':'is-dark'"
                >Buster</button>
                <button
                  class="button"
                  @click="NP_type='Arts'"
                  :class="NP_type=='Arts'?'is-info':'is-dark'"
                >Arts</button>
                <button
                  class="button"
                  @click="NP_type='Quick'"
                  :class="NP_type=='Quick'?'is-success':'is-dark'"
                >Quick</button>
              </div>
            </div>
            <div class="column">
              <div class="columns">
                <div class="column">
                  <h4 for>NP Level</h4>
                  <div class="select">
                    <select name="npLevel" v-model="data.npLevel">
                      <option value="0">NP 1</option>
                      <option value="1">NP 2</option>
                      <option value="2">NP 3</option>
                      <option value="3">NP 4</option>
                      <option value="4">NP 5</option>
                    </select>
                  </div>
                </div>
                <div class="column">
                  <h4 for>OC Level</h4>
                  <div class="select">
                    <select class="pr-6" name="ocLevel" v-model="data.ocLevel" disabled>
                      <option value="0">1</option>
                      <option value="1">2</option>
                      <option value="2">3</option>
                      <option value="3">4</option>
                      <option value="4">5</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card Buffs -->
          <div class="columns">
            <div class="column">
              <h4>Card Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.cardBuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>Card Debuffs on Enemy</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.cardDebuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h4>Attack Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.attackBuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>Defense Debuffs on Enemy</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.defenseDebuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h4>NP Damage Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.NPBuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>Flat Damage Attack Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.flatAttack" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h4>PowerMod Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.SPBuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>NP Extra Damage</h4>
              <div class="control has-icons-right">
                <input class="input" v-model="data.NPSPBuffs" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <h4>Man/Earth/Sky Advantage</h4>
              <div class="select" style="min-width: 100%">
                <select id="mes_ad" v-model="data.ESAdvantage" style="min-width: 100%">
                  <option selected value="1">Neutral</option>
                  <option value="1.1">Yes (1.1x)</option>
                  <option value="0.9">No (0.9x)</option>
                </select>
              </div>
            </div>
            <div class="column">
              <h4>Advantage</h4>
              <div class="select" style="min-width: 100%">
                <select id="ad" v-model="data.advantage" style="min-width: 100%">
                  <option selected value="1">Neutral</option>
                  <option value="2">Yes (2x)</option>
                  <option value="0.5">No (0.5x)</option>
                  <option value="1.5">Berserker, AlterEgo (1.5x)</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <div class="columns ml-4">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-info is-size-5" @click="cal()">Calculate</a>
              </p>
              <p class="control">
                <a class="button is-dark is-size-5" @click="reset()">Reset</a>
              </p>
            </div>
          </div>
        </div>

        <div class="column ml-6 is-4">
          <h1 class="has-text-weight-bold is-size-4">Projected Damage</h1>
          <div>
            <table class="table is-bordered">
              <thead>
                <tr>
                  <th>
                    <h4>Low</h4>
                    <input class="input" type="number" :value="low" readonly />
                  </th>
                </tr>
                <tr>
                  <th>
                    <h4>Average</h4>
                    <input class="input" type="number" v-model="avg" readonly />
                  </th>
                </tr>
                <tr>
                  <th>
                    <h4>High</h4>
                    <input class="input" type="number" v-model="high" readonly />
                  </th>
                </tr>
              </thead>
            </table>
          </div>

          <p class="mt-5 mb-3">How to use this Calculator</p>
          <ul class="pl-6" style="list-style-type: disc;">
            <li>Class, ATK, and NP Damage Multiplier fields are required.</li>
            <li>Once you select a Class and Servant, its ATK and NP Multiplier fields will autofill (ATK at max level, ungrailed)</li>
            <li>Fill in values for any buffs/debuffs and press Calculate.</li>
            <li>After selecting a class, you can input custom values without having to choose a servant.</li>
          </ul>

          <p class="mt-5 mb-3">Tips</p>
          <ul class="pl-6" style="list-style-type: disc;">
            <li>04/26/2021 1.8.01: Updated with new servant (308)</li>
            <li>
              <a href="#" data-toggle="modal" data-target="#changeLog">Click to view changelog.</a>
            </li>
            <li>All NP multiplier values are up-to-date with JP server.</li>
            <li>Don't forget Passive Skill effects when doing calculations.</li>
            <li>Keep in mind effects that "activate first" before NP.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required
} from "vuelidate/lib/validators";
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      total: 0,
      low: 0,
      high: 0,
      avg: 0,
      data: {
        atk: 0,
        np: 300,
        cartType: 0,
        servantClass: 0,
        advantage: 1,
        cardBuffs: 0,
        cardDebuffs: 0,
        attackBuffs: 0,
        defenseDebuffs: 0,
        NPBuffs: 0,
        flatAttack: 0,
        SPBuffs: 0,
        ESAdvantage: 1,
        grailed: false,
        fou: false,
        goldFou: false,
        ocButton: false,
        npButton: false,
        secondNP: false,
        npLevel: 0,
        ocLevel: 0,
        NPSPBuffs: 0
      },
      all_class: [
        "Saber",
        "Archer",
        "Lancer",
        "Rider",
        "Caster",
        "Assassin",
        "Berserker",
        "Ruler",
        "Avenger",
        "Mooncancer",
        "Alterego",
        "Foreigner"
      ],
      NP_type: "Buster",
      servants: [],
      select_class: "",
      select_servant: ""
    };
  },
  validations: {
    select_class: {
      required
    },
    select_servant: {
      required
    }
  },
  methods: {
    cal() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.total = 0;
        this.data.np = 300;
        if (this.data.fou) {
          this.data.atk += 1000;
        }

        if (this.data.goldFou) {
          this.data.atk += 1000;
        }
        this.data.np += 100 + 25 * parseInt(this.data.npLevel);
        this.total =
          this.data.atk *
            (this.data.np / 100) *
            this.cardDmg(this.NP_type) *
            this.data.advantage *
            this.classDmg(this.select_class) *
            0.23 *
            (1 + this.data.attackBuffs / 100 + this.data.defenseDebuffs / 100) *
            (1 + this.data.cardBuffs / 100 + this.data.cardDebuffs / 100) *
            (1 + this.data.NPBuffs / 100 + this.data.SPBuffs / 100) *
            (1 + this.data.NPSPBuffs / 100) *
            this.data.ESAdvantage +
          this.data.flatAttack;

        this.low = Math.round(
          0.9 * (this.total - this.data.flatAttack) + this.data.flatAttack
        );
        this.avg = Math.round(this.total);
        this.high = Math.round(
          1.099 * (this.total - this.data.flatAttack) + this.data.flatAttack
        );
      }
      this.scrollToTop();
    },
    classDmg(e) {
      var classVal = 1;
      if (e === "") {
        classVal = 0;
        return classVal;
      }
      if ((e = "archer")) {
        classVal = 0.95;
      } else if ((e = "lancer" > -1)) {
        classVal = 1.05;
      } else if (e == "caster" || e == "assassin") {
        classVal = 0.9;
      } else if (e == "berserker" || e == "ruler" || e == "avenger") {
        classVal = 1.1;
      }
      return classVal;
    },
    cardDmg(e) {
      switch (e) {
        case "Buster":
          return 1.5;
        case "Arts":
          return 1.0;
        case "Quick":
          return 0.8;
      }
    },
    reset() {
      this.select_class = "";
      this.select_servant = "";
      this.data.atk = 0;
      this.data.np = 300;
      this.NP_type = "Buster";
      this.data.servantClass = 0;
      this.data.advantage = 1;
      this.data.cardBuffs = 0;
      this.data.cardDebuffs = 0;
      this.data.attackBuffs = 0;
      this.data.defenseDebuffs = 0;
      this.data.NPBuffs = 0;
      this.data.flatAttack = 0;
      this.data.SPBuffs = 0;
      this.data.ESAdvantage = 1;
      this.data.grailed = false;
      this.data.fou = false;
      this.data.goldFou = false;
      this.data.ocButton = false;
      this.data.npButton = false;
      this.data.secondNP = false;
      this.data.npLevel = 0;
      this.data.ocLevel = 0;
      this.data.NPSPBuffs = 0;
      this.low = 0;
      this.avg = 0;
      this.high = 0;
    },
    getServant() {
      axios
        .get("/detailServant/filter", {
          params: {
            class: [this.select_class]
          }
        })
        .then(res => {
          this.servants = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAtk() {
      this.data.atk = this.servants.filter(
        e => e.name === this.select_servant
      )[0].atk;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  },
  watch: {
    select_class: function(newVal, oldVal) {
      if (newVal) {
        this.select_servant = "";
        this.getServant();
      }
    },
    select_servant: function(newVal, oldVal) {
      if (newVal) {
        this.addAtk();
      }
    }
  }
};
</script>

<style scoped>
</style>
