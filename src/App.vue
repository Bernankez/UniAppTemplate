<script setup lang="ts">
onLaunch(() => {
  console.log('Launched')
})

console.log(`Mode: ${import.meta.env.MODE}`)
console.log(`Base Url: ${import.meta.env.VITE_APP_BASE_URL}`)
</script>
