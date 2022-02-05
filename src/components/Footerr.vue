<template>
  <footer>
    <span id="cena">Cena </span>
    <span ref="cena">{{ this.$store.state.cena }}€</span>
    <span v-show="zlava">{{ calc() }}€</span>
    <button @click="handle_zlava">Zľava</button>
    <input id="zlavicka-inp" @change="minmax" v-model="zlavicka" type="number">%
    <button @click="generatePDF">PDF</button>

  </footer>

  <div class="pdf-wrap">
    <div id="pdf">

      <p id="h1">Cenová ponuka</p>
      <p id="divnecislo">40220001</p>

      <div class="popiss">
        <p class="bold">KREADO s.r.o</p>
        <p class="tenke">Viedenská 5, 04013 Košice-Sídlisko Ťahanovce, Slovenská republika</p>
        <p class="tenke">IČO: 54330661</p>
        <p class="bold">Patrik Molnár, 0915 303 632, info@kreado.io, www.kreado.io</p>
      </div>

      <div class="kto">
        <p class="modre">Odborateľ</p>
        <p class="bold">Naďa Kapraľová</p>
      </div>

      <div class="spolu">
        <div class="sivi-obldznik">
          <div class="sivi-wrap">
            <p class="tenke">Dátum vystavenia</p>
            <p class="bold">{{ datum }}</p>
          </div>
          <div class="sivi-wrap">
            <p class="tenke">Platnosť ponuky</p>
            <p class="bold">31.01.2022</p>
          </div>
        </div>
        <div class="modry-obldznik">
          <p>SPOLU</p>
          <p>{{ spolu }} €</p>
        </div>
      </div>

      <div class="table-h">
        <p class="th-n">názov</p>
        <p class="th-o">množsto</p>
        <p class="th-o">jedn. cena</p>
        <p class="th-o">spolu</p>
      </div>
      <div v-for="polozka, i in vybrate" :key="i" class="riadok">
        <div class="riadok-nazov">
          <p class="bold">{{ polozka.polozka }}</p>
          <p class="tenke">{{ polozka.popis }}</p>
        </div>
        <div class="riadok-ostatne">1,00</div>
        <div class="riadok-ostatne">{{ polozka.cena }}</div>
        <div class="riadok-ostatne bold">{{ polozka.cena }}</div>
      </div>

      <div class="spolu-dole">
        <p class="bold spolu-lavo">SPOLU</p>
        <p class="bold modra-cena">{{ spolu }} €</p>
      </div>
      
      <div class="bold podpis">Pečiatka, podpis</div>

    </div>
  </div>


</template>

<script>
  export default {
    data: () => ({
      zlava: false,
      zlavicka: null,
      spolu: 0,
      datum: null,
      vybrate: []
    }),
    methods: {
      generatePDF() {
        this.spolu = this.$store.state.cena
        this.vybrate = this.$store.state.vybral

        var today = new Date()
        this.datum = `${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}.${today.getFullYear()}`

        var pdf = document.querySelector('#pdf')
        var opt = {
          filename: 'kreadoo.pdf',
          image: { type: 'jpeg', quality: 0.98},
          html2canvas: { scale: 2},
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'},
        }
        html2pdf(pdf, opt)
      },
      minmax() {
        if (this.zlavicka > 100)
          this.zlavicka = 100
        else if (this.zlavicka < 0)
          this.zlavicka = 0
      },
      handle_zlava() {
        if (this.$store.state.cena == 0) return
        if (!this.zlava) 
          this.$refs.cena.style.textDecoration = 'line-through'
        else 
          this.$refs.cena.style.textDecoration = 'none'
        this.zlava = !this.zlava
      },
      calc() {
        if (this.zlavicka > 100) return 0
        else if (this.zlavicka < 0) return this.$store.state.cena
        return this.zlava ? Math.round(this.$store.state.cena * (1 - this.zlavicka / 100) * 100) / 100 : this.$store.state.cena
      }
    }
  }
</script>

<style scoped>
  footer {
    height: 4rem;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    color: #999;
    font-weight: bold;
    gap: 1rem;
    font-size: 2rem;
  }

  .spolu {
    position: relative;
  }

  .sivi-obldznik {
    width: 100%;
    margin-top: 2rem;
    background-color: #eee;
    border-radius: .4rem;
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
    padding-left: 2rem;
    align-items: center;
    height: 4rem;
  }
  .modry-obldznik {
    height: 5rem;
    width: 50%;
    background-color: #006eff;
    border-radius: .4rem;
    position: absolute;
    top: 24px;
    right: 0;
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-weight: 700;
    font-size: larger;
  }

  #pdf {
    width: 216mm;
    color: black;
    display: flex;
    flex-direction: column;
    padding: 3rem 2.4rem;
  }

  .pdf-wrap {
    display: none;
    /* display: block; */
  }

  #divnecislo {
    font-size: smaller;
    color: #999;
    margin-bottom: 1rem;
  }

  #h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: .2rem;
  }

  .table-h {
    width: 100%;
    height: 2.5rem;
    color: white;
    border-top-left-radius: .4rem;
    border-top-right-radius: .4rem;
    background-color: #333;
    margin-top: 3rem;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .8rem;
  }

  .riadok {
    min-height: 4rem;
    width: 100%;
    background-color: #eee;
    display: flex;
  }

  .riadok:nth-child(odd) {
    background-color: #fff;
  }
  .riadok-nazov {
    width: 60%;
    padding: 1rem;
  }
  .riadok-ostatne {
    width: 20.2333%;
    text-align: end;
    padding: 1rem;
  }

  .th-n {
    width: 60%;
    padding: 1rem;
  }
  .th-o {
    width: 20.2333%;
    text-align: end;
    padding: 1rem;
  }

  .popiss {
    margin-bottom: 2rem;
  }

  .modre {
    color: #006eff;
  }

  .tenke {
    color: #777;
  }

  .bold {
    font-weight: 700;
  }

  .spolu-dole {
    width: 50%;
    height: 3.5rem;
    border-top: 2px solid #444;
    margin: 3rem 0 6rem auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .spolu-lavo {
    font-size: 1.2rem;
  }
  .modra-cena {
    font-size: 1.5rem;
    color: #006eff;
  }

  .podpis {
    width: 30%;
    height: 2rem;
    border-top: 1px solid #555;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-left: auto;
  }

  button {
    width: 5rem;
    font-size: 1rem;
    font-weight: bold;
  }

  #zlavicka-inp {
    outline: none;
    border: #4ae14ac9 solid 2px;
    width: 3.5rem;
    margin-right: -.8rem;
  }

  @media screen and (max-width: 670px) {
    #cena {
      display: none;
    }
    div {
      font-size: 1.5rem;
    }
  }  

</style>