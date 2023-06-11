<template>
  <div class="sensor-data">
    <div class="lights">
      <div class="light" v-for="device in devices" :key="device.Id"> 
        <span class="material-symbols-outlined">lightbulb</span>
        <span> {{device.Name}} </span>
        <InputSwitch v-model="device.IsOn" />
      </div>
    </div>
  <Button label="Dodaj żarówkę" icon="pi pi-plus" @click="onAddClick()"/>
  <Dialog :visible.sync="display">
    <template #header>
      <h3>Dodaj żarówkę</h3>
    </template>
      <div>
        <span>Nazwa żarówki</span>
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

interface DevicesModel {
  Id: string,
  Name: string,
  IsOn: boolean
}

@Component
export default class LightsData extends Vue {
  devices: DevicesModel[] = [
    {
      Id: 'AIR011',
      Name: "Salon",
      IsOn: true
    },
    {
      Id: 'AIR012',
      Name: 'Sypialnia',
      IsOn: false
    },   
    {
      Id: 'WIN01',
      Name: "Taras",
      IsOn: true
    },
    {
      Id: 'WIN02',
      Name: 'Kuchnia',
      IsOn: false
    }
  ];
  display = false;
  newId = '';
  newName = '';
  onDialogCancelClick() {
    this.display = false;
  }
  onDialogAddClick() {
    if(this.newName.trim() == '') return;
    this.devices.push({
      Id: this.newId,
      Name: this.newName,
      IsOn: false
    });
    this.newId = '';
    this.newName = '';
    this.display = false;
  }
  onAddClick() {
    this.display = true;
  }
  getStatus(id: string, status: boolean) {
    if(id.startsWith("WIN")) {
      return status ? 'Otwarte' : 'Zamknięte'
    }
    else {
      return status ? 'ON' : 'OFF'
    }
  }

  onTurnOffOnClick(data: DevicesModel) {
      data.IsOn = !data.IsOn;
  }
  onDeleteOnClick(data: DevicesModel) {
      this.devices = this.devices.filter(x => data.Id != x.Id);
  }

}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
</style>
<style scoped>
.lights {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.light {
  border: 2px solid #403c3c;
  border-radius: 0.25em;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.light > * {
  margin: 0.25em;
}
</style>
