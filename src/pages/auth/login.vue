<template>
  <div>
    <div class="d-flex justify-content-center h-100 my-5">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <form>
            <p v-if="invalid">
              <b>Dados inválidos</b>
            </p>

            <div class="text-danger" v-if="errors.agency != ''">
              {{ errors.agency[0] || "" }}
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                v-model="formData.agency"
                name="agency"
                class="form-control input_user"
                value=""
                placeholder="Ag."
              />
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                v-model="formData.account"
                name="account"
                class="form-control input_user"
                value=""
                placeholder="Conta"
              />
            </div>
            <div class="input-group mb-2">
              <input
                type="password"
                v-model="formData.pass"
                name="pass"
                class="form-control input_pass"
                value=""
                placeholder="Senha"
              />
            </div>
            <div class="d-flex justify-content-center mt-3 login_container">
              <button
                type="button"
                name="button"
                class="btn login_btn"
                :disabled="loading"
                @click.prevent="loginClient"
              >
                <span v-if="loading">Logando</span>
                <span v-else>Entrar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      invalid: false,
      formData: {
        agency: "",
        account: "",
        pass: "",
      },
      errors: {
        agency: "",
        account: "",
        pass: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),

    loginClient() {
      this.loading = true;

      this.login(this.formData)
        .then((response) => {
          if (response) {
            this.invalid = false;
            this.$router.push({ name: "home" });
          } else {
            this.invalid = true;
          }
        })
        .catch((error) => {})
        .finally(() => (this.loading = false));
    },
  },
};
</script>