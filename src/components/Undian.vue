<script>
import anime from 'animejs'
export default {
  props: ['peserta', 'undian', 'num', 'pemenang'],
  data(){
    return {
      dataPeserta: JSON.parse(this.peserta),
      dataUndian: this.undian,
      dataPemenang: this.pemenang,
      jumlahPemenang: 0,
      count: this.num
    }
  },
  methods: {
    randomList() {
      const max = this.dataPeserta.length
      return this.dataPeserta.slice(0,max).sort(function(){ return 0.5 - Math.random() })
    },
    mulaiUndian(index) {
      return this.dataUndian.slice(index,index+1)
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
    shufflePemenang(id) {
      this.jumlahPemenang++

      const pemenang = this.randomList()[0]
      const el = document.getElementById(id)

      const listPemenang = document.getElementById('listPemenang')
      const menangUndian = document.getElementById('undian').textContent

      if(this.jumlahPemenang >= this.dataUndian[this.count].num) {
        el.style.pointerEvents = 'none'
      }
      el.innerHTML = pemenang.name
      this.savePemenang({name: pemenang.name, phone: pemenang.phone, menang: true, undian: menangUndian })

      let chars = el.textContent + '            '
      const splitChars = chars.split('')
      const params = { progress: 0 }

      const a = anime({
        targets: params,
        progress: 1,
        delay: 500,
        duration: 500,
        easing: 'easeInQuad',
        update: () => {
          el.textContent = this.mask(splitChars, params.progress)
        },
        complete: () => {
          el.classList.add('completed')
        }
      })
      listPemenang.innerHTML += '<div class="col-3 list-pemenang"><h5 class="shuffle" id="pemenang-' + this.jumlahPemenang + '"> ' + pemenang.name + ' - ' + pemenang.phone + ' </h5></div>'
      this.shuffleList('pemenang-' + this.jumlahPemenang)

      el.onClick = () => {
        el.classList.remove('completed')
        a.restart()
      }
    },
    shuffleList(id){
      const el = document.getElementById(id)
      let chars = el.textContent
      const splitChars = chars.split('')
      const params = { progress: 0 }

      const a = anime({
        targets: params,
        progress: 1,
        delay: 500,
        duration: 500,
        easing: 'easeInQuad',
        update: () => {
          el.textContent = this.mask(splitChars, params.progress)
        }
      })
    },
    cariPemenang() {
      var countPemenang = 0
      var interval = setInterval(() => {
        this.shufflePemenang('pemenang')
        countPemenang++
        console.log(countPemenang)
        if(countPemenang >= this.undian[this.count].num){
          clearInterval(interval)
          countPemenang = 0
        }
      }, 4000)
    },
    savePemenang(val) {
      let updatePeserta = []
      for(let i = 0; i < this.dataPeserta.length; i++) {
        if(this.dataPeserta[i].name !== val.name) {
          updatePeserta.push(this.dataPeserta[i])
        }
      }
      this.dataPeserta = updatePeserta
      this.$emit('update', val)
    },
    selanjutnya(val) {
      document.getElementById('pemenang').innerHTML = ''
      document.getElementById('listPemenang').innerHTML = ''
      this.$emit('next', val)
      window.clearInterval()
      this.cariPemenang()
    }
  },
  mounted(){
    this.cariPemenang()
    if(this.count >= this.dataUndian.num){
      document.getElementById('nextBtn').hide()
    }
  }
}
</script>

<template>
  <template v-for="und in mulaiUndian(count)">
    <div class="row">
      <div class="col-4"><h2>Pemenang <span id="undian">{{ und.title }}</span></h2></div>
      <div class="col-8"><h2 class="shuffle" id="pemenang"></h2></div>
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
        <div class="pemenang-scroller">
          <div class="row  justify-content-center" id="listPemenang"></div>
        </div>
      </div>
    </div>
    
  </template>

  <button id="nextBtn" class="btn btn-primary" @click="selanjutnya(count++)" v-if="this.count+2 <= this.dataUndian.length">Selanjutnya <i class="fa fa-chevron-right"></i></button>
  
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

.pemenang-scroller {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 50vh;
}

.list-pemenang {
  text-transform: capitalize;
  vertical-align: middle;
  border: #fff 2px solid;
  padding: 5px 0;
  margin: 5px;
}

h5.shuffle {
  font-size: .8em;
}
</style>