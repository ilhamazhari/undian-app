<script>
export default {
  props: ['peserta'],
  data() {
    return {
      dataPeserta: JSON.parse(this.peserta)
    }
  },
  methods: {
    save(){
      this.$emit('update', JSON.stringify(this.csvPeserta))
    }
  }
}
</script>

<template>
  <h1>Kelola Peserta</h1>
  <div class="row">
    <div class="col-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Tambah data peserta</h5>
          </div>
          <div class="card-body">
          <vue-csv-import v-model="csvPeserta" :fields="{name: {required: true, label: 'Name'}, phone: {required: true, label: 'Phone'}}">
            <vue-csv-toggle-headers></vue-csv-toggle-headers>
            <vue-csv-errors></vue-csv-errors>
            <vue-csv-input></vue-csv-input>
            <vue-csv-map :auto-match="false"></vue-csv-map>
            <vue-csv-submit @click="save()" @click.prevent="submit"></vue-csv-submit>
          </vue-csv-import>
          </div>
        </div>
    </div>
    <div class="col-8">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">List Peserta</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="pst in dataPeserta">{{ pst.name }} - {{ pst.phone }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>