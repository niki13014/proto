<template>
  <div class="main-page">
    <div class="card">
        <!-- wykresy -->
        <div class="sensors">
          <apexchart type="line" :options="options" :series="series"></apexchart>
          <apexchart type="line" :options="optionsHumidity" :series="seriesHumidity"></apexchart>
          <apexchart type="line" :options="optionsCo" :series="seriesCo"></apexchart>
        </div>
    </div>
    <div class="card">
      <div class="sensors">
        <!-- czujniki -->
        <SensorData :sensorsData="sensorList" />
        <Button label="Dodaj czujnik" icon="pi pi-plus" @click="onAddClick" />
      </div>
    </div>
    <div class="card">
      <div class="sensors">
        <!-- urzdzenia -->
        <DevicesData />
      </div>
    </div>
    <div class="card">
      <div class="sensors">
        <!-- swaitlo -->
        <LightsData />
      </div>
    </div>
    <!-- dialog to dodawania sensora -->
    <Dialog :visible.sync="display">
      <template #header>
        <h3>Dodaj sensor</h3>
      </template>
        <div>
          <span>Id sensora</span>
          <InputText v-model="newId"/>
        </div>
        <div>
          <span>Nazwa sensora</span>
          <InputText v-model="newName"/>
        </div>
      <template #footer>
        <Button label="Anuluj" icon="pi pi-times" class="p-button-text" @click="onDialogCancelClick()"/>
            <Button label="Dodaj" icon="pi pi-check" autofocus @click="onDialogAddClick()"/>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export interface SensorModel {
  Id: string,
  Name: string,
  Humidity: string,
  CoLevel: string,
  PM2_5: string
}
export interface SensorHistory {
  Id: string,
  Humidity: number[],
  CurrentHumidity: number,
  CoLevel: number[],
  CurrentCoLevel: number,
  PM2_5: number[]
  CurrentPM2_5: number,
}

