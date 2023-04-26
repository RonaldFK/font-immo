/* eslint-disable indent */
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
    /**
     * En focntion de la valeur en base de données, je retourne une valeur plus parlante pour l'utilisateur
     * @param {*} data La valeur à convertir
     * @returns
     */
    convertLabelStatus(data) {
      switch (data) {
        case 'sous_compromis':
          return 'Sous compromis';

        case 'a_vendre':
          return 'A vendre';

        case 'vendu':
          return 'Vendu';

        default:
          return 'inconnu';
      }
    },
    /**
     * En focntion de la valeur en base de données, je retourne une valeur plus parlante pour l'utilisateur
     * @param {*} data La valeur à convertir
     * @returns
     */
    convertLabelTypeEstate(data) {
      switch (data) {
        case 'maison':
          return 'Maison';

        case 'apartment':
          return 'Appartement';

        case 'parking':
          return 'PArking';

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
