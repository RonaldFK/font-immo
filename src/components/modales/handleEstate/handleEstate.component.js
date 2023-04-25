/* eslint-disable indent */
export default {
  name: 'ModalHandleEstate',
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      baseUrl: 'http://localhost:3000',
      selectedOption: null,
      typeEstates: [
        { value: null, label: null },
        { value: 'apartment', label: 'Apartement' },
        { value: 'maison', label: 'Maison' },
        { value: 'parking', label: 'Parking' },
      ],
      status: [
        { value: null, label: null },
        { value: 'vendu', label: 'Vendu' },
        { value: 'sous_compromis', label: 'Sous compromis' },
        { value: 'a_vendre', label: 'A vendre' },
      ],
      alert: false,
      accept: false,
      locations: [],
      managers: [],
      customerToSearch: '',
      firstFilterToSearchCustomer: '',
      customers: [],
      estateToCreate: {},
      currentEstate: '',
      currentLocation: '',
      currentManager: '',
      currentCustomer: '',
      locationToCreate: {
        num: null,
        street: null,
        city: null,
        country: null,
        code: null,
      },
      id: this.$route.params.id,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    customerToSearch: function (value) {
      this.searchCustomer(value);
    },
    firstFilterToSearchCustomer: function (value) {
      // remise à zéro de l'id prénom qui s'affichait à la regénération du filtre.
      //   this.estateToCreate.customer_id = '';
      this.searchCustomer(value);
    },
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
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
      this.currentEstate = result[0];
      this.currentLocation = result[0].location;
      this.currentManager = result[0].manager;
      this.currentCustomer = result[0].customer;
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    // chargement de la liste des managers
    this.getAllManager();
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
    async getAllManager() {
      if (!this?.$cookies?.get('token')) {
        this.$router.push('/signin');
      }
      try {
        const managers = await fetch(`${this.baseUrl}/manager`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
        });
        this.managers = await managers.json();
      } catch (err) {
        console.log(err);
      }
    },
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
    convertLabelTypeEstate(data) {
      switch (data) {
        case 'maison':
          return 'Maison';

        case 'apartment':
          return 'Appartement';

        case 'parking':
          return 'Parking';

        default:
          return 'inconnu';
      }
    },
    async searchCustomer(value) {
      // Déclenchement de la recherche uniquement à partir de 3 caractères
      if (value.length > 2) {
        try {
          const customer = await fetch(
            `${this.baseUrl}/customer/search/${value}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                Authorization: `Bearer ${this.$cookies.get('token')}`,
              },
            },
          );
          const result = await customer.json();
          result.length > 0 && (this.customers = result);
        } catch (err) {
          console.log(err);
        }
      }
    },
    closeModal() {
      this.$router.push(`/estate/${this.id}`);
    },
    /**
     * Création d'un bien ainsi d'une nouvelle localisation
     */
    async updateEstate() {
      await this.createLocation();
      if (!this.createLocation()) {
        throw new Error('Formulaire incomplet');
      }

      const form = new FormData();
      const urlEstate = `http://localhost:3000/estate/${this.id}`;
      for (let i = 0; i < this.$refs.photos.files.length; i++) {
        form.append('photo', this.$refs.photos.files[i]);
      }

      form.append('estate', JSON.stringify(this.estateToCreate));
      try {
        const response = await fetch(urlEstate, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          body: form,
        });

        response.status === 200 && (this.accept = true);
      } catch (err) {
        console.log(err);
      }
      this.$router.push(`/estate/${this.id}`);
    },
    async createLocation() {
      console.log('ici');
      const urlLocation = 'http://localhost:3000/location';
      try {
        const location = await fetch(urlLocation, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080',
            Authorization: `Bearer ${this.$cookies.get('token')}`,
          },
          body: JSON.stringify(this.locationToCreate),
        });
        const result = await location.json();

        // gestion d'erreur : si la localisation est bien créé, je passe son id, sinon null
        result[0]?.id
          ? (this.estateToCreate.location_id = result[0]?.id)
          : (this.estateToCreate.location_id = null);
      } catch (err) {
        console.log(err);
      }
      // Vérification formulaire complet
      for (const elem in this.estateToCreate) {
        if (this.estateToCreate[elem] === '') {
          this.alert = true;
          return false;
        }
        if (this.locationToCreate[elem] === '') {
          this.alert = true;
          return false;
        }
      }
    },
  },
};
