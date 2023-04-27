<template>
  <!-- component -->
  <div class="home-container w-screen h-screen">
    <div class="flex bg-white relative">
      <div class="h-screen object-cover home-layout w-screen">
        <div class="h-full bg-black opacity-25"></div>
        <nav
          class="bg-black bg-opacity-50 shadow-lg absolute top-0 w-full py-4"
        >
          <div class="md:flex items-center justify-between py-2 px-8 md:px-12">
            <div class="flex justify-between items-center">
              <div class="text-2xl font-bold text-white md:text-3xl">
                <img src="@/assets/images/white-logo.svg" />
              </div>
              <div class="md:hidden">
                <button
                  type="button"
                  class="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                >
                  <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path
                      class="hidden"
                      d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
                    />
                    <path
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col md:flex-row md:block -mx-2">
              <nuxt-link
                href="/create-account"
                class="rounded bg-purple-500 text-gray-100 font-medium py-2 px-4 md:mx-2 decoration-purple-500"
              >
                Sign Up
              </nuxt-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style>
.home-container {
  background: linear-gradient(180deg, #121212 0%, rgba(29, 25, 31, 0) 125.45%);
}
.home-layout {
  background: url("@/assets/images/personal-info.png") no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
