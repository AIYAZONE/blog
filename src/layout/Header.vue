<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="middle-box">
      <div class="header-inner">
        <a href="/" class="brand-signature">
          <img src="/logo.jpg" alt="AIYAZONE Logo" class="brand-logo" />
          <span class="brand-name">AIYAZONE<span class="dot">.</span></span>
        </a>

        <div class="right-panel">
          <nav class="desktop-nav">
            <ul>
              <li v-for="item in nav" :key="item.text">
                <a :href="item.href" class="nav-link" :target="item.target || '_self'">{{
                  item.text
                }}</a>
              </li>
            </ul>
          </nav>

          <!-- Theme Switch -->
          <VPSwitchAppearance />

          <!-- Language Switch -->

          <button class="lang-switch" @click="toggleLang">
            {{ locale === "zh" ? t('locale.en.label') : t('locale.zh.label') }}
          </button>

          <!-- Mobile Menu Toggle -->
          <div class="mobile-menu-btn">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import VPSwitchAppearance from "../components/vitepress/VPSwitchAppearance.vue";

export default defineComponent({
  name: "Header",
  components: {
    VPSwitchAppearance
  },
  setup() {
    const { t, locale } = useI18n();
    const isScrolled = ref(false);

    const toggleLang = () => {
      locale.value = locale.value === "zh" ? "en" : "zh";
      localStorage.setItem("language", locale.value);
    };

    const handleScroll = () => {
      // Add hysteresis (buffer zone) to prevent flickering at the threshold
      const scrollY = window.scrollY;
      if (scrollY > 60 && !isScrolled.value) {
        isScrolled.value = true;
      } else if (scrollY < 40 && isScrolled.value) {
        isScrolled.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    const nav = computed(() => [
      { href: "/", text: t("nav.home"), target: "_self" },
      { href: "/fe/", text: t("nav.frontend"), target: "_self" },
      { href: "/pm/", text: t("nav.management"), target: "_self" },
      { href: "/blog/", text: t("nav.blog"), target: "_self" },
    ]);

    return {
      isScrolled,
      nav,
      locale,
      toggleLang,
      t,
    };
  },
});
</script>

<style lang="less" scoped>
header {
  position: fixed; /* Changed from sticky to fixed for stability */
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 1.5rem 0;
  background-color: transparent;
  /* Use specific transitions to avoid jitter */
  transition: background-color 0.4s ease, padding 0.4s ease, border-color 0.4s ease,
    backdrop-filter 0.4s ease;
  /* Default transparent border to occupy space */
  border-bottom: 1px solid transparent;

  &.scrolled {
    background-color: var(--brand-glass-bg);
    backdrop-filter: blur(10px);
    padding: 1rem 0;
    border-bottom-color: var(--brand-border); /* Only transition color */
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand-signature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;

    .brand-logo {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .brand-name {
      font-family: "Playfair Display", serif;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--brand-text-primary);
      letter-spacing: -0.5px;

      .dot {
        color: var(--brand-electric);
      }
    }

    &:hover .brand-logo {
      transform: scale(1.1);
    }
  }

  .right-panel {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .desktop-nav {
    ul {
      display: flex;
      gap: 3rem;

      li {
        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--brand-text-primary);
          position: relative;
          padding: 0.5rem 0;

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 1px;
            background-color: var(--brand-electric);
            transition: width 0.3s ease;
          }

          &:hover {
            color: var(--brand-electric);
            &::after {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .lang-switch {
    background: none;
    border: 1px solid var(--brand-border);
    padding: 0.25rem 0.75rem;
    font-family: var(--font-sans);
    font-size: 0.8rem;
    cursor: pointer;
    color: var(--brand-text-secondary);
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
      color: var(--brand-electric);
      border-color: var(--brand-electric);
    }
  }

  .mobile-menu-btn {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  header {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-btn {
      display: block;
    }

    .right-panel {
      gap: 1rem;
    }

    .brand-signature {
      gap: 0.5rem;

      .brand-logo {
        width: 32px;
        height: 32px;
      }

      .brand-name {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
