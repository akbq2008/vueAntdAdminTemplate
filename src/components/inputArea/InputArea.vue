<template>
  <div class="input-container" tabindex="0">
    <input type="text" class="input-start input" value="0">
    <span>~</span>
    <input type="text" class="input-end input" value="100">
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.input-container {
  display: inline-block;
  text-align: center;
  width: 280px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  .input {
    text-align: center;
    width: 100px;
    outline: none;
    border: none;
  }
  &:hover {
    border-color: #634fe3;
  }
  &:focus {
    border-color: #634fe3;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(57, 41, 215, 0.2);
    border-right-width: 1px !important;
  }
}
</style>
