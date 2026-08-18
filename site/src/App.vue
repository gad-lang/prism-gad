<script setup lang="ts">
import { computed, ref } from "vue";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { registerGad, registerGadx, gadGrammarFor, type GadSourceType } from "../../src/index";
import readme from "../../README.md?raw";
import api from "../../docs/api.md?raw";

registerGad(Prism);
registerGadx(Prism);

const logo = import.meta.env.BASE_URL + "gad.svg";
const tab = ref("example");
const readmeHtml = marked.parse(readme) as string;
const apiHtml = marked.parse(api) as string;

const SAMPLES: Record<GadSourceType, string> = {
  gad: `// A Gad script\nname := "world"\nfor i in 0..3 {\n  println("hi " + name, i)\n}\nreturn name\n`,
  template: `{% for u in users %}\n  <li>{%= u.name %}</li>\n{% end %}\n`,
  gadx: `@param (; title = "Gadx")\n@main\n    h1.title {= title }\n    ul\n        @for i in [1, 2, 3]\n            li item {= i }\n`,
};
const dialect = ref<GadSourceType>("gadx");
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
      <v-btn href="https://github.com/gad-lang/prism-gad" icon="mdi-github" variant="text" />
    </v-app-bar>
    <v-main>
      <v-tabs v-model="tab" bg-color="surface">
        <v-tab value="example">Example</v-tab>
        <v-tab value="overview">Overview</v-tab>
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
.markdown { max-width: 60rem; line-height: 1.6; }
.markdown h1, .markdown h2 { border-bottom: 1px solid rgba(127,127,127,.3); padding-bottom: .2em; }
.markdown pre, .hl { background: rgba(127,127,127,.12); padding: 10px 12px; border-radius: 6px; overflow: auto; }
.markdown code, .hl code { font-family: monospace; }
</style>
