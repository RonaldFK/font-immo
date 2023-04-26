export default {
  name: 'ModalCreateEstate',
  data() {
    return {
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
      estateToCreate: {
        name: '',
        price: '',
        statut: '',
        type: '',
        manager_id: '',
        location_id: '',
        customer_id: '',
        bio: '',
      },
      locationToCreate: {
        num: '',
        street: '',
        city: '',
        country: '',
        code: '',
      },
    };
  },
  watch: {
    customerToSearch: function (value) {
      // Quand l'utilisateur rentre 3 caractère, je déclenche
      this.searchCustomer(value);
    },
    firstFilterToSearchCustomer: function (value) {
      // remise à zéro de l'id prénom qui s'affichait à la regénération du filtre.
      this.estateToCreate.customer_id = '';
      this.searchCustomer(value);
    },
  },
  created: async function getAllManagers() {
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
  methods: {
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
      this.$router.push('/estate');
    },
    /**
     * Création d'un bien ainsi d'une nouvelle localisation
     */
    async createEstate() {
      await this.createLocation();
      if (!this.createLocation()) {
        throw new Error('Formulaire incomplet');
      }

      const form = new FormData();
      const urlEstate = 'http://localhost:3000/estate';
      for (let i = 0; i < this.$refs.photos.files.length; i++) {
        form.append('photo', this.$refs.photos.files[i]);
      }

      form.append('estate', JSON.stringify(this.estateToCreate));
      try {
        const response = await fetch(urlEstate, {
          method: 'POST',
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
