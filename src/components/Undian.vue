<script>
import anime from 'animejs'
export default {
  props: ['peserta', 'undian'],
  data(){
    return {
      dataPeserta: JSON.parse(this.peserta),
      dataUndian: this.undian,
      count: 0
    }
  },
  methods: {
    randomList() {
      const pesertaMenang = this.dataPeserta.filter(i => i.menang)
      const max = this.dataPeserta.length
      return this.dataPeserta.slice(0,max).sort(function(){ return 0.5 - Math.random() })
    },
    mulaiUndian(index) {
      return this.dataUndian.slice(index,1)
    },
    getPeserta(num){
      const peserta = this.randomList()
      return peserta.slice(0, num)
    },
    randomChar() {
      const possible = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" +
        "0123456789" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz"
        return possible.charAt(Math.floor(Math.random() * possible.length))
    },
    mask(chars, progress){
      const masked = []

      for (let i = 0; i < chars.length; i++) {
        const position = (i+1) / chars.length
        if(position > progress) {
          masked.push(this.randomChar())
        } else {
          masked.push(chars[i])
        }
      }

      return masked.join('');
    },
    shuffle(id) {
      const pemenang = this.randomList()[0]
      const el = document.getElementById(id)
      const menangUndian = document.getElementById('undian').textContent
      el.innerHTML = pemenang.name
      this.savePemenang({name: pemenang.name, phone: pemenang.phone, menang: true, undian: menangUndian })
      let chars = el.textContent + '            '
      const splitChars = chars.split('')
      const params = { progress: 0 }

      const a = anime({
        targets: params,
        progress: 1,
        delay: 1000,
        duration: 1000,
        easing: 'easeInQuad',
        update: () => {
          el.textContent = this.mask(splitChars, params.progress)
        },
        complete: () => {
          el.classList.add('completed')
        }
      })

      el.onClick = () => {
        el.classList.remove('completed')
        a.restart()
      }
    },
    savePemenang(val) {
      this.$emit('update', val)
    }
  },
  mounted(){
    this.shuffle('pemenang')
  }
}
</script>

<template>
  <template v-for="und in mulaiUndian(count)">
    <div class="row">
      <div class="col-6"><h2>Pemenang <span id="undian">{{ und.title }}</span></h2></div>
      <div class="col-6"><h2 class="shuffle" id="pemenang" @click="shuffle('pemenang')"> {{ randomList()[0].name }}</h2></div>
    </div>
  
    <div class="row">
      <div class="col-4">
        <div class="card">
          <img :src="und.image" class="card-img-top">
          <div class="card-body">
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row">
          <template v-for="pst in getPeserta(und.num)">
            <div class="col-6 list-pemenang">
              <h5>{{ pst.name }} - +62{{ pst.phone }}</h5>
            </div>
          </template>
        </div>
      </div>
    </div>
    
  </template>

  <button class="btn btn-primary" @click="count++" v-if="this.dataUndian.length > 1">Selanjutnya <i class="fa fa-chevron-right"></i></button>
  
</template>

<style>
.shuffle {
  cursor: pointer;  
}

.shuffle.is-main {
  font-size: 200%;
}

.shuffle.completed {
  animation: blink 1s linear 0s 1 alternate;
}

@keyframes blink {
  0% {
    color: #fff;
    text-shadow: 0 0 1rem #fff;
  }
}

.list-pemenang {
  text-transform: capitalize;
}
</style>