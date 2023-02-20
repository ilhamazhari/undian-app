<script>
import Peserta from './components/Peserta.vue'
import Kelola from './components/Kelola.vue'
import Undian from './components/Undian.vue'

export default {
  components: {
    Peserta,
    Kelola,
    Undian
  },
  data() {
    return {
      template: '',
      peserta: '[{ "name": "No ", "phone": "Data" }]',
      undian: [],
      renderComponent: true
    }
  },
  watch: {
    peserta(newVal, oldVal){
      if(newVal !== oldVal){
        this.$forceUpdate()
        console.log(newVal)
      }
    },
    undian(newVal, oldVal){
      if(newVal !== oldVal){
        this.$forceUpdate()
        console.log(newVal)
      }
    }
  },
  methods: {
    updatePeserta(val) {
      this.peserta = val
      this.forceRerender()
    },
    updateUndian(val){
      this.undian.push(val)
    },
    updatePemenang(val) {
      console.log(this.peserta)
    },
    async forceRerender(){
      this.renderComponent = false
      await this.$nextTick()
      this.renderComponent = true
    },
    findId(arr, attr, val) {
      for(var i; i < arr.length; i++) {
        if(arr[i][attr] === val){
          return i;
        }
      }
    }
  }
}
</script>

<template>
  <div class="top-right">
    <a href="#" class="btn btn-danger" id="close"><i class="fa fa-times"></i></a>
  </div>
  <div class="container">
    <Transition>
      <div v-if="template === ''" style="padding-top: 100px; padding-bottom: 100px;">
        <a href="#" @click="template = 'undian'" class="btn btn-primary btn-lg">Mulai Undian</a>
      </div>
    </Transition>
    <Transition>
      <div v-if="template === 'peserta'" key="1" style="padding-top: 100px; padding-bottom: 100px;">
        <Peserta :peserta="peserta" @update="updatePeserta" v-if="renderComponent"></Peserta>
      </div>
    </Transition>
    <Transition>
      <div v-if="template === 'kelola'" key="2" style="padding-top: 100px; padding-bottom: 100px;">
        <Kelola :undian="undian" @update="updateUndian" v-if="renderComponent"></Kelola>
      </div>
    </Transition>
    <Transition>
      <div v-if="template === 'undian'" key="3" style="padding-top: 100px; padding-bottom: 100px;">
        <Undian :undian="undian" :peserta="peserta" @update="updatePemenang" v-if="renderComponent"></Undian>
      </div>
    </Transition>
  </div>
  <div class="menu row justify-content-center">
    <div class="col-1"><a href="#" @click="template = ''" class="btn btn-secondary"><i class="fa fa-home"></i></a></div>
    <div class="col-1"><a href="#" @click="template = 'kelola'" class="btn btn-secondary"><i class="fa fa-cog"></i></a></div>
    <div class="col-1"><a href="#" @click="template = 'peserta'" class="btn btn-secondary"><i class="fa fa-user-friends"></i></a></div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.top-right {
  position: absolute;
  top: 10px;
  right: 10px;;
}
.menu {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding-bottom: 15px;
}
.container {
  margin-top: 17vh;
}
.invisible {
  visibility: hidden;
}
.v-enter-active {
  transition: opacity .4s ease;
  transition-delay: .5s;
}
.v-leave-active {
  transition: opacity .2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
