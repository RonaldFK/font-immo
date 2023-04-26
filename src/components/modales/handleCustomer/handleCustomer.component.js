export default {
  name: 'ModalHandleCustomer',
  data() {
    return {
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
      test: 'bobi',
      buildCustomer: {
        firstname: this.customerFirstname || null,
        lastname: this.customerLastname || null,
        tel: this.tel || null,
        cash_or_credit: this.paymentType || null,
        type_of_customer: this.clientType || null,
      },
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters',
      ],
    };
  },
  props: {
    clientNumber: Number,
    customerFirstname: String,
    customerLastname: String,
    tel: Number,
    paymentType: String,
    clientType: String,
  },
  methods: {
    closeModal() {
      if (!this?.$cookies?.get('token')) {
        this.$router.push('/signin');
      }
      this.$emit('closeModalNothingChange');
    },
    // mise à jour avec la valeur input
    // updateUser() {
    //   this.buildCustomer = {
    //     firstname: this.$refs.firstname?.value || null,
    //     lastname: this.$refs.lastname?.value || null,
    //     tel: this.$refs.tel?.value || null,
    //     cash_or_credit: this.$refs.paymentType?.value || null,
    //     type_of_customer: this.$refs.clientType?.value || null,
    //   };
    // },
    async modifyCustomer() {
      if (!this?.$cookies?.get('token')) {
        this.$router.push('/signin');
      }

      try {
        await fetch(`${this.baseUrl}/customer/${parseInt(this.clientNumber)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          body: JSON.stringify(this.buildCustomer),
        });

        this.$emit('emitCloseModal');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
