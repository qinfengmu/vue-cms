<!--
 分页组件
 qin fengmu 2017-3-18
 -->
<template>
    <div class="ui-pagination">
      <span class="pagination-info">显示{{from}}-{{to}}条，共{{pages}}条</span>
      <div class="pagination">
        <a
          @click="loadPage(1)"
          :class="{disabled: isFirstPage}"
          title="首页"
        >&laquo;</a>
        <a
          @click="loadPage('prev')"
          :class="{disabled: isFirstPage}"
          title="上一页"
        >&lsaquo;</a>
        <a class="dot" v-if="pageStart>1">...</a>
        <a
          v-for="n in sizes"
          :class="{currentPage: isCurrentPage(n)}"
          @click="loadPage(n)"
        >{{n}}</a>
        <a class="dot" v-if="pageEnd < totalPages">...</a>
        <a
          @click="loadPage('next')"
          :class="{disabled: isLastPage}"
          title="下一页"
        >&rsaquo;</a>
        <a
          @click="loadPage(totalPages)"
          :class="{disabled: isLastPage}"
          title="最后一页"
        >&raquo;</a>
        <span class="totalpage">共 {{totalPages}} 页</span>
      </div>
    </div>
</template>
<style lang="less" scoped>
  @import "../less/variables";
  @import "../less/mixins";

  .ui-pagination {
    .clearfix();
    .pagination-info{
      float: left;
      line-height: 32px;
    }
    .totalpage {
      margin-left: 10px;
      line-height:32px;
    }
    .pagination {
      float: right;
      margin: 0;
      .clearfix();
      a {

        float: left;
        margin-right: 3px;
        padding: 5px 12px;
        border:1px solid #e4e4e4;
        color:#666;
        cursor: pointer;

        &:hover{
          background-color: #f5f5f5;
          color: @defaultBlue;
        }
        &.currentPage {
          color: @defaultBlue;
          pointer-events: none;
        }
        &.disabled{

          cursor: default;
          pointer-events: none;
          color: @gray;
          &:hover {
            background: @white;
          }
        }
        &.dot {

          border: 0;
          cursor: default;
          &:hover{

            color: #666;
            background-color: @white;

          }

        }

      }

    }
    margin-top: 10px;

  }

</style>
<script>
export default {
  props: ['pages','pageSize'],
  data () {
    return {
      currentPage: 1,
      totalPages: '',
      pageStart: '',
      pageEnd: ''
    }
  },
  computed: {
    isFirstPage () {
        return this.currentPage == 1;
    },
    isLastPage () {

      return this.currentPage == this.totalPages;

    },
    from () {

      return (this.currentPage-1)*this.pageSize+1;

    },
    to () {
      if(this.isLastPage){
        return this.pages;
      }
      return this.currentPage*this.pageSize
    },
    sizes () {

     this.totalPages = Math.ceil(this.pages/this.pageSize);
     this.pageStart = this.currentPage-2 > 0 ? this.currentPage-2 : 1;

     this.pageEnd = this.pageStart+4 >= this.totalPages ? this.totalPages : this.pageStart+4;

     let sizes = [];
     for(let i = this.pageStart; i <= this.pageEnd; i++ ){
        sizes.push(i);
     }

      return sizes;

    }

  },
  methods: {
    loadPage (page) {

      if(page == 'prev' && this.currentPage > 0){
        page = --this.currentPage;
      }else if(page == 'next' && this.currentPage < this.totalPages){
        page = ++this.currentPage;
      }

      this.$emit('pageChange', page);
    },
    isCurrentPage (page) {
      return page === this.currentPage
    },
    setPaginationData (page) {
      this.currentPage = page
    },
  }
}

</script>
