<template>
  <div class="sensor-data">
    <DataTable class="sensor-table" :value="devices" responsiveLayout="scroll">
      <Column field="Name" header="Nazwa urządzenia">
          <template #body="slotProps">
            <div class="device-name">
              <span v-if="slotProps.data.Id.startsWith('WIN')" class="material-symbols-outlined">
              window
              </span>
              <span v-if="slotProps.data.Id.startsWith('AIR')" class="material-symbols-outlined">
              air
              </span>
              <span>{{slotProps.data.Name}}</span>
            </div>
        </template>
      </Column>
      <Column header="Status">
        <template #body="slotProps">
          <span :class="slotProps.data.IsOn ? 'ON' : 'OFF'">
            {{ getStatus(slotProps.data.Id, slotProps.data.IsOn) }}
          </span>
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <Button class="p-button-outlined button-power" icon="pi pi-power-off" @click="onTurnOffOnClick(slotProps.data)" />
        </template>
      </Column>
  </DataTable>
  <Button label="Dodaj urządzenie" icon="pi pi-plus" @click="onAddClick()"/>
  <Dialog :visible.sync="display">
    <template #header>
      <h3>Dodaj urządzenie</h3>
    </template>
      <div>
        <span>Id urządzenia</span>
        <InputText v-model="newId"/>
      </div>
      <div>
        <span>Nazwa urządzenia</span>
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
export default class DevicesData extends Vue {
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
    if(this.newId.trim() == '') return;
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
.device-name {
  display: flex;
  align-items: center;
}
.ON {
  color: green;
}
.OFF {
  color: red;
}

</style>
