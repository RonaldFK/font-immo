export default {
  name: 'Signin',
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
      userToLog: { login: '', password: '' },
    };
  },
  methods: {
    async sendRequestLogin(e) {
      e.preventDefault();

      try {
        const response = await fetch(`${this.baseUrl}/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
          body: JSON.stringify(this.userToLog),
        });
        this.userToLog = {};
        const result = await response.json();

        if (response.status === 200) {
          this.$cookies.set('token', result?.tokenUser?.token);
          this.$cookies.set('userId', result?.userId);
          this.$router.push('/estate');
        } else {
          this.alert = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    disconnect() {
      this.$cookies.remove('token');
      this.$cookies.remove('userId');
      this.$router.go();
    },
  },
};
