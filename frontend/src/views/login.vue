<template>
  <div class="container is-fluid mt-6">
    <div class="columns">
      <h1 class="is-size-1 has-text-weight-bold px-6">FateGOBase</h1>
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
              type="text"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <template v-if="$v.login_password.$error">
            <p class="help is-danger" v-if="!$v.login_password.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.login_password.minLength">login_password to short</p>
            <p class="help is-danger" v-if="!$v.login_password.complexPassword">Password to easy</p>
          </template>
        </div>

        <!-- forgot password -->
        <div>
          <a class="is-size-7 has-text-black">Forgot Password?</a>
        </div>

        <!-- login submit -->
        <div class="mt-5">
          <button class="button is-black is-rounded" type="submit" style="width: 100%">Log In</button>
        </div>
      </div>

      <!-- register -->
      <div class="column p-6">
        <h1 class="is-size-2 mb-5 has-text-weight-bold">REGISTER</h1>

        <!-- username register -->
        <div class="mb-5">
          <label class="is-size-5" for>Username</label>
          <input class="input" type="text" />
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
              type="text"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
          <template v-if="$v.register_password.$error">
            <p class="help is-danger" v-if="!$v.register_password.required">This field is required</p>
            <p class="help is-danger" v-if="!$v.register_password.minLength">Password to short</p>
            <p class="help is-danger" v-if="!$v.register_password.complexPassword">Password to easy</p>
          </template>
        </div>

        <!-- accept -->
        <div class="mt-2">
          <label class="checkbox">
            <input type="checkbox" style="width: 20px" />
            I have read and accept the
            <a href="#">terms of service and privacy policy</a>
          </label>
        </div>

        <!-- register submit -->
        <div class="mt-5">
          <button
            class="button is-black is-rounded"
            type="submit"
            style="width: 100%"
          >Create Account</button>
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
  sameAs
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      login_email: "",
      login_password: "",
      username: "",
      register_email: "",
      register_password: ""
    };
  },
  validations: {
    login_email: {
      email
    },
    login_password: {},
    username: {},
    register_email: {
      email
    },
    register_password: {}
  }
};
</script>