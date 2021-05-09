<template>
  <div class="hello">
    <div class="filter">
      <input type="text" v-model="filter" placeholder="Ketik Kabupaten">
    </div>
    <div class="box-list" v-if="statusBox">
      <ul>
        <li v-for="(item,index) in dataResult" :key="index" @click="PilihData(item)">{{ item.nama }}</li>
        <li v-if="kosong">Tidak di temukan</li>
      </ul>
    </div>
  </div>
</template>

<script>
import DataKotaService from '@/services/DataKotaService'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
       statusBox:      false,
       filter:         "",
       dataItems:      [],
       dataResult:     [],
       kosong:         false
    }
  },
  methods: {
    getData() {
       this.dataItems       =     [];
       DataKotaService.DataKota()
                      .then((result) => {
                         for (let i = 0; i < result.data.kota_kabupaten.length; i++) {
                            this.dataItems.push({
                              id:             result.data.kota_kabupaten[i].id,
                              id_provinsi:    result.data.kota_kabupaten[i].id_provinsi,
                              nama:           result.data.kota_kabupaten[i].nama
                            });
                         }
                         this.dataResult      =     result.data.kota_kabupaten;
                      });
    },
    PilihData(value) {
      this.filter       =       value.nama;
      this.statusBox    =       false;
      this.dataResult   =       [];
    }
  },
  watch: {
    filter(value) {
      if (value.length > 1) {
         this.statusBox      =    true;
         let filter          =    this.dataItems.filter((item) => {
            return this.filter.toLowerCase().split(' ').every(v => item.nama.toLowerCase().includes(v));
         });
         if (filter.length <= 1) {
            this.kosong      =    true;
         }
         if (filter.length >= 1) {
            this.kosong      =    false;
         }
         this.dataResult     =    filter
      }
      if (value.length <= 1) {
        this.statusBox       =    false;
      }
      // window.console.log(value.length);
    }
  },
  mounted: function() {
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.box-list {
    border: 1px solid;
    width: 212px;
    margin: auto;
    top: 21px;
    position: relative;
}
.box-list ul {
  text-align: left;
}
.box-list ul li {
    display: inline-block;
    margin: 0 10px;
    padding-top: 4px;
    cursor: pointer;
}
.box-list ul li:hover {
  background-color: red;
  color: white;
}
</style>
