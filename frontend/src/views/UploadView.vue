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
                    accept="image/png, image/jpg, image/jpeg" />
                  </div>
                </div>
                <button class="w-full px-6 py-2.5 bg-green-600 text-white font-medium text-xs rounded shadow-md"
                style="submit" @click.prevent="submitUpload">Upload</button>
            </form>
          </div>
          <!-- Image Preview -->
          <div class="p-4">
            <h3 class="text-semibold text-center mb-2">Image Preview</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    // get image preview

    // submit upload

    // uploadImage connect  with upload API
</script>