<script setup lang="ts">
import { useTheme } from "vuetify";
import { computed, ref } from "vue";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { registerGad, registerGadx, gadGrammarFor, type GadSourceType } from "../../src/index";
import readme from "../../README.md?raw";
import api from "../../docs/api.md?raw";

registerGad(Prism);
registerGadx(Prism);

const theme = useTheme();
const toggleTheme = () => { theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"; };
const logo = import.meta.env.BASE_URL + "gad.svg";
const tab = ref("overview");
const readmeHtml = marked.parse(readme) as string;
const apiHtml = marked.parse(api) as string;

const SAMPLES: Record<GadSourceType, string> = {
  gad: `// A Gad script\nname := "world"\nfor i in 0..3 {\n  println("hi " + name, i)\n}\nreturn name\n`,
  template: `{% for u in users %}\n  <li>{%= u.name %}</li>\n{% end %}\n`,
  gadx: `@param (; title = "Gadx")\n@main\n    h1.title {= title }\n    ul\n        @for i in [1, 2, 3]\n            li item {= i }\n`,
};
const dialect = ref<GadSourceType>("gad");
const highlighted = computed(() => {
  const lang = dialect.value === "template" ? "gadt" : dialect.value;
  return Prism.highlight(SAMPLES[dialect.value], gadGrammarFor(dialect.value), lang);
});
</script>

<template>
  <v-app>
    <v-app-bar color="surface" flat>
      <v-app-bar-title>
        <img :src="logo" height="24" style="vertical-align:-5px;margin-right:8px" />
        prism-gad
      </v-app-bar-title>
      <v-spacer />
      <v-btn :icon="theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="toggleTheme" variant="text" title="Toggle theme" />
      <v-btn href="https://github.com/gad-lang/prism-gad" icon="mdi-github" variant="text" />
    </v-app-bar>
    <v-main>
      <v-tabs v-model="tab" bg-color="surface">
        <v-tab value="overview">Overview</v-tab>
        <v-tab value="example">Example</v-tab>
        <v-tab value="api">API</v-tab>
      </v-tabs>
      <v-container>
        <div v-show="tab === 'example'">
          <v-btn-toggle v-model="dialect" mandatory density="comfortable" class="mb-3">
            <v-btn value="gad">.gad</v-btn>
            <v-btn value="template">.gadt</v-btn>
            <v-btn value="gadx">.gadx</v-btn>
          </v-btn-toggle>
          <v-card variant="outlined" class="pa-3">
            <pre class="hl"><code v-html="highlighted"></code></pre>
          </v-card>
        </div>
        <div v-show="tab === 'overview'" class="markdown" v-html="readmeHtml" />
        <div v-show="tab === 'api'" class="markdown" v-html="apiHtml" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Restore full markdown typography inside v-html content — Vuetify's global CSS
   reset strips margins, list markers and other element defaults. */
.markdown { max-width: 60rem; line-height: 1.6; overflow-wrap: break-word; }
.markdown > :first-child { margin-top: 0; }
.markdown > :last-child { margin-bottom: 0; }
.markdown p { margin: .75em 0; }
.markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6 { margin: 1.4em 0 .5em; line-height: 1.25; font-weight: 600; }
.markdown h1 { font-size: 2em; }
.markdown h2 { font-size: 1.5em; }
.markdown h3 { font-size: 1.25em; }
.markdown h4 { font-size: 1.05em; }
.markdown h1, .markdown h2 { border-bottom: 1px solid rgba(127,127,127,.3); padding-bottom: .2em; }
.markdown ul, .markdown ol { padding-left: 1.5em; margin: .5em 0; list-style: revert; }
.markdown li { margin: .25em 0; }
.markdown li > ul, .markdown li > ol { margin: .25em 0; }
.markdown blockquote { margin: .75em 0; padding: .2em 1em; border-left: 3px solid rgba(127,127,127,.4); opacity: .85; }
.markdown a { color: rgb(var(--v-theme-primary)); text-decoration: none; }
.markdown a:hover { text-decoration: underline; }
.markdown hr { border: 0; border-top: 1px solid rgba(127,127,127,.3); margin: 1.5em 0; }
.markdown img { max-width: 100%; }
.markdown table { border-collapse: collapse; margin: .75em 0; display: block; overflow-x: auto; }
.markdown th, .markdown td { border: 1px solid rgba(127,127,127,.3); padding: .4em .6em; text-align: left; }
.markdown th { background: rgba(127,127,127,.1); }
.markdown pre, .hl { background: rgba(127,127,127,.12); padding: 10px 12px; border-radius: 6px; overflow: auto; margin: .75em 0; }
.markdown code, .hl code { font-family: monospace; }
.markdown :not(pre) > code { background: rgba(127,127,127,.15); padding: .1em .35em; border-radius: 4px; font-size: .9em; }
</style>
