<template>
  <div class="font-poppins text-gray-800 bg-gray-50 min-h-screen h-full">
    <div class="board lg:grid">
      <sidebar />
      <div class="mb-16 lg:mb-0">
        <title-bar page-title="Edit Profile" back />
        <div class="mx-auto max-w-2xl">
          <div class="edit-board grid">
            <profile-menu />
            <Nuxt />
          </div>
        </div>
      </div>
      <mobile-nav />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Navigation/Sidebar.vue';
import MobileNav from '@/components/Navigation/MobileNav.vue';
import TitleBar from '@/components/Navigation/TitleBar.vue';
import ProfileMenu from '@/components/Navigation/ProfileMenu.vue';

export default {
  components: {
    Sidebar,
    MobileNav,
    TitleBar,
    ProfileMenu
  }
};
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .edit-board {
    grid-template-columns: 200px auto;
  }
}

@media screen and (min-width: 1024px) {
  .board {
    grid-template-columns: minmax(250px, 350px) auto;
  }
}
</style>
