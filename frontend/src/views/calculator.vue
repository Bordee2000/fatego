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
                <select name id required style="min-width: 100%">
                  <option value selected disabled>Choose...</option>
                  <option v-for="a_class in all_class" :key="a_class" :value="a_class">{{a_class}}</option>
                </select>
              </div>
            </div>
            <div class="column">
              <h4 for>Servant</h4>
              <div class="select" style="min-width: 100%">
                <select name id required style="min-width: 100%">
                  <option value selected disabled>Select servant</option>
                  <option v-for="servant in servants" :key="servant" :value="servant">{{servant}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="columns mb-0">
            <div class="column">
              <h4 for>Total ATK</h4>
              <input class="input" type="number" value="0" />
            </div>
            <div class="column">
              <h4 for>NP Damage Multiplier</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
          </div>

          <div class="columns my-0">
            <div class="column">
              <label class="mr-5">
                <input type="checkbox" />
                Max Grails
              </label>
              <label class="mr-5">
                <input type="checkbox" />
                Fou
              </label>
              <label class="mr-5">
                <input type="checkbox" />
                Golden Fou
              </label>
              <label class="mr-5">
                <input type="checkbox" />
                Overcharge
              </label>
            </div>
          </div>

          <div class="columns">
            <div class="column py-0">
              <label class="mr-5">
                <input type="checkbox" />
                NP Upgrade
              </label>
              <label class="mr-5">
                <input type="checkbox" />
                2nd NP Upgrade
              </label>
            </div>
          </div>

          <div class="columns"></div>

          <div class="columns">
            <div class="column">
              <h4 class="has-text-weight-bold">NP Type</h4>
              <div class="buttons has-addons">
                <button class="button" @click="NP_type='Buster'" :class="NP_type=='Buster'?'is-danger':'is-dark'" >Buster</button>
                <button class="button" @click="NP_type='Arts'" :class="NP_type=='Arts'?'is-info':'is-dark'">Arts</button>
                <button class="button" @click="NP_type='Quick'" :class="NP_type=='Quick'?'is-success':'is-dark'">Quick</button>
              </div>
            </div>
            <div class="column">
              <div class="columns">
                <div class="column">
                  <h4 for>NP Level</h4>
                  <input class="input" type="number" placeholder="NP 1" disabled />
                </div>
                <div class="column">
                  <h4 for>OC</h4>
                  <input class="input" type="number" placeholder="1" disabled />
                </div>
              </div>
            </div>
          </div>

          <!-- Card Buffs -->
          <div class="columns">
            <div class="column">
              <h4>Card Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>Card Debuffs</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" value="0" />
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
                <input class="input" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>Defense Debuffs on Enemy</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" value="0" />
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
                <input class="input" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>Flat Damage Attack Buffs</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" value="0" />
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
                <input class="input" type="number" value="0" />
                <span class="icon is-small is-right">
                  <i class="fas fa-percent"></i>
                </span>
              </div>
            </div>
            <div class="column">
              <h4>NP Extra Damage</h4>
              <div class="control has-icons-right">
                <input class="input" type="number" value="0" />
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
                <select id="mes_ad" style="min-width: 100%">
                  <option selected value="Neutral">Neutral</option>
                  <option selected value="1.1">Yes (1.1x)</option>
                  <option selected value="0.9">No (0.9x)</option>
                </select>
              </div>
            </div>
            <div class="column">
              <h4>Advantage</h4>
              <div class="select" style="min-width: 100%">
                <select id="ad" style="min-width: 100%">
                  <option selected value="Neutral">Neutral</option>
                  <option selected value="2">Yes (2x)</option>
                  <option selected value="0.5">No (0.5x)</option>
                  <option selected value="1.5">Berserker, AlterEgo (1.5x)</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <div class="columns ml-4">
            <div class="field is-grouped">
              <p class="control">
                <a class="button is-info is-size-5">Calculate</a>
              </p>
              <p class="control">
                <a class="button is-dark is-size-5">Reset</a>
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
                    <input class="input" type="number" value="0" readonly />
                  </th>
                </tr>
                <tr>
                  <th>
                    <h4>Average</h4>
                    <input class="input" type="number" value="0" readonly />
                  </th>
                </tr>
                <tr>
                  <th>
                    <h4>High</h4>
                    <input class="input" type="number" value="0" readonly />
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
              <li><a href="#" data-toggle="modal" data-target="#changeLog">Click to view changelog.</a></li>
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
export default {
  data() {
    return {
      data: [],
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
    };
  }
};
</script>

<style scoped>
</style>
