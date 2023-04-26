export default {
  name: 'NavBarEstate',
  data() {
    return {};
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
    created() {
      console.log(this.$router.path);
    },
  },
};
