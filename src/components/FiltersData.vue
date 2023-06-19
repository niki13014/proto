<template>
  <div class="sensor-data">
    <DataTable :value="filtersData" responsiveLayout="scroll">
      <Column field="Id" header="Odświeżacz powietrza"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <!-- analogicznie do DevicesData -->
          <span :class="slotProps.data.IsOn ? 'ON' : 'OFF'">
            {{ slotProps.data.IsOn ? 'ON' : 'OFF' }}
          </span>
        </template>
      </Column>
  </DataTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface FiltersDataModel {
  Id: string,
  IsOn: boolean
}
@Component
export default class FiltersData extends Vue {
  filtersData: FiltersDataModel[] = [
    {
      Id: 'Salon',
      IsOn: true
    },
    {
      Id: 'Sypialnia',
      IsOn: false
    }
  ]
}
</script>

<style scoped>
.ON {
  color: green;
}
.OFF {
  color: red;
}
</style>
