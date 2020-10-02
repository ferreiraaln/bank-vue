<template>
  <div>
    <header>
      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
        <div class="container">
          <a class="navbar-brand" href="#">
            <h3>Bank</h3>
          </a>
          <span class="navbar-brand" v-if="name">Hello, {{ name }}</span>
        </div>
      </nav>
    </header>

    <!-- Page Content -->
    <div class="container container-body">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="my-4 title-tenant">Internet Banking</h1>

          <div class="row my-4">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="banck-card">
                <div class="banck-card-body">
                  <h6 v-if="money">Saldo</h6>
                  R$ {{ formatPrice(money) }}
                </div>
              </div>
            </div>
          </div>
          <!-- /.row -->
        </div>
        <!-- /.col-lg-9 -->
      </div>
      <!-- /.row -->

      <div
        v-if="message !== ''"
        class="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        {{ message }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <h1 class="my-4 title-tenant">Sacar</h1>

          <div class="row my-12">
            <div class="col-lg-12 col-md-12 mb-12">
              <form class="form-inline">
                <div class="form-group mb-2">
                  <p>Digite o valor de saque</p>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                  <input
                    type="number"
                    class="form-control"
                    name="valueOrder"
                    v-model="valueOrder"
                    placeholder="Valor"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-danger mb-2"
                  @click.prevent="order"
                >
                  Efetuar Saque
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->

      <div class="row">
        <div class="col-lg-12">
          <h1 class="my-4 title-tenant">Depositar</h1>

          <div class="row my-12">
            <div class="col-lg-12 col-md-12 mb-12">
              <form class="form-inline">
                <div class="form-group mb-2">
                  <p>Digite o valor de deposito</p>
                </div>
                <div class="form-group mx-sm-3 mb-2">
                  <input
                    type="number"
                    class="form-control"
                    name="valueDeposit"
                    v-model="valueDeposit"
                    placeholder="Valor"
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-danger mb-2"
                  @click.prevent="deposit"
                >
                  Efetuar Depósito
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->

    <!-- Footer -->
    <footer class="py-3 bg-vuefood">
      <div class="container">
        <p class="m-0 text-center text-white">Copyright &copy; 2020</p>
      </div>
      <!-- /.container -->
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      name: (state) => state.login.me.name,
      money: (state) => state.login.me.money,
      account: (state) => state.login.me.accountNumber,
      message: (state) => state.login.message,
    }),
  },

  data() {
    return {
      valueOrder: 0,
      valueDeposit: 0,
    };
  },

  methods: {
    ...mapActions(["logout"]),

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    order() {
      let params = {
        account: this.account,
        value: this.valueOrder,
        fator: -1,
      };

      this.$store.dispatch("order", params);
    },

    deposit() {
      let params = {
        account: this.account,
        value: this.valueDeposit,
        fator: 1,
      };

      this.$store.dispatch("order", params);
    },
  },
};
</script>