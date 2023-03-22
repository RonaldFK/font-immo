<template>
  <div>
    <div class="overlayr">
      <div class="modal-estate">
        <h1>Modification du client X</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
          mollitia. Doloribus sed, assumenda, aspernatur quasi corporis qui
          exercitationem consectetur illo repellendus molestias nemo quia. Velit
          eius impedit natus veritatis maiores. Sunt aspernatur totam quidem
          officiis necessitatibus in harum vel ipsum. Sunt est optio iusto! Eum
          delectus, ipsa neque veritatis recusandae nam fugit ad enim ex
          doloribus debitis? Aliquid, reiciendis nemo. In officiis iste suscipit
          ducimus nostrum ut aspernatur reiciendis maiores qui distinctio libero
          vero mollitia molestias maxime soluta, velit totam voluptate quidem
          dignissimos corporis cupiditate modi architecto illum voluptas! Quos!
          Iste commodi officia quae, ipsa perferendis ipsum non inventore
          quibusdam aliquam consectetur magni fugiat, alias praesentium
          perspiciatis nulla iure error! Natus laboriosam culpa atque minima
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHandleCustomer',
  data() {
    return {};
  },
};
</script>
<style scoped>
.modal-estate {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 8%;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  align-items: center;
  height: 40rem;
  background: rgba(210, 204, 204, 0.433);
}

.overlay {
  background: rgba(44, 41, 41, 0.433);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 2;
}
</style>
