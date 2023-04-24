export default {
  name: 'EstateDetails',
  data() {
    return {
      baseUrl: 'http://localhost:3000',
      oneEstate: [],
      data: false,
      photoUrl: [],
      id: this.$route.params.id,
    };
  },
  created: async function getEstateDetails() {
    if (!this?.$cookies?.get('token')) {
      this.$router.push('/signin');
    }
    try {
      const response = await fetch(`${this.baseUrl}/estate/${this.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          Authorization: `Bearer ${this.$cookies.get('token')}`,
        },
      });
      const result = await response.json();
      this.oneEstate = result;
      this.data = true;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    convertLabelStatus(data) {
      switch (data) {
        case 'sous_compromis':
          return 'Sous compromis';
          break;
        case 'a_vendre':
          return 'A vendre';
          break;
        case 'vendu':
          return 'Vendu';
          break;
        default:
          return 'inconnu';
      }
    },
    convertLabelTypeEstate(data) {
      switch (data) {
        case 'maison':
          return 'Maison';
          break;
        case 'apartment':
          return 'Appartement';
          break;
        case 'parking':
          return 'PArking';
          break;
        default:
          return 'inconnu';
      }
    },
    async addPhoto() {
      try {
        const response = await fetch(`http://localhost:3000/photo`, {
          method: 'GET',
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        let result = await response.json();
        result = result.filter((elem) => elem.name != '.DS_Store');

        this.photoUrl = result;
      } catch (err) {
        console.log(err, 'TEST ICI');
      }
    },
    modifyEstate() {
      this.$router.push(`/estate/modify/${this.id}`);
      console.log('test');
    },
  },
};
