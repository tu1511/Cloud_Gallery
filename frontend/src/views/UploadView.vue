<template>
  <div class="container px-8 mb-4">
    <h2 class="text-2xl font-semibold text-center mt-4">
      Upload an image to Cloudinary
    </h2>
    <div class="gird md:grid-cols-6 grid-cols-1">
      <div class="md:col-start-2 md:col-span-4 shadow-lg">
        <div class="grid md:grid-cols-2 grid-cols-1">
          <div class="blog p-6 rounded-lg bg-white max-w-sm mt-4">
            <form>
                <div class="form-group mb-6">
                  <div>
                    <label for="file-input" class="form-label inline-block mb-2 text-gray-700">Upload Image</label>
                    <input type="file" id="file-input" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded"
                    accept="image/png, image/jpg, image/jpeg"
                    @change="handleFileChange($event)" 
                    />
                  </div>
                </div>
                <button class="w-full px-6 py-2.5 bg-green-600 text-white font-medium text-xs rounded shadow-md"
                :class="uploadStatus && 'bg-gray-600'"
                :disabled="uploadStatus"
                style="submit" @click.prevent="submitUpload">{{ uploadStatus ? "Uploading" : "Upload" }}</button>
            </form>
          </div>
          <!-- Image Preview -->
          <div class="p-4">
            <h3 class="text-semibold text-center mb-2">Image Preview</h3>
            <AlertMessage v-if="error" :message ="error"/>
            <img :src="filePreview" alt="" v-if="filePreview" class="bg-white p-1 border rounded">
            <p v-if="fileSize">{{ fileSize }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  import AlertMessage from "@/components/AlertMessage.vue";

  const file = ref(null);
  const filePreview = ref(null);
  const fileSize = ref(0.0);
  const uploadStatus = ref(false);
  const error = ref(null);

  const router = useRouter();

  // handleFileChange
  const handleFileChange = (e) => {
      error.value = null;
      file.value = e.target.files[0];
      getImagePreviews(file.value);
  }

  // format image size to human-readable unit
  function formatBytes(size, decimals = 2) {
    if(size === 0) return "0 bytes";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(dm)+ " " + sizes[i]);
  };
  // get image preview
  const getImagePreviews = (image) => {
    // kiểm tra .file và kích thước
    if (/\.(jpe?g|png)$/i.test(image.name) && image.size < 1000000) {
        let reader = new FileReader();
        reader.onloadend = (e) => {
          filePreview.value = e.target.result;
          fileSize.value = formatBytes(image.size);
        };
        reader.readAsDataURL(image);
    } else {
      error.value = "File is not supported for size bigger than 1 MB!";
      filePreview.value = null;
      fileSize.value = null;
    }
  }

  // submit upload
  const submitUpload = () => {
    if(!file.value) return;
    let reader = new FileReader();
    reader.readAsDataURL(file.value);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
  };

  // uploadImage connect  with upload API
  const uploadImage = async (file) => {
    uploadStatus.value = true;
    const formData = new FormData();
    if(file) formData.append("file", file);

    try {
      const response = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/api/upload`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      if(response.data.url) {
        error.value = null;
        uploadStatus.value = false;
        // chuyển về homepage
        router.push("/")
      }
    } catch (error) {
      error.value = error;
      uploadStatus.status = false;
    }
  }

</script>