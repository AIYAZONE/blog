<template>
  <footer class="site-footer" v-if="showFooter">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">AIYAZONE</h3>
          <p class="footer-description">{{ t('brand.subtitle') }}</p>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">{{ t('nav.quickLinks') }}</h4>
          <ul class="footer-links">
            <li><a href="/about">{{ t('nav.about') }}</a></li>
            <li><a href="/portfolio">{{ t('nav.portfolio') }}</a></li>
            <li><a href="/career">{{ t('nav.career') }}</a></li>
            <li><a href="/contact">{{ t('nav.contact') }}</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-subtitle">{{ t('contact.social.title') }}</h4>
          <div class="footer-social">
            <a href="https://github.com/AIYAZONE" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://blog.aiyazone.com" target="_blank" rel="noopener noreferrer">Blog</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} AIYAZONE. {{ t('footer.allRightsReserved') }}
        </p>
        <div class="footer-meta">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="build-info">粤ICP备2022083499号</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

defineComponent({
  name: "Footer",
});

const { t } = useI18n();
const currentYear = computed(() => new Date().getFullYear());
const showFooter = true;
</script>

<style scoped lang="less">
.site-footer {
  background: var(--brand-canvas-day);
  border-top: 1px solid var(--brand-border);
  padding: 3rem 0 1rem;
  margin-top: auto;
  position: relative;
  z-index: 20; /* Ensure footer is above aside */

  .container {
    max-width: var(--brand-max-width);
    margin: 0 auto;
    padding: 0 2rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    .footer-section {
      .footer-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--brand-text-primary);
        margin: 0 0 0.5rem 0;
      }

      .footer-subtitle {
        font-size: 1rem;
        font-weight: 600;
        color: var(--brand-text-primary);
        margin: 0 0 1rem 0;
      }

      .footer-description {
        color: var(--brand-text-secondary);
        line-height: 1.6;
        margin: 0;
      }

      .footer-links {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-bottom: 0.5rem;

          a {
            color: var(--brand-text-secondary);
            text-decoration: none;
            transition: color 0.2s ease;

            &:hover {
              color: var(--brand-electric);
            }
          }
        }
      }

      .footer-social {
        display: flex;
        gap: 1rem;

        a {
          color: var(--brand-text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;

          &:hover {
            color: var(--brand-electric);
          }
        }
      }
    }
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid var(--brand-border);
    font-size: 0.9rem;
    color: var(--brand-text-secondary);

    .copyright {
      margin: 0;
    }

    .footer-meta {
      .build-info {
        font-size: 0.8rem;
        opacity: 0.8;
      }
    }
  }
}

// 移动端适配
@media screen and (max-width: 767px) {
  .site-footer {
    padding: 2rem 0 1rem;

    .container {
      padding: 0 1rem;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      text-align: center;
    }

    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
}

// 平板端适配
@media screen and (min-width: 768px) and (max-width: 991px) {
  .site-footer {
    .footer-content {
      grid-template-columns: 1fr 1fr;
      
      .footer-section:first-child {
        grid-column: 1 / -1;
        text-align: center;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
