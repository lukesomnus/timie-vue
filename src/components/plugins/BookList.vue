<template>
  <div class="root">
    <div class="book-header">
      <span class="book-header-day">今天</span>
      <span class="book-header-date">星期六 5月6日</span>
      <md-button class="md-raised md-primary book-add-button" id="addBook" @click.native="addBook">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <md-layout md-gutter class="book-group">
      <md-layout v-for="book in books" :key="book.id">
        <book :progress="book.progress">
          <span slot="title">{{book.name}}</span>
          <span slot="author">{{book.author}}</span>
        </book>
      </md-layout>
    </md-layout>
    <md-dialog md-open-from="#addBook" md-close-to="#addBook" ref="addBookDialog">
      <md-dialog-title>添加书单</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <md-input placeholder="书名" v-model="bookName"></md-input>
        </md-input-container>
        <md-input-container>
          <md-input placeholder="作者" v-model="bookAuthor"></md-input>
        </md-input-container>
        <md-input-container>
          <md-input placeholder="进度" v-model="progress" type="number"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeDialog('cancel')">取消</md-button>
        <md-button class="md-primary" @click.native="closeDialog('confirm')">保存</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>
<style  scoped>
.root {
  background-color: #fff;
  padding: 20px;
}

.book-header {
  padding: 10px 20px 20px;
  position: relative;
}

.book-header-day {
  font-size: 20px;
  font-weight: bold;
}

.book-header-date {
  color: #999;
  padding-left: 6px;
}

.book-add-button {
  position: absolute;
  right: 20px;
}

.book-group {
  margin-top: 20px;
}
</style>
<script>
import Book from '@/components/tools/Book/Book'
import uuid from 'uuid'
export default {
  data() {
    return {
      books: [{
        id: uuid(),
        name: '老人与海',
        author: '海明威',
        progress: 50
      }, {
        id: uuid(),
        name: '老人与海',
        author: '海明威',
        progress: 50
      }, {
        id: uuid(),
        name: '老人与海',
        author: '海明威',
        progress: 50
      }],
      bookName: '',
      bookAuthor:'',
      progress: ''
    }
  },
  methods: {
    addBook() {
      this.openDialog()
    },
    openDialog() {
      this.$refs.addBookDialog.open()

    },
    closeDialog() {
      this.$refs.addBookDialog.close()
    }
  },
  components: {
    Book
  }
}
</script>

