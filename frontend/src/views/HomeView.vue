<template>
    <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
      <div class="flex flex-wrap -m-1 md:-m-2">
          <div class="flex flex-wrap md:w-1/4 w-1/2"
          v-for="image in images"
          :key="image.public_id"
          >
            <div class="w-full p-1 md:p-2">
              <img :src="image.secure_url" alt="gallery" class="block object-cover object-center w-full h-full rounded-lg">
            </div>
          </div>
      </div>
      
      <div class="text-center my-4" v-if="next">
        <button class="bg-green-700 px-4 py-2 text-center text-white border rounded shadow-sm"
        :disabled="disabled"
        @click="loadMore">
            Load more
        </button>
      </div>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from "axios";

  const images = ref([]);
  const next = ref(null);

  const fetchImages = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos` );
        images.value = response.data.results.images;

        if(response.data.results.next_cursor) {
          next.value = response.data.results.next_cursor;
        }
    } catch (error) {
        console.log(error);
    }
  };

  const loadMore = async()=> {
    const params = new URLSearchParams();
    if(next.value) {
      params.append("next_cursor", next.value)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos?${params}`);
      if(response.data.results) {
        for (let i = 0; i < response.data.results.images.length; i++) {
          images.value.push(response.data.results.images[i]);
        }
        if(response.data.results.next_cursor) {
          next.value = response.data.results.next_cursor;
          params.delete("next_cursor")
        } else {
          params.delete("next_cursor");
          next.value = null;
        }
      }
    }
  }

  onMounted(()=> {
    fetchImages();  
  });
</script>