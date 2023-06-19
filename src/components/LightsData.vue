<template>
  <div class="sensor-data">
    <div class="lights">
      <div class="light" v-for="device in devices" :key="device.Id"> 
        <!-- ikonka zarowki -->
        <span class="material-symbols-outlined">lightbulb</span>
        <!-- nazwa -->
        <span> {{device.Name}} </span>
        <!-- przelacznik czy wlaczona czy nie -->
        <InputSwitch v-model="device.IsOn" />
      </div>
    </div>
  <Button label="Dodaj żarówkę" icon="pi pi-plus" @click="onAddClick()"/>
  <!-- dialog z formularzem do dodania zarowki -->
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
  // domyslne zarowki
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
  newName = '';
  onDialogCancelClick() {
    this.display = false;
  }
  onDialogAddClick() {
    // jesli nowa nazwa zarowki jest '' to jej nie dodawaj
    if(this.newName.trim() == '') return;
    this.devices.push({
      Id: this.newName,
      Name: this.newName,
      IsOn: false
    });
    this.newName = '';
    this.display = false;
  }

  // po kliknieciu ustaw wartosc ktora pokaze dialog do dodania zarowki
  onAddClick() {
    this.display = true;
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
