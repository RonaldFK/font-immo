import ModalCreateEstate from '@/components/modales/createEstate/ModalCreateEstate.vue';
export default {
  name: 'EstateView',
  components: { ModalCreateEstate },
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      estates: [],
      data: false,

      modal: false,
    };
  },
  created: async function () {
    if (!this?.$cookies?.get('token')) {
      this.$router.push('/signin');
    }
    {
      try {
        const response = await fetch(`${this.baseUrl}/estate`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        const result = await response.json();
        this.estates = result;
        this.data = true;
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    async deleteEstate(estateId) {
      try {
        await fetch(`${this.baseUrl}/estate/${estateId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    goTo(path) {
      this.$router.push(path);
    },
    closeModal() {
      this.modal = false;
    },
    openModal() {
      this.modal = true;
    },
  },
};
