<template>
  <div class="wrap">
    <h1>404</h1>
    <h3>{{ $t('error.404') }}</h3>
  </div>
</template>

<style scoped>
  .wrap {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    color: #666;

    h1 {
      font-size: 48px;
      color: #999;
    }

    h3 {
      color: #666;
    }
  }
</style>
