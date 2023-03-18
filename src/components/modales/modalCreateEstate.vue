<template>
    <div>

        <div class="overlay">
        <div class="modal-estate">
                <h1>Test modal</h1>
                <button @click="handleModa">X</button>   
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'ModalCreateEstateVue',
    data() {
        
    },
    methods:{
        handleModa(){
            this.$emit('openModal')
            console.log('testemit');
        }
    }
}
</script>
<style scoped>
.modal-estate{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
}
.overlay {
    /* background: rgba(0, 0, 0, 0.5); */
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 2;
}
</style>