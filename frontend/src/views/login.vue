<template>
  <div class="container is-fluid mt-6">
    <div class="columns">
      <router-link to="/" class="is-size-1 has-text-weight-bold px-6">FateGOBase</router-link>
    </div>
    <div class="columns px-6 mx-6">
      <!-- login -->
      <div class="column p-6" style="border-right: 1px solid black">
        <h1 class="is-size-2 mb-5 has-text-weight-bold">LOG IN</h1>

        <!-- email login -->
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.login_email.$model"
              :class="{'is-danger': $v.login_email.$error}"
              class="input"
              type="text"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>

          <template v-if="$v.login_email.$error">
            <p class="help is-danger" v-if="!$v.login_email.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.login_email.email">Invalid Email</p>
          </template>
        </div>

        <!-- password login -->
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.login_password.$model"
              :class="{'is-danger': $v.login_password.$error}"
              class="input"
              type="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <template v-if="$v.login_password.$error">
            <p class="help is-danger" v-if="!$v.login_password.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.login_password.minLength">Password too short</p>
            <p class="help is-danger" v-if="!$v.login_password.alphaNum">Password too easy</p>
          </template>
        </div>

        <!-- forgot password -->
        <div>
          <a class="is-size-7 has-text-black">Forgot Password?</a>
        </div>

        <!-- login submit -->
        <div class="mt-5">
          <button
            class="button is-black is-rounded"
            @click="login"
            type="submit"
            style="width: 100%"
          >Log In</button>
        </div>
      </div>

      <!-- register -->
      <div class="column p-6">
        <h1 class="is-size-2 mb-5 has-text-weight-bold">REGISTER</h1>

        <!-- username register -->
        <div class="mb-5">
          <label class="label">Username</label>
          <div class="control">
            <input
              v-model="$v.username.$model"
              :class="{'is-danger': $v.username.$error}"
              class="input"
              type="text"
            />
          </div>
          <template v-if="$v.username.$error">
            <p class="help is-danger" v-if="!$v.username.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.username.alphaNum">This field is alpha and number</p>
            <p class="help is-danger" v-if="!$v.username.maxLength">This field is too long</p>
          </template>
        </div>

        <!-- email register -->
        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.register_email.$model"
              :class="{'is-danger': $v.register_email.$error}"
              class="input"
              type="text"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>

          <template v-if="$v.register_email.$error">
            <p class="help is-danger" v-if="!$v.register_email.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.register_email.email">Invalid Email</p>
          </template>
        </div>

        <!-- password register -->
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.register_password.$model"
              :class="{'is-danger': $v.register_password.$error}"
              class="input"
              type="password"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <template v-if="$v.register_password.$error">
            <p class="help is-danger" v-if="!$v.register_password.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.register_password.minLength">Password too short</p>
          </template>
        </div>

        <!-- accept -->
        <div class="mt-2">
          <label class="checkbox">
            <input type="checkbox" v-model="$v.accept.$model" style="width: 20px" />
            I have read and accept the
            <a href="#">terms of service and privacy policy</a>
          </label>
          <template v-if="$v.accept.$error">
            {{!$v.accept.isAccept}}
            <p
              class="help is-danger"
              v-if="!$v.accept.required || !$v.accept.isAccept"
            >Please Accept</p>
          </template>
        </div>

        <!-- register submit -->
        <div class="mt-5">
          <button
            class="button is-black is-rounded"
            type="submit"
            style="width: 100%"
            @click="register"
          >Create Account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/plugins/axios";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  alphaNum,
  helpers
} from "vuelidate/lib/validators";

function isAccept(value) {
  return value;
}

export default {
  data() {
    return {
      login_email: "",
      login_password: "",
      username: "",
      register_email: "",
      register_password: "",
      accept: "",
      error_login: ""
    };
  },
  validations: {
    login_email: {
      email,
      required
    },
    login_password: {
      minLength: minLength(8),
      required,
      alphaNum
    },
    username: {
      alphaNum: alphaNum,
      maxLength: maxLength(12),
      required
    },
    register_email: {
      email,
      required
    },
    register_password: {
      minLength: minLength(8),
      required
    },
    accept: {
      required,
      isAccept: isAccept
    }
  },
  methods: {
    login() {
      this.$v.login_email.$touch();
      this.$v.login_password.$touch();
      if (!this.$v.login_email.$invalid && !this.$v.login_password.$invalid) {
        let data = {
          email: this.login_email,
          password: this.login_password
        };
        axios
          .post("/user/login", data)
          .then(res => {
            alert(res.data.message);
            const token = res.data.token;
            localStorage.setItem("token", token);
            this.$emit("auth-change");
            this.$router.push({ path: "/" });
          })
          .catch(err => {
            console.log(err);
            alert(err.response.data.reason);
          });
      }
    },
    register() {
      this.$v.username.$touch();
      this.$v.register_email.$touch();
      this.$v.register_password.$touch();
      this.$v.accept.$touch();
      if (
        !this.$v.username.$invalid &&
        !this.$v.register_email.$invalid &&
        !this.$v.register_password.$invalid &&
        !this.$v.accept.$invalid
      ) {
        let data = {
          username: this.username,
          password: this.register_password,
          email: this.register_email
        };
        axios
          .post("/user/signup", data)
          .then(res => {
            alert(res.data);
            location.reload();
          })
          .catch(err => {
            alert(err.response.data.details.message);
          });
      }
    }
  }
};
</script>

<style>
a :hover {
  color: none;
}
</style>