export default {
  name: 'MyEstate',

  data() {
    return {
      baseUrl: 'http://localhost:3000',
      estates: [],
      data: false,
      userId: this.$cookies.get('userId'),
    };
  },
  created: async function () {
    if (!this?.$cookies?.get('token')) {
      this.$router.push('/signin');
    }
    {
      try {
        const response = await fetch(
          `${this.baseUrl}/manager/${this.userId}/estate`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:8080',
              Authorization: `Bearer ${this.$cookies.get('token')}`,
            },
          },
        );
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
  },
};
