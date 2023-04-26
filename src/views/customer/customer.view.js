/* eslint-disable indent */
import ModalHandleCustomer from '@/components/modales/handleCustomer/ModalHandleCustomer.vue';
import ModalCreateCustomer from '@/components/modales/createCustomer/ModalCreateCustomer.vue';

export default {
  name: 'CustomerView',
  components: { ModalHandleCustomer, ModalCreateCustomer },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      customers: [],
      modal: false,
      modalCreateCustomer: false,
      reveal: false,
      currentCustomer: {
        identidyFirstname: String,
        identidyLastname: String,
        tel: parseInt(''),
        paymentType: String,
        clientType: String,
        clientNumber: '',
      },
    };
  },
  created: async function getAllCustomer() {
    {
      if (!this?.$cookies?.get('token')) {
        this.$router.push('/signin');
      }
      try {
        const response = await fetch(`${this.baseUrl}/customer`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        const result = await response.json();
        this.customers = result;
      } catch (err) {
        console.log(err);
      }
    }
  },

  methods: {
    /**
     * En focntion de la valeur en base de données, je retourne une valeur plus parlante pour l'utilisateur
     * @param {*} data La valeur à convertir
     * @returns
     */
    convertLabelPayment(data) {
      switch (data) {
        case 'cash':
          return 'Paiement comptant';

        case 'credit':
          return 'Paiement crédit';
        default:
          return 'inconnu';
      }
    },
    /**
     * En focntion de la valeur en base de données, je retourne une valeur plus parlante pour l'utilisateur
     * @param {*} data La valeur à convertir
     * @returns
     */
    convertLabelCustomer(data) {
      switch (data) {
        case 'seller':
          return 'Vendeur';

        case 'renter':
          return 'Locataire';

        case 'buyer':
          return 'Acheteur';

        case 'lessor':
          return 'Bailleur';

        default:
          return 'inconnu';
      }
    },
    openModal(customer) {
      this.currentCustomer = {
        identidyFirstname: customer.firstname,
        identidyLastname: customer.lastname,
        tel: parseInt(customer.tel),
        paymentType: customer.cash_or_credit,
        clientType: customer.type_of_customer,
        clientNumber: parseInt(customer.id),
      };

      this.modal = true;
    },
    openModalCreateCustomer() {
      console.log(this.modalCreateCustomer);
      this.modalCreateCustomer = true;
      console.log(this.modalCreateCustomer);
    },
    closeModal() {
      this.modal = false;
      this.$router.go();
    },
    closeModalNothingChange() {
      this.modalCreateCustomer = false;
      this.modal = false;
    },
    closeModalCreateCustomer() {
      this.modalCreateCustomer = false;
      this.$router.go();
    },
    async deleteCustomer(customer) {
      try {
        const response = await fetch(
          `${this.baseUrl}/customer/${customer.id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          },
        );
        const result = await response.json();
        console.log(result);
        // this.$emit('emitCloseModal');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
