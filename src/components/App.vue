<template>
  <div id="app">
    <badge slug="egoist/evangelion-card" class="badge" />
    <div class="panel columns">
      <div class="column">
        <div class="form-group">
          <label for="first-line">First Line</label>
          <textarea
            id="first-line"
            class="form-control"
            v-model="form.firstLine">
          </textarea>
        </div>
        <div class="form-group">
          <label for="second-line">Second Line</label>
          <textarea
            id="second-line"
            class="form-control"
            v-model="form.secondLine">
          </textarea>
        </div>
      </div>
      <div class="column">
        <div class="form-group">
          <label for="third-line">Third Line</label>
          <textarea
            id="third-line"
            class="form-control"
            v-model="form.thirdLine">
          </textarea>
        </div>
        <div class="form-group">
          <label for="episode">"EPISODE"</label>
          <textarea
            id="episode"
            class="form-control"
            v-model="form.episode">
          </textarea>
        </div>
      </div>
      <div class="column">
        <div class="form-group">
          <label for="title-line">Title Line</label>
          <textarea
            id="title-line"
            class="form-control"
            v-model="form.titleLine">
          </textarea>
        </div>
        <div class="form-group">
          <label for="title-font">Title Font</label>
          <textarea
            id="title-font"
            class="form-control"
            v-model="form.titleFont">
          </textarea>
        </div>
      </div>
      <div class="column download">

        <div class="form-group">
          <label for="">Download</label>
          <button class="download-button" @click="download">Save as PNG</button>
        </div>
      </div>
    </div>
    <div class="output" ref="output"></div>
  </div>
</template>

<script>
  import Badge from 'vue-github-badge'
  import download from 'downloadjs'

  const $ = document.querySelector.bind(document)

  export default {
    name: 'app',
    data() {
      return {
        form: {
          firstLine: 'neon',
          secondLine: 'genesis',
          thirdLine: 'evangelion',
          episode: 'episode:12',
          titleLine: `She said,"Don't make others suffer\nfor your personal hatred."`,
          titleFont: 'Serif'
        },
        canvasSize: {
          width: 1280 * 2,
          height: 720 * 2
        }
      }
    },
    watch: {
      form: {
        handler() {
          this.draw()
        },
        deep: true
      }
    },
    mounted() {
      this.draw()
    },
    computed: {
      fontSize() {
        const firstTwoLines = this.canvasSize.height * 0.08
        const thirdLine = firstTwoLines * 1.7
        const episode = firstTwoLines * 0.5

        return {
          firstTwoLines,
          thirdLine,
          episode,
          titleSize: episode
        }
      }
    },
    methods: {
      draw() {
        const existing = $('#canvas')
        if (existing) {
          this.$refs.output.removeChild(existing)
        }

        const canvas = document.createElement('canvas')
        canvas.id = 'canvas'
        canvas.width = this.canvasSize.width
        canvas.height = this.canvasSize.height

        const context = canvas.getContext('2d')

        // For retina display
        context.scale(2,2)

        // background
        context.fillStyle = 'black'
        context.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)

        const addText = (text, y, squashRaito) => {
          context.textBaseline = 'top'
          context.textAlign = 'left'

          const squashWidth = context.measureText(text).width * squashRaito

          const split = text.split('\n')

          if (split.length > 1) {
            context.textBaseline = 'middle'
          } else {
            context.textBaseline = 'top'
          }

          split.forEach((line, index) => {
            const mWidth = context.measureText('M').width
            context.fillText(line, 40, y + index * mWidth, squashWidth)
          })
        }

        context.textBaseline = 'top'

        // First line
        context.font = `900 ${this.fontSize.firstTwoLines}px Times New Roman`
        context.fillStyle = '#ffffff'
        addText(this.form.firstLine.toUpperCase(), 40, 0.7)

        // Second line
        addText(this.form.secondLine.toUpperCase(), 135, 0.7)

        // Third line
        context.font = `900 ${this.fontSize.thirdLine}px Times New Roman`
        addText(this.form.thirdLine.toUpperCase(), 210, 0.6)

        // Episode line
        context.font = `700 ${this.fontSize.episode}px Helvetica Neue,Helvetica,sans-serif`
        addText(this.form.episode.toUpperCase(), 420, 0.75)

        // Title line
        context.font = `900 ${this.fontSize.titleSize}px ${this.form.titleFont}`
        addText(this.form.titleLine, 515, 0.6)

        this.$refs.output.appendChild(canvas)
      },
      download() {
        const canvas = $('#canvas')
        canvas.toBlob(blob => {
          download(blob, 'evangelion-card.png', 'image/png')
        })
      }
    },
    components: {
      Badge
    }
  }
</script>

<style src="grid.css"></style>

<style lang="stylus">
  html, body
    height: 100%

  *
    box-sizing: border-box

  body
    background-color: #000
    margin: 0
    font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
</style>

<style lang="stylus" scoped>
  #app
    display: flex
    flex-direction: column

  .panel
    color: white
    max-width: 960px
    padding-top: 10px
    .form-group
      padding: 10px
    .form-control
      width: 100%
      background-color: transparent
      border: 1px solid white
      color: white
      min-height: 40px
    label
      display: block
      margin-bottom: 10px
      user-select: none

  .badge
    svg
      path
        fill: white
    &:hover
      svg
        path
          fill: #ccc

  .download
    display: flex

  .download-button
    cursor: pointer
    height: 40px
    background-color: transparent
    color: white
    border: 1px solid
    padding: 0 20px
    font-size: 16px
    &:hover
      background-color: rgba(47, 47, 47, 0.72)

  @media screen and (min-width: 768px)
    .panel
      padding-left: 30px
</style>

<style lang="stylus">
  .output
    #canvas
      max-width: 100%
</style>
