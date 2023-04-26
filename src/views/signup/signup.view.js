export default {
  name: 'Signup',
  props: {
    msg: String,
  },
  data() {
    return {
      accept: false,
      acceptLogin: false,
      alert: false,
      baseUrl: 'http://localhost:3000',
      userToCreate: {
        firstname: '',
        lastname: '',
        email: '',
        login: '',
        password: '',
        checkPassword: '',
      },
    };
  },
  methods: {
    async sendRequestAccess(e) {
      for (const elem in this.userToCreate) {
        console.log(this.userToCreate[elem]);
        if (this.userToCreate[elem] === '') {
          this.alert = true;
          throw new Error('test err');
        }
      }
      e.preventDefault();
      try {
        const response = await fetch(`${this.baseUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(this.userToCreate),
        });
        console.log(response);
        if (response.status === 200) {
          this.accept = true;
        }

        // this.userToCreate = {};
      } catch (err) {
        console.log(err);
      }
    },
  },
};
