<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import Home from "../../../src/views/Home.vue";

import Header from "../../../src/layout/Header.vue";
import Footer from "../../../src/layout/Footer.vue";

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
</script>

<template>
  <div class="vp-custom-layout">
    <Header />
    <Layout class="vp-layout-content">
      <template #home-hero-before>
        <div v-if="frontmatter.isCustomHome" class="custom-home-wrapper">
          <Home />
        </div>
      </template>
    </Layout>
    <Footer />
  </div>
</template>

<style>
.vp-custom-layout {
  position: relative;
  z-index: 1;
}

.vp-layout-content {
  position: relative;
  z-index: 10;
}
.custom-home-wrapper {
  width: 100%;
}

.VPFooter {
  display: none !important;
}

.VPNavBar {
  display: none !important;
}

.VPDoc {
  padding-bottom: 0 !important;
}
</style>
