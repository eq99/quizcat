<script  lang="ts" setup>

</script>

<template>
  <div class="box">
    <n-row>
      <n-col :span="12">
        <n-statistic label="Book Count">
          2,334
        </n-statistic>
      </n-col>
      <n-col :span="12">
        <n-statistic label="Active Users">
          1,234,123
        </n-statistic>
      </n-col>
    </n-row>
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin-top: 32px;
  width: 600px;
  margin: auto;
}
</style>