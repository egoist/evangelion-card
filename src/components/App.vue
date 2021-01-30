<script lang="ts" setup>
import 'grid.css'
import { reactive, ref } from 'vue'
import domToImage from 'dom-to-image'

const form = reactive({
  firstLine: 'neon',
  secondLine: 'genesis',
  thirdLine: 'evangelion',
  episode: 'episode:12',
  titleLine: `She said,"Don't make others suffer\nfor your personal hatred."`,
  titleFont: 'Serif',
})

const outputRef = ref<HTMLDivElement>()

const save = () => {
  if (!outputRef.value) return
  domToImage.toJpeg(outputRef.value, {}).then((dataUrl) => {
    const link = document.createElement('a')
    link.download = 'image.jpg'
    link.href = dataUrl
    link.click()
  })
}
</script>

<template>
  <div id="app">
    <div class="panel columns">
      <div class="column">
        <div class="form-group">
          <label for="first-line">First Line</label>
          <textarea
            id="first-line"
            class="form-control"
            v-model="form.firstLine"
          >
          </textarea>
        </div>
        <div class="form-group">
          <label for="second-line">Second Line</label>
          <textarea
            id="second-line"
            class="form-control"
            v-model="form.secondLine"
          >
          </textarea>
        </div>
      </div>
      <div class="column">
        <div class="form-group">
          <label for="third-line">Third Line</label>
          <textarea
            id="third-line"
            class="form-control"
            v-model="form.thirdLine"
          >
          </textarea>
        </div>
        <div class="form-group">
          <label for="episode">"EPISODE"</label>
          <textarea id="episode" class="form-control" v-model="form.episode">
          </textarea>
        </div>
      </div>
      <div class="column">
        <div class="form-group">
          <label for="title-line">Title Line</label>
          <textarea
            id="title-line"
            class="form-control"
            v-model="form.titleLine"
          >
          </textarea>
        </div>
        <div class="form-group">
          <label for="title-font">Title Font</label>
          <textarea
            id="title-font"
            class="form-control"
            v-model="form.titleFont"
          >
          </textarea>
        </div>
      </div>
      <div class="column download">
        <div class="form-group">
          <label for="">Export</label>
          <button class="download-button" @click="save">Download Image</button>
        </div>
      </div>
    </div>
    <div class="output" ref="outputRef">
      <div class="first-line">{{ form.firstLine }}</div>
      <div class="second-line">{{ form.secondLine }}</div>
      <div class="third-line">{{ form.thirdLine }}</div>
      <div class="episode-line">
        {{ form.episode }}
      </div>
      <div
        class="title-line"
        :style="{ fontFamily: form.titleFont }"
        v-html="form.titleLine.replace(/\n/g, '<br>')"
      ></div>
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
* {
  box-sizing: border-box;
}
body {
  background-color: #000;
  margin: 0;
  font: 14px/1.4 -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}
</style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
}
.panel {
  color: #fff;
  max-width: 960px;
  padding-top: 10px;
}
.panel .form-group {
  padding: 10px;
}
.panel .form-control {
  width: 100%;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  min-height: 40px;
}
.panel label {
  display: block;
  margin-bottom: 10px;
  user-select: none;
}
.badge svg path {
  fill: #fff;
}
.badge:hover svg path {
  fill: #ccc;
}
.download {
  display: flex;
}
.download-button {
  cursor: pointer;
  height: 40px;
  background-color: transparent;
  color: #fff;
  border: 1px solid;
  padding: 0 20px;
  font-size: 16px;
}
.download-button:hover {
  background-color: rgba(47, 47, 47, 0.72);
}
@media screen and (min-width: 768px) {
  .panel {
    padding-left: 30px;
  }
}

.output {
  color: white;
  text-transform: uppercase;
  font-family: 'Times New Roman';
  font-weight: 900;
  padding: 40px;
  padding-top: 60px;
  padding-bottom: 200px;
  white-space: nowrap;
}

.first-line,
.second-line {
  font-size: 7rem;
  transform: scale(1, 1.5);
  line-height: 1.2;
}

.third-line {
  font-size: 12rem;
  transform: scale(1, 1.5);
  line-height: 1.2;
}

.title-line {
  font-size: 6rem;
  text-transform: initial;
  line-height: 0.9;
}

.episode-line {
  margin-top: 4rem;
  margin-bottom: 0.7rem;
  font-size: 3.6rem;
  font-family: Helvetica Neue, Helvetica, sans-serif;
  transform: scale(1, 1.5);
}
</style>
