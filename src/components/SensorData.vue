<template>
  <div class="sensor-data">
    <DataTable :value="sensorsData" responsiveLayout="scroll">
      <Column field="Name" header="Czujnik"></Column>
      <Column field="CoLevel" header="Poziom czadu CO"></Column>
      <Column field="Humidity" header="Wilgotność"></Column>
      <Column field="PM2_5" header="PM 2.5"></Column>
  </DataTable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SensorModel } from './MainPage.vue';

@Component
export default class SensorData extends Vue {
  @Prop({ default: [] })
  sensorsData!: SensorModel[];
}
</script>

<style scoped>
</style>
