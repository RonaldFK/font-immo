export default {
  name: 'ModalCreateCustomer',
  data() {
    return {
      accept: false,
      baseUrl: 'http://localhost:3000',
      typeOfClients: [
        { id: 0, value: null, label: null },
        { id: 1, value: 'seller', label: 'Vendeur' },
        { id: 2, value: 'renter', label: 'Locataire' },
        { id: 3, value: 'buyer', label: 'Acheteur' },
        { id: 4, value: 'lessor', label: 'Bailleur' },
      ],
      typeOfPayments: [
        { id: 0, value: null, label: null },
        { id: 1, value: 'cash', label: 'Paiement comptant' },
        { id: 2, value: 'credit', label: 'Paiement crédit' },
      ],
      buildCustomer: {
        firstname: '',
        lastname: '',
        tel: '',
        cash_or_credit: '',
        type_of_customer: '',
      },
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },

  methods: {
    closeModal() {
      if (!this?.$cookies?.get('token')) {
        this.$router.push('/signin');
      }
      this.$router.push('/customer');
    },
    async createCustomer() {
      if (!this?.$cookies?.get('token')) {
        this.$router.push('/signin');
      }
      const newCustomer = {
        firstname: this.buildCustomer?.firstname || null,
        lastname: this.buildCustomer.lastname || null,
        tel: this.buildCustomer.tel || null,
        cash_or_credit: this.buildCustomer.cash_or_credit || null,
        type_of_customer: this.buildCustomer.type_of_customer || null,
      };

      try {
        const response = await fetch(`${this.baseUrl}/customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          body: JSON.stringify(newCustomer),
        });
        if (response.status === 200) {
          this.accept = true;
          this.buildCustomer = {};
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