@Component
export default class MainPage extends Vue {
  //opcje wykresow
  options = {
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        categories: ["-6m","-5m","-4m","-3m","-2m","-1m", "now"]
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          }
        },
      },
    };
  //dane wykresow
  series = [{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }]
  optionsHumidity = {
      chart: {
        id: 'vuechart-example-humidity'
      },
      xaxis: {
        categories: ["-6m","-5m","-4m","-3m","-2m","-1m", "now"]
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          }
        },
      },
    };
  seriesHumidity = [{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }]
  optionsCo = {
      chart: {
        id: 'vuechart-example-co'
      },
      xaxis: {
        categories: ["-6m","-5m","-4m","-3m","-2m","-1m", "now"]
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          }
        },
      },
    };
  seriesCo = [{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }]

  //sumuj wartosci tablic
  sumArrays(array1: number[], array2: number[]): number[] {
    return array1.map(function (num, idx) {
      return num + array2[idx];
    });
  }

  //oblicz nowe dane do wykresow
  getChartSeries() {
    let sumHumidity = [0,0,0,0,0,0,0];
    let sumCO = [0,0,0,0,0,0,0];
    let sumPM2_5 = [0,0,0,0,0,0,0];
    //olicz sumaryczna wilgotnosc co i pm2_5 z danych czujnikow
    this.sensorHistory.forEach(data => {
      sumHumidity = this.sumArrays(sumHumidity, data.Humidity);
      sumCO = this.sumArrays(sumCO, data.CoLevel);
      sumPM2_5 = this.sumArrays(sumPM2_5, data.PM2_5);
    });
    // oblicz srednie wartosc                       kazda wartosc w danym czasie podzielona przez ilosc czujnikow lub 1 (jesli nie ma czujnikow)
    let averageHumidity = sumHumidity.map(x => x/Math.max(1.0, this.sensorHistory.length));
    let averageCo = sumCO.map(x => x/Math.max(1.0, this.sensorHistory.length));
    let averagePM2_5 = sumPM2_5.map(x => x/Math.max(1.0, this.sensorHistory.length));
    // nazwanie danych na wykresie i uakualnienie
    this.series = [{
      name: 'Średnia PM2.5',
      data: averagePM2_5
    }];
    this.seriesCo = [{
      name: 'Średnia CO',
      data: averageCo
    }];
    this.seriesHumidity = [{
      name: 'Średnia wilgotność',
      data: averageHumidity
    }]

    // wlaczenie by uaktualnienie danych powtorzylo sie za 5 sekund
    setTimeout(this.getChartSeries, 5000);
  }


  //lista czujnikow
  sensorList: SensorModel[] = [];
  //lista danych z cujnikow
  sensorHistory: SensorHistory[] = [];
  display = false;
  
  newId = '';
  newName = '';
  onDialogCancelClick() {
    this.display = false;
  }
  onDialogAddClick() {
    //analogicznie do dodawania urzadzenia + ustawianie dancyh startowych
    if(this.newId.trim() == '') return;
    if(this.newName.trim() == '') return;
    this.sensorHistory.push({
      Id: this.newId,
      CoLevel: [3],
      CurrentCoLevel: 3,
      CurrentHumidity: 0.50,
      Humidity: [0.50],
      CurrentPM2_5: 20,
      PM2_5: [20]
    });
    this.sensorList.push({
      Id: this.newId,
      Name: this.newName,
      CoLevel: 'Niski',
      Humidity: '0.50',
      PM2_5: '20'
    });
    this.newId = '';
    this.newName = '';
    this.display = false;
  }
  onAddClick() {
    this.display = true;
  }
  
  created() {
    this.sensorInit();
  }
  // inicjalizacja danych startowych czujnikow
  sensorInit() {
    this.sensorList = [
        {
          Id: 'Salon',
          Name: 'Salon',
          CoLevel: 'Niski',
          Humidity: '0.8',
          PM2_5: '12.5'
        },
        {
          Id: 'Sypialnia',
          Name: 'Sypialnia',
          CoLevel: 'Niski',
          Humidity: '0.2',
          PM2_5: '22.5'
        }
      ];
      this.sensorHistory = [
        {
          Id: 'Salon',
          CoLevel: [1],
          CurrentCoLevel: 1,
          Humidity: [0.8],
          CurrentHumidity: 0.8,
          PM2_5: [12.5],
          CurrentPM2_5: 12.5
        },
        {
          Id: 'Sypialnia',
          CoLevel: [1],
          CurrentCoLevel: 1,
          Humidity: [0.2],
          CurrentHumidity: 0.2,
          PM2_5: [22.5],
          CurrentPM2_5: 22.5
        }
      ];
      // wywolanie losowania nowych danych z czujnikow za 1sekunde
    setTimeout(this.randomSensorData, 1000);
    // uaktualnie wykresu za 5 sekund
    setTimeout(this.getChartSeries, 5000);
  }
  // losowanie nowych danych z czujnikow
  randomSensorData() {
    this.sensorHistory.forEach(x => {
      x.CurrentHumidity = Math.random();
      x.CurrentCoLevel = Math.random() * 5;
      x.CurrentPM2_5 = x.CurrentPM2_5 + (Math.random() * 2 * x.CurrentPM2_5 - x.CurrentPM2_5);
      // jesli jest juz wiecej niz 7 danych z ostatnich loswan z czujnikow usuwamy pierwszy z nich
      if(x.Humidity.length > 7){
        x.Humidity = x.Humidity.slice(1);
        x.CoLevel = x.CoLevel.slice(1);
        x.PM2_5 = x.PM2_5.slice(1);
      }
      // dodajemy nowe dane
      x.Humidity.push(x.CurrentHumidity);
      x.CoLevel.push(x.CurrentCoLevel);
      x.PM2_5.push(x.CurrentPM2_5);
      //aukatulaniamy informacje dla sensora o danym id by sie lasnie wyswietlaly
      let sensor = this.sensorList.find(y => y.Id === x.Id);
      if(sensor) {
        sensor.CoLevel = x.CurrentCoLevel < 3 ? 'Niski' : 'Wysoki';
        sensor.Humidity = x.CurrentHumidity.toFixed(2);
        sensor.PM2_5 = x.CurrentPM2_5.toFixed(2);
      }
    });
    // potarzamy losowanie co 1 sekunde
    setTimeout(this.randomSensorData, 1000)
  }
}
</script>

<style scoped>
.main-page {
  height: 100%;
  background-color: #E9E9E9;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
.card {
  background-color: #ecece3;
  border-radius: 0.5em;
  border: none;
  width: 90%;
  height: 90%;
  padding: 1em;
  margin: 1em;
  overflow: auto;
}
.sensors {
  width: 100%;
}
</style>
